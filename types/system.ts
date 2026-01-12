
export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
}

export enum CareRole {
  CEO = 'CEO',
  COO = 'COO',
  DOC = 'Director of Care',
  RN = 'Registered Nurse',
  RPN = 'Registered Practical Nurse',
  PSW = 'Personal Support Worker',
  ACCOUNTANT = 'Accountant',
  CLIENT = 'Client',
  HSS = 'Health & Social Specialist',
  COORDINATOR = 'Coordinator',
  HR_SPECIALIST = 'HR Specialist'
}

export enum AppTab {
  DASHBOARD = 'Ops_Dashboard',
  STRATEGY = 'Strategic_Tabletop',
  CLINICAL = 'Clinical_Governance',
  LOGISTICS = 'Fleet_Command',
  FISCAL = 'Fiscal_Ledger',
  VAULT = 'Neural_Vault',
  WELLNESS = 'Patient_Wellness',
  RESOURCE = 'Resource_Core',
  LIVE = 'Direct_Link',
  ORG_COMMAND = 'Strategic_Moat'
}

export interface User {
  name: string;
  role: CareRole;
}
