
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v14.0
   * Specialized for Total UI Coverage (Clinical + Fiscal + Technical).
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
        contents: `Localize the following UI value for a high-tech healthcare ERP into ${targetLanguage}: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the translated result. No talk or quotes.
        2. NUMBERS: Format decimals and thousands separators correctly for ${targetLanguage} (e.g., 1,000.50 -> 1.000,50).
        3. CURRENCY: Position symbols correctly for the locale (e.g., 100 € instead of €100 if applicable).
        4. TECHNICAL: If the input is a key like "OPS_DASHBOARD", convert it to a natural professional phrase in ${targetLanguage}.
        5. CLINICAL: Use formal hospital terminology relevant to that region.
        6. PERCENTAGES: Ensure % placement is correct for the region.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary UI localization engine for CareSync Pro. Absolute precision in cultural, numeric, and clinical formatting is mandatory."
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
