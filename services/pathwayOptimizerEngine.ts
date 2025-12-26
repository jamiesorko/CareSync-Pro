import { geminiService } from './geminiService'

export interface PathwayAdjustment {
  patientCohort: string;
  recommendedTaskAdd: string;
  rationale: string;
  projectedOutcomeImprovement: number; // %
}

export class PathwayOptimizerEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Correlates visit data with outcome trends to suggest "High ROI" care pathway updates.
   */
  async computePathwayOptimizations(outcomeData: any): Promise<PathwayAdjustment[]> {
    console.log(`[CLINICAL_AI]: Analyzing agency-wide success patterns...`);
    
    const prompt = `
      Data: ${JSON.stringify(outcomeData)}
      Task: Identify 2 specific clinical interventions that consistently lead to faster patient stabilization. 
      Recommend these as standard additions for patients in the same cohort.
      Return JSON: [ { "cohort": "string", "task": "string", "rationale": "string", "improvement": number } ]
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        patientCohort: d.cohort,
        recommendedTaskAdd: d.task,
        rationale: d.rationale,
        projectedOutcomeImprovement: d.improvement
      }));
    } catch (e) {
      return [];
    }
  }
}

export const pathwayOptimizerEngine = new PathwayOptimizerEngine();