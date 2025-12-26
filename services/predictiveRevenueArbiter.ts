import { geminiService } from './geminiService'

export interface PreClaimAudit {
  denialRiskScore: number; // 0-1
  missingClinicalJustification: string[];
  suggestedPhrasing: string;
  expectedRevenueValue: number;
}

export class PredictiveRevenueArbiter {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Audits a draft invoice against the patient's shift notes to ensure medical necessity.
   */
  async auditDraftClaim(claimData: any, encounterNotes: string[]): Promise<PreClaimAudit> {
    console.log(`[FISCAL_GUARD]: Pre-flighting claim vector for submission.`);
    
    const prompt = `
      Claim: $${claimData.amount} for "${claimData.serviceType}"
      Clinical Evidence: "${encounterNotes.join(' | ')}"
      
      Task: Act as a Payor Auditor. Predict the chance this claim is denied. 
      Identify 2 missing clinical keywords needed for approval.
      Return JSON: { "risk": number, "missing": [], "phrasing": "string", "value": number }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        denialRiskScore: data.risk || 0.1,
        missingClinicalJustification: data.missing || [],
        suggestedPhrasing: data.phrasing || "Standard documentation applied.",
        expectedRevenueValue: data.value || claimData.amount
      };
    } catch (e) {
      return { denialRiskScore: 0, missingClinicalJustification: [], suggestedPhrasing: "Error", expectedRevenueValue: 0 };
    }
  }
}

export const predictiveRevenueArbiter = new PredictiveRevenueArbiter();