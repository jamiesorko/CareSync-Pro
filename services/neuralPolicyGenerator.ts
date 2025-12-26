import { geminiService } from './geminiService'

export interface PolicyDraft {
  title: string;
  sections: { heading: string; content: string }[];
  regulatoryReference: string;
  docApprovalRequired: boolean;
}

export class NeuralPolicyGenerator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Generates a comprehensive clinical or operational protocol from a brief directive.
   */
  async generateSOP(promptText: string): Promise<PolicyDraft> {
    console.log(`[POLICY_FORGE]: Synthesizing regulatory-aligned protocol for: ${promptText}`);
    
    const prompt = `
      Act as a Senior Clinical Quality & Compliance Director. 
      Topic: "${promptText}"
      Task: Generate a full Standard Operating Procedure (SOP).
      Include: Purpose, Scope, Procedures, and Mandatory Documentation.
      Format: Return ONLY valid JSON with structure: { "title": "", "sections": [{ "heading": "", "content": "" }], "ref": "", "needsDoc": true }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        title: data.title || "Standardized Protocol",
        sections: data.sections || [],
        regulatoryReference: data.ref || "O. Reg. 166/11 (Health Care)",
        docApprovalRequired: data.needsDoc ?? true
      };
    } catch (e) {
      return { title: 'Failed to generate', sections: [], regulatoryReference: 'N/A', docApprovalRequired: true };
    }
  }
}

export const neuralPolicyGenerator = new NeuralPolicyGenerator();