
import { GoogleGenAI } from "@google/genai";
import { Client, PatientDailySynthesis, ZenVideoPrompt } from '../types';

export class PatientWellnessService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async synthesizeDailySuccess(client: Client, logs: string[]): Promise<PatientDailySynthesis> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Synthesize daily success for ${client.name} from logs: ${logs.join('. ')}. Return JSON.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { headline: "Good day!", accomplishments: ["Rested well"], visitorToday: "Team", tomorrowPreview: "New goals", soothingNote: "Safe." };
    }
  }

  async generateZenVideo(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) await window.aistudio.openSelectKey();
    }

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });

    while (!operation.done) {
      await new Promise(r => setTimeout(r, 5000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    return `${operation.response?.generatedVideos?.[0]?.video?.uri}&key=${this.getApiKey()}`;
  }
}

export const patientWellnessService = new PatientWellnessService();
