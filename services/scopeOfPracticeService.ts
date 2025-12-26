import { CareRole } from '../types'

export interface ScopeValidation {
  isPermitted: boolean;
  requiredDelegationForm?: string;
  reason?: string;
}

export class ScopeOfPracticeService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Validates if a role can legally perform a specific clinical task.
   */
  validateTask(role: CareRole | string, taskName: string): ScopeValidation {
    console.log(`[SCOPE_GUARD]: Validating ${taskName} for role ${role}`);
    
    // Heuristic: Certain tasks are RN/RPN only unless delegated
    const highRiskTasks = ['suctioning', 'catheterization', 'insulin injection', 'wound irrigation'];
    const lowerRole = [CareRole.PSW, CareRole.HSS].includes(role as any);
    
    const isHighRisk = highRiskTasks.some(t => taskName.toLowerCase().includes(t));
    
    if (isHighRisk && lowerRole) {
      return {
        isPermitted: false,
        requiredDelegationForm: 'DELEGATION_V4_ONTARIO',
        reason: 'Controlled act requires formal RN delegation.'
      };
    }

    return { isPermitted: true };
  }
}

export const scopeOfPracticeService = new ScopeOfPracticeService();