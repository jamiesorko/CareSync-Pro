
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') return text;
    
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate to ${targetLanguage}: "${text}"`,
        config: {
          systemInstruction: "You are a professional medical and enterprise software translator. Output ONLY the translated string. No quotes, no explanations, no conversational filler. Maintain clinical professional tone.",
        }
      });
      return response.text?.trim() || text;
    } catch (err) {
      console.error("[TRANSLATION_FAILURE]:", err);
      return text;
    }
  }

  async analyzeVision(base64: string, prompt: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text || "Analysis failed.";
  }

  async generateSpeech(text: string, voiceName: string = 'Kore'): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  async generateAdvancedReasoning(prompt: string): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
  }
}

export const gemini = new GeminiService();
