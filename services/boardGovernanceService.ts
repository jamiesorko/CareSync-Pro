
import { GoogleGenAI } from "@google/genai";
import { ChairmanMandate } from '../types';

export class BoardGovernanceService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async synthesizeInstitutionalVitality(metrics: any): Promise<ChairmanMandate> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const prompt = `
      Act as Board Chairman. Stats: ${JSON.stringify(metrics)}.
      Task: Vitality Synthesis.
      Return JSON: { "risk": number, "fragility": [], "directives": [], "sentiment": "" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 15000 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        stateOfAgency: "Synthesis complete.",
        institutionalFragilityPoints: data.fragility || [],
        nonNegotiableDirectives: data.directives || [],
        strategicRiskIndex: data.risk || 0,
        marketSentimentGrounded: data.sentiment || "Nominal."
      };
    } catch (e) {
      return {
        id: 'error-vitality',
        companyId: 'csp-demo',
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        stateOfAgency: "Synthesis interrupted.",
        institutionalFragilityPoints: [],
        nonNegotiableDirectives: [],
        strategicRiskIndex: 0,
        marketSentimentGrounded: "Unknown."
      };
    }
  }
}

export const boardGovernanceService = new BoardGovernanceService();
