
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following healthcare enterprise UI text precisely to ${targetLanguage}: "${text}".
        
        Rules:
        - Output ONLY the translated text.
        - No quotes, no explanations.
        - Maintain the professional, high-tech tone of a medical ERP.
        - If the target is a specific regional dialect, prioritize local terminology.`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are a world-class professional translator for a global healthcare enterprise."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_ERROR]:", error);
      return text; // Fallback to original text on failure
    }
  }
}

export const translationService = new TranslationService();
