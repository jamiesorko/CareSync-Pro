import { GoogleGenAI } from "@google/genai";
import { Client, SyntheticInsight } from '../types';

export class SyntheticHistoryService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  /**
   * Bridges the 40-year data gap by using Gemini 3 Pro to search global medical literature 
   * for peer-cohort outcomes matching the current patient's profile.
   */
  async bridgeHistoricalGap(client: Client): Promise<SyntheticInsight> {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    
    const query = `Long-term outcomes, regression patterns, and co-morbidity interactions for patients with: ${client.conditions.join(', ')}. Focus on patients aged 70+ in North American home care settings.`;
    
    const prompt = `
      Act as a Lead Clinical Data Scientist. We lack 40 years of patient history for ${client.name}.
      Current Profile: ${JSON.stringify(client.conditions)}
      
      Task: Perform "Synthetic Longitudinal Correlation".
      1. Search global clinical databases for the most relevant outcome studies matching this profile.
      2. Synthesize a "Simulated 10-Year Horizon" for this patient based on these global scientific vectors.
      3. Predict exactly 1 non-obvious long-term risk (e.g. vascular cognitive impairment drift).
      
      Return JSON: { 
        "comparison": "Detailed scientific peer comparison", 
        "trajectory": "Predicted 10-year clinical path", 
        "citations": [ { "title": "", "uri": "" } ] 
      }
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 20000 } 
        }
      });

      const data = JSON.parse(response.text || '{}');
      return {
        patientId: client.id,
        globalPeerComparison: data.comparison || "Baseline comparison active.",
        predictedLongTermTrajectory: data.trajectory || "Stable maintenance.",
        scientificCitations: data.citations || []
      };
    } catch (e) {
      return {
        patientId: client.id,
        globalPeerComparison: "Scientific signal bottleneck. Manual research indicated.",
        predictedLongTermTrajectory: "Trajectory simulation deferred.",
        scientificCitations: []
      };
    }
  }
}

export const syntheticHistoryService = new SyntheticHistoryService();