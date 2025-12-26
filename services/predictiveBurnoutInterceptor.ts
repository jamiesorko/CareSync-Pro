import { StaffMember } from '../types'
import { sentimentService } from './sentimentService'

export interface BurnoutBlock {
  isBlocked: boolean;
  reason?: string;
  suggestedReliefMinutes: number;
  mandatoryWellnessCheck: boolean;
}

export class PredictiveBurnoutInterceptor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Evaluates if a staff member is safe to take on an additional high-acuity assignment.
   */
  async evaluateFatigueSafety(staff: StaffMember, lastSentimentScore: number): Promise<BurnoutBlock> {
    console.log(`[FATIGUE_SENTINEL]: Auditing cognitive load for ${staff.name}`);
    
    // Logic: Cross-reference high hours with low sentiment
    const isOverworked = staff.weeklyHours > 44;
    const isStressed = lastSentimentScore < 0.3;

    if (isOverworked && isStressed) {
      return {
        isBlocked: true,
        reason: "Dual-vector fatigue detected (High Hours + Negative Sentiment).",
        suggestedReliefMinutes: 120,
        mandatoryWellnessCheck: true
      };
    }

    return {
      isBlocked: false,
      suggestedReliefMinutes: 0,
      mandatoryWellnessCheck: false
    };
  }
}

export const predictiveBurnoutInterceptor = new PredictiveBurnoutInterceptor();