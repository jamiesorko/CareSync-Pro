
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector v10.0
   * Specialized for Total UI Coverage including Numbers, Currencies, and Units.
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
        contents: `Localize the following healthcare UI value for ${targetLanguage}: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the localized result. No explanations.
        2. NUMBERS: Format decimals and thousands separators (e.g., 1,000.50 -> 1.000,50) according to ${targetLanguage} regional standards.
        3. CURRENCY: Position the "$" or local symbol correctly (e.g., "100 €" vs "$100").
        4. DATES/TIME: Convert formats to local standards (e.g., DD/MM/YYYY).
        5. UNITS: Localize "h" (hours), "min" (minutes), and "%" if necessary.
        6. FORMALITY: Use high-tech, institutional healthcare terminology.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are a professional clinical localization engine. Precision in numeric and cultural formatting is mandatory."
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
