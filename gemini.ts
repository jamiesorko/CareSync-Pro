
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const gemini = {
  async translate(text: string, target: string) {
    const res = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate to ${target}: "${text}". Output only the translation.`,
    });
    return res.text?.trim();
  },

  async simulateStrategy(scenario: string) {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a Monte Carlo simulation for healthcare agency scenario: "${scenario}". Return JSON with score (0-100), risk, and mitigation.`,
      config: { responseMimeType: "application/json", thinkingConfig: { thinkingBudget: 15000 } }
    });
    return JSON.parse(res.text || '{}');
  },

  async forgeProtocol(objective: string) {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Draft a clinical SOP for: "${objective}". Include steps and audit checklist.`,
      config: { thinkingConfig: { thinkingBudget: 10000 } }
    });
    return res.text;
  },

  async generateZen(prompt: string) {
    let op = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Therapeutic calming visual: ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!op.done) {
      await new Promise(r => setTimeout(r, 10000));
      op = await ai.operations.getVideosOperation({ operation: op });
    }
    return `${op.response?.generatedVideos?.[0]?.video?.uri}&key=${process.env.API_KEY}`;
  }
};
