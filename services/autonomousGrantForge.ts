import { geminiService } from './geminiService'

export interface GrantOpportunity {
  title: string;
  fundingBody: string;
  amount: string;
  deadline: string;
  draftNarrative: string;
}

export class AutonomousGrantForge {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Searches for active government/private health grants and drafts the "Why Us" section.
   */
  async forgeGrantApplication(region: string): Promise<GrantOpportunity[]> {
    console.log(`[FISCAL_GROWTH]: Searching for healthcare grants in ${region}`);
    
    const query = `Active government healthcare innovation grants and senior care subsidies in ${region}, Ontario October 2025. List deadlines and funding amounts.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Grant Context: ${res.text}
        Agency USP: "We use multimodal AI (Gemini 3 Pro) for real-time clinical stabilization and geofence-verified safety."
        Task: Draft a 200-word 'Strategic Justification' for the most relevant grant.
        Return JSON: { "title": "string", "body": "string", "val": "string", "due": "string", "narrative": "string" }
      `;

      const analysis = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(analysis.text || '{}');

      return [{
        title: data.title || "Health Innovation Grant",
        fundingBody: data.body || "Ministry of Health",
        amount: data.val || "$50,000",
        deadline: data.due || "2025-12-31",
        draftNarrative: data.narrative || "Draft pending review."
      }];
    } catch (e) {
      return [];
    }
  }
}

export const autonomousGrantForge = new AutonomousGrantForge();