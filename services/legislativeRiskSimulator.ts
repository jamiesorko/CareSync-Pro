import { geminiService } from './geminiService'

export interface FiscalImpactModel {
  mandateName: string;
  projectedAnnualCost: number;
  marginImpactPercent: number;
  operationalRiskLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  suggestedStrategicPivot: string;
}

export class LegislativeRiskSimulator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the 'Blast Radius' of new legislation on the agency's bottom line.
   */
  async simulateLegislativeImpact(rawLegislationText: string): Promise<FiscalImpactModel> {
    console.log(`[RISK_SIMULATOR]: Modeling legislative vector for Org ${this.companyId}...`);
    
    const prompt = `
      Mandate: "${rawLegislationText}"
      Task: Act as a Healthcare CFO. Predict the cost of compliance for a mid-size home care agency (150 patients).
      Analyze: Wage increases, documentation overhead, and liability shifts.
      Return JSON: { "name": "", "cost": number, "margin": number, "risk": "LOW|MED|HIGH|CRITICAL", "pivot": "" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const d = JSON.parse(res.text || '{}');
      return {
        mandateName: d.name || "New Regulatory Signal",
        projectedAnnualCost: d.cost || 0,
        marginImpactPercent: d.margin || 0,
        operationalRiskLevel: d.risk || 'MED',
        suggestedStrategicPivot: d.pivot || "Maintain current fiscal buffers."
      };
    } catch (e) {
      return { mandateName: "Signal Error", projectedAnnualCost: 0, marginImpactPercent: 0, operationalRiskLevel: 'HIGH', suggestedStrategicPivot: "Manual audit required." };
    }
  }
}

export const legislativeRiskSimulator = new LegislativeRiskSimulator();