import { GoogleGenAI } from "@google/genai";

export interface CapitalPulse {
  liquidReserves: number;
  burnRateWeekly: number;
  runwayMonths: number;
  marketLeverageScore: number; // 0-100
  expansionCapacity: number; // CAD
  strategicPivots: { title: string; rationale: string; risk: string }[];
}

export class CapitalGovernorService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Forecasts the agency's economic sovereignty based on internal ledger and global market grounded signals.
   */
  async forecastStrategicCapital(agencyMetrics: any, region: string): Promise<CapitalPulse> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    // Macro-economic grounding for interest rates, inflation, and healthcare funding shifts
    const query = `Bank of Canada interest rate outlook and healthcare labor inflation trends in ${region}, Ontario for late 2025.`;
    
    const prompt = `
      Act as a Chief Financial Officer for a high-growth Healthcare ERP.
      Agency Stats: ${JSON.stringify(agencyMetrics)}
      Market Query Context: ${query}
      
      Task: Perform an Institutional Capital Audit.
      1. Calculate Burn Rate and Liquid Runway.
      2. Analyze "Market Leverage" (Should the agency take on debt for expansion?).
      3. Suggest 2 specific Strategic Pivots (e.g., pivot to high-margin post-op niches).
      4. Estimate "Expansion Capacity" (How much capital can be deployed without breaking the burn ceiling?).
      
      Return JSON: { 
        "burn": number, 
        "runway": number, 
        "leverage": number, 
        "capacity": number, 
        "pivots": [ { "title": "", "rationale": "", "risk": "" } ] 
      }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 24576 }
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        liquidReserves: agencyMetrics.reserves || 450000,
        burnRateWeekly: data.burn || 12000,
        runwayMonths: data.runway || 18,
        marketLeverageScore: data.leverage || 72,
        expansionCapacity: data.capacity || 150000,
        strategicPivots: data.pivots || []
      };
    } catch (e) {
      console.error("Capital intelligence bottleneck:", e);
      throw e;
    }
  }
}

export const capitalGovernorService = new CapitalGovernorService();