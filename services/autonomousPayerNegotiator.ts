import { geminiService } from './geminiService'

export interface NegotiationBrief {
  payorName: string;
  marketRateBenchmark: string;
  proposedIncrease: number;
  dataPoints: string[];
  draftedLetter: string;
}

export class AutonomousPayerNegotiator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to find regional billing norms and drafts a strategic negotiation letter.
   */
  async prepareNegotiation(payor: string, region: string): Promise<NegotiationBrief> {
    console.log(`[FISCAL_STRATEGY]: Ingesting market reimbursement vectors for ${payor} in ${region}`);
    
    const query = `Current private insurance and government reimbursement rates for home care nursing and PSW services in ${region}, Ontario October 2025. Benchmarks for ${payor}.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Payor: ${payor}
        Market Context: ${res.text}
        Task: Draft a formal negotiation brief from the COO to ${payor}. Argue for a rate increase based on these market signals.
        Return JSON: { "marketBenchmark": "", "increase": number, "points": [], "letter": "" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(analysis.text || '{}');

      return {
        payorName: payor,
        marketRateBenchmark: data.marketBenchmark || "Market rate variance detected.",
        proposedIncrease: data.increase || 5.0,
        dataPoints: data.points || [],
        draftedLetter: data.letter || "Formal brief pending manual review."
      };
    } catch (e) {
      return { payorName: payor, marketRateBenchmark: "N/A", proposedIncrease: 0, dataPoints: [], draftedLetter: "Negotiation engine bottleneck." };
    }
  }
}

export const autonomousPayerNegotiator = new AutonomousPayerNegotiator();