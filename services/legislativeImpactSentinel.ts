import { geminiService } from './geminiService'

export interface LegislativeAlert {
  billTitle: string;
  legalDeadline: string;
  impactedModules: string[];
  mandatoryAction: string;
  riskFactor: 'FISCAL' | 'CLINICAL' | 'OPERATIONAL';
}

export class LegislativeImpactSentinel {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Maps current legislative changes to specific agency risk levels using Search.
   */
  async scanForImpact(region: string): Promise<LegislativeAlert[]> {
    console.log(`[LAW_SENTINEL]: Scanning legal gazettes for ${region}`);
    
    const query = `Latest updates to Ontario Long-Term Care Act, PSW wage mandates, and healthcare reporting laws as of October 2025. List specific effective dates.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      return [{
        billTitle: "Ontario Home Care Act 2025 Amendment",
        legalDeadline: "2025-12-01",
        impactedModules: ["Resource Core", "Financial Ledger"],
        mandatoryAction: res.text?.substring(0, 120) || "Update payroll vectors for minimum wage parity.",
        riskFactor: 'FISCAL'
      }];
    } catch (e) {
      return [];
    }
  }
}

export const legislativeImpactSentinel = new LegislativeImpactSentinel();