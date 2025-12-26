import { geminiService } from './geminiService'
import { Client, RecoveryMilestone } from '../types'

export class RecoveryGoalOracleService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Predicts clinical goal attainment based on visit adherence and biometric trends.
   */
  async predictGoalAttainment(client: Client, history: any): Promise<RecoveryMilestone[]> {
    console.log(`[RECOVERY_ORACLE]: Simulating recovery path for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name}
      Conditions: ${client.conditions.join(', ')}
      History: ${JSON.stringify(history)}
      Task: Predict 2 key recovery milestones for the next 90 days. 
      Identify status: ON_TRACK, STAGNANT, or DELAYED.
      Return JSON array of RecoveryMilestone objects.
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      return JSON.parse(res.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const recoveryGoalOracleService = new RecoveryGoalOracleService();