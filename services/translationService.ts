import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v23.0
   * Specialized for 100% UI Coverage, Numeric Scripting, and Fiscal Formatting.
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
        contents: `Localize this UI value into ${targetLanguage}: "${text}"
        
        STRICT FORMATTING RULES:
        1. Output ONLY the localized result. No conversational filler or explanations.
        2. DIGIT SCRIPT: If target is Arabic, you MUST convert ALL Western digits (0123456789) to Eastern Arabic digits (٠١٢٣٤٥٦٧٨٩).
           Example: "98.4%" -> "٩٨,٤٪"
        3. NUMERICS: Use regional punctuation (e.g., swap dots and commas if required by ${targetLanguage} standards).
        4. SYMBOLS: Move % and currency symbols ($/€/£) to the correct regional position. 
           Example (to French): "$14,204.00" -> "14 204,00 $"
        5. TECHNICAL KEYS: If the input is "AGENCY_HEALTH", translate it to a professional, title-cased term.
        6. UNITS: Translate "HRS", "Units", "mins", "h".`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization engine. You must ensure 100% cultural, numeric, and script accuracy for every string provided."
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