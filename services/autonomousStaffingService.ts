import { coordinationService } from './coordinationService'
import { matchingService } from './matchingService'
import { StaffMember, Client } from '../types'

export interface StaffingResolution {
  gapResolved: boolean;
  assignedStaffId?: string;
  matchConfidence: number;
  logicPath: string;
}

export class AutonomousStaffingService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Automatically identifies and suggests a replacement for a dropped shift.
   */
  async resolveShiftGap(client: Client, candidates: StaffMember[]): Promise<StaffingResolution> {
    console.log(`[AUTONOMOUS_OPS]: Gap detected for ${client.name}. Initiating neural recruitment.`);
    
    const matches = await matchingService.findBestAvailable(client, candidates);
    const bestMatch = matches[0];

    if (bestMatch && bestMatch.fitScore > 85) {
      return {
        gapResolved: true,
        assignedStaffId: bestMatch.staffId,
        matchConfidence: bestMatch.fitScore,
        logicPath: `Autonomous match via ${bestMatch.reasoning}`
      };
    }

    return {
      gapResolved: false,
      matchConfidence: bestMatch?.fitScore || 0,
      logicPath: "Insufficient match score for autonomous resolution. Escalate to Coordinator."
    };
  }
}

export const autonomousStaffingService = new AutonomousStaffingService();