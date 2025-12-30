import { GoogleGenAI } from "@google/genai";
import { RegulatoryPatch } from '../types';

export class RegulatoryArbitrageService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async interceptNewDirectives(region: string): Promise<RegulatoryPatch[]> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Regulatory Officer. Region: ${region}. JSON: { "law": "", "affected": [], "draft": "", "deadline": "" }`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json" 
        }
      });

      const data = JSON.parse(response.text || '{}');
      return [{
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        newLawReference: data.law || "New Mandate",
        affectedSOPs: data.affected || [],
        autoDraftedRevision: data.draft || "Drafting...",
        complianceDeadline: data.deadline || "TBD"
      }];
    } catch (e) {
      return [];
    }
  }
}

export const regulatoryArbitrageService = new RegulatoryArbitrageService();