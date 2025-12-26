import { geminiService } from './geminiService'

export interface PolicyAmendment {
  originalPolicyId: string;
  mandateChange: string;
  draftedAmendmentText: string;
  urgency: 'HIGH' | 'MEDIUM';
}

export class RegulatoryDriftInterceptor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Detects regulatory shifts and proactively drafts internal policy corrections.
   */
  async interceptMandateShift(region: string): Promise<PolicyAmendment[]> {
    console.log(`[REG_INTERCEPTOR]: Scanning provincial mandates for ${region}`);
    
    const query = `Latest provincial home care standards updates, patient rights amendments, and digital record keeping mandates in ${region} for late 2025.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Mandate Data: ${res.text}
        Task: Draft a 200-word 'Protocol Amendment' for internal agency staff to remain compliant with this change.
        Return JSON: { "id": "SOP-GENERAL", "change": "string", "draft": "string", "urgency": "HIGH|MEDIUM" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(analysis.text || '{}');

      return [{
        originalPolicyId: data.id || 'SOP-COMPLIANCE',
        mandateChange: data.change || "Legislative update detected.",
        draftedAmendmentText: data.draft || "Draft pending review.",
        urgency: data.urgency || 'MEDIUM'
      }];
    } catch (e) {
      return [];
    }
  }
}

export const regulatoryDriftInterceptor = new RegulatoryDriftInterceptor();