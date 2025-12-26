import { familySynthesisService } from './familySynthesisService';
import { notificationService } from './notificationService';
import { CareRole } from '../types';

export interface NotificationPreference {
  clientId: string;
  triggerType: 'ALL_VISITS' | 'INCIDENTS_ONLY' | 'MED_CHANGES';
  preferredChannel: 'SMS' | 'EMAIL' | 'PORTAL';
  reassuranceLevel: 'STANDARD' | 'HIGH_ANXIETY';
}

export class FamilyLogicService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Evaluates if a family member should be notified post-visit based on clinical outcomes.
   */
  async processPostVisitNotification(clientId: string, clinicalNote: string) {
    console.log(`[REASSURANCE_CORE]: Evaluating notification vector for Client ${clientId}`);
    
    // Simulate fetching preferences
    const pref: NotificationPreference = {
      clientId,
      triggerType: 'ALL_VISITS',
      preferredChannel: 'SMS',
      reassuranceLevel: 'HIGH_ANXIETY'
    };

    if (pref.reassuranceLevel === 'HIGH_ANXIETY') {
      const summary = await familySynthesisService.synthesizeUpdate("Patient", clinicalNote);
      await notificationService.sendSMS("555-0199", `CareSync Update: ${summary}`);
    }
  }
}

export const familyLogicService = new FamilyLogicService();