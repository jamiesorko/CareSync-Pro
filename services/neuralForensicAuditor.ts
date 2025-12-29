
import { geminiService } from './geminiService'
import { Client } from '../types'

export interface ContradictionAlert {
  clientId: string;
  contradictionSummary: string;
  involvedStaffIds: string[];
  severity: 'MED' | 'HIGH' | 'CRITICAL';
  suggestedClinicalReview: string;
}

export class NeuralForensicAuditor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Compares recent notes from multiple staff to detect inconsistencies in patient status reporting.
   */
  async auditCrossStaffConsistency(client: Client, recentNotes: { staffId: string; text: string }[]): Promise<ContradictionAlert | null> {
    console.log(`[FORENSIC_AUDIT]: Auditing clinical truth for ${client.name}`);
    
    if (recentNotes.length < 2) return null;

    const prompt = `
      Patient: ${client.name}
      Notes for Analysis: ${JSON.stringify(recentNotes)}
      Task: Act as a Clinical Fraud & Quality Auditor. Detect if these caregivers are reporting contradictory clinical states (e.g., one reports 'stable' while another reports 'stage 3 wound').
      Return JSON: { "contradiction": boolean, "summary": "string", "severity": "MED|HIGH|CRITICAL", "rec": "string" }
    `;

    try {
      // Fix: Using correct method generateAdvancedReasoning on geminiService
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      
      if (data.contradiction) {
        return {
          clientId: client.id,
          contradictionSummary: data.summary || "Clinical reporting inconsistency detected.",
          involvedStaffIds: recentNotes.map(n => n.staffId),
          severity: data.severity || 'HIGH',
          suggestedClinicalReview: data.rec || "Manual DOC oversight required."
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export const neuralForensicAuditor = new NeuralForensicAuditor();
