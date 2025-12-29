
import { GoogleGenAI, Modality, GenerateContentResponse, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const gemini = {
  // Basic Text with Search Grounding
  async ask(prompt: string, useSearch: boolean = false): Promise<GenerateContentResponse> {
    const ai = getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: useSearch ? { tools: [{ googleSearch: {} }] } : undefined,
    });
  },

  // Advanced Reasoning (Thinking)
  async think(prompt: string): Promise<GenerateContentResponse> {
    const ai = getAI();
    return await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 20000 }
      }
    });
  },

  // Image Analysis / Clinical Vision
  async analyzeVision(base64Data: string, prompt: string): Promise<string> {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text || "Analysis failed.";
  },

  // Video Generation (Veo)
  async generateVideo(prompt: string): Promise<string> {
    const ai = getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(r => setTimeout(r, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  },

  // Structured JSON Output (e.g. for Scheduling or Triage)
  async generateJson(prompt: string, schema: any): Promise<any> {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });
    try {
      return JSON.parse(response.text || "{}");
    } catch {
      return {};
    }
  }
};
