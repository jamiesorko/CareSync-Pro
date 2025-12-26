import { geminiService } from './geminiService';

export interface LegislativeImpact {
  billNumber: string;
  summary: string;
  affectedSops: string[];
  urgency: 'MONITOR' | 'ACTION_REQUIRED';
}

export class LegislativeParserService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for new health legislative vectors that impact home care operations.
   */
  async scanLegislativeSignals(): Promise<LegislativeImpact[]> {
    console.log(`[LEGISLATIVE_SENTINEL]: Periodic scan for health bill updates.`);
    
    const query = `New Ontario health legislation and labor laws affecting home care agencies as of October 2025. List new mandatory reporting or PSW wage rules.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      return [{
        billNumber: 'ON-HC-2025',
        summary: res.text || "Signal detected.",
        affectedSops: ['Worker Safety', 'Wage Compliance'],
        urgency: 'ACTION_REQUIRED'
      }];
    } catch (e) {
      return [];
    }
  }
}

export const legislativeParserService = new LegislativeParserService();