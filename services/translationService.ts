import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v19.0
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
        contents: `Localize this healthcare UI value into ${targetLanguage}: "${text}"
        
        CRITICAL FORMATTING RULES:
        1. Output ONLY the localized result.
        2. NUMBERS: Use the correct decimal and thousands separators for ${targetLanguage}. 
           - Example (English to French/German): "1,234.56" -> "1.234,56"
        3. CURRENCY: Move symbols ($/€/£) to the correct position.
           - Example (English to French): "$100.00" -> "100,00 $"
        4. PERCENTAGES: Adjust spacing and punctuation.
           - Example (English to German): "98.4%" -> "98,4 %"
        5. KEYS: Technical keys like "FLEET_VELOCITY" must be translated into professional healthcare terms.
        6. DO NOT translate proper names.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary locale formatting engine for CareSync Pro. Precision in regional punctuation and currency placement is your highest priority."
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