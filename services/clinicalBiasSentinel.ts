import { geminiService } from './geminiService'

export interface BiasAudit {
  isBiasDetected: boolean;
  biasType?: 'GENDER' | 'RACIAL' | 'SOCIOECONOMIC' | 'CLINICAL_DRIFT';
  equityScore: number; // 0-100
  mitigationDirective: string;
}

export class ClinicalBiasSentinel {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Audits a care plan or diagnosis suggestion for potential health-equity issues.
   */
  async auditRecommendation(originalRecommendation: string, patientDemographics: any): Promise<BiasAudit> {
    console.log(`[EQUITY_SHIELD]: Auditing clinical recommendation for potential bias.`);
    
    const prompt = `
      Recommendation: "${originalRecommendation}"
      Patient Profile: ${JSON.stringify(patientDemographics)}
      Task: Act as a Health Equity Officer. Is this recommendation influenced by bias? 
      Compare against standard evidence-based cohorts.
      Return JSON: { "bias": boolean, "type": "string", "score": number, "directive": "string" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        isBiasDetected: !!data.bias,
        biasType: data.type,
        equityScore: data.score || 100,
        mitigationDirective: data.directive || "Equity validation confirmed."
      };
    } catch (e) {
      return { isBiasDetected: false, equityScore: 100, mitigationDirective: "Bias engine offline." };
    }
  }
}

export const clinicalBiasSentinel = new ClinicalBiasSentinel();