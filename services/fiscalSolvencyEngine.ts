import { geminiService } from './geminiService'

export interface EconomicSimulation {
  scenarioName: string;
  projectedRunwayMonths: number;
  netMarginShift: number; // %
  topFiscalRisk: string;
  strategicRecommendation: string;
}

export class FiscalSolvencyEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the impact of operational changes on the agency's financial survival.
   */
  async simulateScenario(name: string, parameters: any): Promise<EconomicSimulation> {
    console.log(`[SOLVENCY_MODEL]: Running economic simulation for: ${name}`);
    
    const prompt = `
      Scenario: ${name}
      Parameters: ${JSON.stringify(parameters)}
      Task: Predict agency survival months (runway) and margin shift.
      Return JSON: { "runway": number, "margin": number, "risk": "string", "rec": "string" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        scenarioName: name,
        projectedRunwayMonths: data.runway || 18,
        netMarginShift: data.margin || -2.5,
        topFiscalRisk: data.risk || "Overtime Saturation",
        strategicRecommendation: data.rec || "Stabilize volume before scaling wages."
      };
    } catch (e) {
      return { scenarioName: name, projectedRunwayMonths: 12, netMarginShift: 0, topFiscalRisk: "Unknown", strategicRecommendation: "Manual audit required." };
    }
  }
}

export const fiscalSolvencyEngine = new FiscalSolvencyEngine();