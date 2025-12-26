import { geminiService } from './geminiService'
import { CareRole } from '../types'

export interface EnvironmentalAlert {
  hazardType: 'WEATHER' | 'AQI' | 'PUBLIC_HEALTH' | 'UTILITY';
  severity: 'MED' | 'HIGH' | 'CRITICAL';
  description: string;
  recommendedDirective: string;
  affectedPostalCodes: string[];
}

export class EnvironmentalImpactScanner {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans for local environmental hazards that impact home care safety.
   */
  async scanRegionalHazards(region: string): Promise<EnvironmentalAlert[]> {
    console.log(`[ENV_SCANNER]: Scanning regional vectors for ${region}...`);
    
    const query = `Current weather warnings, air quality alerts, and local emergency bulletins (e.g. boil water, power outages) in ${region}, Ontario as of late 2025.`;
    
    try {
      const res = await geminiService.getMarketIntelligence(query);
      const prompt = `
        Search Context: ${res.text}
        Task: Identify 1 critical environmental hazard.
        Assign a clinical directive for field staff (e.g., 'Ensure windows closed', 'Check hydration').
        Return JSON: { "type": "WEATHER|AQI|PUBLIC_HEALTH|UTILITY", "severity": "MED|HIGH|CRITICAL", "desc": "string", "directive": "string", "codes": ["string"] }
      `;

      const analysis = await geminiService.generateText(prompt, false);
      const data = JSON.parse(analysis.text || '{}');

      if (!data.type) return [];

      return [{
        hazardType: data.type,
        severity: data.severity || 'MED',
        description: data.desc || "Environmental signal ingested.",
        recommendedDirective: data.directive || "Follow standard safety protocols.",
        affectedPostalCodes: data.codes || []
      }];
    } catch (e) {
      return [];
    }
  }
}

export const environmentalImpactScanner = new EnvironmentalImpactScanner();