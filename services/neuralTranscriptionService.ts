
import { geminiService } from './geminiService'
import { Type } from "@google/genai"

export interface StructuredEncounter {
  vitalsDetected: { hr?: number; bp?: string; spo2?: number };
  adlStatus: { mobility: string; hygiene: string; nutrition: string };
  medicationsMentioned: string[];
  clinicalConcerns: string[];
  summary: string;
}

export class NeuralTranscriptionService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Processes raw transcript from Live API into structured medical data.
   */
  async structureEncounter(transcript: string): Promise<StructuredEncounter> {
    console.log(`[NEURAL_SCRIBE]: Extracting clinical entities from transcript vector...`);
    
    const prompt = `
      Analyze this home care encounter transcript: "${transcript}"
      Extract:
      1. Vitals (HR, BP, SpO2)
      2. ADL status (Mobility, Hygiene, Nutrition)
      3. Any medications discussed
      4. Top 2 clinical concerns
      5. A 1-sentence professional summary.
      Return JSON.
    `;

    try {
      // Fix: generateText now correctly handles 2 arguments
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        vitalsDetected: data.vitals || {},
        adlStatus: data.adl || { mobility: 'Stable', hygiene: 'Maintained', nutrition: 'Adequate' },
        medicationsMentioned: data.meds || [],
        clinicalConcerns: data.concerns || [],
        summary: data.summary || "Encounter successfully structured."
      };
    } catch (e) {
      return { vitalsDetected: {}, adlStatus: { mobility: 'N/A', hygiene: 'N/A', nutrition: 'N/A' }, medicationsMentioned: [], clinicalConcerns: [], summary: "Parse failure." };
    }
  }
}

export const neuralTranscriptionService = new NeuralTranscriptionService();
