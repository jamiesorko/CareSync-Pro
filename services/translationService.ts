
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector v7.0
   * Specialized for Total UI Coverage including Numbers and Symbols.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate to ${targetLanguage}. 
        VALUE: "${text}"
        
        MANDATORY LOCALIZATION RULES:
        1. Output ONLY the translated string.
        2. NUMBERS/UNITS: Change decimal separators (e.g. . to ,) and thousand separators (e.g. , to space/dot) to match ${targetLanguage} standards.
        3. CURRENCY: Position the "$" correctly or replace with local symbol if text implies a price.
        4. DATES/TIME: Convert "08:00 AM" or "2025-10-15" to local format.
        5. PERCENT: Ensure "%" is positioned correctly.
        6. NOUNS: Keep clinical roles (RN, PSW, CEO) formal.
        7. If the input is a name like "Robert Johnson", transliterate it if appropriate for ${targetLanguage}, otherwise keep as is.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary UI localization engine for CareSync Pro. Every string, number, and unit must be culturally accurate for the target language."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_SYNC_ERROR]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
