import { geminiService } from './geminiService'
import { Client } from '../types'

export interface OutcomeTrajectory {
  goalId: string;
  attainmentProbability: number; // 0-100
  correlationInsight: string;
  suggestedAdjustment: string;
  isDeclining: boolean;
}

export class OutcomeContinuityAnalyzer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Correlates task completion with biometric trends to see if care is working.
   */
  async analyzeGoalContinuity(client: Client, taskHistory: any[], biometricTrend: any[]): Promise<OutcomeTrajectory[]> {
    console.log(`[OUTCOME_ORACLE]: Correlating clinical vectors for ${client.name}`);
    
    const context = {
      patient: client.name,
      conditions: client.conditions,
      tasks: taskHistory.slice(-10),
      biometrics: biometricTrend.slice(-10)
    };

    const prompt = `
      Task: Clinical Outcome Correlation.
      Data: ${JSON.stringify(context)}.
      Identify: Is the patient improving? If tasks are done but vitals decline, identify the 'Efficacy Gap'.
      Return JSON: [ { "goalId": "string", "prob": number, "insight": "string", "adjustment": "string", "declining": boolean } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        goalId: d.goalId,
        attainmentProbability: d.prob || 50,
        correlationInsight: d.insight || "Baseline maintenance confirmed.",
        suggestedAdjustment: d.adjustment || "Continue standard care plan.",
        isDeclining: !!d.declining
      }));
    } catch (e) {
      return [];
    }
  }
}

export const outcomeContinuityAnalyzer = new OutcomeContinuityAnalyzer();