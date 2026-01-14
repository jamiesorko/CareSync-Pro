
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  /**
   * Universal Neural Translation Vector
   * Refined for high-fidelity healthcare enterprise terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master clinical ERP linguist. Translate this healthcare software text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Mandatory Guidelines:
        1. Output ONLY the translated string. No explanations, quotes, or formatting.
        2. Tone: Formal, Institutional, Enterprise Healthcare.
        3. Terminology: Maintain medical accuracy for roles (PSW, RN, DOC, RPN), sectors, and clinical conditions.
        4. Technical Integrity: Use professional local equivalents for terms like "Geofence", "Telemetry", "Dossier", "Roster", and "Disbursement".`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are the primary internationalization core for CareSync Pro. Absolute precision in professional medical designations is required."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_SIGNAL_LOST]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
