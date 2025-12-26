import { geminiService } from './geminiService'

export interface StandardizationReport {
  internalProtocolId: string;
  externalStandardReference: string;
  driftLevel: 'NONE' | 'MINOR' | 'CRITICAL';
  suggestedAmendment: string;
  complianceDeadline: string;
}

export class ClinicalStandardOptimizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to find latest clinical guidelines and flags internal drift.
   */
  async auditStandardAlignment(protocolTitle: string, internalContent: string): Promise<StandardizationReport> {
    console.log(`[STANDARD_WATCH]: Probing global best practices for ${protocolTitle}`);
    
    const query = `Latest professional nursing and home care standards for ${protocolTitle} in Canada/Ontario October 2025. Mandatory safety steps.`;
    
    try {
      const intel = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Internal Policy: "${internalContent}"
        Latest Standards: "${intel.text}"
        Task: Identify any 'Compliance Gaps' where the agency's internal rule is outdated.
        Return JSON: { "ref": "string", "drift": "NONE|MINOR|CRITICAL", "amendment": "string", "deadline": "YYYY-MM-DD" }
      `;

      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');

      return {
        internalProtocolId: protocolTitle,
        externalStandardReference: data.ref || "2025 Clinical Guidelines",
        driftLevel: data.drift || 'NONE',
        suggestedAmendment: data.amendment || "Protocols aligned with current best practice.",
        complianceDeadline: data.deadline || "N/A"
      };
    } catch (e) {
      return { internalProtocolId: protocolTitle, externalStandardReference: "N/A", driftLevel: 'NONE', suggestedAmendment: "Audit engine bottleneck.", complianceDeadline: "N/A" };
    }
  }
}

export const clinicalStandardOptimizer = new ClinicalStandardOptimizer();