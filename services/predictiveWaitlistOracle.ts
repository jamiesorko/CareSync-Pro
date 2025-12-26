import { geminiService } from './geminiService'

export interface ProfitabilityPrediction {
  region: string;
  breakEvenMonths: number;
  marketDensityScore: number;
  strategicAdvisory: string;
}

export class PredictiveWaitlistOracle {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Google Search grounding to correlate local healthcare demand with agency waitlist depth.
   */
  async predictRegionalSolvency(region: string, currentWaitlistCount: number): Promise<ProfitabilityPrediction> {
    console.log(`[STRATEGIC_AI]: Calculating economic runway for expansion in ${region}`);
    
    const query = `Home care market penetration and average billing rates for private duty nursing in ${region}, Ontario October 2025. Competitive saturation for new agencies.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      const analysisPrompt = `
        Market Data: ${text}
        Waitlist: ${currentWaitlistCount} patients.
        Task: Predict months to break-even for a new satellite branch.
        Return JSON: { "months": number, "density": 0-100, "advisory": "string" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(analysisPrompt);
      const data = JSON.parse(analysis.text || '{}');

      return {
        region,
        breakEvenMonths: data.months || 6,
        marketDensityScore: data.density || 70,
        strategicAdvisory: data.advisory || "Standard expansion risk level."
      };
    } catch (e) {
      return { region, breakEvenMonths: 12, marketDensityScore: 0, strategicAdvisory: "Solvency signal bottleneck." };
    }
  }
}

export const predictiveWaitlistOracle = new PredictiveWaitlistOracle();