import { geminiService } from './geminiService'
import { StaffMember } from '../types'

export interface RetentionMove {
  staffId: string;
  churnRiskScore: number;
  replacementCost: number;
  suggestedBonus: number;
  strategicJustification: string;
}

export class RetentionBonusOracle {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates the economic impact of staff loss vs the cost of retention.
   */
  async computeRetentionROI(staff: StaffMember, riskScore: number): Promise<RetentionMove | null> {
    console.log(`[FISCAL_STRATEGY]: Calculating retention runway for ${staff.name}`);
    
    if (riskScore < 0.7) return null;

    const prompt = `
      Professional: ${staff.name} (Role: ${staff.role})
      Churn Risk: ${Math.round(riskScore * 100)}%
      Current Hourly Rate: ${staff.hourlyRate || 25}
      Task: Calculate the cost of churn (hiring, onboarding, lost billing). 
      Suggest an ROI-positive retention bonus.
      Return JSON: { "cost": number, "bonus": number, "reason": "string" }
    `;

    try {
      const res = await geminiService.generateAdvancedReasoning(prompt);
      const data = JSON.parse(res.text || '{}');
      return {
        staffId: staff.id,
        churnRiskScore: riskScore,
        replacementCost: data.cost || 12000,
        suggestedBonus: data.bonus || 2000,
        strategicJustification: data.reason || "High-value clinical asset stabilization."
      };
    } catch (e) {
      return null;
    }
  }
}

export const retentionBonusOracle = new RetentionBonusOracle();