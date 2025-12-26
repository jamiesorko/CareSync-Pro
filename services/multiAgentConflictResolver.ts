import { geminiService } from './geminiService'

export interface ConsensusResolution {
  resolvedStatement: string;
  confidenceScore: number;
  disputedElements: string[];
  docActionRequired: boolean;
}

export class MultiAgentConflictResolver {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Mediates between two contradictory clinical data points using reasoning logic.
   */
  async resolveContradiction(noteA: string, noteB: string): Promise<ConsensusResolution> {
    console.log(`[CONSENSUS_ENGINE]: Mediating clinical discrepancy...`);
    
    const prompt = `
      Input A: "${noteA}"
      Input B: "${noteB}"
      
      Task: Act as a Clinical Ethicist and Director of Care. These two reports from the field contradict. 
      Identify the "Clinical Truth" based on safety priority.
      Return JSON: { "statement": "string", "confidence": 0-1, "disputed": [], "urgent": boolean }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        resolvedStatement: data.statement || "Manual review required.",
        confidenceScore: data.confidence || 0.5,
        disputedElements: data.disputed || [],
        docActionRequired: data.urgent ?? true
      };
    } catch (e) {
      return { resolvedStatement: "Consensus engine timeout.", confidenceScore: 0, disputedElements: [], docActionRequired: true };
    }
  }
}

export const multiAgentConflictResolver = new MultiAgentConflictResolver();