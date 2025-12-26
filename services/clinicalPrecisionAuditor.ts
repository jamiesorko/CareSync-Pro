import { geminiService } from './geminiService'

export interface DocumentationGap {
  visitId: string;
  discrepancyType: 'TEMPORAL' | 'CLINICAL' | 'PROCEDURAL';
  evidence: string;
  severity: 'LOW' | 'MED' | 'HIGH';
}

export class ClinicalPrecisionAuditor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Cross-references field notes with telemetry timestamps to ensure forensic accuracy.
   */
  async auditNoteAccuracy(visitId: string, note: string, telemetryLogs: any[]): Promise<DocumentationGap | null> {
    console.log(`[PRECISION_AUDIT]: Auditing temporal alignment for Visit ${visitId}`);
    
    const prompt = `
      Note: "${note}"
      Telemetry: ${JSON.stringify(telemetryLogs)}
      Task: Detect if the caregiver's description of events contradicts the physical timestamps of vitals or GPS.
      (Example: Note says 'gave medication at 8am' but vitals shows BP surge at 10am).
      Return JSON: { "gapDetected": boolean, "type": "TEMPORAL|CLINICAL|PROCEDURAL", "evidence": "string", "severity": "LOW|MED|HIGH" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      
      if (!data.gapDetected) return null;

      return {
        visitId,
        discrepancyType: data.type || 'CLINICAL',
        evidence: data.evidence || "Documentation drift detected.",
        severity: data.severity || 'LOW'
      };
    } catch (e) {
      return null;
    }
  }
}

export const clinicalPrecisionAuditor = new ClinicalPrecisionAuditor();