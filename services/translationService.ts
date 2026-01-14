
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector
   * Optimized for high-fidelity clinical and fiscal terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as the primary linguistic core for CareSync Pro. Translate this UI text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        STRICT RULES:
        1. Output ONLY the translated string. No quotes, no markdown, no conversational filler.
        2. DO NOT SKIP: Even if the text looks like code or an ID (e.g., 'FISCAL_LEDGER'), translate it into its natural professional equivalent.
        3. Medical/Fiscal Context: Use formal, institutional terminology suitable for a healthcare ERP.
        4. Consistency: Roles like PSW, RN, and DOC should be translated to their local professional equivalents.`,
        config: { 
          temperature: 0.0, // High determinism
          systemInstruction: "You are a professional enterprise translator. Accuracy and professional tone are mandatory for patient safety."
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
