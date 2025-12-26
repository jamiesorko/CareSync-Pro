import { geminiService } from './geminiService'

export interface PoachingAlert {
  competitorName: string;
  detectedOffer: string;
  affectedSector: string;
  poachingIntensity: number; // 0-100
  targetedInternalStaffCount: number;
  mitigationStrategy: string;
}

export class CompetitorPoachingOracle {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans local job markets and matches competitor offers against internal staff data.
   */
  async scanPoachingVectors(region: string): Promise<PoachingAlert[]> {
    console.log(`[POACHING_ORACLE]: Probing competitor wage signals in ${region}...`);
    
    const query = `Latest home care nursing and PSW hiring bonuses and hourly rates for private agencies in ${region}, Ontario October 2025. List specific agency names.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Market Data: ${res.text}
        Task: Identify exactly 1 high-threat competitor. 
        Analyze: Are they offering signing bonuses or >$2/hr more than the $25/hr baseline?
        Return JSON: { "competitor": "", "offer": "", "sector": "", "intensity": number, "targets": number, "strategy": "" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const d = JSON.parse(analysis.text || '{}');

      return [{
        competitorName: d.competitor || "Unknown Competitor",
        detectedOffer: d.offer || "Market parity detected.",
        affectedSector: d.sector || region,
        poachingIntensity: d.intensity || 0,
        targetedInternalStaffCount: d.targets || 0,
        mitigationStrategy: d.strategy || "Maintain standard engagement levels."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const competitorPoachingOracle = new CompetitorPoachingOracle();