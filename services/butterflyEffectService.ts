import { geminiService } from './geminiService'
import { ContingencyPlan, StaffMember } from '../types'

export class ButterflyEffectService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Models the "Blast Radius" of a shift failure and suggests re-optimization paths.
   */
  async modelShiftFailure(failedStaffId: string, remainingSchedule: any[]): Promise<ContingencyPlan> {
    console.log(`[LOGISTICS_ORACLE]: Modeling butterfly effect for Staff failure: ${failedStaffId}`);
    
    const prompt = `
      Event: Clinical Staff Failure.
      Staff ID: ${failedStaffId}
      Remaining Visits: ${JSON.stringify(remainingSchedule)}
      Task: Identify the 3 most impacted patients. Suggest 2 rescuers within a 5km radius. 
      Estimate delay variance in minutes. Return JSON: { "impactedClients": [], "suggestedRescuers": [], "etaVariance": number }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      return {
        impactedClients: data.impactedClients || [],
        suggestedRescuers: data.suggestedRescuers || [],
        etaVariance: data.etaVariance || 45
      };
    } catch (e) {
      return { impactedClients: [], suggestedRescuers: [], etaVariance: 0 };
    }
  }
}

export const butterflyEffectService = new ButterflyEffectService();