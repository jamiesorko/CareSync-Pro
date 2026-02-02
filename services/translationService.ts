import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v21.0
   * Specialized for Absolute Numeric & Digit Script Parity.
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
        
        STRICT RULES:
        1. Output ONLY the localized result. No conversational text.
        2. DIGIT SCRIPT: If target is Arabic, you MUST convert Western digits (0-9) to Eastern Arabic digits (٠-٩). 
           Example: "98.4%" -> "٩٨,٤٪"
        3. NUMERIC PUNCTUATION: Use correct decimal/thousands separators for ${targetLanguage}.
           Example (to French/German): "1,234.56" -> "1.234,56"
        4. CURRENCY/SYMBOLS: Move symbols ($/€/£/%) to the correct regional position and adjust spacing.
        5. UNITS: Translate units like "HRS", "Units", "mins" into ${targetLanguage}.
        6. DO NOT translate technical IDs like "C401" or "PR-2025".`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the CareSync Pro localization engine. Your primary duty is total cultural accuracy of text, numbers, and digits."
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