
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Translation Vector v9.0
   * Specialized for Total UI Sovereignty (Text + Numbers + Currency).
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) return text;

      // Initialize fresh to ensure latest API key context
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Localize the following value for a professional healthcare app in ${targetLanguage}: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the localized result.
        2. NUMBERS: Format decimals and thousands separators (e.g., 1,000.50 -> 1.000,50) according to ${targetLanguage} standards.
        3. CURRENCY: Position the "$" or local symbol correctly.
        4. DATES/TIME: Convert to local standard (e.g., DD/MM/YYYY).
        5. UNITS: Localize "h" (hours), "min" (minutes), and "Units".
        6. TERMS: Use formal clinical/administrative terminology used in ${targetLanguage} hospitals.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary UI localization engine for CareSync Pro. Precision in numeric and clinical formatting is required."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_SYNC_ERROR]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
