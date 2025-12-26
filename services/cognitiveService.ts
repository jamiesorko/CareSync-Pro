import { GoogleGenAI } from "@google/genai";
import { Client } from '../types';

export interface CognitivePulse {
  clientId: string;
  driftScore: number;
  attrition: string[];
  window: string;
  reminiscence: string;
}

export class CognitiveService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async calculateCognitiveDrift(client: Client, history: string[]): Promise<CognitivePulse> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `
      Act as a Forensic Neuropsychologist.
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Notes: ${JSON.stringify(history)}
      
      Task: Perform Linguistic Attrition Analysis.
      1. Identify 3 vocabulary items fading.
      2. Calculate Drift Score (0-100).
      3. Predict next 24h confusion window.
      4. Forge a Veo prompt for calming reminiscence.
      
      Return JSON: { "drift": number, "attrition": [], "window": "", "reminiscence": "" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 20000 } 
        }
      });
      const data = JSON.parse(response.text || '{}');
      return {
        clientId: client.id,
        driftScore: data.drift || 0,
        attrition: data.attrition || [],
        window: data.window || "Stable",
        reminiscence: data.reminiscence || "A quiet 1950s park."
      };
    } catch (e) {
      throw e;
    }
  }
}

export const cognitiveService = new CognitiveService();