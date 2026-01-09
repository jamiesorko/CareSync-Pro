
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Universal Neural Translation
   * Bridges UI text to ANY language defined by the user.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following healthcare enterprise text to ${targetLanguage}: "${text}".
        
        Rules:
        - Output ONLY the translated text.
        - No quotes or conversational filler.
        - Maintain a professional, high-tech clinical tone.
        - If the target is a regional dialect, use local idioms.`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are a world-class professional translator for a global healthcare enterprise. You support all 7,000+ world languages and dialects."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[TRANSLATION_SIGNAL_LOST]:", error);
      return text; // Fallback to original text on failure
    }
  }
}

export const translationService = new TranslationService();
