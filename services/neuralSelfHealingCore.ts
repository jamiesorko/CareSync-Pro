
import { geminiService } from './geminiService'

export interface HealingProtocol {
  inconsistency: string;
  remediationStep: string;
  automaticCorrectionApplied: boolean;
}

export class NeuralSelfHealingCore {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for "Logic Drift" between different relational data nodes.
   */
  async performSanitySweep(dataset: any): Promise<HealingProtocol[]> {
    console.warn(`[SELF_HEALING]: Probing ledger logic for Org ${this.companyId}`);
    
    const prompt = `
      Data Snippet: ${JSON.stringify(dataset)}
      Task: Find 'Impossibilities' (e.g. Patient is deceased but has med orders, Staff is on LOA but has visits).
      Return JSON: [ { "inconsistency": "", "remediation": "", "autoFixed": boolean } ]
    `;

    try {
      // Fix: Using correct method generateAdvancedReasoning on geminiService
      const res = await geminiService.generateAdvancedReasoning(prompt);
      return JSON.parse(res.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const neuralSelfHealingCore = new NeuralSelfHealingCore();
