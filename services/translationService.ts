
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Deep Neural Translation Vector v5.0
   * Specialized for Clinical, Fiscal, and Cultural formatting.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a world-class localized clinical enterprise linguist for ${targetLanguage}. 
        
        SOURCE TEXT: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the translated string. No quotes or filler.
        2. NUMBERS: Localize numerical formats (thousands separators, decimals) to ${targetLanguage} standards.
        3. CURRENCY: Localize the "$" symbol or equivalent (e.g., use "€" or "₹" if and only if appropriate for the region, otherwise maintain currency context but localize the numeric placement).
        4. DATES/TIME: Convert formats (e.g., "10:15 AM" or "2025-10-15") to the standard local representation.
        5. CLINICAL NOUNS: Do not simplify technical terms. Use the formal professional equivalent used in ${targetLanguage} hospitals.
        6. ACRONYMS: Maintain professional acronyms (RN, PSW, RPN) unless a widely used local equivalent exists.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary linguistic node for CareSync Pro. Absolute precision, professional tone, and numerical localization are mandatory."
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
