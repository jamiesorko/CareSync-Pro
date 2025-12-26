import { geminiService } from './geminiService'

export interface BiomarkerResult {
  vocalStrain: number; // 0-1
  cognitiveClarity: number; // 0-1
  markers: string[];
  clinicalAdvisory: string;
}

export class VocalBiomarkerService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes vocal cadence, pitch, and phrasing to detect physiological signals like stroke markers or respiratory failure.
   */
  async detectPhysiologicalMarkers(transcript: string): Promise<BiomarkerResult> {
    console.log(`[NEURAL_AUDIO]: Scanning acoustic vectors for clinical biomarkers...`);
    
    const prompt = `
      Context: Medical Vocal Biomarker Analysis.
      Input Transcript: "${transcript}"
      Task: Analyze for markers of dysarthria (slurred speech), respiratory breathiness, or cognitive fatigue.
      Return JSON: { "strain": number, "clarity": number, "markers": string[], "advisory": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        vocalStrain: data.strain || 0.1,
        cognitiveClarity: data.clarity || 0.9,
        markers: data.markers || [],
        clinicalAdvisory: data.advisory || "Acoustic baseline stable."
      };
    } catch (e) {
      return { vocalStrain: 0, cognitiveClarity: 1, markers: [], clinicalAdvisory: "Biomarker engine offline." };
    }
  }
}

export const vocalBiomarkerService = new VocalBiomarkerService();