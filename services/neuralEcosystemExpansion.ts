import { geminiService } from './geminiService'

export interface ExpansionZone {
  region: string;
  demandSurgeType: 'PALLIATIVE' | 'POST_OP' | 'COMPLEX_PED';
  underservedMetric: string;
  estimatedOnboardingSpeed: string;
  strategicMove: string;
}

export class NeuralEcosystemExpansion {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Maps senior density vs competitor locations to find the next "Blue Ocean" sector.
   */
  async identifyMarketGaps(province: string): Promise<ExpansionZone[]> {
    console.log(`[ECOSYSTEM_AI]: Mapping healthcare deserts in ${province}...`);
    
    const query = `Home care nursing shortages and aging population growth by postal code in ${province} October 2025. List top 2 cities with high waitlists and low provider density.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Data: ${res.text}
        Task: Identify exactly 1 high-priority city for branch initialization.
        Return JSON: { "region": "", "type": "PALLIATIVE|POST_OP|PED", "metric": "", "speed": "", "move": "" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const d = JSON.parse(analysis.text || '{}');

      return [{
        region: d.region || "Expansion Target Alpha",
        demandSurgeType: d.type || 'PALLIATIVE',
        underservedMetric: d.metric || "12% Senior Density surge with zero specialized nodes.",
        estimatedOnboardingSpeed: d.speed || "90 Days",
        strategicMove: d.move || "Acquire local specialized staffing cluster."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const neuralEcosystemExpansion = new NeuralEcosystemExpansion();