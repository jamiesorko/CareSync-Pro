import { GoogleGenAI } from "@google/genai";
import { Client, HuddleSignal } from '../types';

export class ClinicalTruthFusionService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async fusePatientSignals(client: Client, transcript: string, vitals: any): Promise<HuddleSignal> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const prompt = `Clinical Auditor. Signals: ${transcript}. Vitals: ${JSON.stringify(vitals)}. JSON: { "truth": "", "contradiction": boolean, "drift": "", "directive": "", "confidence": number }`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 10000 } 
        }
      });
      const data = JSON.parse(response.text || '{}');
      return {
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        clientId: client.id,
        truthSynthesis: data.truth || "Stable.",
        contradictionDetected: !!data.contradiction,
        biometricDrift: data.drift || "None.",
        remediationDirective: data.directive || "Continue.",
        confidence: data.confidence || 0
      };
    } catch (e) {
      return {
        id: 'err-fusion',
        companyId: 'csp-demo',
        clientId: client.id,
        truthSynthesis: "Error.",
        contradictionDetected: false,
        biometricDrift: "N/A",
        remediationDirective: "Manual audit.",
        confidence: 0
      };
    }
  }
}

export const clinicalTruthFusionService = new ClinicalTruthFusionService();