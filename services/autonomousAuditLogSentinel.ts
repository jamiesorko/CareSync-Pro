import { geminiService } from './geminiService'

export interface SecurityThreat {
  actorId: string;
  threatLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  logicRationale: string;
  suggestedMitigation: string;
}

export class AutonomousAuditLogSentinel {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans a batch of audit logs for behavioral anomalies indicating PII theft or insider threats.
   */
  async scanAuditTrail(logs: any[]): Promise<SecurityThreat[]> {
    console.log(`[SECURITY_SENTINEL]: Probing audit vector for Org ${this.companyId}`);
    
    const prompt = `
      Analyze these system audit logs: ${JSON.stringify(logs.slice(0, 10))}.
      Task: Detect "Data Shadowing" (staff looking at clients they don't treat) or "Credential Drift".
      Return JSON: [ { "actorId": "", "threat": "LOW|MED|HIGH|CRITICAL", "rationale": "", "mitigation": "" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      return JSON.parse(res.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const autonomousAuditLogSentinel = new AutonomousAuditLogSentinel();