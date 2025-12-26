import { geminiService } from './geminiService'
import { Medication } from '../types'

export interface MedDiscrepancy {
  medicationName: string;
  type: 'ADDED' | 'REMOVED' | 'DOSAGE_CHANGE' | 'DUPLICATE';
  clinicalRisk: 'LOW' | 'MED' | 'HIGH';
  recommendation: string;
}

export class MedReconService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Compares two medication lists to identify clinical drift during transitions.
   */
  async reconcile(hospitalList: string, currentHomeList: Medication[]): Promise<MedDiscrepancy[]> {
    console.log(`[MED_RECON]: Analyzing transition drift for med vectors.`);
    
    const prompt = `
      Hospital List: ${hospitalList}
      Home List: ${JSON.stringify(currentHomeList)}
      Task: Identify any discrepancies (Added, Removed, or Changed). 
      Identify high-risk interactions. Return JSON array of MedDiscrepancy objects.
    `;

    try {
      const res = await geminiService.generateText(prompt, false);
      return JSON.parse(res.text || '[]');
    } catch (e) {
      return [];
    }
  }
}

export const medReconService = new MedReconService();