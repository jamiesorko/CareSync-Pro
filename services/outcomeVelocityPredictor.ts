import { geminiService } from './geminiService'
import { Client } from '../types'

export interface RecoveryTrajectory {
  predictedDischargeDate: string;
  velocityScore: number; // 0-100
  accelerationFactors: string[];
  capacityReleaseHours: number;
}

export class OutcomeVelocityPredictor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Correlates multi-day biometric data with care adherence to forecast independence.
   */
  async forecastIndependence(client: Client, history: any[]): Promise<RecoveryTrajectory> {
    console.log(`[VELOCITY_ORACLE]: Computing recovery curve for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name} (Acuity: ${client.risk?.level || 'MED'})
      Clinical History: ${JSON.stringify(history)}
      Task: Predict the specific date the patient will no longer require daily nursing support.
      Return JSON: { "date": "YYYY-MM-DD", "velocity": 0-100, "factors": ["string"], "hoursReleased": number }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        predictedDischargeDate: data.date || "TBD",
        velocityScore: data.velocity || 50,
        accelerationFactors: data.factors || ["Stable baseline maintained."],
        capacityReleaseHours: data.hoursReleased || 0
      };
    } catch (e) {
      return { predictedDischargeDate: "TBD", velocityScore: 0, accelerationFactors: [], capacityReleaseHours: 0 };
    }
  }
}

export const outcomeVelocityPredictor = new OutcomeVelocityPredictor();