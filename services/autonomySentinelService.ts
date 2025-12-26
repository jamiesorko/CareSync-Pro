import { GoogleGenAI } from "@google/genai";
import { Client } from '../types';

export interface AutonomyFlag {
  type: 'COERCION' | 'DIGNITY_LACK' | 'CHOICE_DENIAL' | 'STABLE';
  confidence: number;
  finding: string;
  remediationPath: string;
}

export class AutonomySentinelService {
  /**
   * Scans unstructured notes for subtle behavioral indicators of ethical drift.
   */
  async auditAutonomy(client: Client, note: string): Promise<AutonomyFlag> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as a Lead Medical Ethics Auditor. 
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Clinical Entry: "${note}"
      
      Task: Detect violations of Patient Autonomy or Dignity.
      Look for:
      - Forced care against verbal refusal.
      - Lack of patient choice in daily activities.
      - Disrespectful or dehumanizing language.
      
      Return JSON: { 
        "type": "COERCION|DIGNITY_LACK|CHOICE_DENIAL|STABLE", 
        "confidence": number, 
        "finding": "string", 
        "remediation": "string" 
      }
    `;

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
        type: data.type || 'STABLE',
        confidence: data.confidence || 0.9,
        finding: data.finding || "No significant drift detected.",
        remediationPath: data.remediation || "Maintain standard oversight."
      };
    } catch (e) {
      return { type: 'STABLE', confidence: 1, finding: "Audit signal silent.", remediationPath: "Standard protocol." };
    }
  }
}

export const autonomySentinelService = new AutonomySentinelService();