
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
        contents: `Act as a master institutional healthcare linguist. 
        Translate exactly to: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Mandatory Rules:
        - Output ONLY the translated string.
        - TECHNICAL TERMS: (Geofence, Biometric, Ledger, Solvency, Acuity) must use professional equivalents.
        - LOCALIZATION: If the text contains currency ($), percentages (%), or large numbers (1.42M, 14k), format them exactly as expected in "${targetLanguage}" (e.g., decimal marks, currency symbol placement).
        - Maintain the high-tech, urgent, professional tone of a CEO/COO terminal.
        - Translate snake_case (OPS_DASHBOARD) as clean user labels.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the CareSync Universal Translation Node. Accuracy and regional number localization are your primary objectives."
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
