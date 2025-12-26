import { geminiService } from './geminiService'

export interface SectorRiskSignal {
  sectorId: string;
  threatType: 'CRIME_SURGE' | 'WEATHER' | 'TRANSIT_FAILURE' | 'NONE';
  severity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  directive: string;
  expiryHours: number;
}

export class SectorSafetyInterceptor {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Monitors live signals in a specific region to detect emerging threats to field staff.
   */
  async scanSectorSafety(region: string): Promise<SectorRiskSignal[]> {
    console.log(`[SAFETY_SENTINEL]: Intercepting regional safety signals for ${region}`);
    
    const query = `Emergency alerts, major police activity, transit strikes, and severe weather warnings for ${region}, Ontario as of the last 2 hours.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const text = res.text || "";
      
      if (text.toLowerCase().includes("warning") || text.toLowerCase().includes("closure") || text.toLowerCase().includes("strike")) {
        return [{
          sectorId: region,
          threatType: text.includes("weather") ? 'WEATHER' : 'TRANSIT_FAILURE',
          severity: 'HIGH',
          directive: text.substring(0, 200) + "...",
          expiryHours: 4
        }];
      }
      return [];
    } catch (e) {
      return [];
    }
  }
}

export const sectorSafetyInterceptor = new SectorSafetyInterceptor();