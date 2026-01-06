
import { supabase } from '../lib/supabase'
import { OncallShift } from '../types'

export class StaffOncallService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Retrieves the clinical supervisor currently designated as the "Intercept Point".
   */
  async getActiveSupervisor(): Promise<OncallShift | null> {
    console.log(`[ONCALL_CORE]: Identifying primary clinical intercept...`);
    
    // Demo Mocking Logic
    return {
      id: 'oc-1',
      companyId: this.companyId || 'demo',
      createdAt: new Date().toISOString(),
      staffId: 'rn1',
      staffName: 'Tom Hardy (RN)',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 28800000).toISOString(),
      tier: 'PRIMARY'
    };
  }

  async setRotation(staffId: string, start: string, end: string) {
    if (supabase && this.companyId) {
      await supabase.from('oncall_rotations').insert([{
        company_id: this.companyId,
        staff_id: staffId,
        start_time: start,
        end_time: end
      }]);
    }
  }
}

export const staffOncallService = new StaffOncallService();
