
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector
   * Enforces 100% localization for healthcare enterprise software.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master clinical ERP linguist. Translate this healthcare software UI text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        STRICT RULES:
        1. Output ONLY the translated string. NO quotes, NO meta-talk, NO formatting.
        2. NO SKIP: Even if a word looks like code or a technical key, translate it into its natural language equivalent in the target language.
        3. Medical Precision: Maintain exact professional equivalents for roles (PSW, RN, RPN, DOC) and specific clinical conditions.
        4. Tone: Formal, institutional, professional.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary linguistic core for CareSync Pro. Every string must be professionally localized for patient safety and operational clarity."
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
