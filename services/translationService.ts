
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
        contents: `Act as a master institutional healthcare linguist. Translate the following text into exactly the language/dialect: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Specific Rules:
        - Output ONLY the translated string.
        - No meta-talk, quotes, or explanations.
        - Support technical healthcare terms (e.g. Geofence, Biometric, Ledger).
        - Use the formal, professional institutional variant of the target language.
        - Handle scripts like Arabic, Kanji, Cyrillic, and Devanagari natively.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the CareSync Universal Translator Node. Accuracy and formal tone are your primary objectives."
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
