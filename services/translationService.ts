import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v24.0
   * MANDATORY: Digit script conversion and total UI parity.
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
        contents: `LOCALIZE this healthcare UI value into ${targetLanguage}: "${text}"
        
        CRITICAL FORMATTING DECREE:
        1. Output ONLY the localized result. 
        2. ARABIC SCRIPT: If target is Arabic, you MUST convert all Western digits (0-9) to Eastern Arabic digits (٠١٢٣٤٥٦٧٨٩). 
           Example: "98.4%" -> "٩٨,٤٪"
        3. PUNCTUATION: Swap dots and commas for European locales (e.g., 1.234,56).
        4. CURRENCY: Position symbols ($/€/£) and spaces exactly as required by ${targetLanguage} rules.
        5. KEYS: If input is snake_case (e.g., FISCAL_LEDGER), translate to professional Title Case in ${targetLanguage}.
        6. UNITS: Localize "h", "hrs", "mins", "units", "delta".`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization engine. Total accuracy of text, digits, and regional formatting is non-negotiable."
        }
      });

      return response.text?.trim() || text;

    } catch (error: any) {
      if (attempt < 2 && (error?.status === 429)) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.translate(text, targetLanguage, attempt + 1);
      }
      return text; 
    }
  }
}

export const translationService = new TranslationService();