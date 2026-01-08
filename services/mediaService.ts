/**
 * CareSync Pro Media Lifecycle Service
 * Handles authenticated retrieval and local saving of AI-generated assets.
 */
export const mediaService = {
  /**
   * Fetches media with the API Key and returns a local Object URL
   */
  async getAuthenticatedUrl(uri: string): Promise<string> {
    const key = process.env.API_KEY;
    const separator = uri.includes('?') ? '&' : '?';
    const response = await fetch(`${uri}${separator}key=${key}`);
    if (!response.ok) throw new Error("Failed to fetch media asset");
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
      
      // Cleanup after download trigger
      setTimeout(() => URL.revokeObjectURL(authUrl), 200);
    } catch (e) {
      console.error("Asset retrieval failure:", e);
      const key = process.env.API_KEY;
      const separator = uri.includes('?') ? '&' : '?';
      window.open(`${uri}${separator}key=${key}`, '_blank');
    }
  }
};