import { geminiService } from './geminiService'
import { Applicant } from '../types'

export interface RetentionPrediction {
  applicantId: string;
  survivalProbability: number; // Probability of staying > 12 months
  stressMatch: 'HIGH' | 'LOW'; // Compatibility with high-stress roles
  neuralReasoning: string;
}

export class NeuralRecruitmentNexus {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Predicts the long-term retention probability of a candidate.
   */
  async analyzeRetentionVector(app: Applicant, interviewNotes: string): Promise<RetentionPrediction> {
    console.log(`[NEURAL_HR]: Computing retention survival curve for Applicant ${app.id}`);
    
    const prompt = `
      Candidate: ${app.name} (Role: ${app.role})
      Commute Vector: "45 mins average"
      Interview Notes: "${interviewNotes}"
      Task: Predict probability of 1-year retention (0-1). 
      Format: JSON { "prob": number, "match": "HIGH|LOW", "reason": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        applicantId: app.id,
        survivalProbability: data.prob || 0.7,
        stressMatch: data.match || 'LOW',
        neuralReasoning: data.reason || "Baseline candidate profile."
      };
    } catch (e) {
      return { applicantId: app.id, survivalProbability: 0.5, stressMatch: 'LOW', neuralReasoning: 'Nexus error.' };
    }
  }
}

export const neuralRecruitmentNexus = new NeuralRecruitmentNexus();