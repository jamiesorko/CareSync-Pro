import { GoogleGenAI, Type } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Core v27.0
   * FORCES 100% SCRIPT PARITY INCLUDING DIGITS.
   */
  async translateBatch(strings: string[], targetLanguage: string): Promise<Record<string, string>> {
    const cleanStrings = Array.from(new Set(strings.filter(s => s && s.trim().length > 0)));
    if (cleanStrings.length === 0 || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return Object.fromEntries(cleanStrings.map(s => [s, s]));
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `LOCALIZE_DICTIONARY: ${JSON.stringify(cleanStrings)} TO "${targetLanguage}"`,
        config: { 
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: Object.fromEntries(cleanStrings.map(s => [s, { type: Type.STRING }]))
          },
          systemInstruction: `You are the CareSync Core Translation Engine. 
          
          MANDATORY RULES:
          1. SCRIPT CONVERSION: If target is Arabic, you MUST convert all Western digits (0123456789) to Eastern Arabic digits (٠١٢٣٤٥٦٧٨٩).
          2. UNITS: Translate "h", "hrs", "units", "%", "$".
          3. NO SKIPPING: You must provide a translation for every single key provided.
          4. CONTEXT: This is a medical ERP. "Ops" is Operations, "Ledger" is Financial.
          5. NUMBERS: "98.4%" in Arabic becomes "٩٨,٤٪".`
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("[NEURAL_ERROR]:", error);
      return Object.fromEntries(cleanStrings.map(s => [s, s]));
    }
  }

  async translateSingle(text: string, targetLanguage: string): Promise<string> {
    const map = await this.translateBatch([text], targetLanguage);
    return map[text] || text;
  }
}

export const translationService = new TranslationService();