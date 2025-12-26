import { BiometricStream } from './biometricService'

export interface LeakageAlert {
  visitId: string;
  staffId: string;
  leakageType: 'GHOST_BILLING' | 'LOW_ENGAGEMENT' | 'LOCATION_DRIFT';
  confidenceScore: number;
  estimatedFiscalLoss: number;
}

export class FiscalLeakageWatchdog {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Cross-references biometric activity with shift duration to detect improbable work patterns.
   */
  async auditPresence(visitId: string, staffId: string, durationMinutes: number, biometricHistory: BiometricStream[]): Promise<LeakageAlert | null> {
    console.log(`[FISCAL_GUARD]: Probing visit ${visitId} for biometric-to-billing parity.`);
    
    const activeStepTicks = biometricHistory.filter(b => b.stepsToday > 0).length;
    const totalTicks = biometricHistory.length;
    
    // Heuristic: If staff is clocked in for 60m but 0 steps for 55m, flag it.
    const activityRatio = activeStepTicks / totalTicks;

    if (durationMinutes > 30 && activityRatio < 0.15) {
      return {
        visitId,
        staffId,
        leakageType: 'GHOST_BILLING',
        confidenceScore: 0.92,
        estimatedFiscalLoss: (durationMinutes / 60) * 26 // Based on PSW rate
      };
    }

    return null;
  }
}

export const fiscalLeakageWatchdog = new FiscalLeakageWatchdog();