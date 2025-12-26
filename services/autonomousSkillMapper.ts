import { geminiService } from './geminiService'

export interface SkillUpdate {
  staffId: string;
  newCompetency: string;
  masteryScore: number; // 0-100
  evidenceSource: string;
}

export class AutonomousSkillMapper {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Scans field notes to detect the successful application of specialized skills.
   */
  async mapFieldProficiency(staffId: string, clinicalNotes: string[]): Promise<SkillUpdate[]> {
    console.log(`[SKILL_MAPPER]: Auditing proficiency vector for Staff ${staffId}`);
    
    const prompt = `
      Input: Narrative Clinical Notes for Staff ${staffId}.
      Notes: "${clinicalNotes.join(' | ')}"
      
      Task: Identify specialized skills performed successfully (e.g. specialized lift, wound management, cognitive de-escalation).
      Return JSON: [ { "competency": "string", "score": number, "evidence": "string" } ]
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      const data = JSON.parse(res.text || '[]');
      return data.map((d: any) => ({ ...d, staffId }));
    } catch (e) {
      return [];
    }
  }
}

export const autonomousSkillMapper = new AutonomousSkillMapper();