
import { geminiService } from './geminiService'
import { Client } from '../types'

export interface ReadinessScore {
  clientId: string;
  readinessPercentage: number;
  remainingBarriers: string[];
  estimatedDischargeDate: string;
}

export class DischargeReadinessService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes clinical stability trends to predict independence.
   */
  async assessReadiness(client: Client, stabilityHistory: any): Promise<ReadinessScore> {
    console.log(`[DISCHARGE_ORACLE]: Calculating independence probability for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name}
      Data: ${JSON.stringify(stabilityHistory)}
      Task: Predict readiness for discharge (0-100%). Identify 2 remaining barriers.
      Return JSON: { "score": number, "barriers": ["string"], "date": "YYYY-MM-DD" }
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        clientId: client.id,
        readinessPercentage: data.score || 50,
        remainingBarriers: data.barriers || ["Pending clinical baseline."],
        estimatedDischargeDate: data.date || "TBD"
      };
    } catch (e) {
      return { clientId: client.id, readinessPercentage: 0, remainingBarriers: [], estimatedDischargeDate: "N/A" };
    }
  }
}

export const dischargeReadinessService = new DischargeReadinessService();
