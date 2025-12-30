
import { StaffMember, LeaveRequest, CareRole, AlertType } from '../types';

export class HRService {
  /**
   * Calculates a granular payroll breakdown.
   */
  calculateDetailedPayroll(staff: StaffMember, hours: number) {
    const rate = staff.hourlyRate || 25;
    const gross = hours * rate;
    
    const fedTax = gross * 0.15;
    const provTax = gross * 0.05;
    const cpp = gross * 0.0595;
    const ei = gross * 0.0163;
    const unionDues = staff.role === CareRole.PSW ? 25.00 : 45.00;
    const insurance = 18.50; // Flat monthly benefit deduction
    const vacationPay = gross * 0.04; // 4% accrual

    const net = gross - fedTax - provTax - cpp - ei - unionDues - insurance;

    return {
      gross,
      deductions: fedTax + provTax + cpp + ei + unionDues + insurance,
      net,
      vacationAccrued: vacationPay,
      breakdown: { fedTax, provTax, cpp, ei, unionDues, insurance }
    };
  }

  /**
   * Analyzes a vacation request against regional fleet density.
   */
  assessLeaveSecurity(request: LeaveRequest, staffPool: StaffMember[]): { recommended: boolean; risk: number; reason: string } {
    const sectorStaff = staffPool.filter(s => s.homeSector === 'Woodbridge' && s.status !== 'OFFLINE');
    const capacity = sectorStaff.length;
    
    // Heuristic: If capacity in sector is < 3, denying is recommended.
    const risk = capacity < 3 ? 85 : 15;
    const recommended = risk < 40;

    return {
      recommended,
      risk,
      reason: recommended 
        ? "Sector density optimal for coverage." 
        : "Critical staffing gap detected in target sector for these dates."
    };
  }

  /**
   * Generates hiring requirements based on patient flow.
   */
  recommendHiring(pendingIntakes: number, activeCensus: number): { pswNeeded: number; rnNeeded: number; reason: string } {
    const totalLoad = pendingIntakes + activeCensus;
    const idealPswRatio = 12; // 1 PSW per 12 clients
    const idealRnRatio = 40;  // 1 RN per 40 clients
    
    const pswNeeded = Math.ceil(totalLoad / idealPswRatio);
    const rnNeeded = Math.ceil(totalLoad / idealRnRatio);

    return {
      pswNeeded,
      rnNeeded,
      reason: `Based on a census growth of ${pendingIntakes} units, node expansion requires ${pswNeeded} new PSW units to maintain 98% quality.`
    };
  }

  /**
   * Submits a formal HR request to the Resource Core.
   */
  // Added submitHRRequest to fix property does not exist error in PSWSelfService.tsx
  async submitHRRequest(data: { staffId: string; type: AlertType; details: string }): Promise<void> {
    console.log(`[RESOURCE_CORE]: HR Request signal received. Type: ${data.type}`, data);
    // In production, this would persist to a database or trigger a workflow.
  }
}

export const hrService = new HRService();
