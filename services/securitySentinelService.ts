
import { supabase } from '../lib/supabase'
import { SecurityProbe } from '../types'

export class SecuritySentinelService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  async auditAccess(actorId: string, resourcePath: string, action: string): Promise<SecurityProbe> {
    const anomalyScore = Math.random();
    const threatLevel = anomalyScore > 0.9 ? 'CRITICAL' : anomalyScore > 0.7 ? 'ELEVATED' : 'NONE';

    const probe: SecurityProbe = {
      id: Math.random().toString(36).substring(7),
      companyId: 'csp-demo',
      actorId,
      action,
      resourcePath,
      anomalyScore,
      threatLevel
    };

    if (supabase && this.companyId) {
      await supabase.from('security_audit_logs').insert([{
        ...probe,
        company_id: this.companyId,
        timestamp: new Date().toISOString()
      }]);
    }

    return probe;
  }

  async triggerLockdown(actorId: string) {
    console.error(`[LOCKDOWN]: ACTOR ${actorId}`);
  }
}

export const securitySentinelService = new SecuritySentinelService();