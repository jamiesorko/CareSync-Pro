
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const gemini = {
  // Ultra-fast translation using Flash
  async translate(text: string, target: string) {
    if (target === 'English') return text;
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate to ${target}: "${text}". Output ONLY the translation. No quotes.`,
      });
      return res.text?.trim();
    } catch (e) {
      console.error("Neural translation drift:", e);
      return text;
    }
  },

  // Deep reasoning for strategy and board mandates
  async think(prompt: string) {
    const res = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        thinkingConfig: { thinkingBudget: 15000 } 
      }
    });
    return res.text;
  },

  // High-fidelity video for Patient Zen
  async generateZenVideo(prompt: string) {
    let op = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic therapeutic visual: ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!op.done) {
      await new Promise(r => setTimeout(r, 10000));
      op = await ai.operations.getVideosOperation({ operation: op });
    }
    return `${op.response?.generatedVideos?.[0]?.video?.uri}&key=${process.env.API_KEY}`;
  }
};
