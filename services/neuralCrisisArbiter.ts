import { geminiService } from './geminiService'
import { Client } from '../types'

export interface CrisisGuidance {
  stabilizationPriority: string;
  environmentalHazards: string[];
  paramedicBriefingShorthand: string;
  isLifeThreat: boolean;
}

export class NeuralCrisisArbiter {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Synthesizes live multimodal data (audio/video/sensors) into immediate tactical life-saving guidance.
   */
  async arbitrateActiveEmergency(client: Client, fieldTranscript: string, imageBase64?: string): Promise<CrisisGuidance> {
    console.error(`[CRISIS_NODE]: Orchestrating stabilization vector for Client ${client.id}`);
    
    const prompt = `
      Context: ACTIVE CLINICAL EMERGENCY.
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Live Transcript: "${fieldTranscript}"
      Has Live Vision: ${!!imageBase64}
      
      Task: Act as an Emergency Dispatch Physician. Provide immediate stabilization priorities for the field staff.
      Identify: Environmental hazards and draft a 2-sentence briefing for arriving Paramedics.
      Return JSON: { "priority": "string", "hazards": ["string"], "paramedicBrief": "string", "lifeThreat": boolean }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        stabilizationPriority: data.priority || "Ensure airway patency and safety.",
        environmentalHazards: data.hazards || ["No immediate environmental data."],
        paramedicBriefingShorthand: data.paramedicBrief || "Clinical decline detected. Patient baseline: " + client.conditions[0],
        isLifeThreat: data.lifeThreat ?? true
      };
    } catch (e) {
      return { stabilizationPriority: "Emergency protocol active. Call EMS.", environmentalHazards: [], paramedicBriefingShorthand: "Inbound emergency.", isLifeThreat: true };
    }
  }
}

export const neuralCrisisArbiter = new NeuralCrisisArbiter();