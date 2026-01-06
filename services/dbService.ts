
import { Company, AppTab, Client, StaffMember } from "../types";
import { MOCK_CLIENTS, MOCK_STAFF } from "../data/careData";

export class DBService {
  async getCompanies(): Promise<Company[]> {
    return [{ 
      id: 'csp-demo', 
      name: 'CareSync Neural Demo', 
      brandColor: '#6366f1', 
      activeModules: Object.values(AppTab).map(v => String(v))
    }];
  }

  /**
   * Retrieves all personnel dossier records.
   */
  async getStaff(): Promise<StaffMember[]> { 
    return MOCK_STAFF; 
  }
  
  /**
   * Retrieves global census matrix.
   */
  async getClients(): Promise<Client[]> { 
    return MOCK_CLIENTS; 
  }

  async updateCompanySettings(id: string, settings: Partial<Company>): Promise<void> {
    console.log(`[DB_SERVICE]: Updating settings for company ${id}`, settings);
  }
}

export const dbService = new DBService();
