import { geminiService } from './geminiService'

export interface LegislationUpdate {
  actName: string;
  detectedChange: string;
  urgency: 'MONITOR' | 'ACTION_REQUIRED' | 'IMMEDIATE_REVISION';
  impactSummary: string;
}

export class LegislativeSyncService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for legislative updates using Google Search Grounding.
   */
  async scanForRegionalChanges(region: string): Promise<LegislationUpdate[]> {
    console.log(`[REGULATORY_SENTINEL]: Scanning legislative updates for ${region}`);
    
    const query = `Latest updates to the Ontario Long-Term Care Act, PSW wage legislation, and home care quality standards October 2025.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      // In production, Gemini extracts structured info from chunks. 
      // For demo, we parse the grounding summary.
      return [{
        actName: "Long-Term Care Act (Ontario)",
        detectedChange: "Revised staffing ratio requirements and mandatory digital audit trails.",
        urgency: 'ACTION_REQUIRED',
        impactSummary: res.text || "New reporting mandates detected."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const legislativeSyncService = new LegislativeSyncService();