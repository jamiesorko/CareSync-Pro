import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Translates any UI string, data attribute, or numeric magnitude.
   * Calibrated for institutional healthcare terminology and regional number systems.
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
        - CLINICAL JARGON: Terms like "Complex Wound Care", "Acuity", "ADL Support", "Hoyer Lift", and "Geofence" MUST use their professional medical/technical equivalents in "${targetLanguage}".
        - NUMERIC LOCALIZATION: If the text is a number (e.g., "15", "94.2"), a measurement (e.g., "40h", "80 Units"), or a financial magnitude (e.g., "$14.2k", "$1,420.00"), translate the digits, separators, units, and suffixes to the standard form used in "${targetLanguage}".
        - FORMATTING: Ensure decimal separators (commas vs dots) and currency symbol placement follow the conventions of "${targetLanguage}".
        - Maintain the formal, high-tech, professional tone of a global healthcare CEO ERP.
        - If the source is snake_case (e.g., OVERTIME_REQUIRED), translate it as a user-friendly label.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the CareSync Universal Translation Node. Accuracy, regional number localization, and healthcare terminology are your primary objectives."
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