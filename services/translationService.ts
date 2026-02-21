import { GoogleGenAI, Type } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v26.0
   * MANDATORY: Batch Processing & Unit Parity.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') return text;
    
    // Fallback to batch-ready single translation
    const results = await this.translateMap([text], targetLanguage);
    return results[text] || text;
  }

  async translateMap(strings: string[], targetLanguage: string): Promise<Record<string, string>> {
    const cleanStrings = Array.from(new Set(strings.filter(s => s && s.trim().length > 0)));
    if (cleanStrings.length === 0 || targetLanguage.toLowerCase() === 'english') {
      return Object.fromEntries(cleanStrings.map(s => [s, s]));
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `LOCALIZE_MAP: ${JSON.stringify(cleanStrings)} TO "${targetLanguage}"`,
        config: { 
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: Object.fromEntries(cleanStrings.map(s => [s, { type: Type.STRING }]))
          },
          systemInstruction: `You are the CareSync Localization Proxy. 
          
          STRICT RULES:
          1. SCRIPT: In Arabic, convert all Western digits (0-9) to Eastern Arabic digits (٠-٩).
          2. UNITS: Translate "h", "hrs", "min", "units", "%".
          3. SYMBOLS: Re-position currency symbols ($) per ${targetLanguage} rules.
          4. STATUS: Translate keys like "IDLE", "ACTIVE", "COMPLETED", "IN_PROGRESS".
          5. NO DATA SKIPPING: Every key in the JSON must be translated.`
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("[NEURAL_DRIFT]:", error);
      return Object.fromEntries(cleanStrings.map(s => [s, s]));
    }
  }
}

export const translationService = new TranslationService();