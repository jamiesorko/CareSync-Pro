
import { Company, AppTab, Client, StaffMember } from "../types";
import { MOCK_CLIENTS, MOCK_STAFF } from "../data/careData";

export class DBService {
  async getCompanies(): Promise<Company[]> {
    return [{ 
      id: 'csp-demo', 
      name: 'CareSync Neural Demo', 
      brandColor: '#6366f1', 
      activeModules: Object.values(AppTab)
    }];
  }

  // Fixed: Implemented getStaff to return mock data
  async getStaff(): Promise<StaffMember[]> { return MOCK_STAFF; }
  
  // Fixed: Implemented getClients to return mock data
  async getClients(): Promise<Client[]> { return MOCK_CLIENTS; }

  async updateCompanySettings(id: string, settings: Partial<Company>): Promise<void> {
    console.log(`[DB_SERVICE]: Updating settings for company ${id}`, settings);
  }
}

export const dbService = new DBService();
