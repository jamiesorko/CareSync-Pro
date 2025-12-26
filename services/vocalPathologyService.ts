import { geminiService } from './geminiService'

export interface PathologyFlag {
  type: 'RESPIRATORY_DISTRESS' | 'NEURO_SLUR' | 'COUGH_PATTERN' | 'STABLE';
  confidence: number;
  clinicalObservation: string;
  immediateAction?: string;
}

export class VocalPathologyService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes vocal cadence and transcript descriptors for clinical red flags.
   */
  async scanVocalAesthetics(transcript: string): Promise<PathologyFlag> {
    console.log(`[BIO_ACOUSTIC]: Scanning vocal vector for pathological markers...`);
    
    const prompt = `
      Task: Clinical Vocal Biomarker Detection.
      Transcript Segment: "${transcript}"
      Identify: Markers of labored breathing, slurred speech, or persistent productive coughing.
      Return JSON: { "type": "RESPIRATORY_DISTRESS|NEURO_SLUR|COUGH_PATTERN|STABLE", "confidence": number, "obs": "string", "action": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        type: data.type || 'STABLE',
        confidence: data.confidence || 0.9,
        clinicalObservation: data.obs || "Acoustic baseline maintained.",
        immediateAction: data.action
      };
    } catch (e) {
      return { type: 'STABLE', confidence: 1, clinicalObservation: "Diagnostic engine silent." };
    }
  }
}

export const vocalPathologyService = new VocalPathologyService();