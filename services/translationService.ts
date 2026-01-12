
import { GoogleGenAI } from "@google/genai";

class TranslationService {
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  /**
   * Universal Neural Translation Vector
   * Refined for institutional accuracy in roles and technical UI terminology.
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') {
      return text;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a master medical ERP linguist. Translate this text into exactly: "${targetLanguage}".
        
        Text: "${text}"
        
        Rules:
        1. Output ONLY the translated string. No explanations.
        2. Format: Preserve all caps if the source is all caps.
        3. ROLES: "Director of Care", "RN", "PSW", "HSS", "CEO", "Accountant" must use their formal professional translations.
        4. UI KEYS: Snake_case or Title_Case keys like "OPS_DASHBOARD" or "Neural_Vault" must be translated as user-friendly labels.
        5. Tone: Maintain a high-tech, formal, institutional healthcare tone.`,
        config: { 
          temperature: 0.0,
          systemInstruction: "You are the primary translation engine for CareSync Pro. Absolute precision in clinical and executive roles is mandatory."
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
