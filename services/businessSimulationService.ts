import { GoogleGenAI } from "@google/genai";
import { StrategicScenario } from '../types';

export class BusinessSimulationService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async runScenarioSimulation(prompt: string): Promise<StrategicScenario> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const requestPrompt = `
      Healthcare CFO. Scenario: "${prompt}".
      12-month simulation. JSON: { "title": "", "projection": [], "failurePoint": "", "mitigation": "", "risk": number }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: requestPrompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 10000 } 
        }
      });
      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        title: data.title || "Strategic Forecast",
        projection: data.projection || [],
        failurePoint: data.failurePoint || "N/A",
        mitigationStrategy: data.mitigation || "N/A",
        riskIndex: data.risk || 0
      };
    } catch (e) {
      return {
        id: 'error-sim',
        companyId: 'csp-demo',
        title: "Simulation Failure",
        projection: [],
        failurePoint: "N/A",
        mitigationStrategy: "N/A",
        riskIndex: 0
      };
    }
  }
}

export const businessSimulationService = new BusinessSimulationService();