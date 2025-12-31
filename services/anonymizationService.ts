
import { Client, StaffMember, CareRole } from '../types';

export interface AnonymizedScheduleEntry {
  clientId: string;
  staffId: string;
  scheduledTime: string;
  reasoning: string;
}

export interface HydratedScheduleEntry {
  clientName: string;
  clientId: string;
  clientAddress: string;
  staffName: string;
  staffId: string;
  staffRole: string;
  scheduledTime: string;
  reasoning: string;
  weeklyLoad: number;
}

export class AnonymizationService {
  /**
   * LAYER 1: IDENTITY MASKING
   * LAYER 2: FISCAL GENERALIZATION
   */
  prepareAnonymizedPayload(clients: Client[], staff: StaffMember[]) {
    const clientMap: Record<string, Client> = {};
    const staffMap: Record<string, StaffMember> = {};

    const scrubbedClients = clients.map(c => {
      clientMap[c.id] = c;
      const requiredRole = Object.keys(c.carePlans).find(role => c.carePlans[role].length > 0) || CareRole.PSW;
      
      return {
        id: c.id, // e.g., C1
        address: c.address,
        sector: c.sector,
        requiredRole: requiredRole,
        preferredTime: c.time,
        // LAYER 2: Masking high-value patient tags
        acuityMagnitude: c.mobilityStatus.isBedridden ? 'ALPHA_HIGH' : 'BETA_STD'
      };
    });

    const scrubbedStaff = staff.map(s => {
      staffMap[s.id] = s;
      return {
        id: s.id, // e.g., P1, RN1
        role: s.role,
        homeSector: s.homeSector,
        availability: s.availability,
        currentLoad: s.weeklyHours,
        // LAYER 2: Generalizing hourly costs to Tiers
        costTier: (s.hourlyRate || 0) > 40 ? 'TIER_EXECUTIVE' : 'TIER_FIELD'
      };
    });

    return { 
      payload: { clients: scrubbedClients, staff: scrubbedStaff }, 
      lookups: { clientMap, staffMap } 
    };
  }

  hydrateSchedule(
    aiOutput: AnonymizedScheduleEntry[], 
    lookups: { clientMap: Record<string, Client>, staffMap: Record<string, StaffMember> }
  ): HydratedScheduleEntry[] {
    return aiOutput.map(entry => {
      const client = lookups.clientMap[entry.clientId];
      const staff = lookups.staffMap[entry.staffId];

      return {
        clientName: client?.name || "Unknown Patient",
        clientId: entry.clientId,
        clientAddress: client?.address || "Location Masked",
        staffName: staff?.name || "Unknown Staff",
        staffId: entry.staffId,
        staffRole: String(staff?.role || "Field Operative"),
        scheduledTime: entry.scheduledTime,
        reasoning: entry.reasoning,
        weeklyLoad: staff?.weeklyHours || 0
      };
    });
  }
}

export const anonymizationService = new AnonymizationService();
