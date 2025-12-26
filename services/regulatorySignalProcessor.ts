import { geminiService } from './geminiService'

export interface RegulatorySignal {
  billReference: string;
  summary: string;
  impactArea: 'WAGES' | 'FUNDING' | 'COMPLIANCE' | 'DOCUMENTATION';
  fiscalImpactPercentage: number;
  actionRequired: string;
}

export class RegulatorySignalProcessor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for legislative changes using Google Search Grounding.
   */
  async scanForRegionalUpdates(province: string): Promise<RegulatorySignal[]> {
    console.log(`[REG_INTEL]: Probing legislative signals for ${province} Home Care...`);
    
    const query = `Latest Ministry of Health bulletins, Bill 124 updates, and PSW wage parity legislation in ${province} for 2025. Identification of funding shifts.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      const analysisPrompt = `
        Legislative Context: ${text}
        Task: Identify 1 specific wage or funding change.
        Return JSON: { "ref": "string", "summary": "string", "area": "WAGES|FUNDING|COMPLIANCE", "impact": number, "action": "string" }
      `;

      const analysis = await geminiService.generateText(analysisPrompt, false);
      const data = JSON.parse(analysis.text || '{}');

      return [{
        billReference: data.ref || "2025-MOH-GEN",
        summary: data.summary || "Legislative signal ingested.",
        impactArea: data.area || 'COMPLIANCE',
        fiscalImpactPercentage: data.impact || 0,
        actionRequired: data.action || "Standard monitoring protocol."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const regulatorySignalProcessor = new RegulatorySignalProcessor();