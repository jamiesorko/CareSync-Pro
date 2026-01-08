
import { geminiService } from './geminiService'
import { TrainingModule } from '../types'

export class NeuralTrainingService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Generates a custom training module focused on a staff member's specific documentation failure.
   */
  async generateRemedialTraining(staffId: string, gapDescription: string): Promise<Partial<TrainingModule>> {
    console.log(`[NEURAL_LEARN]: Synthesizing remedial content for Staff ${staffId} on: ${gapDescription}`);
    
    const prompt = `
      Task: Create a 3-minute remedial micro-learning module for a Home Care PSW.
      Focus: "${gapDescription}"
      Structure: Title, 3 Essential Protocols, and 2 Quiz Questions.
      Format: Return ONLY valid JSON with structure: { "title": "", "content": "", "quiz": [{ "q": "", "a": [], "correct": number }] }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        title: data.title || "Clinical Protocol Review",
        conceptBrief: data.content || "Protocol alignment required.",
        questions: data.quiz || [],
        targetSkill: gapDescription
      };
    } catch (e) {
      return { title: 'Standard Safety Review', conceptBrief: 'Follow standard SOPs.', questions: [], targetSkill: gapDescription };
    }
  }
}

export const neuralTrainingService = new NeuralTrainingService();
