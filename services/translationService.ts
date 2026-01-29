
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v20.0
   * Specialized for Total UI Coverage including Numeric/Fiscal Formatting.
   */
  async translate(text: string, targetLanguage: string, attempt: number = 0): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const apiKey = process.env.API_KEY || "";
      if (!apiKey) return text;

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Localize this UI value for a healthcare application into ${targetLanguage}: "${text}"
        
        CRITICAL LOCALIZATION RULES:
        1. Output ONLY the localized result. No talk.
        2. NUMERIC FORMATTING: Apply the decimal and thousands separators of ${targetLanguage}. 
           (e.g., English "1,234.56" -> French/German "1.234,56").
        3. SYMBOL PLACEMENT: Move % and currency symbols ($/€/£) to the correct regional position. 
           (e.g., English "$100" -> French "100 $").
        4. MEASUREMENTS: Convert "10 hrs" or "5 mins" to the target language equivalents.
        5. TECHNICAL KEYS: If the input is "AGENCY_HEALTH", translate it to a professional term.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization engine. You must ensure 100% regional accuracy for text, numbers, and symbols."
        }
      });

      return response.text?.trim() || text;

    } catch (error: any) {
      if (attempt < 2 && (error?.status === 429)) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.translate(text, targetLanguage, attempt + 1);
      }
      console.error("[LOCALIZATION_SIGNAL_LOSS]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
