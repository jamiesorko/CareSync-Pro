
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  // Initialize AI client. Key is obtained from the environment as per guidelines.
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  /**
   * Universal Neural Translation Vector
   * Optimized for formal healthcare terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following clinical/business text into ${targetLanguage}: "${text}"
        
        Mandatory Rules:
        1. Output ONLY the translated string. Do not include quotes or explanations.
        2. Tone: Formal, Institutional, High-tech Healthcare ERP.
        3. Professional Roles: "PSW", "RN", "RPN", "DOC", "CEO", "HSS" must remain as their professional localized equivalents.
        4. Consistency: Ensure technical terms like "Geofence", "Roster", or "Telemetry" are translated consistently.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary translation engine for CareSync Pro, a world-class healthcare ERP. Precision is vital."
        }
      });

      const translatedText = response.text?.trim();
      return translatedText || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_SIGNAL_LOST]:", error);
      return text; // Graceful fallback to source text
    }
  }
}

export const translationService = new TranslationService();
