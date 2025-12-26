import { geminiService } from './geminiService'
import { RevenueGap } from '../types'

export class FinancialReconciliationService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans narrative visit logs for specialized clinical labor that was missed in billing.
   */
  async auditVisitRevenue(visitId: string, note: string, billedCodes: string[]): Promise<RevenueGap[]> {
    console.log(`[FISCAL_FORENSICS]: Scanning visit ${visitId} note for revenue vectors.`);
    
    const prompt = `
      Billed Codes: ${billedCodes.join(', ')}
      Visit Note: "${note}"
      
      Task: Identify if the caregiver performed specialized medical tasks (Wound Vac, Catheter Care, Complex Injections) 
      that were NOT billed. 
      Return JSON: [ { "procedure": "string", "value": number, "evidence": "string", "code": "string" } ]
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((item: any) => ({
        visitId,
        missingProcedure: item.procedure,
        estimatedValue: item.value,
        clinicalEvidence: item.evidence,
        billingCodeSuggestion: item.code
      }));
    } catch (e) {
      return [];
    }
  }
}

export const financialReconciliationService = new FinancialReconciliationService();