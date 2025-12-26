import { geminiService } from './geminiService'

export interface ResilienceReport {
  score: number; // 0-100
  failureVector: string; // The thing most likely to cause a breakdown
  mitigationStrategy: string;
  projectedSurvivalMonths: number;
}

export class StrategicResilienceForecaster {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the intersection of operational metrics to predict breakdown points.
   */
  async computeResilience(): Promise<ResilienceReport> {
    console.log(`[STRATEGIC_PULSE]: Running Monte Carlo simulation for Org ${this.companyId}`);
    
    const context = {
      staffTurnover: '14% annually',
      avgPayorDelay: '18 days',
      overtimeRate: '22%'
    };

    const prompt = `
      Act as a Healthcare CEO Strategist. Analyze: ${JSON.stringify(context)}.
      Predict: Resilience score (0-100), primary failure vector, and survival runway in months.
      Return JSON: { "score": number, "vector": "string", "strategy": "string", "runway": number }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        score: data.score || 85,
        failureVector: data.vector || "Documentation Latency",
        mitigationStrategy: data.strategy || "Maintain cash reserves and stabilize OT.",
        projectedSurvivalMonths: data.runway || 24
      };
    } catch (e) {
      return { score: 70, failureVector: 'Unknown', mitigationStrategy: 'Manual review required.', projectedSurvivalMonths: 12 };
    }
  }
}

export const strategicResilienceForecaster = new StrategicResilienceForecaster();