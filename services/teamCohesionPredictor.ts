import { StaffMember } from '../types'

export interface CohesionRisk {
  staffAId: string;
  staffBId: string;
  frictionProbability: number; // 0-1
  primaryRiskFactor: string;
  mitigationStrategy: string;
}

export class TeamCohesionPredictor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Predicts risk of conflict for "Team Lifts" or "Partner Visits" based on recent sentiment vectors.
   */
  async predictFriction(staffA: StaffMember, staffB: StaffMember, sentimentHistory: any[]): Promise<CohesionRisk> {
    console.log(`[COHESION_CORE]: Simulating team dynamics for ${staffA.name} + ${staffB.name}`);
    
    // Heuristic: If both staff have high-stress sentiment scores recently, risk is high.
    const aStress = sentimentHistory.find(s => s.staffId === staffA.id)?.isBurnoutRisk ? 0.4 : 0.1;
    const bStress = sentimentHistory.find(s => s.staffId === staffB.id)?.isBurnoutRisk ? 0.4 : 0.1;
    
    const totalProb = Math.min(0.95, aStress + bStress + (Math.random() * 0.15));

    return {
      staffAId: staffA.id,
      staffBId: staffB.id,
      frictionProbability: totalProb,
      primaryRiskFactor: totalProb > 0.6 ? "Dual-High Emotional Exhaustion" : "Baseline Cohesion",
      mitigationStrategy: totalProb > 0.6 ? "Swap Partner with low-stress senior RN." : "Continue standard pairing."
    };
  }
}

export const teamCohesionPredictor = new TeamCohesionPredictor();