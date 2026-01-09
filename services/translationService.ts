
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Translates any UI string or data attribute into any human language or dialect.
   * Optimized for high-velocity institutional terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following healthcare institutional UI text into the language/dialect: "${targetLanguage}".
        
        Text: "${text}"
        
        Rules:
        - Output ONLY the translated string.
        - No conversational filler.
        - Support all regional dialects and scripts (Cyrillic, Kanji, Arabic, etc).
        - Maintain a formal, high-tech clinical tone.`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are the CareSync Universal Translator. You bridge all human communication vectors."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_ERROR]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
