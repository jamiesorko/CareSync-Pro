import { geoService } from './geoService'
import { Client, StaffMember } from '../types'

export interface EvacuationPlan {
  sectorId: string;
  priorityTransfers: { clientId: string; responderId: string; priority: number }[];
  emergencyHandoverDirectives: string[];
}

export class SectorEvacuationEngine {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates a prioritized evacuation grid for high-acuity patients.
   */
  async generateEmergencyPlan(sectorId: string, clients: Client[], staff: StaffMember[]): Promise<EvacuationPlan> {
    console.error(`[CRISIS_MODE]: Synthesizing evacuation vectors for Sector ${sectorId}`);
    
    // Sort clients by acuity (Bedridden/Dementia first)
    const sortedClients = [...clients].sort((a, b) => {
      const aScore = a.mobilityStatus.isBedridden ? 10 : 1;
      const bScore = b.mobilityStatus.isBedridden ? 10 : 1;
      return bScore - aScore;
    });

    const activeResponders = staff.filter(s => s.status !== 'OFFLINE');

    return {
      sectorId,
      priorityTransfers: sortedClients.map((c, i) => ({
        clientId: c.id,
        responderId: activeResponders[i % activeResponders.length]?.id || 'EMS_SIGNAL',
        priority: i + 1
      })),
      emergencyHandoverDirectives: [
        "Initiate clinical stabilization for Level 4 targets.",
        "Signal EMS for all mechanical transfer patients.",
        "Lock biometric data-vault nodes."
      ]
    };
  }
}

export const sectorEvacuationEngine = new SectorEvacuationEngine();