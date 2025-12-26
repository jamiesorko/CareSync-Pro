import { geminiService } from './geminiService'
import { Client, ClinicalBoardReview } from '../types'

export class ClinicalBoardService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Simulates a 3-agent debate (DOC, RN, Ethicist) on a complex patient case.
   */
  async conductBoardReview(client: Client, rawHistory: string[]): Promise<ClinicalBoardReview> {
    console.log(`[NEURAL_BOARD]: Initializing multi-agent debate for ${client.name}`);
    
    const prompt = `
      Case: ${client.name} (Conditions: ${client.conditions.join(', ')})
      History: ${rawHistory.join(' | ')}
      
      Task: Provide a Board Review from three personas:
      1. Director of Care (Strategy/Risk)
      2. Registered Nurse (Clinical/Practical)
      3. Medical Ethicist (Autonomy/Rights)
      
      Return JSON: {
        "summary": "string",
        "perspectives": [ { "role": "DOC|RN|ETHICIST", "assessment": "string", "concerns": [], "directive": "string" } ],
        "consensus": "string"
      }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        clientId: client.id,
        timestamp: new Date().toISOString(),
        caseSummary: data.summary || "Case review initialized.",
        perspectives: data.perspectives || [],
        consensusPlan: data.consensus || "Maintain current care vector."
      };
    } catch (e) {
      return {
        clientId: client.id,
        timestamp: new Date().toISOString(),
        caseSummary: "Board review failure.",
        perspectives: [],
        consensusPlan: "Consult human supervisor immediately."
      };
    }
  }
}

export const clinicalBoardService = new ClinicalBoardService();