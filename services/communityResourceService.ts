import { GoogleGenAI } from "@google/genai";
import { CommunityResource } from '../types';

export class CommunityResourceService {
  private companyId: string | null = null;

  setContext(id: string) {
    this.companyId = id;
  }

  /**
   * Uses Gemini 2.5 with Maps Tooling to find actual medical resources near a patient.
   */
  async findNearbySupport(address: string, type: 'PHARMACY' | 'REHAB' | 'HOSPITAL'): Promise<CommunityResource[]> {
    console.log(`[MAPS_GROUNDING]: Scanning for ${type} near ${address}`);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Find 3 high-rated ${type} centers within 10km of ${address}. Include names and URLs.`;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }]
        }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return chunks.map((chunk: any) => {
        if (chunk.maps) {
          return {
            name: chunk.maps.title,
            address: "Refer to map",
            category: type,
            uri: chunk.maps.uri
          };
        }
        return null;
      }).filter(Boolean);
    } catch (e) {
      return [];
    }
  }
}

export const communityResourceService = new CommunityResourceService();