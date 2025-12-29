
import { geminiService } from './geminiService'

export interface AppealBrief {
  claimId: string;
  denialReason: string;
  supportingEvidence: string[];
  draftedAppeal: string;
  successProbability: number;
}

export class AuditRecoveryForge {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Harvests clinical data to refute an insurance denial.
   */
  async forgeAppeal(claimId: string, denialText: string, clinicalHistory: string[]): Promise<AppealBrief> {
    console.log(`[FISCAL_DEFENSE]: Forging appeal for Claim ${claimId}`);
    
    const prompt = `
      Denied Claim: ${claimId}
      Denial Notice: "${denialText}"
      Available Evidence: ${JSON.stringify(clinicalHistory)}
      
      Task: Act as a Medical Billing Advocate. Find clinical proof in the history that justifies the billed service.
      Draft a formal appeal letter to the Payor.
      Return JSON: { "evidence": ["string"], "letter": "string", "probability": number }
    `;

    try {
      // Fix: Using correct method generateAdvancedReasoning on geminiService
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        claimId,
        denialReason: denialText,
        supportingEvidence: data.evidence || [],
        draftedAppeal: data.letter || "Formal appeal pending manual review.",
        successProbability: data.probability || 0.75
      };
    } catch (e) {
      return { claimId, denialReason: denialText, supportingEvidence: [], draftedAppeal: "Neural synthesis failure.", successProbability: 0 };
    }
  }
}

export const auditRecoveryForge = new AuditRecoveryForge();
