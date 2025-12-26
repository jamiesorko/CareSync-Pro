import { geminiService } from './geminiService'
import { StaffMember } from '../types'

export interface RetentionRisk {
  staffId: string;
  exhaustionScore: number; // 0-100
  predictedQuitWindowDays: number;
  retentionDirective: string;
}

export class StaffRetentionEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Predicts resignation risk by analyzing workload density and acuity exposure.
   */
  async analyzeRetentionRisk(staff: StaffMember, sentimentScore: number): Promise<RetentionRisk> {
    console.log(`[RESOURCE_PROTECT]: Running retention simulation for Staff ${staff.id}`);
    
    const context = {
      role: staff.role,
      hours: staff.weeklyHours,
      sentiment: sentimentScore,
      exposureLevel: staff.weeklyHours > 40 ? 'HIGH' : 'STABLE'
    };

    const prompt = `
      Professional Profile: ${JSON.stringify(context)}.
      Task: Predict clinical exhaustion risk (0-100). Estimate resignation likelihood within 60 days.
      Suggest 1 specific operational move to retain this person.
      Return JSON: { "exhaustion": number, "days": number, "directive": "string" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        staffId: staff.id,
        exhaustionScore: data.exhaustion || 20,
        predictedQuitWindowDays: data.days || 180,
        retentionDirective: data.directive || "Maintain current supervision."
      };
    } catch (e) {
      return { staffId: staff.id, exhaustionScore: 0, predictedQuitWindowDays: 365, retentionDirective: "Nexus synchronized." };
    }
  }
}

export const staffRetentionEngine = new StaffRetentionEngine();