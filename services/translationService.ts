
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  /**
   * Universal Neural Translation Vector
   * Refined for maximum semantic precision in clinical and fiscal domains.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master clinical ERP linguist. Translate the following healthcare software text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        Strict Translation Directives:
        1. Return ONLY the translated string. No quotes, no markdown, no explanations.
        2. Preservation: Maintain the exact meaning of clinical roles (RN, PSW, DOC) and specific medical conditions.
        3. Context: This is for a high-tech medical fleet management interface. Use institutional and professional terminology.
        4. Technical Terms: Translate terms like "Geofence", "Telemetry", "Acuity", and "Remittance" into their local professional equivalents.`,
        config: { 
          temperature: 0.05, // High deterministic output
          systemInstruction: "You are the primary linguistic core for CareSync Pro. Absolute semantic fidelity is required for patient safety and professional compliance."
        }
      });

      return response.text?.trim() || text;
    } catch (error) {
      console.error("[NEURAL_LINGUIST_SIGNAL_LOST]:", error);
      return text; 
    }
  }
}

export const translationService = new TranslationService();
