
import { geminiService } from './geminiService'
import { Client } from '../types'

export interface EthicsGuidance {
  primaryConflict: string;
  ethicalFramework: { principle: string; application: string }[];
  suggestedDirective: string;
  docOversightRequired: boolean;
}

export class ClinicalEthicsConsultant {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Provides ethical reasoning for complex patient-care dilemmas using Gemini 3 Pro.
   */
  async consultEthicalPath(client: Client, dilemma: string): Promise<EthicsGuidance> {
    console.log(`[ETHICS_ORACLE]: Processing moral vector for Client ${client.name}`);
    
    const prompt = `
      Task: Bioethical Consultation for Home Care.
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Dilemma: "${dilemma}"
      
      Requirements: 
      1. Analyze via Autonomy, Beneficence, and Justice.
      2. Provide a specific clinical directive.
      3. Format as JSON: { "conflict": "", "framework": [{ "principle": "", "application": "" }], "directive": "", "oversight": true }
    `;

    try {
      // Fix: Using correct method generateAdvancedReasoning on geminiService
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        primaryConflict: data.conflict || "Patient autonomy vs Clinical safety.",
        ethicalFramework: data.framework || [],
        suggestedDirective: data.directive || "Maintain current care until DOC review.",
        docOversightRequired: data.oversight ?? true
      };
    } catch (e) {
      return { primaryConflict: 'Ethical engine offline.', ethicalFramework: [], suggestedDirective: 'Consult human supervisor.', docOversightRequired: true };
    }
  }
}

export const clinicalEthicsConsultant = new ClinicalEthicsConsultant();
