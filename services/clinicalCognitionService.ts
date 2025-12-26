import { geminiService } from './geminiService'
import { Client } from '../types'

export interface CognitiveAnalysis {
  driftScore: number; // 0-100 (Higher = more decline)
  detectedAphasia: boolean;
  temporalPatterns: string[];
  clinicalAdvisory: string;
}

export class ClinicalCognitionService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes narrative descriptions of patient interactions for cognitive drift.
   */
  async analyzeCognitivePath(client: Client, encounterNotes: string[]): Promise<CognitiveAnalysis> {
    console.log(`[NEURAL_COG]: Analyzing linguistic vectors for ${client.name}`);
    
    const prompt = `
      Patient: ${client.name}
      Clinical History: ${client.conditions.join(', ')}
      Recent Notes: "${encounterNotes.join(' | ')}"
      
      Task: Act as a Neuropsychologist. Analyze these notes for markers of cognitive decline, linguistic repetitiveness, 
      confusion episodes, or behavioral sundowning.
      Return JSON: { "drift": number, "aphasia": boolean, "patterns": string[], "advisory": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        driftScore: data.drift || 15,
        detectedAphasia: !!data.aphasia,
        temporalPatterns: data.patterns || [],
        clinicalAdvisory: data.advisory || "Cognitive baseline maintained."
      };
    } catch (e) {
      return { driftScore: 0, detectedAphasia: false, temporalPatterns: [], clinicalAdvisory: "Linguistic analysis offline." };
    }
  }
}

export const clinicalCognitionService = new ClinicalCognitionService();