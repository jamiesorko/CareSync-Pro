import { geminiService } from './geminiService'
import { Applicant } from '../types'

export interface HiringPriority {
  applicantId: string;
  targetSector: string;
  urgencyScore: number; // 0-100
  matchRationale: string;
}

export class RecruitmentPipelineOptimizer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Matches pending patient waitlists with current applicant skills and geography.
   */
  async computeHiringSignals(applicants: Applicant[], waitlistSummary: string): Promise<HiringPriority[]> {
    console.log(`[HIRING_AI]: Correlating ${applicants.length} applicants with waitlist demand...`);
    
    const prompt = `
      Applicants: ${JSON.stringify(applicants.map(a => ({ id: a.id, role: a.role, score: a.cultureFitScore })))}
      Waitlist Summary: "${waitlistSummary}"
      Task: Identify the #1 applicant to hire to solve the most urgent waitlist gap.
      Return JSON: [ { "id": "string", "sector": "string", "urgency": number, "rationale": "string" } ]
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      return JSON.parse(res.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const recruitmentPipelineOptimizer = new RecruitmentPipelineOptimizer();