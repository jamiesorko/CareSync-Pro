import { GoogleGenAI } from "@google/genai";
import { BiometricStream } from './biometricService';

export interface HallucinationAlert {
  id: string;
  sourceText: string;
  contradictoryMetric: string;
  confidenceDrift: number;
  logicFailureReason: string;
  severity: 'MED' | 'HIGH' | 'CRITICAL';
}

export class AIIntegritySentinel {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Scans for "Logic Drift" where the AI summary contradicts physical sensors.
   */
  async verifyNeuralFidelity(aiNote: string, biometrics: BiometricStream[]): Promise<HallucinationAlert | null> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const prompt = `
      Act as a Lead Neural Systems Auditor.
      AI-Generated Note: "${aiNote}"
      Raw Biometric Stream: ${JSON.stringify(biometrics)}
      
      Task: Detect "Hallucination Drift".
      Find instances where the note describes a patient state (e.g. "resting soundly") 
      that contradicts the sensors (e.g. HR 120 bpm, high steps).
      
      Return JSON: { "driftDetected": boolean, "metric": "", "reason": "", "confidence": number, "severity": "MED|HIGH|CRITICAL" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.driftDetected) {
        return {
          id: Math.random().toString(36).substring(7),
          sourceText: aiNote,
          contradictoryMetric: data.metric,
          confidenceDrift: data.confidence,
          logicFailureReason: data.reason,
          severity: data.severity
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export const aiIntegritySentinel = new AIIntegritySentinel();