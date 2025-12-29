
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  // Added missing properties anonymizedId, homeSector, availability, restrictedClientIds
  { 
    id: 's1', 
    name: 'Tom Hardy', 
    role: CareRole.RN, 
    status: 'ONLINE', 
    weeklyHours: 40,
    anonymizedId: 'W-001',
    homeSector: 'North York',
    availability: 'Full-time',
    restrictedClientIds: []
  },
  { 
    id: 's2', 
    name: 'Linda White', 
    role: CareRole.PSW, 
    status: 'IN_FIELD', 
    weeklyHours: 38,
    anonymizedId: 'W-002',
    homeSector: 'Etobicoke',
    availability: 'Part-time',
    restrictedClientIds: []
  },
  { 
    id: 's3', 
    name: 'Samwise Gamgee', 
    role: CareRole.RPN, 
    status: 'IN_FIELD', 
    weeklyHours: 35,
    anonymizedId: 'W-003',
    homeSector: 'Scarborough',
    availability: 'Full-time',
    restrictedClientIds: []
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Toronto, ON',
    phone: '416-555-1234',
    conditions: ['Post-Op Hip', 'Hypertension'],
    description: 'Patient requires mechanical transfer support and daily wound check.',
    carePlans: { [CareRole.PSW]: ['Assisted Bath', 'Hoyer Transfer'], [CareRole.RN]: ['Wound Assessment'] },
    currentVisitStatus: 'IDLE',
    // Added missing properties anonymizedId, sector, time, mobilityStatus, isInitialVisit, medications, blacklistStaffIds
    anonymizedId: 'C-001',
    sector: 'Sector 4',
    time: '08:00 AM',
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: false,
      useWalker: true,
      dementia: false,
      liftType: 'Hoyer',
      transferMethod: 'Mechanical'
    },
    isInitialVisit: false,
    medications: [],
    blacklistStaffIds: []
  },
  {
    id: 'c2',
    name: 'Alice Cooper',
    address: '101 Bay St, Toronto, ON',
    phone: '416-555-9876',
    conditions: ['Early Onset Dementia'],
    description: 'Patient requires gentle cognitive stimulation and medication prompting.',
    carePlans: { [CareRole.PSW]: ['Meal Preparation', 'Memory Activity'] },
    currentVisitStatus: 'IDLE',
    // Added missing properties anonymizedId, sector, time, mobilityStatus, isInitialVisit, medications, blacklistStaffIds
    anonymizedId: 'C-002',
    sector: 'Sector 1',
    time: '10:30 AM',
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: false,
      useWalker: true,
      dementia: true,
      liftType: 'None',
      transferMethod: 'Independent'
    },
    isInitialVisit: true,
    medications: [],
    blacklistStaffIds: []
  }
];
