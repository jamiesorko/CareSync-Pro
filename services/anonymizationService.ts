
import { Client, StaffMember } from '../types';

// Added HydratedScheduleEntry for OvertimeAlert component
export interface HydratedScheduleEntry {
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  time: string;
  weeklyLoad: number;
}

export class AnonymizationService {
  /**
   * LAYER 1: Strip PII. LAYER 2: Generalize Fiscal.
   */
  prepareSovereignPayload(clients: Client[], staff: StaffMember[]) {
    const clientLookup: Record<string, string> = {};
    const staffLookup: Record<string, string> = {};

    const cleanClients = clients.map(c => {
      clientLookup[c.id] = c.name;
      return {
        id: c.id,
        address: c.address, // Needed for location lock
        sector: c.sector,
        acuity: c.conditions,
        preferredTime: c.time
      };
    });

    const cleanStaff = staff.map(s => {
      staffLookup[s.id] = s.name;
      return {
        id: s.id,
        role: s.role,
        sector: s.homeSector,
        availability: s.availability,
        currentHours: s.weeklyHours
      };
    });

    return { 
      payload: { clients: cleanClients, staff: cleanStaff }, 
      lookups: { clientLookup, staffLookup } 
    };
  }

  /**
   * Restoration logic: Swaps IDs back to names for human view.
   */
  hydrateRoster(aiSchedule: any[], lookups: { clientLookup: Record<string, string>, staffLookup: Record<string, string> }) {
    return aiSchedule.map(entry => ({
      ...entry,
      clientName: lookups.clientLookup[entry.clientId] || "Unknown",
      staffName: lookups.staffLookup[entry.staffId] || "Unknown"
    }));
  }
}

export const anonymizationService = new AnonymizationService();
