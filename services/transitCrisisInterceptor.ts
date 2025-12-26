import { geminiService } from './geminiService'

export interface LogisticsBuffer {
  affectedSector: string;
  bufferMinutes: number;
  eventDescription: string;
  resolutionEta: string;
}

export class TransitCrisisInterceptor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Ingests live transit signals to prevent scheduling "Late Arrival" cascades.
   */
  async monitorTransitAlerts(region: string): Promise<LogisticsBuffer | null> {
    console.log(`[LOGISTICS_HUB]: Intercepting transit signals for ${region}`);
    
    const query = `Live subway closures, highway accidents, and transit strikes in ${region}, Ontario as of the last 60 minutes.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text?.toLowerCase() || "";
      
      if (text.includes("strike") || text.includes("closure") || text.includes("delays")) {
        return {
          affectedSector: region,
          bufferMinutes: text.includes("strike") ? 60 : 30,
          eventDescription: res.text?.substring(0, 150) || "Significant transit disruption detected.",
          resolutionEta: "4 Hours"
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}

export const transitCrisisInterceptor = new TransitCrisisInterceptor();