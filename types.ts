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
  FISCAL = 'Fiscal_Ledger',
  FINANCE = 'Fiscal_Ledger_Node'
}

export interface User {
  name: string;
  role: CareRole;
}

export interface Client {
  id: string;
  name: string;
  anonymizedId: string;
  sector: string;
  time: string;
  currentVisitStatus: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: CareRole | string;
  status: string;
  hourlyRate: number;
}