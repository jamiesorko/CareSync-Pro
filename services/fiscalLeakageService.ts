
import { geminiService } from './geminiService'

export interface BillingGap {
  detectedService: string;
  suggestedBillingCode: string;
  estimatedValue: number;
  clinicalEvidence: string;
}

export class FiscalLeakageService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes text for mentions of supplies or services that were not formally coded.
   */
  async scanForHiddenRevenue(visitId: string, clinicalNote: string): Promise<BillingGap[]> {
    console.log(`[FISCAL_FORENSICS]: Scanning visit ${visitId} for revenue vectors.`);
    
    const prompt = `
      Clinical Note: "${clinicalNote}"
      Task: Identify specialized kits (wound, PPE), counseling minutes, or complex assessments mentioned 
      that have billable value. Return JSON: [ { "service": "string", "code": "string", "value": number, "evidence": "string" } ]
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        detectedService: d.service,
        suggestedBillingCode: d.code,
        estimatedValue: d.value,
        clinicalEvidence: d.evidence
      }));
    } catch (e) {
      return [];
    }
  }
}

export const fiscalLeakageService = new FiscalLeakageService();
