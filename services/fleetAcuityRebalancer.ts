import { geminiService } from './geminiService'
import { StaffMember, Client } from '../types'

export interface RebalanceDirective {
  sectorFrom: string;
  sectorTo: string;
  staffIdsToMove: string[];
  rationale: string;
  priority: 'ROUTINE' | 'URGENT';
}

export class FleetAcuityRebalancer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Analyzes current fleet positions vs patient risk levels to predict coverage gaps.
   */
  async calculateOptimalDistribution(staff: StaffMember[], clients: Client[]): Promise<RebalanceDirective | null> {
    console.log(`[FLEET_ORCHESTRATOR]: Running acuity-to-density rebalancing for Org ${this.companyId}`);
    
    const context = {
      staffAvailable: staff.filter(s => s.status === 'ONLINE').length,
      highAcuityClients: clients.filter(c => c.risk?.level === 'HIGH' || c.risk?.level === 'CRITICAL').length,
      sectors: ["Sector 1 (Core)", "Sector 4 (North)"]
    };

    const prompt = `
      Fleet Data: ${JSON.stringify(context)}.
      Task: If one sector has >60% of the high-acuity load but <40% of available staff, suggest a move.
      Return JSON: { "moveRequired": boolean, "from": "", "to": "", "ids": [], "reason": "", "priority": "ROUTINE|URGENT" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      
      if (!data.moveRequired) return null;

      return {
        sectorFrom: data.from,
        sectorTo: data.to,
        staffIdsToMove: data.ids,
        rationale: data.reason,
        priority: data.priority
      };
    } catch (e) {
      return null;
    }
  }
}

export const fleetAcuityRebalancer = new FleetAcuityRebalancer();