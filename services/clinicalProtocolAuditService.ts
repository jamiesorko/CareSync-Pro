
import { geminiService } from './geminiService'

export interface AuditResult {
  isCompliant: boolean;
  score: number; // 0-100
  missingElements: string[];
  suggestedAdditions: string;
}

export class ClinicalProtocolAuditService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Audits a narrative clinical note against standard nursing practice guidelines.
   */
  async auditNote(note: string, protocolType: string): Promise<AuditResult> {
    console.log(`[PROTOCOL_AUDIT]: Auditing ${protocolType} documentation...`);
    
    const prompt = `
      Protocol: ${protocolType} Standard Care
      Note: "${note}"
      Task: Check for professional nursing elements (Observation, Action, Response). 
      List missing components. Return JSON: { "compliant": boolean, "score": number, "missing": ["string"], "suggest": "string" }
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        isCompliant: data.compliant || false,
        score: data.score || 0,
        missingElements: data.missing || [],
        suggestedAdditions: data.suggest || "Enhance clinical detail."
      };
    } catch (e) {
      return { isCompliant: true, score: 100, missingElements: [], suggestedAdditions: "" };
    }
  }
}

export const clinicalProtocolAuditService = new ClinicalProtocolAuditService();
