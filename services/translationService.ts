
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v17.0
   * Specialized for Total UI Coverage (Data + Labels + Numbers).
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
        contents: `Localize the following professional UI value for a healthcare enterprise into ${targetLanguage}: "${text}"
        
        CRITICAL RULES:
        1. Output ONLY the localized result. No talk.
        2. NUMBERS: Use the decimal and thousands separators specific to ${targetLanguage} (e.g., 1,000.50 -> 1.000,50).
        3. SYMBOLS: Position % and currency symbols ($/€) as per local convention.
        4. KEYS: If the input is a technical key like "OPS_DASHBOARD", translate it into a professional term.
        5. DO NOT translate proper names if they are already in a universal format, but format the rest of the string.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization engine for CareSync Pro. Precision in cultural, numeric, and medical formatting is mandatory."
        }
      });

      return response.text?.trim() || text;

    } catch (error: any) {
      if (attempt < 2 && (error?.status === 429)) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.translate(text, targetLanguage, attempt + 1);
      }
      console.error("[NEURAL_LINGUIST_SIGNAL_LOST]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
