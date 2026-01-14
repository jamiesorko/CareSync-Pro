
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector
   * Specialized for Clinical, Fiscal, and Operational healthcare terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a world-class clinical enterprise linguist. Translate this specific software UI string into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        STRICT OPERATIONAL RULES:
        1. Output ONLY the translated string. No conversational filler, no quotes.
        2. DO NOT SKIP technical phrases or proper clinical nouns like "Complex Wound Care", "Director of Care", or "Fiscal Ledger".
        3. Professional Tone: Use formal, institutional language suitable for a hospital or healthcare agency.
        4. Consistency: Roles like "PSW" should be translated to their local professional equivalent (e.g., "Aide Soignant" for French, "PCP" for Spanish).`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary linguistic node for CareSync Pro. Absolute precision and professional tone are mandatory for clinician safety."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_DESYNC]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
