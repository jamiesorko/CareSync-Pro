
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  /**
   * Universal Neural Translation Vector
   * Refined for institutional accuracy in roles, sectors, and technical UI terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master medical ERP linguist. Translate this clinical UI text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Mandatory Guidelines:
        1. Output ONLY the translated string. No explanations or quotes.
        2. Tone: Formal, Institutional Healthcare.
        3. Terminology: Use professional medical designations for roles (e.g., PSW, RN, DOC) and maintain geographic accuracy for sector names.
        4. Technical Terms: "Geofence", "Trajectory", "Acuity", "Telemetry" must be localized into their formal enterprise healthcare equivalents.
        5. Consistency: If the text is a single word or short phrase, translate it with its UI context in mind.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary translation engine for CareSync Pro. Precision in clinical and executive terminology is mandatory."
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
