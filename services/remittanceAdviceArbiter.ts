import { geminiService } from './geminiService'

export interface PaymentReconciliation {
  claimId: string;
  expectedAmount: number;
  receivedAmount: number;
  varianceReason: string;
  reclamationLogic: string;
  status: 'SETTLED' | 'RECLAIM_INITIATED';
}

export class RemittanceAdviceArbiter {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Parses complex government EOB (Explanation of Benefits) data to find fiscal leaks.
   */
  async reconcileRemittance(rawAdviceText: string, ledgerTotal: number): Promise<PaymentReconciliation[]> {
    console.log(`[FISCAL_ARBITER]: Parsing government remittance vector for Org ${this.companyId}`);
    
    const prompt = `
      Ledger Expected: $${ledgerTotal}
      Advice Data: "${rawAdviceText}"
      Task: Act as a Medical Billing Auditor. Identify any line-item underpayments or denied codes. 
      Identify exactly why the government didn't pay the full amount.
      Return JSON: [ { "id": "string", "exp": number, "rec": number, "reason": "string", "logic": "string" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        claimId: d.id,
        expectedAmount: d.exp,
        receivedAmount: d.rec,
        varianceReason: d.reason,
        reclamationLogic: d.logic,
        status: d.exp > d.rec ? 'RECLAIM_INITIATED' : 'SETTLED'
      }));
    } catch (e) {
      return [];
    }
  }
}

export const remittanceAdviceArbiter = new RemittanceAdviceArbiter();