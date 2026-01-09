import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Universal Neural Translation Vector
   * Bridges UI text to ANY language defined by the user.
   */
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
        - No quotes, no conversational filler, no explanations.
        - Maintain a professional, high-fidelity clinical tone.
        - If the target is an obscure regional dialect, use the most common local phonetic equivalent.`,
        config: { 
          temperature: 0.1,
          systemInstruction: "You are a world-class professional translator for a global healthcare enterprise. You support all 7,100+ known human languages and dialects."
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