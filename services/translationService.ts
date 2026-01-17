
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector v8.0
   * Specialized for Total UI Coverage including Numbers, Currencies, and Dates.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const apiKey = process.env.API_KEY || "";
      if (!apiKey) return text;

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following string or number to ${targetLanguage}: "${text}"
        
        MANDATORY LOCALIZATION RULES:
        1. Output ONLY the translated result. No explanations.
        2. NUMBERS: Use ${targetLanguage} specific digit symbols, thousands separators (e.g., . vs ,), and decimal points.
        3. CURRENCY: Position the "$" symbol or local equivalent correctly (e.g., "100 €" vs "$100").
        4. DATES/TIME: Convert formats to local standards (e.g., DD/MM/YYYY or specific script).
        5. CLINICAL NOUNS: Use formal professional terminology used in ${targetLanguage} medical institutions.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are a professional clinical localization engine. Precision in numeric and cultural formatting is required."
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
