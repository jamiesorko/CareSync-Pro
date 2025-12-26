import { geminiService } from './geminiService'
import { Client } from '../types'

export interface OutcomeForecast {
  readmissionRisk: number; // 0-1
  primaryDrivers: string[];
  suggestedMitigation: string;
  stabilityWindowDays: number;
}

export class OutcomeForecastingService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes longitudinal patient data to predict failure-at-home risk.
   */
  async forecastOutcome(client: Client, history: string[]): Promise<OutcomeForecast> {
    console.log(`[OUTCOME_ORACLE]: Computing 30-day readmission vector for ${client.name}`);
    
    const context = {
      patient: client.name,
      conditions: client.conditions,
      mobility: client.mobilityStatus,
      recentNotes: history.slice(-10)
    };

    const prompt = `
      Act as a Clinical Data Scientist. 
      Analyze: ${JSON.stringify(context)}.
      Predict the probability of a 30-day hospital readmission. 
      Identify 3 primary risk drivers (clinical or social).
      Return JSON: { "risk": number, "drivers": string[], "mitigation": "string", "window": number }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        readmissionRisk: data.risk || 0.15,
        primaryDrivers: data.drivers || ["Standard baseline"],
        suggestedMitigation: data.mitigation || "Maintain current care plan.",
        stabilityWindowDays: data.window || 14
      };
    } catch (e) {
      return { readmissionRisk: 0.1, primaryDrivers: [], suggestedMitigation: "Error in prediction engine.", stabilityWindowDays: 7 };
    }
  }
}

export const outcomeForecastingService = new OutcomeForecastingService();