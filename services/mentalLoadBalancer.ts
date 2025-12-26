import { StaffMember, Client } from '../types'

export interface ComplexityLoad {
  staffId: string;
  cognitiveSaturationScore: number; // 0-100
  highAcuityExposureHours: number;
  empathyFatigueRisk: 'LOW' | 'MED' | 'HIGH';
  recommendedReliefAction: string;
}

export class MentalLoadBalancer {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Calculates the 'Cognitive Weight' of a staff member's daily roster.
   */
  async computeDailyMentalLoad(staff: StaffMember, clients: Client[]): Promise<ComplexityLoad> {
    console.log(`[RESOURCE_CARE]: Calculating complexity density for ${staff.name}`);
    
    // Heuristic: Dementia and Palliative care have 2x weight
    let saturation = (staff.weeklyHours / 40) * 50;
    
    const highAcuityCount = clients.filter(c => c.mobilityStatus.dementia || (c.risk && c.risk.level === 'CRITICAL')).length;
    saturation += (highAcuityCount * 15);

    return {
      staffId: staff.id,
      cognitiveSaturationScore: Math.min(100, saturation),
      highAcuityExposureHours: highAcuityCount * 1.5,
      empathyFatigueRisk: saturation > 85 ? 'HIGH' : saturation > 60 ? 'MED' : 'LOW',
      recommendedReliefAction: saturation > 80 
        ? "Assign 1hr administrative buffer. Reduce acuity density for tomorrow's roster." 
        : "Standard workload. Continue routine wellness checks."
    };
  }
}

export const mentalLoadBalancer = new MentalLoadBalancer();