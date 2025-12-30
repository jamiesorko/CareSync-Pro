
import { geminiService } from './geminiService'
import { Client, ClinicalBoardReview } from '../types'

export class ClinicalBoardService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  async conductBoardReview(client: Client, rawHistory: string[]): Promise<ClinicalBoardReview> {
    const prompt = `
      Case Review for ${client.name}.
      JSON: { "summary": "", "perspectives": [], "consensus": "" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        clientId: client.id,
        timestamp: new Date().toISOString(),
        caseSummary: data.summary || "Case initialized.",
        perspectives: data.perspectives || [],
        consensusPlan: data.consensus || "Continue care."
      };
    } catch (e) {
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        clientId: client.id,
        timestamp: new Date().toISOString(),
        caseSummary: "Board review failure.",
        perspectives: [],
        consensusPlan: "Escalate to RN."
      };
    }
  }
}

export const clinicalBoardService = new ClinicalBoardService();