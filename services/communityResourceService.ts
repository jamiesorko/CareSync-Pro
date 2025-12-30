
import { GoogleGenAI } from "@google/genai";
import { CommunityResource } from '../types';

export class CommunityResourceService {
  async findNearbySupport(address: string, type: string): Promise<CommunityResource[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find ${type} near ${address}`,
        config: { tools: [{ googleMaps: {} }] }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return chunks
        .filter((c: any) => c.maps)
        .map((c: any) => ({
          name: c.maps.title || "Unknown",
          address: "Grounded Location",
          category: type,
          uri: c.maps.uri || ""
        }));
    } catch (e) {
      return [];
    }
  }
}

export const communityResourceService = new CommunityResourceService();
