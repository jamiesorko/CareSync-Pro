import { geminiService } from './geminiService'
import { Client } from '../types'

export interface RecoveryTrajectory {
  currentPhase: string;
  predictedIndependenceDate: string;
  velocityScore: number; // 0-100
  stagnationRisks: string[];
  clinicalRecommendation: string;
}

export class ClinicalTrajectoryService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes longitudinal patient history to predict discharge readiness and recovery speed.
   */
  async calculateTrajectory(client: Client, historyNotes: string[]): Promise<RecoveryTrajectory> {
    console.log(`[TRAJECTORY_ORACLE]: Computing recovery vector for ${client.name}`);
    
    const context = {
      conditions: client.conditions,
      initialState: client.description,
      recentHistory: historyNotes.slice(-5)
    };

    const prompt = `
      Analyze patient recovery path: ${JSON.stringify(context)}.
      Predict: Current recovery phase, estimated date of service termination (independence), 
      and identify 2 potential stagnation risks.
      Return JSON: { "phase": "", "date": "YYYY-MM-DD", "velocity": 0-100, "risks": [], "rec": "" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        currentPhase: data.phase || "Active Stabilization",
        predictedIndependenceDate: data.date || "TBD",
        velocityScore: data.velocity || 50,
        stagnationRisks: data.risks || ["Insufficient data"],
        clinicalRecommendation: data.rec || "Continue standard care plan."
      };
    } catch (e) {
      return { currentPhase: 'Unknown', predictedIndependenceDate: 'TBD', velocityScore: 0, stagnationRisks: [], clinicalRecommendation: 'Manual review required.' };
    }
  }
}

export const clinicalTrajectoryService = new ClinicalTrajectoryService();