import { StaffMember } from '../types'

export interface ComplianceFlag {
  isCompliant: boolean;
  violationType?: 'REST_PERIOD' | 'OVERTIME_CAP' | 'WEEKEND_ROTATION';
  ruleReference: string;
}

export class UnionComplianceService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Validates a proposed shift against Collective Bargaining Agreement vectors.
   */
  validateProposedShift(staff: StaffMember, shiftStart: Date, lastShiftEnd: Date): ComplianceFlag {
    const hoursRest = (shiftStart.getTime() - lastShiftEnd.getTime()) / (1000 * 60 * 60);
    
    // CBA Rule: Minimum 8-hour rest between shifts
    if (hoursRest < 8) {
      return {
        isCompliant: false,
        violationType: 'REST_PERIOD',
        ruleReference: 'CBA-2025-SEC-4.2'
      };
    }

    // CBA Rule: 44-hour weekly cap before mandatory grievance flag
    if (staff.weeklyHours > 44) {
      return {
        isCompliant: false,
        violationType: 'OVERTIME_CAP',
        ruleReference: 'CBA-2025-SEC-6.1'
      };
    }

    return { isCompliant: true, ruleReference: 'N/A' };
  }
}

export const unionComplianceService = new UnionComplianceService();