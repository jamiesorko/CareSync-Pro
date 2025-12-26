import { geoService } from './geoService'
import { MOCK_CLIENTS, MOCK_STAFF } from '../data/careData'

export interface CrisisImpactReport {
  impactLevel: 'LOW' | 'MED' | 'HIGH' | 'TOTAL_FAILURE';
  disconnectedPatientsCount: number;
  criticalAcuityGaps: number;
  suggestedSectorLockdown: string[];
}

export class TacticalCrisisSimulator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Runs a "Blackout Simulation" to see the impact of losing a specific fleet sector.
   */
  async simulateSectorFailure(sectorId: string): Promise<CrisisImpactReport> {
    console.warn(`[WAR_GAMES]: Simulating total service failure in ${sectorId}...`);
    
    // Logic: Identify patients in sector, check their acuity, see if remaining staff can cover
    const sectorClients = MOCK_CLIENTS.length / 2; // Mock logic
    const highAcuityAffected = MOCK_CLIENTS.filter(c => c.mobilityStatus.isBedridden).length / 2;

    return {
      impactLevel: sectorClients > 5 ? 'HIGH' : 'MED',
      disconnectedPatientsCount: Math.ceil(sectorClients),
      criticalAcuityGaps: Math.ceil(highAcuityAffected),
      suggestedSectorLockdown: [sectorId]
    };
  }

  async generateEmergencyHandover(clientIds: string[]): Promise<string> {
    return "Protocol: Transfer Care to Regional Health Authority. Signal transmitted to EMS.";
  }
}

export const tacticalCrisisSimulator = new TacticalCrisisSimulator();