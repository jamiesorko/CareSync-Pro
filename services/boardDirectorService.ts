import { GoogleGenAI } from "@google/genai";
import { ChairmanMandate } from '../types';

export class BoardDirectorService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async synthesizeMandate(agencyMetrics: any, region: string): Promise<ChairmanMandate> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const query = `Healthcare labor market trends in ${region}, Ontario October 2025.`;
    
    const prompt = `
      Act as Board Chairman. Agency Stats: ${JSON.stringify(agencyMetrics)}. Region: ${region}.
      Task: Institutional Audit.
      1. State of Agency.
      2. 3 Fragility Points.
      3. 3 Directives.
      4. Risk Index (0-100).
      Return JSON: { "state": "", "fragility": [], "directives": [], "risk": number, "sentiment": "" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 24576 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        timestamp: new Date().toISOString(),
        stateOfAgency: data.state || "Stable baseline.",
        institutionalFragilityPoints: data.fragility || [],
        nonNegotiableDirectives: data.directives || [],
        strategicRiskIndex: data.risk || 0,
        marketSentimentGrounded: data.sentiment || "Stable outlook."
      };
    } catch (e) {
      return {
        id: 'error-mandate',
        companyId: 'csp-demo',
        timestamp: new Date().toISOString(),
        stateOfAgency: "Synthesis failed.",
        institutionalFragilityPoints: [],
        nonNegotiableDirectives: [],
        strategicRiskIndex: 0,
        marketSentimentGrounded: "Signal lost."
      };
    }
  }
}

export const boardDirectorService = new BoardDirectorService();