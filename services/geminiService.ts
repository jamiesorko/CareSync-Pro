
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// Language-keyed memory cache for the current session
const translationCache = new Map<string, string>();

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || !targetLanguage || targetLanguage.toLowerCase() === 'english') return text;
    
    const cacheKey = `${targetLanguage.toLowerCase()}:${text.toLowerCase().trim()}`;
    if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!;

    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate to ${targetLanguage}: "${text}"`,
        config: {
          systemInstruction: "You are a professional medical and enterprise software translator. Output ONLY the translated string. No quotes, no explanations, no conversational filler. Maintain clinical professional tone.",
        }
      });
      const result = response.text?.trim() || text;
      translationCache.set(cacheKey, result);
      return result;
    } catch (err) {
      console.error("[TRANSLATION_FAILURE]:", err);
      return text;
    }
  }

  async translateToEnglish(text: string): Promise<string> {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate to professional clinical English: "${text}"`,
        config: {
          systemInstruction: "Translate the input to professional medical English. Output ONLY the translated text.",
        }
      });
      return response.text?.trim() || text;
    } catch (err) {
      return text;
    }
  }

  async generateText(prompt: string, useSearch: boolean = false): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: useSearch ? { tools: [{ googleSearch: {} }] } : undefined,
    });
  }

  async generateAdvancedReasoning(prompt: string): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
  }

  async generateImage(prompt: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return "";
  }

  async generateVideo(prompt: string): Promise<string> {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  }

  async generateSecureSchedule(anonymizedData: any): Promise<any[]> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a valid roster for: ${JSON.stringify(anonymizedData)}`,
      config: {
        systemInstruction: "You are a Neural Dispatch Engine. Return JSON array of assignments.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 10000 }
      }
    });
    try {
      return JSON.parse(response.text || '[]');
    } catch {
      return [];
    }
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

  async analyzeHazardImage(base64: string, prompt: string = "Analyze hazard."): Promise<string> {
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
    return response.text || "No analysis.";
  }

  async runSelfRepairAudit(ledger: any): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Audit: ${JSON.stringify(ledger)}. Return JSON: { "remediation": "string" }`,
      config: { responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 5000 } }
    });
    return response.text || '{"remediation": "No drift."}';
  }

  // Added getFinancialStrategy to fix property 'getFinancialStrategy' does not exist on type 'GeminiService'
  async getFinancialStrategy(context: any): Promise<string> {
    const res = await this.generateAdvancedReasoning(`Analyze these financials and provide a strategic profit optimization plan: ${JSON.stringify(context)}`);
    return res.text || "No strategy synthesized.";
  }

  // Added getMarketIntelligence to fix property 'getMarketIntelligence' does not exist on type 'GeminiService'
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
}

export const geminiService = new GeminiService();
