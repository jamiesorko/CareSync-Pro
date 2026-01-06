
import { GoogleGenAI } from "@google/genai";
import { Client, EthicsConsult } from '../types';

export class ClinicalEthicsAdvisoryService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async arbitrateDilemma(client: Client, scenario: string): Promise<EthicsConsult> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Bio-Ethicist. Patient: ${client.name}. Scenario: "${scenario}". JSON: { "conflict": "", "perspectives": [], "directive": "", "guardrail": "" }`;

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
        dilemma: scenario,
        moralConflict: data.conflict || "Conflict found.",
        stakeholderPerspectives: data.perspectives || [],
        consensusDirective: data.directive || "Standard protocol.",
        legislativeGuardrail: data.guardrail || "Health Care Consent Act."
      };
    } catch (e) {
      return {
        id: 'err-ethics',
        companyId: 'csp-demo',
        // Changed timestamp to createdAt to comply with BaseEntity interface
        createdAt: new Date().toISOString(),
        dilemma: scenario,
        moralConflict: "Error.",
        stakeholderPerspectives: [],
        consensusDirective: "Manual audit.",
        legislativeGuardrail: "N/A"
      };
    }
  }
}

export const clinicalEthicsAdvisoryService = new ClinicalEthicsAdvisoryService();