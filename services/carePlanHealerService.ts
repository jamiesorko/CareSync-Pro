import { GoogleGenAI } from "@google/genai";
import { Client } from '../types';

export interface LogicGap {
  id: string;
  type: 'OMISSION' | 'CONTRADICTION' | 'EFFICIENCY';
  description: string;
  suggestedFix: string;
  rationale: string;
}

export class CarePlanHealerService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Audits a care plan for clinical integrity using Gemini 3 Pro.
   */
  async auditPlanIntegrity(client: Client): Promise<LogicGap[]> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const prompt = `
      Act as a Lead Clinical Quality Auditor.
      Patient: ${client.name}
      Conditions: ${client.conditions.join(', ')}
      Current Care Tasks: ${JSON.stringify(client.carePlans)}
      
      Task: Find 'Care Logic Gaps'.
      1. Identify missing tasks required for the conditions (Omissions).
      2. Identify conflicting tasks (Contradictions).
      3. Suggest a specific task to fix the gap.
      
      Return JSON array of LogicGap: [ { "type": "OMISSION|CONTRADICTION", "desc": "", "fix": "", "reason": "" } ]
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 15000 } 
        }
      });

      const data = JSON.parse(response.text || '[]');
      return data.map((d: any) => ({
        id: Math.random().toString(36).substring(7),
        type: d.type,
        description: d.desc,
        suggestedFix: d.fix,
        rationale: d.reason
      }));
    } catch (e) {
      return [];
    }
  }
}

export const carePlanHealerService = new CarePlanHealerService();