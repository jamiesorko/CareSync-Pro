
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  /**
   * Universal Neural Translation Vector
   * Enforces absolute accuracy for medical designations and geographic sector names.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master clinical ERP linguist. Translate this healthcare UI text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Rules:
        1. Output ONLY the translated string.
        2. Tone: Formal, Institutional.
        3. Medical Accuracy: Maintain professional medical roles (PSW, RN, DOC) and clinical conditions.
        4. Consistency: If the text is a geographic sector or tech term like 'Geofence', provide the formal local equivalent.`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are the primary internationalization engine for CareSync Pro. Precision is mandatory."
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
