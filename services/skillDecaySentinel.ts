import { geminiService } from './geminiService'

export interface CompetencyRisk {
  staffId: string;
  skillName: string;
  daysSinceLastPerformance: number;
  decayLevel: 'LOW' | 'MED' | 'HIGH';
  remediationAssigned: boolean;
}

export class SkillDecaySentinel {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans visit history to identify specialized skills that haven't been practiced recently.
   */
  async auditSkillRecency(staffId: string, visitHistory: any[]): Promise<CompetencyRisk[]> {
    console.log(`[SKILL_GUARD]: Auditing task frequency vectors for Staff ${staffId}`);
    
    // In production, this performs temporal grouping on visit_tasks.
    // Heuristic: If specialized lifts haven't occurred in 90 days, trigger a safety quiz.
    return [
      {
        staffId,
        skillName: 'Hoyer Lift Protocol',
        daysSinceLastPerformance: 104,
        decayLevel: 'MED',
        remediationAssigned: true
      }
    ];
  }

  async triggerMicroLearning(staffId: string, skill: string) {
    console.warn(`[SKILL_GUARD]: Assigning remedial simulation for ${skill} to Staff ${staffId}`);
  }
}

export const skillDecaySentinel = new SkillDecaySentinel();