
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const ai = {
  async ask(prompt: string) {
    const model = getAI().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return (await model).text;
  },

  async think(prompt: string) {
    const model = getAI().models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
    return (await model).text;
  },

  async analyzeVision(base64: string, prompt: string) {
    const response = await getAI().models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  }
};
