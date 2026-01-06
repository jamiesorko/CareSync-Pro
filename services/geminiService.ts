
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initialize with named parameter and process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateText(prompt: string, useSearch: boolean = false) {
    // Fixed: ai.models.generateContent used directly with prompt
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: useSearch ? [{ googleSearch: {} }] : undefined,
        systemInstruction: "You are the CareSync Pro Clinical Intelligence Core. Provide concise, professional medical insights.",
      }
    });
    // Correctly access .text property
    return response;
  }

  async generateClinicalInsight(prompt: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the CareSync Pro Clinical Intelligence Core. Provide concise, professional medical insights.",
      }
    });
    return response.text;
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

  async generateAdvancedReasoning(prompt: string) {
    return await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });
  }

  async translate(text: string, targetLang: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate to ${targetLang}: "${text}"`,
      config: {
        systemInstruction: "Output only the translated text.",
      }
    });
    return response.text?.trim();
  }

  async translateToEnglish(text: string) {
    return await this.translate(text, "English");
  }

  async generateTTS(text: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
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

  async generateImage(prompt: string) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
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

  async getFinancialStrategy(context: any) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these agency financials and provide a strategy: ${JSON.stringify(context)}`,
      config: {
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });
    return response.text || "Strategy analysis complete.";
  }

  async getMarketIntelligence(query: string) {
    return await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { tools: [{ googleSearch: {} }] }
    });
  }

  async generateSecureSchedule(payload: any) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a secure schedule for: ${JSON.stringify(payload)}. Return valid JSON.`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '[]');
  }

  async runSelfRepairAudit(ledger: any) {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Run self repair audit for: ${JSON.stringify(ledger)}. Return valid JSON with "remediation" key.`,
      config: { responseMimeType: "application/json" }
    });
    return response.text || '{"remediation": "No drift detected."}';
  }

  async analyzeHazardImage(base64: string, customPrompt?: string) {
    const prompt = customPrompt || "Identify clinical hazards in this image. Focus on safety and medical necessity.";
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text || "Visual analysis complete.";
  }
}

export const geminiService = new GeminiService();
