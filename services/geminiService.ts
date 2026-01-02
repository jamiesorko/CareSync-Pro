
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  /**
   * SOVEREIGNTY PROTOCOL: Scrubbing PII before neural inference.
   */
  private scrubIntent(prompt: string): string {
    return prompt.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[SUBJECT_IDENTIFIER_MASKED]");
  }

  async generateText(prompt: string, useSearch: boolean = false): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    const scrubbed = this.scrubIntent(prompt);
    return await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: scrubbed,
      config: useSearch ? { tools: [{ googleSearch: {} }] } : undefined,
    });
  }

  // Added getMarketIntelligence for services using search grounding
  async getMarketIntelligence(query: string): Promise<GenerateContentResponse> {
    const ai = this.getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
  }

  // Added getFinancialStrategy for CEO financials analysis
  async getFinancialStrategy(context: any): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these financials and provide a strategy: ${JSON.stringify(context)}`,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
    return response.text || "Analysis failed.";
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (!text || targetLanguage.toLowerCase() === 'english') return text;
    
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following text to ${targetLanguage}: "${text}"`,
        config: {
          systemInstruction: "You are a professional medical and enterprise translator. Output ONLY the translated text. Do not include introductory remarks, explanations, or conversational filler. Maintain original formatting and tone.",
        }
      });
      return response.text?.trim() || text;
    } catch (err) {
      console.error("[TRANSLATION_CORE_FAILURE]:", err);
      return text;
    }
  }

  async translateToEnglish(text: string): Promise<string> {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate this clinical report/concern to professional English for a healthcare supervisor: "${text}"`,
        config: {
          systemInstruction: "You are a clinical translation node. Convert the input to clear, professional medical English. Return ONLY the translated text.",
        }
      });
      return response.text?.trim() || text;
    } catch (err) {
      return text;
    }
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

  // Added generateVideo for cinematic synthesis using Veo
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

  async generateSecureSchedule(anonymizedData: any): Promise<any[]> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a valid roster for the following anonymized vector: ${JSON.stringify(anonymizedData)}`,
      config: {
        systemInstruction: "You are the Neural Dispatch Engine. SECURITY PROTOCOL: IDs only. Return JSON array of assignments.",
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

  async analyzeHazardImage(base64: string, prompt: string = "Analyze this clinical hazard image."): Promise<string> {
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
    return response.text || "No analysis provided.";
  }

  async runSelfRepairAudit(ledger: any): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Audit ledger: ${JSON.stringify(ledger)}. Return JSON: { "remediation": "string" }`,
      config: { responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 5000 } }
    });
    return response.text || '{"remediation": "No drift."}';
  }
}

export const geminiService = new GeminiService();
