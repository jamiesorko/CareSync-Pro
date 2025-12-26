import { geminiService } from './geminiService'
import { Client } from '../types'

export interface BlindspotAlert {
  clientId: string;
  missingClinicalMarker: string;
  rationale: string;
  urgency: 'MED' | 'HIGH';
}

export class ClinicalBlindspotDetector {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes what is NOT present in the notes for a specific diagnosis.
   */
  async detectGapsInEvidence(client: Client, recentNotes: string[]): Promise<BlindspotAlert[]> {
    console.log(`[BLINDSPOT_AI]: Scanning clinical absence vectors for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Notes from last 48h: "${recentNotes.join(' | ')}"
      
      Task: Act as a Clinical Quality Auditor. 
      Identify essential documentation markers that are MISSING for these conditions (e.g. no mention of breath sounds for COPD).
      Return JSON: [ { "marker": "string", "reason": "string", "urgency": "MED|HIGH" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        clientId: client.id,
        missingClinicalMarker: d.marker,
        rationale: d.reason,
        urgency: d.urgency
      }));
    } catch (e) {
      return [];
    }
  }
}

export const clinicalBlindspotDetector = new ClinicalBlindspotDetector();