import { GoogleGenAI, Type } from "@google/genai";

class TranslationService {
  /**
   * Neural Localization Vector v25.1
   * MANDATORY: 100% Script Parity & JSON Structure Enforcement.
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
        contents: `LOCALIZE_UI_VALUE: "${text}" TO "${targetLanguage}"`,
        config: { 
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              localizedValue: {
                type: Type.STRING,
                description: "The absolute localized version of the input string."
              }
            },
            required: ["localizedValue"]
          },
          systemInstruction: `You are the CareSync Core Localization Engine. 
          
          STRICT SCRIPT RULES FOR ARABIC:
          - YOU MUST CONVERT ALL WESTERN DIGITS (0-9) TO EASTERN ARABIC DIGITS: 0=٠, 1=١, 2=٢, 3=٣, 4=٤, 5=٥, 6=٦, 7=٧, 8=٨, 9=٩
          - Example Input: "98.4%" -> Output: "٩٨,٤٪"
          
          GENERAL RULES:
          - CURRENCY: Position symbols ($/€/£) and spaces per ${targetLanguage} rules.
          - UNIT LOCALIZATION: Translate units like "h", "hrs", "mins", "units".
          - NO CONVERSATION: Output ONLY the requested JSON.`
        }
      });

      const data = JSON.parse(response.text || "{}");
      return data.localizedValue || text;

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