
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Guidelines: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async translate(text: string, targetLang: string): Promise<string> {
    if (!text || targetLang === 'English') return text;
    try {
      const response = await this.ai.models.generateContent({
        // Basic translation task uses flash model
        model: 'gemini-3-flash-preview',
        contents: `Translate to ${targetLang}: "${text}". Output only the translation.`,
        config: { systemInstruction: "You are a healthcare translator. Be concise." }
      });
      return response.text?.trim() || text;
    } catch (err) {
      return text;
    }
  }

  async generateImage(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Clinical visualization: ${prompt}` }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  }

  async generateVideo(prompt: string): Promise<string | undefined> {
    // Check for API key selection via aistudio bridge
    const win = window as any;
    if (win.aistudio && !(await win.aistudio.hasSelectedApiKey())) {
      await win.aistudio.openSelectKey();
    }

    let operation = await this.ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic healthcare training: ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await this.ai.operations.getVideosOperation({ operation });
    }

    return operation.response?.generatedVideos?.[0]?.video?.uri;
  }

  // Implementation of missing methods required by various features

  async generateText(prompt: string, useSearch: boolean = false): Promise<GenerateContentResponse> {
    const config: any = {
      systemInstruction: "You are a professional healthcare operations assistant."
    };
    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }
    return await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config
    });
  }

  async generateSpeech(text: string, voice: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("Speech synthesis failed");
    return base64Audio;
  }

  async getFinancialStrategy(context: any): Promise<string> {
    const response = await this.ai.models.generateContent({
      // Complex reasoning task uses pro model with thinking budget
      model: 'gemini-3-pro-preview',
      contents: `Analyze these financials and provide a strategic plan: ${JSON.stringify(context)}`,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
    return response.text || "Strategy unavailable.";
  }

  async generateSecureSchedule(payload: any): Promise<any[]> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate an optimized clinical schedule for the following anonymized entities: ${JSON.stringify(payload)}. Return JSON format only.`,
      config: { responseMimeType: "application/json" }
    });
    try {
        return JSON.parse(response.text || "[]");
    } catch(e) {
        return [];
    }
  }

  async analyzeHazardImage(base64: string, prompt: string = "Analyze this image for clinical hazards."): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ] 
      },
    });
    return response.text || "Analysis failed.";
  }

  async generateAdvancedReasoning(prompt: string): Promise<GenerateContentResponse> {
    return await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 24576 } }
    });
  }

  async getMarketIntelligence(query: string): Promise<GenerateContentResponse> {
    return await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { tools: [{ googleSearch: {} }] }
    });
  }

  async translateToEnglish(text: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following to English: "${text}". Output only the translation.`,
    });
    return response.text?.trim() || text;
  }

  async runSelfRepairAuditStation(ledger: any): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Run a self-repair integrity audit on this ledger data to identify inconsistencies: ${JSON.stringify(ledger)}. Return JSON with findings and remediation steps.`,
      config: { responseMimeType: "application/json" }
    });
    return response.text || "{}";
  }
}

export const geminiService = new GeminiService();
