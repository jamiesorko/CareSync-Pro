import { geminiService } from './geminiService'

export interface FiscalLeverageBrief {
  currentInterestRateVector: string;
  recommendedFinancingAction: 'RESTRUCTURE' | 'HOLD' | 'EXPAND';
  projectedSavings: number;
  strategicRationale: string;
}

export class StrategicDebtGovernor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Monitors macro-economic signals to protect the agency's fiscal runway.
   */
  async optimizeCapitalStructure(currentDebtLoad: number): Promise<FiscalLeverageBrief> {
    console.log(`[FISCAL_GOVERNOR]: Probing macro-economic vectors for Org ${this.companyId}...`);
    
    const query = `Latest Bank of Canada interest rate announcements and late 2025 inflation forecasts for healthcare operations in Ontario. Current prime rate trends.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Data: ${res.text}
        Agency Debt: $${currentDebtLoad}
        Task: Act as a Fractional CFO. Recommend if the agency should restructure debt or expand capital.
        Return JSON: { "action": "RESTRUCTURE|HOLD|EXPAND", "savings": number, "rationale": "string", "vector": "string" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(analysis.text || '{}');

      return {
        recommendedFinancingAction: data.action || 'HOLD',
        projectedSavings: data.savings || 0,
        strategicRationale: data.rationale || "Maintain current liquidity buffers.",
        currentInterestRateVector: data.vector || "Neutral"
      };
    } catch (e) {
      return { 
        currentInterestRateVector: "Signal lost.", 
        recommendedFinancingAction: 'HOLD', 
        projectedSavings: 0, 
        strategicRationale: "Economic intelligence core offline." 
      };
    }
  }
}

export const strategicDebtGovernor = new StrategicDebtGovernor();