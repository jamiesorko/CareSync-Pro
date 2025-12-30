import { GoogleGenAI } from "@google/genai";
import { Client, NexusConsensus } from '../types';

export class ClinicalInterdisciplinaryService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async synthesizeConsensus(client: Client, rawInputs: { role: string; note: string }[]): Promise<NexusConsensus> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Case Manager. Context: ${JSON.stringify(rawInputs)}. JSON: { "directives": [], "vector": "", "alert": "", "score": number }`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 10000 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        clientId: client.id,
        specialistInputs: data.directives || [],
        unifiedCareVector: data.vector || "Stabilize.",
        criticalSynergyAlert: data.alert || null,
        consensusScore: data.score || 0
      };
    } catch (e) {
      return {
        id: 'err-nexus',
        companyId: 'csp-demo',
        clientId: client.id,
        specialistInputs: [],
        unifiedCareVector: "Manual review.",
        criticalSynergyAlert: null,
        consensusScore: 0
      };
    }
  }
}

export const clinicalInterdisciplinaryService = new ClinicalInterdisciplinaryService();