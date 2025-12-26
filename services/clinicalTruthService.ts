import { geminiService } from './geminiService'
import { VitalsData } from './vitalsService'

export interface IntegrityCheck {
  isTruthful: boolean;
  contradictionDetail?: string;
  severity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
}

export class ClinicalTruthService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Cross-references notes against vitals to ensure documentation integrity.
   */
  async verifyIntegrity(note: string, vitals: VitalsData): Promise<IntegrityCheck> {
    console.log(`[CLINICAL_TRUTH]: Auditing narrative vs biometric signals...`);
    
    const prompt = `
      Narrative Note: "${note}"
      Biometrics: HR ${vitals.heartRate}, BP ${vitals.systolic}/${vitals.diastolic}
      
      Task: Identify if the note's description of the patient's state contradicts the physical data. 
      (Example: Note says 'Patient sleeping soundly' but HR is 135 bpm).
      Return JSON: { "truthful": boolean, "detail": "string", "severity": "LOW|MED|HIGH|CRITICAL" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        isTruthful: data.truthful ?? true,
        contradictionDetail: data.detail,
        severity: data.severity || 'LOW'
      };
    } catch (e) {
      return { isTruthful: true, severity: 'LOW' };
    }
  }
}

export const clinicalTruthService = new ClinicalTruthService();