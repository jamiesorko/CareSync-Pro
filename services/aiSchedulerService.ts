
import { StaffMember, Client, CareRole, BlastStatus } from '../types';

export class AISchedulerService {
  /**
   * Core logic for Coordinator deployment.
   * Enforces: Location Lock, 40h Cap, Condition Match, and Blacklists.
   */
  validateDeployment(staff: StaffMember, client: Client, durationHours: number = 3): { valid: boolean; reason?: string } {
    // 1. Min 3-hour check
    if (durationHours < 3) {
      return { valid: false, reason: "CONSTRAINT_VIOLATION: Shifts must be minimum 3 hours." };
    }

    // 2. Geographic Sector Lock
    if (staff.homeSector !== client.sector) {
      return { valid: false, reason: `GEOGRAPHIC_LOCK: Staff based in ${staff.homeSector} cannot serve ${client.sector}.` };
    }

    // 3. Hour Cap Monitor
    if (staff.weeklyHours >= 40) {
      return { valid: false, reason: "CAP_BREACH: Staff has reached 40h threshold. Requires Coordination Manager approval." };
    }

    // 4. Blacklist Check
    if (client.blacklistStaffIds.includes(staff.id)) {
      return { valid: false, reason: "DOSSIER_RESTRICTION: Staff is on Client's 'Do Not Send' list." };
    }

    // 5. Training/Condition Match
    // Fixed: Corrected typo 'specialspecialties' to 'specialties'
    const hasConditionTraining = client.conditions.some(c => 
      staff.specialties?.some(s => s.toLowerCase().includes(c.toLowerCase())) ||
      (client.mobilityStatus.dementia && staff.specialties.includes("Dementia"))
    );

    if (!hasConditionTraining) {
      return { valid: false, reason: "SKILL_GAP: Staff lacks verified training for subject's primary conditions." };
    }

    return { valid: true };
  }

  /**
   * Shift Blast Protocol: Role and Sector filtered.
   */
  generateBlastCandidates(client: Client, staffPool: StaffMember[], role: CareRole): string[] {
    return staffPool
      .filter(s => s.role === role)
      .filter(s => s.homeSector === client.sector)
      .filter(s => s.weeklyHours < 40)
      .filter(s => !client.blacklistStaffIds.includes(s.id))
      .sort((a, b) => a.weeklyHours - b.weeklyHours) // Prioritize those with more idle time
      .slice(0, 5) // Top 5 as requested
      .map(s => s.id);
  }
}

export const aiSchedulerService = new AISchedulerService();
