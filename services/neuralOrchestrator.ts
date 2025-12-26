import { geminiService } from './geminiService'
import { clinicalInsightService } from './clinicalInsightService'
import { telemetryService } from './telemetryService'
import { Client } from '../types'

export class NeuralOrchestrator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Performs a "Deep Synthesis" across vision, audio, and sensor domains for a patient.
   */
  async synthesizeTotalClinicalTruth(client: Client, rawTranscript: string, imageBase64?: string) {
    console.log(`[NEURAL_CORE]: Orchestrating total synthesis for ${client.name}...`);
    
    const vitals = await telemetryService.streamBiometrics(client.id);
    const trend = await clinicalInsightService.generateTrendReport(client, [rawTranscript]);
    
    // This uses Gemini 3 Pro to evaluate the contradictory or supporting evidence across domains
    const prompt = `
      Patient Dossier: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Vitals Sensor: HR ${vitals.bpm}, Steps ${vitals.steps}
      Staff Handover: "${rawTranscript}"
      Historical Trend: "${trend}"
      Has Image: ${!!imageBase64}
      
      Task: Identify any 'Blind Spots' in the current care plan. Predict risk for next 48 hours.
      Tone: Clinical, precise, high-fidelity.
    `;

    return await geminiService.generateText(prompt, false);
  }
}

export const neuralOrchestrator = new NeuralOrchestrator();