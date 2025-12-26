import { geminiService } from './geminiService'

export interface BenchmarkScorecard {
  domain: string;
  agencyValue: number;
  industryAvg: number;
  marketInsight: string;
  strategicOpportunity: string;
}

export class OutcomeBenchmarkingService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to find current industry norms and compares internal KPIs.
   */
  async runStrategicAudit(metricName: string, internalValue: number): Promise<BenchmarkScorecard> {
    console.log(`[MARKET_INTEL]: Benchmarking ${metricName} against regional norms.`);
    
    const query = `Latest home care industry benchmarks for ${metricName} in Ontario for October 2025. Expected average for mid-size private agencies.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      const analysisPrompt = `
        Internal KPI: ${metricName} = ${internalValue}
        Industry Context: ${text}
        Task: Analyze competitive standing. 
        Return JSON: { "avg": number, "insight": "string", "opp": "string" }
      `;

      const analysis = await geminiService.generateText(analysisPrompt, false);
      const data = JSON.parse(analysis.text || '{}');

      return {
        domain: metricName,
        agencyValue: internalValue,
        industryAvg: data.avg || 0,
        marketInsight: data.insight || "Standard performance vector.",
        strategicOpportunity: data.opp || "Maintain current quality protocols."
      };
    } catch (e) {
      return { domain: metricName, agencyValue: internalValue, industryAvg: 0, marketInsight: "Signal failure.", strategicOpportunity: "Manual audit required." };
    }
  }
}

export const outcomeBenchmarkingService = new OutcomeBenchmarkingService();