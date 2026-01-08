
/**
 * CareSync Pro Media Lifecycle Service
 * Handles authenticated retrieval of AI-generated assets.
 */
export const mediaService = {
  /**
   * Fetches media with the API Key and returns a local Object URL
   */
  async getAuthenticatedUrl(uri: string): Promise<string> {
    const key = process.env.API_KEY;
    const response = await fetch(`${uri}&key=${key}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },

  /**
   * Triggers a browser download for a specific URI
   */
  async triggerDownload(uri: string, filename: string) {
    try {
      const authUrl = await this.getAuthenticatedUrl(uri);
      const a = document.createElement('a');
      a.href = authUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(authUrl);
    } catch (e) {
      console.error("Asset retrieval failure:", e);
      // Fallback to direct link if fetch fails
      window.open(`${uri}&key=${process.env.API_KEY}`, '_blank');
    }
  }
};
