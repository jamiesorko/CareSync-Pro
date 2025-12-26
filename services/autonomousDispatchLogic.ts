import { geminiService } from './geminiService'

export interface FleetAdjustment {
  affectedSector: string;
  travelBufferMinutes: number;
  reason: string;
  broadcastRequired: boolean;
}

export class AutonomousDispatchLogic {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Monitors real-time transit and weather to suggest fleet-wide travel buffers.
   */
  async computeLogisticsBuffer(region: string): Promise<FleetAdjustment | null> {
    console.log(`[AUTO_DISPATCH]: Calculating environmental impedance for ${region}`);
    
    const query = `Current major road closures, transit delays, and weather warnings in ${region}, Ontario as of the last 30 minutes.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      if (text.toLowerCase().includes("warning") || text.toLowerCase().includes("strike") || text.toLowerCase().includes("closure")) {
        return {
          affectedSector: region,
          travelBufferMinutes: text.includes("warning") ? 20 : 15,
          reason: text.substring(0, 100) + "...",
          broadcastRequired: true
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export const autonomousDispatchLogic = new AutonomousDispatchLogic();