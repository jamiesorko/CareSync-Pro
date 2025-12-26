import { geminiService } from './geminiService'

export interface ExecutiveBundle {
  timestamp: string;
  summaryNote: string;
  criticalMetricDeltas: { label: string; change: number }[];
  strategicPriority: string;
  voiceBriefingBase64?: string;
}

export class AutonomousReportingOrchestrator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Compiles the "Daily Pulse" of the agency into a consolidated briefing.
   */
  async compileDailyBundle(metrics: any, financials: any, clinicalAlerts: any[]): Promise<ExecutiveBundle> {
    console.log(`[REPORTING_HUB]: Synthesizing Executive Intelligence Bundle for Org ${this.companyId}`);
    
    const context = { metrics, financials, alerts: clinicalAlerts.length };
    const prompt = `
      Act as the Chief of Staff. Summarize agency health: ${JSON.stringify(context)}.
      Task: Provide a 3-sentence summary, 1 strategic priority for today, and 2 critical metric shifts.
      Return JSON: { "summary": "", "priority": "", "deltas": [ { "label": "", "change": 0 } ] }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      
      const summary = data.summary || "Operations nominal.";
      const voice = await geminiService.generateSpeech(summary, 'Zephyr');

      return {
        timestamp: new Date().toISOString(),
        summaryNote: summary,
        strategicPriority: data.priority || "Standard operational oversight.",
        criticalMetricDeltas: data.deltas || [],
        voiceBriefingBase64: voice
      };
    } catch (e) {
      return { timestamp: new Date().toISOString(), summaryNote: "Synthesis error.", strategicPriority: "Review Dashboard.", criticalMetricDeltas: [] };
    }
  }
}

export const autonomousReportingOrchestrator = new AutonomousReportingOrchestrator();