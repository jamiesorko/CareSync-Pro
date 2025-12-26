import { geminiService } from './geminiService'

export interface LiabilityForecast {
  globalScore: number; // 0-100
  topThreeVectors: string[];
  insurancePremiumImpact: string;
  mitigationDirective: string;
}

export class GlobalLiabilityPredictor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Aggregates micro-risks (late visits, minor med errors, incident trends) into a liability forecast.
   */
  async predictLiabilityVector(incidentStats: any, staffingStats: any): Promise<LiabilityForecast> {
    console.log(`[STRATEGIC_RISK]: Computing global liability probability...`);
    
    const context = {
      incidents: incidentStats,
      staffingDensity: staffingStats,
      complianceScore: 98.4
    };

    const prompt = `
      Act as a Healthcare Risk Underwriter. Analyze: ${JSON.stringify(context)}.
      Predict the agency's liability score (0-100). Identify the top 3 failure vectors.
      Return JSON: { "score": number, "vectors": ["string"], "impact": "string", "directive": "string" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        globalScore: data.score || 12,
        topThreeVectors: data.vectors || ["Documentation latency"],
        insurancePremiumImpact: data.impact || "Neutral",
        mitigationDirective: data.directive || "Maintain standard oversight."
      };
    } catch (e) {
      return { globalScore: 0, topThreeVectors: [], insurancePremiumImpact: "N/A", mitigationDirective: "System offline." };
    }
  }
}

export const globalLiabilityPredictor = new GlobalLiabilityPredictor();