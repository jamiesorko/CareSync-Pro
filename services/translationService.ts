
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Translation Vector v6.0
   * Specialized for Clinical, Fiscal, and Numerical localization.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a world-class clinical enterprise linguist for ${targetLanguage}. 
        
        SOURCE: "${text}"
        
        STRICT RULES:
        1. Output ONLY the translated result.
        2. NUMBERS: Localize decimal points (e.g., . to ,) and thousands separators (e.g., , to space) for ${targetLanguage}.
        3. CURRENCY: Localize the "$" symbol position and numeric format (e.g., "100 $" vs "$100").
        4. DATES: Convert to ${targetLanguage} standard (e.g., DD/MM/YYYY).
        5. CLINICAL: Use professional medical terminology used in ${targetLanguage} hospitals.
        6. If the input is just a number, format it correctly for the region.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization node for CareSync Pro. Precision in numeric and clinical translation is non-negotiable."
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
