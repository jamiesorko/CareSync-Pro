import { geminiService } from './geminiService'

export interface VideoAsset {
  taskId: string;
  videoUrl: string;
  narrativeDescription: string;
  safetyCriticalPoints: string[];
}

export class ClinicalVideoGenerator {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Generates a cinematic procedure guide using Veo for complex clinical tasks.
   */
  async generateProcedureGuide(taskName: string, clinicalContext: string): Promise<VideoAsset> {
    console.log(`[VEV_SYNTHESIS]: Generating video guide for ${taskName}`);
    
    const videoPrompt = `A high-fidelity clinical training video showing a professional healthcare provider correctly performing ${taskName} on a patient with ${clinicalContext}. Educational tone, cinematic lighting, medical setting.`;
    
    try {
      const videoUrl = await geminiService.generateVideo(videoPrompt);
      
      const analysisPrompt = `Summarize the safety critical points for the procedure: ${taskName}. Return JSON: { "narrative": "string", "points": ["string"] }`;
      const res = await geminiService.generateText(analysisPrompt, false);
      const data = JSON.parse(res.text || '{}');

      return {
        taskId: Math.random().toString(36).substring(7),
        videoUrl,
        narrativeDescription: data.narrative || "Direct cinematic procedure guide.",
        safetyCriticalPoints: data.points || ["Maintain sterile field.", "Confirm patient identity."]
      };
    } catch (e) {
      return { taskId: 'err', videoUrl: '', narrativeDescription: 'Video synthesis failed.', safetyCriticalPoints: [] };
    }
  }
}

export const clinicalVideoGenerator = new ClinicalVideoGenerator();