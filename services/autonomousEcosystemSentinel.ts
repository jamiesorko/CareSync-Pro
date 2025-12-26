import { geminiService } from './geminiService'
import { AgencyMetrics } from './analyticsService'

export interface EcosystemAlert {
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  domainCorrelation: string[];
  finding: string;
  suggestedAction: string;
}

export class AutonomousEcosystemSentinel {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Performs deep correlation analysis across different agency sectors.
   */
  async runSystemCorrelationCheck(metrics: AgencyMetrics, financials: any): Promise<EcosystemAlert[]> {
    console.log(`[ECOSYSTEM_SENTINEL]: Correlating cross-domain vectors for Org ${this.companyId}`);
    
    const context = {
      health: metrics.healthScore,
      utilization: metrics.utilizationRate,
      risk: metrics.riskVelocity,
      revenue: financials.revenue,
      margin: financials.margin
    };

    const prompt = `
      Analyze healthcare agency health: ${JSON.stringify(context)}.
      Task: Identify if a drop in one metric is causing a cascade elsewhere. 
      (e.g. Low utilization causing revenue drift, or high risk causing staff churn).
      Return JSON: [ { "severity": "INFO|WARN|CRITICAL", "domains": [], "finding": "", "action": "" } ]
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({
        severity: d.severity,
        domainCorrelation: d.domains,
        finding: d.finding,
        suggestedAction: d.action
      }));
    } catch (e) {
      return [];
    }
  }
}

export const autonomousEcosystemSentinel = new AutonomousEcosystemSentinel();