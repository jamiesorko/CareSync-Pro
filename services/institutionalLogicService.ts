import { GoogleGenAI } from "@google/genai";

export interface LogicAnomalies {
  domain: 'CLINICAL' | 'FISCAL' | 'ROSTER';
  severity: 'MED' | 'HIGH' | 'CRITICAL';
  description: string;
  remediationPath: string;
  autoHealProbability: number;
}

export class InstitutionalLogicService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Scans for "Logic Drift"—inconsistencies where data nodes contradict each other.
   */
  async scanForLogicDrift(datasetFragment: any): Promise<LogicAnomalies[]> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const prompt = `
      Act as a Neural Systems Integrity Auditor.
      Input Vector: ${JSON.stringify(datasetFragment)}
      
      Task: Detect "Sovereignty Failures" (Logic Drift).
      Find examples like:
      - Billing for visits where GPS shows staff never arrived.
      - Meds administered by staff lacking license verification.
      - Patient acuity climbing but visit density dropping.
      
      Return JSON array of LogicAnomalies: [ { "domain": "CLINICAL|FISCAL|ROSTER", "severity": "MED|HIGH|CRITICAL", "description": "", "remediation": "", "autoHeal": number } ]
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      return JSON.parse(response.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const institutionalLogicService = new InstitutionalLogicService();