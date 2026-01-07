
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateText(prompt: string, useSearch: boolean = false) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: useSearch ? [{ googleSearch: {} }] : undefined,
        systemInstruction: "You are the CareSync Pro Clinical Intelligence Core. Provide concise, professional insights.",
      }
    });
    return response;
  }

  async performDeepReasoning(prompt: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });
    return response.text;
  }

  async translate(text: string, targetLang: string) {
    if (!text || !targetLang || targetLang.toLowerCase() === 'english') return text;
    
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following text to ${targetLang}: "${text}"`,
        config: {
          systemInstruction: "You are a professional enterprise translator. Output ONLY the translated text. Do not include quotes, explanations, or conversational filler. Maintain uppercase where provided.",
        }
      });
      return response.text?.trim() || text;
    } catch (err) {
      console.error("Translation signal drift:", err);
      return text;
    }
  }

  async translateToEnglish(text: string) {
    return await this.translate(text, 'English');
  }

  async generateSpeech(text: string, voice: string = 'Kore') {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  async generateVideo(prompt: string) {
    let operation = await this.ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await this.ai.operations.getVideosOperation({ operation: operation });
    }
    return `${operation.response?.generatedVideos?.[0]?.video?.uri}&key=${process.env.API_KEY}`;
  }

  async analyzeHazardImage(base64: string, customPrompt?: string) {
    const prompt = customPrompt || "Identify clinical hazards in this image. Focus on safety.";
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text || "Analysis complete.";
  }

  async generateImage(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  }

  async getFinancialStrategy(context: any) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these financials and provide a strategy: ${JSON.stringify(context)}`,
      config: { thinkingConfig: { thinkingBudget: 10000 } }
    });
    return response.text;
  }

  async generateSecureSchedule(payload: any) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a secure schedule for: ${JSON.stringify(payload)}. Return JSON array of {clientId, staffId, time}.`,
      config: { responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 10000 } }
    });
    try {
      return JSON.parse(response.text || '[]');
    } catch {
      return [];
    }
  }

  async getMarketIntelligence(query: string): Promise<GenerateContentResponse> {
    return await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { tools: [{ googleSearch: {} }] }
    });
  }

  async runSelfRepairAudit(ledger: any) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze ledger for inconsistencies: ${JSON.stringify(ledger)}. Return JSON: { "remediation": "string" }`,
      config: { responseMimeType: "application/json" }
    });
    return response.text || '{}';
  }

  async generateAdvancedReasoning(prompt: string): Promise<GenerateContentResponse> {
    return await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
  }
}

export const geminiService = new GeminiService();
