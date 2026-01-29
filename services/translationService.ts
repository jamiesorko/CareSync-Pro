import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v16.0
   * Specialized for Total UI Coverage including Clinical, Fiscal, and Data leaf-nodes.
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
        contents: `Localize the following value into ${targetLanguage}: "${text}"
        
        RULES:
        1. Output ONLY the localized result. 
        2. NUMBERS: Use the correct decimal and thousands separators for ${targetLanguage} (e.g., 1.5 -> 1,5).
        3. CURRENCY/PERCENT: Position symbols correctly ($100 or 100 €).
        4. KEYS: If the text is a technical key like "FLEET_VELOCITY", translate it into a professional healthcare term in ${targetLanguage}.
        5. DO NOT translate proper names unless they have a standard equivalent.`,
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
      return text; 
    }
  }
}

export const translationService = new TranslationService();