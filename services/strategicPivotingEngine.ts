import { geminiService } from './geminiService'

export interface PivotSuggestion {
  targetServiceLine: string;
  marketJustification: string;
  requiredStaffTraining: string[];
  projectedProfitDelta: number;
}

export class StrategicPivotingEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes waitlist and regional intelligence to suggest new revenue streams.
   */
  async identifyMarketPivot(): Promise<PivotSuggestion[]> {
    console.log(`[STRATEGIC_AI]: Calculating high-ROI service pivots.`);
    
    const query = `Home care demand trends for October 2025 in Toronto, Ontario. High-demand niches with low competition.`;
    
    try {
      const intel = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Intel: ${intel.text}
        Task: Suggest 1 specialized home care pivot (e.g. Post-Op Wound, Diabetic Foot Care, Night Palliative).
        Return JSON: [ { "service": "", "justification": "", "training": [], "profitDelta": number } ]
      `;

      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        targetServiceLine: d.service,
        marketJustification: d.justification,
        requiredStaffTraining: d.training,
        projectedProfitDelta: d.profitDelta
      }));
    } catch (e) {
      return [];
    }
  }
}

export const strategicPivotingEngine = new StrategicPivotingEngine();