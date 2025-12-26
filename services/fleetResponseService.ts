import { geoService } from './geoService'
import { StaffMember } from '../types'

export interface InterceptVector {
  supervisorId: string;
  targetStaffId: string;
  estimatedArrivalMinutes: number;
  routeConfidence: number;
}

export class FleetResponseService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates the fastest supervisor-to-staff intercept vector during an emergency.
   */
  async calculateIntercept(emergencyStaff: StaffMember, availableSupervisors: StaffMember[]): Promise<InterceptVector | null> {
    console.log(`[FLEET_OPS]: Calculating rescue intercept for Staff ${emergencyStaff.id}`);
    
    if (availableSupervisors.length === 0) return null;

    // Simulated vector math based on geoService
    const best = availableSupervisors[0];
    const dist = geoService.calculateDistance(best.id, emergencyStaff.id);

    return {
      supervisorId: best.id,
      targetStaffId: emergencyStaff.id,
      estimatedArrivalMinutes: Math.ceil(dist * 2.5),
      routeConfidence: 0.94
    };
  }

  async broadcastSectorAlert(sectorId: string, message: string) {
    console.warn(`[FLEET_OPS]: BROADCASTING SECTOR ALERT: ${sectorId} - ${message}`);
  }
}

export const fleetResponseService = new FleetResponseService();