import { geminiService } from './geminiService'
import { CareRole } from '../types'

export interface WorkflowTask {
  dayRange: string;
  role: CareRole;
  directive: string;
  mandatoryFormId?: string;
}

export class ClinicalWorkflowSynthesizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Transforms a clinical diagnosis into a structured, role-sequenced care pathway.
   */
  async synthesizeWorkflow(diagnosis: string): Promise<WorkflowTask[]> {
    console.log(`[WORKFLOW_FORGE]: Sequencing clinical vectors for: ${diagnosis}`);
    
    const prompt = `
      Task: Clinical Pathway Synthesis.
      Diagnosis: "${diagnosis}"
      Required Roles: RN, PSW, HSS.
      Requirement: Create a 30-day task sequence.
      Return JSON: [ { "dayRange": "1-7", "role": "RN|PSW|HSS", "directive": "string", "form": "string" } ]
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        dayRange: d.dayRange,
        role: d.role as CareRole,
        directive: d.directive,
        mandatoryFormId: d.form
      }));
    } catch (e) {
      return [];
    }
  }
}

export const clinicalWorkflowSynthesizer = new ClinicalWorkflowSynthesizer();