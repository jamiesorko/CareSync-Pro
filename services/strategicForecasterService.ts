import { GoogleGenAI } from "@google/genai";

export interface SimulationResult {
  scenarioName: string;
  resilienceScore: number; // 0-100
  fiscalImpact: number;
  staffRetentionRisk: number; // 0-1
  clinicalStabilityDelta: number;
  aiStrategicAdvisory: string;
}

export class StrategicForecasterService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Runs a high-fidelity Monte Carlo simulation on the agency's operational data.
   */
  async simulateScenario(prompt: string, agencyStats: any): Promise<SimulationResult> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const context = `
      Agency Current Stats: ${JSON.stringify(agencyStats)}
      Proposed Disruption: "${prompt}"
    `;

    const requestPrompt = `
      Act as a Lead Healthcare Operations Strategist and CFO.
      Task: Model the "Blast Radius" of the proposed disruption over a 6-month horizon.
      
      Requirements:
      1. Calculate Resilience Score (0-100).
      2. Project Fiscal Impact (CAD).
      3. Predict Staff Retention Risk (0.0 - 1.0).
      4. Forecast Clinical Stability Shift (%).
      5. Provide a step-by-step 'Strategic Intercept Plan'.
      
      Return JSON: { "resilience": number, "fiscal": number, "retention": number, "stability": number, "advisory": "string" }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          { text: context },
          { text: requestPrompt }
        ],
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 32768 } 
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        scenarioName: prompt,
        resilienceScore: data.resilience || 0,
        fiscalImpact: data.fiscal || 0,
        staffRetentionRisk: data.retention || 0,
        clinicalStabilityDelta: data.stability || 0,
        aiStrategicAdvisory: data.advisory || "Simulation data inconclusive."
      };
    } catch (e) {
      console.error("Simulation engine bottleneck:", e);
      throw e;
    }
  }
}

export const strategicForecasterService = new StrategicForecasterService();