
import { geminiService } from './geminiService'

export interface TrainingROI {
  moduleId: string;
  outcomeImprovementPercent: number;
  statisticalConfidence: number;
  clinicalNarrative: string;
  recommendedScaling: boolean;
}

export class NeuralProtocolValidator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Correlates training completion data with clinical outcome trends.
   */
  async validateTrainingROI(moduleId: string, outcomeData: any[]): Promise<TrainingROI> {
    console.log(`[QUALITY_CORE]: Calculating ROI for Training Module ${moduleId}`);
    
    const prompt = `
      Training: ${moduleId}
      Clinical Outcomes: ${JSON.stringify(outcomeData)}
      Task: Does this training correlate with better patient outcomes? (e.g. fewer falls, faster healing).
      Return JSON: { "improvement": number, "confidence": number, "narrative": "string", "scale": boolean }
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        moduleId,
        outcomeImprovementPercent: data.improvement || 0,
        statisticalConfidence: data.confidence || 0.5,
        clinicalNarrative: data.narrative || "No significant correlation detected.",
        recommendedScaling: data.scale ?? false
      };
    } catch (e) {
      return { moduleId, outcomeImprovementPercent: 0, statisticalConfidence: 0, clinicalNarrative: "Validation error.", recommendedScaling: false };
    }
  }
}

export const neuralProtocolValidator = new NeuralProtocolValidator();
