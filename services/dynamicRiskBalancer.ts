import { geminiService } from './geminiService'

export interface ImpedanceSignal {
  sectorId: string;
  impedanceScore: number; // 0-100 (Higher = Danger/Blockage)
  reason: string;
  mitigationDirective: string;
  priorityLevel: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
}

export class DynamicRiskBalancer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for 'Impedance Vectors' (Storms, Protests, Transit Failures) in a sector.
   */
  async scanEnvironmentalThreats(sector: string): Promise<ImpedanceSignal | null> {
    console.log(`[RISK_BALANCER]: Scanning impedance vectors for ${sector}...`);
    
    const query = `Live emergency alerts, extreme weather, and transit delays in ${sector}, Ontario as of the last 60 minutes.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      const prompt = `
        Input: "${text}"
        Task: Calculate a safety impedance score (0-100). If >50, suggest a fleet directive.
        Return JSON: { "score": number, "reason": "string", "directive": "string", "priority": "ROUTINE|ELEVATED|CRITICAL" }
      `;

      const analysis = await geminiService.generateText(prompt, false);
      const data = JSON.parse(analysis.text || '{}');

      if (data.score < 20) return null;

      return {
        sectorId: sector,
        impedanceScore: data.score || 0,
        reason: data.reason || "Environmental drift detected.",
        mitigationDirective: data.directive || "Follow standard sector protocol.",
        priorityLevel: data.priority || 'ROUTINE'
      };
    } catch (e) {
      return null;
    }
  }
}

export const dynamicRiskBalancer = new DynamicRiskBalancer();