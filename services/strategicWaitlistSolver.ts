import { geminiService } from './geminiService'

export interface IntakeRecommendation {
  referralId: string;
  profitabilityScore: number; // 0-100
  logisticalFitScore: number; // 0-100
  strategicRationale: string;
  onboardingAction: 'IMMEDIATE' | 'DEFER' | 'RE-ROUTE';
}

export class StrategicWaitlistSolver {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Evaluates the waitlist not just by clinical need, but by fiscal and logistical synergy.
   */
  async rankWaitlist(pendingReferrals: any[]): Promise<IntakeRecommendation[]> {
    console.log(`[STRATEGIC_INTAKE]: Calculating sector synergy for ${pendingReferrals.length} leads.`);
    
    // In production, this cross-references referral address with active visit clusters
    const prompt = `
      Waitlist: ${JSON.stringify(pendingReferrals)}
      Logic: Prioritize referrals within 3km of existing high-density visit sectors. 
      Identify high-margin specialized needs (e.g. daily complex dressing).
      Return JSON: [ { "id": "", "profit": 0-100, "fit": 0-100, "rationale": "", "action": "IMMEDIATE|DEFER" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        referralId: d.id,
        profitabilityScore: d.profit,
        logisticalFitScore: d.fit,
        strategicRationale: d.rationale,
        onboardingAction: d.action
      }));
    } catch (e) {
      return [];
    }
  }
}

export const strategicWaitlistSolver = new StrategicWaitlistSolver();