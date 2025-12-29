
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateText(prompt: string, useSearch: boolean = false): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    const config: any = {
      model: 'gemini-3-flash-preview',
      contents: prompt,
    };
    if (useSearch) {
      config.config = {
        tools: [{ googleSearch: {} }]
      };
    }
    return await ai.models.generateContent(config);
  }

  async generateImage(prompt: string): Promise<string | null> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  async generateVideo(prompt: string): Promise<string> {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
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
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  }

  async generateSpeech(text: string, voice: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLanguage}: "${text}". Return only the translation.`,
    });
    return response.text || text;
  }

  async generateAdvancedReasoning(prompt: string): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 20000 }
      }
    });
  }

  async getFinancialStrategy(context: any): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a financial strategy based on this context: ${JSON.stringify(context)}`,
      config: {
        thinkingConfig: { thinkingBudget: 10000 }
      }
    });
    return response.text || "Strategy unavailable.";
  }

  async generateSecureSchedule(clients: any[], staff: any[]): Promise<any[]> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a secure schedule for these clients and staff: ${JSON.stringify({ clients, staff })}. Return JSON array of objects with keys: clientId, staffId, scheduledTime, reasoning.`,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 15000 }
      }
    });
    try {
      return JSON.parse(response.text || '[]');
    } catch {
      return [];
    }
  }

  async extractClinicalInsights(transcript: string): Promise<any> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract clinical insights from this transcript: ${transcript}. Return JSON with vitals (heartRate, bp).`,
      config: { responseMimeType: "application/json" }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch {
      return {};
    }
  }

  async getMarketIntelligence(query: string): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
  }

  async analyzeHazardImage(base64: string, prompt: string = "Analyze this image for clinical hazards or anomalies."): Promise<string> {
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

  async runSelfRepairAudit(mockLedger: any): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a self-repair audit on this ledger data: ${JSON.stringify(mockLedger)}. Return JSON with remediation field.`,
      config: { responseMimeType: "application/json" }
    });
    return response.text || "{}";
  }

  async generateOperationalInsight(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an Enterprise Healthcare Strategy Analyst. Provide high-density, concise clinical and operational insights.",
        temperature: 0.7,
      }
    });
    return response.text;
  }

  async analyzeClinicalRisk(context: any) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this clinical context for readmission risk and documentation drift: ${JSON.stringify(context)}`,
      config: {
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
