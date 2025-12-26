import { geminiService } from './geminiService'
import { CareRole } from '../types'

export interface ScopeViolation {
  isViolation: boolean;
  taskDetected: string;
  severity: 'LOW' | 'MED' | 'HIGH';
  remediation: string;
}

export class CompetencyAuditService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans narrative clinical notes for "Controlled Acts" performed by unlicensed staff.
   */
  async auditPractitionerScope(role: CareRole, note: string): Promise<ScopeViolation> {
    console.log(`[SCOPE_AUDIT]: Auditing note for role ${role}`);
    
    const prompt = `
      Role: ${role}
      Note: "${note}"
      Task: Check if this role performed a task outside their standard scope of practice 
      (e.g., PSW performing catheterization without delegation). 
      Return JSON: { "isViolation": boolean, "task": "string", "severity": "string", "remediation": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        isViolation: data.isViolation || false,
        taskDetected: data.task || "N/A",
        severity: data.severity || 'LOW',
        remediation: data.remediation || "No action required."
      };
    } catch (e) {
      return { isViolation: false, taskDetected: "N/A", severity: 'LOW', remediation: "" };
    }
  }
}

export const competencyAuditService = new CompetencyAuditService();