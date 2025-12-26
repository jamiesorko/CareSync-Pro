import { auditRecoveryForge } from './auditRecoveryForge'
import { regulatoryEvidenceHarvester } from './regulatoryEvidenceHarvester'

export interface RecoveryAction {
  claimId: string;
  status: 'HARVESTING' | 'FORGING_APPEAL' | 'SUBMITTED';
  evidenceCount: number;
}

export class AutonomousPayorRecovery {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Automates the entire appeal lifecycle from denial signal to submission.
   */
  async recoverDeniedRevenue(claimId: string, denialText: string, clientId: string): Promise<RecoveryAction> {
    console.log(`[AUTO_RECOVERY]: Reclaiming fiscal vector for Claim ${claimId}`);
    
    // 1. Harvest clinical evidence for the period
    const bundle = await regulatoryEvidenceHarvester.harvestDossier(clientId, '2025-09-01', '2025-10-01');
    
    // 2. Forge the appeal brief using the evidence
    await auditRecoveryForge.forgeAppeal(claimId, denialText, ["Clinical Vitals Log", "GPS Verification"]);

    return {
      claimId,
      status: 'SUBMITTED',
      evidenceCount: bundle.assetCount
    };
  }
}

export const autonomousPayorRecovery = new AutonomousPayorRecovery();