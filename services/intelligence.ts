
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const intelligence = {
  async analyzeRisk(context: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze clinical risk for: ${context}`,
      config: { thinkingConfig: { thinkingBudget: 10000 } }
    });
    return response.text;
  },
  async getQuickInsight(prompt: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return response.text;
  }
};
