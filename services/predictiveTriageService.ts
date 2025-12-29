
import { geminiService } from './geminiService'

export interface TriageScore {
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  gravityScore: number; // 0-100
  riskReasoning: string;
  recommendedOnboardingWindow: string;
}

export class PredictiveTriageService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Evaluates referral text to predict clinical instability risk.
   */
  async calculateAcuityGravity(referralText: string): Promise<TriageScore> {
    console.log(`[TRIAGE_ORACLE]: Computing gravity vector for new patient intake...`);
    
    const prompt = `
      Context: Home Care Intake Triage.
      Referral: "${referralText}"
      Task: Assign clinical priority. P1=Life Threat/Immediate, P2=Urgent/24h, P3=Stable, P4=Routine.
      Return JSON: { "priority": "P1|P2|P3|P4", "score": 0-100, "reason": "string", "window": "string" }
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        priority: (data.priority || 'P3') as any,
        gravityScore: data.score || 50,
        riskReasoning: data.reason || "Baseline acuity detected.",
        recommendedOnboardingWindow: data.window || "72 Hours"
      };
    } catch (e) {
      return { priority: 'P3', gravityScore: 50, riskReasoning: "Engine timeout.", recommendedOnboardingWindow: "Standard" };
    }
  }
}

export const predictiveTriageService = new PredictiveTriageService();
