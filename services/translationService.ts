import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v22.0
   * Specialized for Total UI Coverage & Eastern Arabic Digit Script.
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
        
        STRICT FORMATTING RULES:
        1. Output ONLY the localized result. No conversational text.
        2. ARABIC DIGITS: If target is Arabic, you MUST convert 0123456789 into ٠١٢٣٤٥٦٧٨٩.
           Example: "98.4%" -> "٩٨,٤٪"
        3. NUMBERS: Apply correct decimal/thousands separators for ${targetLanguage}.
           Example (to French/German): "1,234.56" -> "1.234,56"
        4. CURRENCY: Move symbols ($/€/£/%) to the culturally correct position.
           Example (to French): "$100.00" -> "100,00 $"
        5. ABBREVIATIONS: Translate units like "HRS", "Units", "mins".
        6. TECHNICAL: Technical keys like "AGENCY_HEALTH" should be translated into professional terms.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary localization engine for CareSync Pro. Your mission is 100% cultural and numeric accuracy in every string provided."
        }
      });

      return response.text?.trim() || text;

    } catch (error: any) {
      if (attempt < 2 && (error?.status === 429)) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.translate(text, targetLanguage, attempt + 1);
      }
      console.error("[LOCALIZATION_FAILURE]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();