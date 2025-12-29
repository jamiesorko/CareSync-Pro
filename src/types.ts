
export enum CareRole {
  CEO = 'CEO',
  RN = 'Registered Nurse',
  PSW = 'Personal Support Worker',
  COORD = 'Coordinator'
}

export interface User {
  name: string;
  role: CareRole;
}
