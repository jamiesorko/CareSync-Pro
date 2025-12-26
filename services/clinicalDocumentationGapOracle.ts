import { geminiService } from './geminiService'
import { Client } from '../types'

export interface DocumentationGapAlert {
  clientId: string;
  missingIndicator: string;
  auditRiskLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  justification: string;
  correctiveDirective: string;
}

export class ClinicalDocumentationGapOracle {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes what is NOT said in recent notes for a specific diagnosis.
   */
  async detectClinicalSilences(client: Client, recentNotes: string[]): Promise<DocumentationGapAlert[]> {
    console.log(`[GAP_ORACLE]: Scanning for documentation silences for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name}
      Diagnosis: ${client.conditions.join(', ')}
      Recent Notes: "${recentNotes.join(' | ')}"
      
      Task: Act as a Forensic Clinical Auditor. 
      Identify essential documentation markers (e.g. skin integrity, respiratory sounds, edema) that have NOT been mentioned in the last 4 days but ARE required for this diagnosis.
      Return JSON: [ { "indicator": "string", "risk": "LOW|MED|HIGH|CRITICAL", "reason": "string", "directive": "string" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        clientId: client.id,
        missingIndicator: d.indicator,
        auditRiskLevel: d.risk || 'MED',
        justification: d.reason,
        correctiveDirective: d.directive
      }));
    } catch (e) {
      return [];
    }
  }
}

export const clinicalDocumentationGapOracle = new ClinicalDocumentationGapOracle();