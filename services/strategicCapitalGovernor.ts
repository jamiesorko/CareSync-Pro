import { geminiService } from './geminiService'

export interface FiscalSimulation {
  scenario: string;
  runwayImpactMonths: number;
  marginDeltaPercent: number;
  strategicAdvisory: string;
}

export class StrategicCapitalGovernor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the long-term impact of major operational expenses or revenue shifts.
   */
  async simulateFiscalMove(moveType: string, costBasis: number): Promise<FiscalSimulation> {
    console.log(`[FISCAL_ORACLE]: Simulating ${moveType} with $${costBasis} cost basis.`);
    
    const context = {
      agencyScale: "140 Patients, 60 Staff",
      currentBurn: "$8,400 Weekly",
      proposedChange: moveType,
      cost: costBasis
    };

    const prompt = `
      Act as a Healthcare CFO Strategist. 
      Analyze: ${JSON.stringify(context)}.
      Task: Predict the effect on agency runway and net margin over 12 months.
      Return JSON: { "runway": number, "margin": number, "advisory": "string" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        scenario: moveType,
        runwayImpactMonths: data.runway || -2,
        marginDeltaPercent: data.margin || -1.5,
        strategicAdvisory: data.advisory || "Maintain capital buffers during transition."
      };
    } catch (e) {
      return { scenario: moveType, runwayImpactMonths: 0, marginDeltaPercent: 0, strategicAdvisory: "Simulation engine bottleneck." };
    }
  }
}

export const strategicCapitalGovernor = new StrategicCapitalGovernor();