
import { GoogleGenAI, Type } from "@google/genai";
import { TrainingModule, StaffMember } from '../types';

export class TrainingForgeService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async forgeModule(staff: StaffMember, gapDescription: string): Promise<TrainingModule> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Lead Educator. Staff: ${staff.name}. Gap: "${gapDescription}". JSON: { "title": "", "brief": "", "quiz": [] }`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        title: data.title || "Remedial Protocol",
        targetSkill: gapDescription,
        conceptBrief: data.brief || "Focus on documentation.",
        questions: data.quiz || [],
        masteryTarget: 100
      };
    } catch (e) {
      return {
        id: 'err-forge',
        companyId: 'csp-demo',
        title: "Standard Training",
        targetSkill: gapDescription,
        conceptBrief: "Manual training required.",
        questions: [],
        masteryTarget: 100
      };
    }
  }
}

export const trainingForgeService = new TrainingForgeService();