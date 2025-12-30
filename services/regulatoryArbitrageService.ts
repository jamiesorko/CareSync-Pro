
import { GoogleGenAI } from "@google/genai";
import { RegulatoryPatch } from '../types';

export class RegulatoryArbitrageService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Scans for new health laws and proactively drafts policy corrections.
   */
  async interceptNewDirectives(region: string): Promise<RegulatoryPatch[]> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const query = `New Ontario health regulation amendments tabled this month October 2025. Mandatory reporting, wage updates, or staffing ratios for home care.`;
    
    const prompt = `
      Act as a Lead Regulatory Intelligence Officer. 
      Signals: ${query}
      
      Task: Detect "Legislative Drift".
      1. Identify exactly 1 new tabled law or mandate.
      2. Draft a professional "Standard Operating Procedure" amendment.
      3. Identify which existing agency SOPs are now "Technically Non-Compliant".
      
      Return JSON: { 
        "law": "Bill/Regulation Name", 
        "affected": ["SOP names"], 
        "draft": "Full SOP update text", 
        "deadline": "Effective Date" 
      }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json" 
        }
      });

      const data = JSON.parse(response.text || '{}');
      return [{
        id: Math.random().toString(36).substring(7),
        companyId: 'csp-demo',
        newLawReference: data.law || "Emerging Mandate",
        affectedSOPs: data.affected || ["Global Compliance Vector"],
        autoDraftedRevision: data.draft || "Drafting complete. Awaiting review.",
        complianceDeadline: data.deadline || "Next 30 Days"
      }];
    } catch (e) {
      return [];
    }
  }
}

export const regulatoryArbitrageService = new RegulatoryArbitrageService();
