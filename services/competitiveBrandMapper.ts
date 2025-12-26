import { geminiService } from './geminiService'

export interface MarketGap {
  neighborhood: string;
  competitorWeakness: string;
  opportunityType: 'CLINICAL' | 'OPERATIONAL' | 'PRICING';
  suggestedPivot: string;
}

export class CompetitiveBrandMapper {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to map regional competitor reviews and service lists.
   */
  async mapMarketOpportunities(region: string): Promise<MarketGap[]> {
    console.log(`[MARKET_INTEL]: Scanning competitive service vectors for ${region}`);
    
    const query = `Home care agency reviews and complaints in ${region}, Ontario October 2025. Identify recurring patient frustrations with specific providers.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Signal: "${res.text}"
        Task: Identify 2 underserved clinical areas or common competitor failures.
        Return JSON: [ { "neighborhood": "", "weakness": "", "type": "CLINICAL|OPERATIONAL|PRICING", "pivot": "" } ]
      `;

      const analysis = await geminiService.generateText(prompt, false);
      return JSON.parse(analysis.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const competitiveBrandMapper = new CompetitiveBrandMapper();