import { geminiService } from './geminiService'

export interface MarketEntryBrief {
  targetRegion: string;
  demandIntensity: number; // 0-100
  competitiveWeakness: string;
  proposedServicePivot: string;
  estimatedOnboardingWindow: string;
}

export class NeuralBrandExpansionEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans regional demographics and competitor reviews to identify "Blue Ocean" opportunities.
   */
  async findGrowthOpportunity(province: string): Promise<MarketEntryBrief[]> {
    console.log(`[MARKET_STRATEGY]: Scanning ${province} for service voids...`);
    
    const query = `Home care market gaps and senior population growth by city in ${province} for late 2025. List cities with high waitlists and low specialized dementia care availability.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Intel: ${res.text}
        Task: Identify 1 specific city for expansion. 
        Identify 1 competitor weakness and 1 unique service offering to win the market.
        Return JSON: { "city": "string", "intensity": number, "weakness": "string", "pivot": "string", "window": "string" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(analysis.text || '{}');

      return [{
        targetRegion: data.city || "New Market",
        demandIntensity: data.intensity || 85,
        competitiveWeakness: data.weakness || "Low technical integration.",
        proposedServicePivot: data.pivot || "Neural-enabled high-acuity care.",
        estimatedOnboardingWindow: data.window || "6 Months"
      }];
    } catch (e) {
      return [];
    }
  }
}

export const neuralBrandExpansionEngine = new NeuralBrandExpansionEngine();