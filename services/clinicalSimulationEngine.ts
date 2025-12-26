import { geminiService } from './geminiService'
import { Client } from '../types'

export interface ClinicalDrill {
  scenario: string;
  criticalSigns: string[];
  immediateActionRequired: string;
  docEscalationPath: string;
}

export class ClinicalSimulationEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Generates a "What-If" clinical scenario for a specific staff member and their patient.
   */
  async generateDrill(client: Client): Promise<ClinicalDrill> {
    console.log(`[CLINICAL_SIM]: Engineering emergency drill for patient: ${client.name}`);
    
    const prompt = `
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Task: Create a high-fidelity "Sudden Clinical Decline" scenario for this specific patient profile.
      Identify: 3 early warning signs, the absolute first priority action, and the escalation protocol.
      Return JSON: { "scenario": "", "signs": [], "action": "", "escalation": "" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        scenario: data.scenario || "Standard clinical emergency drill.",
        criticalSigns: data.signs || ["Change in vitals"],
        immediateActionRequired: data.action || "Call Supervisor immediately.",
        docEscalationPath: data.escalation || "911 / EMS Protocol"
      };
    } catch (e) {
      return { scenario: 'Drill offline.', criticalSigns: [], immediateActionRequired: 'N/A', docEscalationPath: 'N/A' };
    }
  }
}

export const clinicalSimulationEngine = new ClinicalSimulationEngine();