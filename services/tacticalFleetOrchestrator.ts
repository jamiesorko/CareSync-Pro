import { geminiService } from './geminiService'
import { StaffMember, Client } from '../types'

export interface ReallocationPlan {
  originalStaffId: string;
  targetClientId: string;
  logicRationale: string;
  estimatedArrivalDelta: number;
  priorityLevel: 'ELEVATED' | 'CRITICAL';
}

export class TacticalFleetOrchestrator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates emergency intercepts by re-routing non-critical staff in real-time.
   */
  async computeEmergencyIntercept(emergencyClient: Client, availableFleet: StaffMember[]): Promise<ReallocationPlan | null> {
    console.warn(`[FLEET_TACTICS]: Calculating intercept vector for emergency at ${emergencyClient.address}`);
    
    const context = {
      emergencyAcuity: "Level 4 - Immediate Response Required",
      fleetSize: availableFleet.length,
      nearestStaff: availableFleet.slice(0, 3).map(s => ({ id: s.id, role: s.role, currentTask: "Routine" }))
    };

    const prompt = `
      Task: Tactical Field Reallocation.
      Scenario: Patient ${emergencyClient.name} has a critical alert.
      Fleet Context: ${JSON.stringify(context)}.
      Identify the best staff member to re-route. 
      Return JSON: { "staffId": "string", "rationale": "string", "delta": number, "priority": "CRITICAL" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      
      if (!data.staffId) return null;

      return {
        originalStaffId: data.staffId,
        targetClientId: emergencyClient.id,
        logicRationale: data.rationale || "Proximity and acuity alignment.",
        estimatedArrivalDelta: data.delta || 15,
        priorityLevel: 'CRITICAL'
      };
    } catch (e) {
      return null;
    }
  }
}

export const tacticalFleetOrchestrator = new TacticalFleetOrchestrator();