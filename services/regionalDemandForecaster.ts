import { geminiService } from './geminiService'

export interface DemandPrediction {
  neighborhood: string;
  surgeProbability: number;
  primaryDrivers: string[];
  suggestedResourceAllocation: string;
}

export class RegionalDemandForecaster {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to identify regional healthcare bottlenecks and demographic shifts.
   */
  async forecastDemand(region: string): Promise<DemandPrediction[]> {
    console.log(`[NEURAL_GROWTH]: Predicting demand vectors for ${region}`);
    
    const query = `Home care waitlist trends and senior population growth statistics for ${region} neighborhoods in late 2025. Identify areas with highest nursing shortages.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      // In production, we'd use responseSchema. Here we simulate extraction.
      return [{
        neighborhood: "North York Central",
        surgeProbability: 0.82,
        primaryDrivers: ["Hospital discharge backlog", "Senior facility renovation closures"],
        suggestedResourceAllocation: res.text?.substring(0, 150) || "Increase PSW presence in M2N postal codes."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const regionalDemandForecaster = new RegionalDemandForecaster();