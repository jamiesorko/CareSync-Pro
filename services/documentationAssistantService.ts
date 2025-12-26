import { geminiService } from './geminiService'
import { CareRole } from '../types'

export class DocumentationAssistantService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Enhances raw field shorthand into a professional medical document.
   */
  async formalizeNote(rawShorthand: string, role: CareRole): Promise<string> {
    console.log(`[NEURAL_SCRIBE]: Formalizing shorthand for ${role} profile.`);
    
    const prompt = `
      Shorthand Input: "${rawShorthand}"
      Role: ${role}
      
      Task: Expand this shorthand into a professional, HIPAA/PHIPA-compliant clinical note. 
      Use professional nursing/clinical terminology. Ensure it covers Objective observations and Actions taken.
      Tone: Clinical, objective, concise.
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      return res.text || rawShorthand;
    } catch (e) {
      return rawShorthand;
    }
  }
}

export const documentationAssistantService = new DocumentationAssistantService();