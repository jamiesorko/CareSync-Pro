
import { GoogleGenAI } from "@google/genai";
import { EthicsConsult, Client } from '../types';

export class EthicsAdvisoryService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async consultEthics(client: Client, dilemma: string): Promise<EthicsConsult> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Bio-Ethicist. Dilemma: "${dilemma}". JSON: { "conflict": "", "perspectives": [], "directive": "", "guardrail": "" }`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 15000 } 
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        // Changed timestamp to createdAt to comply with BaseEntity interface
        createdAt: new Date().toISOString(),
        dilemma,
        moralConflict: data.conflict || "Conflict detected.",
        stakeholderPerspectives: data.perspectives || [],
        consensusDirective: data.directive || "Maintain baseline.",
        legislativeGuardrail: data.guardrail || "Standard standards."
      };
    } catch (e) {
      return {
        id: 'err-ethics-adv',
        companyId: 'csp-demo',
        // Changed timestamp to createdAt to comply with BaseEntity interface
        createdAt: new Date().toISOString(),
        dilemma,
        moralConflict: "Error.",
        stakeholderPerspectives: [],
        consensusDirective: "Consult DOC.",
        legislativeGuardrail: "N/A"
      };
    }
  }
}

export const ethicsAdvisoryService = new EthicsAdvisoryService();