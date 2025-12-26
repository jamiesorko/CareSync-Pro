import { geminiService } from './geminiService'
import { Client } from '../types'

export interface ClinicalSynthesis {
  hiddenRiskDetected: boolean;
  indicatorType: 'RESPIRATORY' | 'NUTRITIONAL' | 'COGNITIVE' | 'WOUND';
  reasoning: string;
  recommendedSpecialist: string;
  urgency: 'ROUTINE' | 'ELEVATED' | 'CRITICAL';
}

export class ClinicalEvidenceSynthesizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Performs longitudinal synthesis of unstructured notes to find non-obvious clinical decline.
   */
  async synthesizeEvidence(client: Client, weeklyNotes: string[]): Promise<ClinicalSynthesis | null> {
    console.log(`[CLINICAL_SYNTH]: Analyzing multi-day evidence vector for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Notes: "${weeklyNotes.join(' | ')}"
      
      Task: Act as a Senior Clinical Auditor. Find "The Missing Link". 
      Identify if the staff are noting symptoms that suggest a NEW problem not currently in the care plan 
      (e.g., notes mention "coughing during meals" suggesting swallowing issues).
      Return JSON: { "detected": boolean, "type": "string", "reasoning": "string", "specialist": "string", "urgency": "ROUTINE|ELEVATED|CRITICAL" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      
      if (!data.detected) return null;

      return {
        hiddenRiskDetected: true,
        indicatorType: data.type || 'CLINICAL',
        reasoning: data.reasoning || "Patterns of concern detected in field notes.",
        recommendedSpecialist: data.specialist || "RN Review",
        urgency: data.urgency || 'ROUTINE'
      };
    } catch (e) {
      return null;
    }
  }
}

export const clinicalEvidenceSynthesizer = new ClinicalEvidenceSynthesizer();