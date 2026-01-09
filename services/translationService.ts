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
        - Handle TECHNICAL TERMS: (e.g., Geofence, Biometric, Ledger, Solvency, Acuity, Wound Care).
        - Localize NUMBERS & CURRENCY: If the text contains currency symbols ($), percentages (%), or large magnitudes (e.g., 1.42M, 14.2k, LOW/HIGH), translate the numeric suffixes (M/k) and position the currency symbol according to the standards of "${targetLanguage}".
        - Maintain the formal, high-tech, professional tone of a global healthcare ERP.
        - If the source is a code-like string (e.g., OPS_DASHBOARD), translate it as a user-friendly label.`,
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