import { geminiService } from './geminiService'
import { geoService } from './geoService'

export interface FleetRescuePlan {
  impactEvent: string;
  affectedStaffCount: number;
  alternateRouteDirective: string;
  priorityInterceptStaffId?: string;
  severity: 'MED' | 'HIGH' | 'CRITICAL';
}

export class EmergencyFleetRescuer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Search Grounding to detect external events impacting fleet movement.
   */
  async generateInterceptPlan(region: string): Promise<FleetRescuePlan | null> {
    console.log(`[FLEET_RESCUER]: Ingesting regional crisis signals for ${region}`);
    
    const query = `Live traffic incidents, major road closures, and emergency weather alerts in ${region}, Ontario for the next 4 hours.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      if (text.toLowerCase().includes("closure") || text.toLowerCase().includes("alert")) {
        return {
          impactEvent: "Significant Regional Transit Failure",
          affectedStaffCount: 4,
          alternateRouteDirective: text.substring(0, 150) + "...",
          severity: 'HIGH'
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export const emergencyFleetRescuer = new EmergencyFleetRescuer();