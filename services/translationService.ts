import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Translates institutional healthcare strings and regional data.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master institutional healthcare linguist and financial localization expert. 
        Translate the following text into exactly the language/dialect: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Mandatory Rules:
        - Output ONLY the translated string.
        - CLINICAL JARGON: Terms like "Complex Wound Care", "Registered Nurse", "PSW", "Acuity", "ADL", "Hoyer Lift", and "Geofence" MUST use their professional medical equivalents in "${targetLanguage}".
        - NUMERIC LOCALIZATION: Localize digits, separators, and financial magnitudes (e.g., "$14.2k") to "${targetLanguage}" conventions.
        - Maintain the formal, high-tech, professional tone of a global healthcare CEO ERP.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the CareSync Universal Translation Node. Accuracy in medical terminology and regional number formatting is your primary objective."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_ERROR]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();