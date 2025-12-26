import { geminiService } from './geminiService'
import { Client } from '../types'
import { decode } from '../utils/audioHelpers'

export interface HandoverAsset {
  clientId: string;
  briefingVoiceBase64?: string;
  criticalAlertText: string;
  biometricDeltaWarning: string;
  urgency: 'LOW' | 'MED' | 'HIGH';
}

export class ClinicalContinuityForge {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  async forgeShiftHandover(client: Client, recentVitals: any[], lastNote: string): Promise<HandoverAsset> {
    console.log(`[CONTINUITY_FORGE]: Synthesizing handover vector for ${client.name}`);
    
    const prompt = `
      Context: Healthcare Professional Handover.
      Patient: ${client.name} (Conditions: ${client.conditions.join(', ')})
      Recent Vitals Stream: ${JSON.stringify(recentVitals)}
      Outgoing Note: "${lastNote}"
      
      Task: Synthesize a 3-sentence verbal briefing for the incoming caregiver. 
      Focus on the absolute #1 priority and any clinical drift detected.
      Return JSON: { "script": "string", "priorityText": "string", "delta": "string", "urgency": "LOW|MED|HIGH" }
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '{}');
      
      // Generate the Acoustic Briefing
      const voiceData = await geminiService.generateSpeech(
        data.script || "Routine stability maintained. Follow standard care plan.", 
        'Puck'
      );

      return {
        clientId: client.id,
        briefingVoiceBase64: voiceData,
        criticalAlertText: data.priorityText || "Maintain baseline care.",
        biometricDeltaWarning: data.delta || "Baseline stability confirmed.",
        urgency: data.urgency || 'LOW'
      };
    } catch (e) {
      console.error("Handover synthesis bottleneck.");
      return { 
        clientId: client.id, 
        criticalAlertText: "Nexus sync failed. Manual report required.", 
        biometricDeltaWarning: "No data.",
        urgency: 'HIGH'
      };
    }
  }
}

export const clinicalContinuityForge = new ClinicalContinuityForge();