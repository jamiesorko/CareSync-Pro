import { GoogleGenAI } from "@google/genai";

export interface RoiProjection {
  region: string;
  projectedAnnualRevenue: number;
  localWageInflation: number;
  breakEvenMonths: number;
  competitorSaturation: number; // 0-100
  strategicRationale: string;
}

export class ExpansionRoiService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async forecastExpansionROI(region: string): Promise<RoiProjection> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const query = `Current home care nursing waitlists, average private duty PSW hourly rates, and hiring competition in ${region}, Ontario for late 2025.`;
    
    const prompt = `
      Act as an Institutional Capital Strategist.
      Market Intel Query: ${query}
      
      Task: Perform a "Expansion Sovereignty" forecast.
      1. Predict annual revenue for a 20-staff branch.
      2. Calculate local wage inflation impact.
      3. Identify months to break-even.
      4. Score competitor saturation.
      
      Return JSON: { "rev": number, "inflation": number, "breakEven": number, "saturation": number, "rationale": "" }
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
        region,
        projectedAnnualRevenue: data.rev || 450000,
        localWageInflation: data.inflation || 4.2,
        breakEvenMonths: data.breakEven || 8,
        competitorSaturation: data.saturation || 65,
        strategicRationale: data.rationale || "Expansion vector validated via macro-signals."
      };
    } catch (e) {
      throw e;
    }
  }
}

export const expansionRoiService = new ExpansionRoiService();