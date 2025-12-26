import { GoogleGenAI } from "@google/genai";

export interface LawChange {
  title: string;
  effectiveDate: string;
  summary: string;
  affectedSOPs: string[];
  sourceUrl: string;
}

export class RegulatoryRadarService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Scans global signals for regional healthcare law updates.
   */
  async scanLegislativeDrift(region: string): Promise<LawChange[]> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const query = `Latest updates to Ontario Long-Term Care Act and PSW wage parity laws as of October 2025. Mandatory reporting changes for home care agencies.`;
    
    const prompt = `
      Act as a Lead Compliance Attorney. 
      Analyze current signals for: ${query}
      
      Task: Identify 2 specific legislative changes.
      For each, identify the internal SOP (Standard Operating Procedure) most at risk of drift.
      
      Return JSON array: [ { "title": "", "date": "", "summary": "", "sops": [], "url": "" } ]
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

      const data = JSON.parse(response.text || '[]');
      return data.map((d: any) => ({
        title: d.title,
        effectiveDate: d.date,
        summary: d.summary,
        affectedSOPs: d.sops,
        sourceUrl: d.url
      }));
    } catch (e) {
      return [];
    }
  }
}

export const regulatoryRadarService = new RegulatoryRadarService();