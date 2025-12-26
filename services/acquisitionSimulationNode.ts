import { geminiService } from './geminiService'

export interface MergerAnalysis {
  targetAgency: string;
  operationalSynergyScore: number;
  fiscalRunwayImpact: number; // Months
  staffRedundancyRisk: string[];
  strategicRecommendation: string;
}

export class AcquisitionSimulationNode {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the 'Org-Crush' impact of merging another agency into the neural core.
   */
  async simulateMerger(targetStats: any): Promise<MergerAnalysis> {
    console.log(`[STRATEGIC_CEO]: Modeling M&A vector for ${targetStats.name}`);
    
    const context = {
      internalBurn: "$8,400 Weekly",
      targetBurn: targetStats.weeklyBurn,
      internalStaff: 60,
      targetStaff: targetStats.staffCount,
      regionOverlap: targetStats.regionOverlap
    };

    const prompt = `
      Task: Act as an M&A Healthcare Strategist. 
      Analyze: ${JSON.stringify(context)}.
      Predict: Synergy score (0-100), impact on cash runway, redundancy clusters, and a 'Go/No-Go' recommendation.
      Return JSON: { "synergy": number, "runway": number, "redundancies": [], "rec": "" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        targetAgency: targetStats.name,
        operationalSynergyScore: data.synergy || 50,
        fiscalRunwayImpact: data.runway || 0,
        staffRedundancyRisk: data.redundancies || [],
        strategicRecommendation: data.rec || "Simulation inconclusive."
      };
    } catch (e) {
      return { targetAgency: targetStats.name, operationalSynergyScore: 0, fiscalRunwayImpact: 0, staffRedundancyRisk: [], strategicRecommendation: "Engine failure." };
    }
  }
}

export const acquisitionSimulationNode = new AcquisitionSimulationNode();