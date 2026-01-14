
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector
   * Optimized for zero-skip localization of healthcare software.
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
        1. Output ONLY the translated string. No quotes, no markdown, no explanations.
        2. NO SKIP: Even if a word looks like a technical ID or a proper noun, translate it into its natural language equivalent in the target language.
        3. Medical Accuracy: Maintain professional equivalents for clinical terms (e.g. "Complex Wound Care", "Dementia", "PSW").
        4. Tone: Formal, institutional, professional.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary linguistic engine for CareSync Pro. Absolute accuracy and professional tone are mandatory."
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
