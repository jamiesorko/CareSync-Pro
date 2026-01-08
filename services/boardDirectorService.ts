
import { GoogleGenAI } from "@google/genai";
import { ChairmanMandate } from '../types';

export class BoardDirectorService {
  async synthesizeMandate(metrics: any, region: string): Promise<ChairmanMandate> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
      Act as Board Chairman. Agency Stats: ${JSON.stringify(metrics)}. Region: ${region}.
      Task: Institutional Audit. Identify state of agency, 3 fragility points, and non-negotiable directives.
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
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        stateOfAgency: data.state || "Stable.",
        institutionalFragilityPoints: data.fragility || [],
        nonNegotiableDirectives: data.directives || [],
        strategicRiskIndex: data.risk || 0,
        marketSentimentGrounded: data.sentiment || "Nominal."
      };
    } catch (e) {
      throw e;
    }
  }
}

export const boardDirectorService = new BoardDirectorService();
