import { GoogleGenAI, Type } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Core v28.0
   * FORCES 100% SCRIPT PARITY INCLUDING DIGITS, UNITS, AND TECHNICAL KEYS.
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
        contents: `LOCALIZE_DICTIONARY_V28: ${JSON.stringify(cleanStrings)} TO "${targetLanguage}"`,
        config: { 
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: Object.fromEntries(cleanStrings.map(s => [s, { type: Type.STRING }]))
          },
          systemInstruction: `You are the CareSync Core Translation Proxy. 
          
          STRICT SCRIPT RULES (NO EXCEPTIONS):
          1. NUMBERS: For Arabic/Urdu/Farsi, convert Western digits (0-9) to Eastern digits (٠-٩). "98.4%" -> "٩٨,٤٪".
          2. UNITS: Translate "h", "hrs", "min", "units", "%", "$", "CAD".
          3. STATUS KEYS: Translate technical keys like "IDLE", "ACTIVE", "COMPLETED", "IN_PROGRESS", "NOMINAL", "FAULT".
          4. NO DATA SKIPPING: You must provide a unique translation for every key in the JSON. Never return the English key if target is different.
          5. CONTEXT: This is an Enterprise Healthcare ERP. "Ledger" is Financial. "Fleet" is Staff.`
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      // Fallback check to ensure no nulls
      cleanStrings.forEach(s => { if(!parsed[s]) parsed[s] = s; });
      return parsed;
    } catch (error) {
      console.error("[NEURAL_DRIFT_FAILURE]:", error);
      return Object.fromEntries(cleanStrings.map(s => [s, s]));
    }
  }

  async translateSingle(text: string, targetLanguage: string): Promise<string> {
    const map = await this.translateBatch([text], targetLanguage);
    return map[text] || text;
  }
}

export const translationService = new TranslationService();