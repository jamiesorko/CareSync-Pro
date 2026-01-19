import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Translation Vector v11.0
   * Specialized for Total UI Sovereignty (Clinical + Fiscal + Technical).
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
        contents: `Localize the following value for a high-tech healthcare ERP into ${targetLanguage}: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the translated result.
        2. NUMBERS: Format decimals and thousands separators according to ${targetLanguage} standards (e.g. 1,000.50 -> 1.000,50).
        3. CURRENCY: Position currency symbols correctly ($100 or 100€).
        4. CLINICAL: Use formal hospital terminology for that region.
        5. KEYS: If input is a technical key like "FLEET_VELOCITY", convert to a natural, professional phrase in ${targetLanguage}.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary UI localization engine for CareSync Pro. Absolute precision in clinical and numeric formatting is mandatory."
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