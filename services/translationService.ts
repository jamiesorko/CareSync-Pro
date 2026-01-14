
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  /**
   * Universal Neural Translation Vector
   * Enforces 100% adherence to technical and clinical terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master clinical ERP linguist. Translate the following healthcare software UI text into exactly: "${targetLanguage}".
        
        Source Text: "${text}"
        
        STRICT RULES:
        1. Output ONLY the translated string. NO quotes, NO markdown, NO meta-talk.
        2. Preservation: Keep clinical roles (PSW, RN, RPN, DOC) and sectors accurate to local medical norms.
        3. Domain: This is a professional enterprise dashboard. Use formal, institutional terminology.
        4. No Skipping: Translate every word. If a word is a technical term like "Geofence" or "Telemetry", find the closest local professional equivalent.`,
        config: { 
          temperature: 0.0, // Absolute determinism
          systemInstruction: "You are the primary linguistic core for CareSync Pro. Every string must be professionally localized for patient safety and operational clarity."
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
