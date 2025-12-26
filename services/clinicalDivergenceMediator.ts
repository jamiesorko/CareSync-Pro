import { geminiService } from './geminiService'

export interface ClinicalConsensus {
  unifiedStatement: string;
  divergenceDetected: boolean;
  conflictingStaffIds: string[];
  reconciliationProtocol: string;
  urgency: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
}

export class ClinicalDivergenceMediator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Identifies contradictory clinical data and synthesizes the most safe truth vector.
   */
  async mediateDivergence(reports: { staffId: string; note: string }[]): Promise<ClinicalConsensus> {
    console.log(`[DIVERGENCE_MEDIATOR]: Reconciling ${reports.length} field perspectives.`);
    
    const prompt = `
      Field Observations: ${JSON.stringify(reports)}
      Task: Act as a Senior DOC. Identify any contradictions in patient status reporting. 
      Synthesize a single 'Clinical Truth' focused on patient safety.
      Return JSON: { "truth": "string", "conflict": boolean, "staff": [], "protocol": "string", "urgency": "ROUTINE|ELEVATED|CRITICAL" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        unifiedStatement: data.truth || "No significant divergence in reports.",
        divergenceDetected: !!data.conflict,
        conflictingStaffIds: data.staff || [],
        reconciliationProtocol: data.protocol || "Standard monitoring continues.",
        urgency: data.urgency || 'ROUTINE'
      };
    } catch (e) {
      return { 
        unifiedStatement: "Consensus unavailable.", 
        divergenceDetected: false, 
        conflictingStaffIds: [], 
        reconciliationProtocol: "Manual oversight requested.", 
        urgency: 'ELEVATED' 
      };
    }
  }
}

export const clinicalDivergenceMediator = new ClinicalDivergenceMediator();