import { geminiService } from './geminiService'
import { Client } from '../types'

export interface SynthesisTruth {
  clientId: string;
  consensusAssessment: string;
  identifiedDelta: string;
  safetyPriorityLevel: 'STABLE' | 'WATCH' | 'CRITICAL';
  suggestedDocAction: string;
}

export class NeuralTruthSynthesizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Mediates conflicting clinical documentation to produce a single source of truth.
   */
  async synthesizeConflictingNotes(client: Client, notes: { staffName: string; note: string }[]): Promise<SynthesisTruth> {
    console.log(`[NEURAL_TRUTH]: Resolving clinical conflict for Client ${client.name}`);
    
    const prompt = `
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Observations: ${JSON.stringify(notes)}
      Task: Act as a clinical auditor. Resolve contradictions between these field reports. 
      Prioritize safety. Identify why the staff might see different states (e.g. fluctuation).
      Return JSON: { "truth": "", "delta": "", "safety": "STABLE|WATCH|CRITICAL", "action": "" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        clientId: client.id,
        consensusAssessment: data.truth || "Maintenance of current care plan.",
        identifiedDelta: data.delta || "No significant contradiction detected.",
        safetyPriorityLevel: data.safety || 'WATCH',
        suggestedDocAction: data.action || "Continue standard oversight."
      };
    } catch (e) {
      return {
        clientId: client.id,
        consensusAssessment: "Consensus engine offline.",
        identifiedDelta: "Signal lost.",
        safetyPriorityLevel: 'WATCH',
        suggestedDocAction: "Manual chart review required."
      };
    }
  }
}

export const neuralTruthSynthesizer = new NeuralTruthSynthesizer();