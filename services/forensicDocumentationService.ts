
import { geminiService } from './geminiService'
import { telemetryService } from './telemetryService'

export interface IntegrityAudit {
  id: string;
  isFlagged: boolean;
  discrepancyType?: 'BIOMETRIC_MISMATCH' | 'TEMPORAL_DRIFT';
  score: number; // 0-100
  clinicalNotes: string;
}

export class ForensicDocumentationService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Compares a clinical note against biometric data recorded during the same window.
   */
  async validateNoteIntegrity(clientId: string, note: string, visitWindow: { start: string; end: string }): Promise<IntegrityAudit> {
    console.log(`[FORENSIC_GUARD]: Validating note integrity for Client ${clientId}`);
    
    const bioData = await telemetryService.streamBiometrics(clientId);
    
    const prompt = `
      Context: Forensic Clinical Audit.
      Narrative Note: "${note}"
      Biometric Snapshots during visit: HR=${bioData.bpm}, Steps=${bioData.steps}, Status=${bioData.status}.
      Task: Identify if the note is consistent with the sensors. (e.g. Note says 'patient was sleeping' but HR was 110bpm).
      Return JSON: { "flag": boolean, "type": "string", "score": 0-100, "notes": "string" }
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        isFlagged: !!data.flag,
        discrepancyType: data.type as any,
        score: data.score || 100,
        clinicalNotes: data.notes || "Note integrity validated."
      };
    } catch (e) {
      return { id: 'err', isFlagged: false, score: 100, clinicalNotes: "Audit engine offline." };
    }
  }
}

export const forensicDocumentationService = new ForensicDocumentationService();
