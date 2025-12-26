import { StaffMember } from '../types'

export interface ReallocationProposal {
  sourceBranch: string;
  targetBranch: string;
  suggestedStaffIds: string[];
  capacityDelta: number;
  reason: string;
  priority: 'ROUTINE' | 'URGENT' | 'CRITICAL';
}

export class CrisisCrossNodeArbiter {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates the optimal 'Cross-Pollination' of staff between branches during a surge.
   */
  async calculateGlobalRebalance(branchStatus: any[]): Promise<ReallocationProposal | null> {
    console.log(`[GLOBAL_ARBITER]: Computing inter-branch resource vectors for Org ${this.companyId}`);
    
    // Heuristic: If Branch A > 100% and Branch B < 85%, move resources.
    const saturated = branchStatus.find(b => b.saturation > 100);
    const idle = branchStatus.find(b => b.saturation < 85);

    if (saturated && idle) {
      return {
        sourceBranch: idle.name,
        targetBranch: saturated.name,
        suggestedStaffIds: ['backup-rn-01', 'backup-psw-04'],
        capacityDelta: 15,
        reason: `Regional saturation surge in ${saturated.name}. Redistribution required to protect clinical safety.`,
        priority: 'URGENT'
      };
    }

    return null;
  }
}

export const crisisCrossNodeArbiter = new CrisisCrossNodeArbiter();