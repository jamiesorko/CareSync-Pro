import { geminiService } from './geminiService'
import { Client } from '../types'

export interface SimulationResult {
  proposedChange: string;
  predictedAcuityShift: number; // Percentage
  stabilityHorizonDays: number;
  clinicalSideEffects: string[];
  docApprovalRecommendation: boolean;
}

export class AcuitySimulationEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the future state of a patient based on a hypothetical change in intervention.
   */
  async simulateIntervention(client: Client, changeDescription: string): Promise<SimulationResult> {
    console.log(`[NEURAL_TWIN]: Modeling outcome vector for ${client.name} | Change: ${changeDescription}`);
    
    const context = {
      patient: client.name,
      currentConditions: client.conditions,
      currentAcuity: client.risk?.level || 'MED',
      proposedChange: changeDescription
    };

    const prompt = `
      Act as a Predictive Clinical Modeler. 
      Analyze the impact of: "${changeDescription}" on a patient with: ${JSON.stringify(context)}.
      Predict the shift in clinical stability over 14 days.
      Return JSON: { "shift": number, "horizon": number, "effects": string[], "approve": boolean }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        proposedChange: changeDescription,
        predictedAcuityShift: data.shift || 10,
        stabilityHorizonDays: data.horizon || 14,
        clinicalSideEffects: data.effects || ["Standard clinical response."],
        docApprovalRecommendation: data.approve ?? true
      };
    } catch (e) {
      return { 
        proposedChange: changeDescription, 
        predictedAcuityShift: 0, 
        stabilityHorizonDays: 7, 
        clinicalSideEffects: [], 
        docApprovalRecommendation: false 
      };
    }
  }
}

export const acuitySimulationEngine = new AcuitySimulationEngine();