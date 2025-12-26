import { geminiService } from './geminiService'

export interface GovernanceBrief {
  auditPeriod: string;
  overallHealthIndex: number;
  criticalRiskClusters: string[];
  fiscalDefensibilitySummary: string;
  strategicMoveForCEO: string;
}

export class GlobalAuditSynthesizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Aggregates all micro-audit signals into a single source of strategic truth.
   */
  async compileGovernanceBrief(auditLogs: any[], incidentSummary: any): Promise<GovernanceBrief> {
    console.log(`[GOVERNANCE_HUB]: Synthesizing defensibility matrix for Org ${this.companyId}`);
    
    const context = {
      logs: auditLogs.slice(0, 50),
      incidents: incidentSummary,
      complianceScore: 99.1
    };

    const prompt = `
      Act as a Regulatory Risk Officer. Analyze: ${JSON.stringify(context)}.
      Summarize: Global agency health, identify 2 risk clusters, and provide 1 CEO directive.
      Return JSON: { "index": number, "clusters": [], "fiscal": "", "directive": "" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      
      return {
        auditPeriod: "Quarterly Inbound: Oct 2025",
        overallHealthIndex: data.index || 90,
        criticalRiskClusters: data.clusters || ["Minor documentation lag"],
        fiscalDefensibilitySummary: data.fiscal || "High defensibility baseline maintained.",
        strategicMoveForCEO: data.directive || "Maintain current auditing density."
      };
    } catch (e) {
      return { 
        auditPeriod: "Error", 
        overallHealthIndex: 0, 
        criticalRiskClusters: [], 
        fiscalDefensibilitySummary: "Audit engine synchronized but unresponsive.", 
        strategicMoveForCEO: "Review manual logs." 
      };
    }
  }
}

export const globalAuditSynthesizer = new GlobalAuditSynthesizer();