import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v15.0
   * Specialized for Total UI Coverage with Rate-Limit Resilience.
   */
  async translate(text: string, targetLanguage: string, attempt: number = 0): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const apiKey = process.env.API_KEY || "";
      if (!apiKey) return text;

      // Always create fresh instance to avoid stale key issues
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Localize the following value for a high-tech healthcare ERP into ${targetLanguage}: "${text}"
        
        STRICT LOCALIZATION RULES:
        1. Output ONLY the translated result. No conversational filler.
        2. NUMBERS: Format decimals and separators correctly for ${targetLanguage}.
        3. CURRENCY/PERCENTAGE: Localize symbol placement (e.g., "$100" -> "100 $" or "100 €").
        4. TECHNICAL: Convert keys like "OPS_DASHBOARD" to natural professional phrases.
        5. CLINICAL: Use region-specific formal medical terminology.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary UI localization engine for CareSync Pro. Absolute precision in cultural, numeric, and clinical formatting is mandatory."
        }
      });

      const result = response.text?.trim();
      return result || text;

    } catch (error: any) {
      // Exponential backoff for 429 (Rate Limit) errors
      if (attempt < 3 && (error?.status === 429 || error?.message?.includes('429'))) {
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.translate(text, targetLanguage, attempt + 1);
      }
      
      console.error("[NEURAL_LINGUIST_SIGNAL_LOST]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();