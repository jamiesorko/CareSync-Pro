import { GoogleGenAI } from "@google/genai";
import { StaffMember, Client } from '../types';

export interface RapportPulse {
  score: number; // 0-100
  dominantEmotion: string;
  isClashRisk: boolean;
  strategicInsight: string;
}

export class RapportAnalyticsService {
  /**
   * Correlates visit feedback and voice-sentiment to predict long-term partnership stability.
   */
  async computeRapport(staff: StaffMember, client: Client, dataPoints: string[]): Promise<RapportPulse> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as a Lead Behavioral Psychologist for a Health Agency.
      Professional: ${staff.name} (${staff.role})
      Patient: ${client.name}
      Interaction Logs: "${dataPoints.join(' | ')}"
      
      Task: Calculate "Neural Rapport Score".
      Identify: Signs of professional friction, personality clash, or exceptional empathy.
      Return JSON: { "score": number, "emotion": "string", "risk": boolean, "insight": "string" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        score: data.score || 85,
        dominantEmotion: data.emotion || 'Professional Harmony',
        isClashRisk: !!data.risk,
        strategicInsight: data.insight || "Maintain existing roster alignment."
      };
    } catch (e) {
      return { score: 75, dominantEmotion: 'Neutral', isClashRisk: false, strategicInsight: "Insufficient signal." };
    }
  }
}

export const rapportAnalyticsService = new RapportAnalyticsService();