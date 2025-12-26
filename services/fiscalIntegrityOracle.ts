import { geminiService } from './geminiService'

export interface BillingAudit {
  visitId: string;
  discrepancyType: 'UNDER_BILLING' | 'OVER_BILLING' | 'CLINICAL_MISMATCH';
  estimatedValue: number;
  reasoning: string;
  actionItem: string;
}

export class FiscalIntegrityOracle {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Cross-references visit narratives with billing codes to detect financial anomalies.
   */
  async auditVisitFiscalIntegrity(visitId: string, note: string, billedAmount: number): Promise<BillingAudit[]> {
    console.log(`[FISCAL_INTEGRITY]: Running neural audit for Visit ${visitId}`);
    
    const prompt = `
      Task: Fiscal Audit Analysis.
      Clinical Note: "${note}"
      Billed Amount: $${billedAmount}
      
      Identify if the clinical narrative suggests more (or less) work than billed. 
      Detect 'Revenue Ghosting' or over-charging.
      Return JSON: [ { "type": "UNDER_BILLING|OVER_BILLING|CLINICAL_MISMATCH", "value": number, "reasoning": "string", "action": "string" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({ ...d, visitId }));
    } catch (e) {
      return [];
    }
  }
}

export const fiscalIntegrityOracle = new FiscalIntegrityOracle();