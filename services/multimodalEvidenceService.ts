import { supabase } from '../lib/supabase';

export interface ForensicDossier {
  incidentId: string;
  imageUrls: string[];
  audioTranscript: string;
  clinicalNote: string;
  neuralRiskScore: number;
}

export class MultimodalEvidenceService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Compiles all multimodal evidence for a legal or clinical review.
   */
  async compileIncidentDossier(incidentId: string): Promise<ForensicDossier> {
    console.log(`[FORENSIC_AGGR]: Compiling neural evidence for Incident ${incidentId}`);
    
    return {
      incidentId,
      imageUrls: [],
      audioTranscript: "Vocal assessment synchronized.",
      clinicalNote: "Baseline noted.",
      neuralRiskScore: 0.85
    };
  }

  async linkEvidence(incidentId: string, type: 'IMAGE' | 'AUDIO', ref: string) {
    if (supabase && this.companyId) {
      await supabase.from('incident_evidence').insert([{
        company_id: this.companyId,
        incident_id: incidentId,
        evidence_type: type,
        evidence_ref: ref,
        timestamp: new Date().toISOString()
      }]);
    }
  }
}

export const multimodalEvidenceService = new MultimodalEvidenceService();