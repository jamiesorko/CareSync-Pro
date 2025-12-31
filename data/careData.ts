
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  { 
    id: 'P1', 
    name: 'Elena Rodriguez', 
    role: CareRole.PSW, 
    status: 'ONLINE', 
    weeklyHours: 38,
    anonymizedId: 'P-202',
    homeSector: 'Woodbridge',
    availability: '08:00-16:00', // Constraints
    restrictedClientIds: [],
    specialties: ['Dementia', 'Hoyer Lifts'],
    hourlyRate: 25,
    disciplinaryCount: 0
  },
  { 
    id: 'P2', 
    name: 'Sarah Jenkins', 
    role: CareRole.PSW, 
    status: 'IN_FIELD', 
    weeklyHours: 42,
    anonymizedId: 'P-404',
    homeSector: 'Scarborough',
    availability: '10:00-18:00',
    restrictedClientIds: [],
    specialties: ['Palliative', 'Post-Op'],
    hourlyRate: 24,
    disciplinaryCount: 2
  },
  { 
    id: 'RN1', 
    name: 'Tom Hardy', 
    role: CareRole.RN, 
    status: 'ONLINE', 
    weeklyHours: 35,
    anonymizedId: 'R-701',
    homeSector: 'Toronto',
    availability: '09:00-17:00',
    restrictedClientIds: [],
    specialties: ['Wound Care', 'IV Therapy'],
    hourlyRate: 55,
    disciplinaryCount: 0
  },
  { 
    id: 'RPN1', 
    name: 'Jared Leto', 
    role: CareRole.RPN, 
    status: 'ONLINE', 
    weeklyHours: 40,
    anonymizedId: 'RPN-303',
    homeSector: 'Vaughan',
    availability: '09:00-17:00',
    restrictedClientIds: [],
    specialties: ['Geriatrics'],
    hourlyRate: 40,
    disciplinaryCount: 0
  },
  { 
    id: 'H1', 
    name: 'Marcus Bell', 
    role: CareRole.HSS, 
    status: 'ONLINE', 
    weeklyHours: 30,
    anonymizedId: 'H-505',
    homeSector: 'Mississauga',
    availability: 'Flexible',
    restrictedClientIds: [],
    specialties: ['Social Support'],
    hourlyRate: 28,
    disciplinaryCount: 0
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'C1',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Woodbridge, ON',
    sector: 'Woodbridge',
    phone: '416-555-1234',
    conditions: ['Post-Op Hip', 'T2 Diabetes'],
    carePlans: { 
      [CareRole.PSW]: ['Assisted Bed Bath', 'Hoyer Transfer'],
      [CareRole.RN]: ['Surgical Site Assessment'],
      [CareRole.RPN]: ['Medication Review'],
      [CareRole.HSS]: ['Environmental Safety Check']
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-901',
    time: '08:30 AM',
    mobilityStatus: {
      isBedridden: true,
      useWheelchair: true,
      useWalker: false,
      dementia: false,
      liftType: 'Hoyer',
      transferMethod: 'Mechanical'
    },
    isInitialVisit: false,
    description: 'Post-op stabilization.',
    blacklistStaffIds: [],
    coordinatorInstructions: 'Please ensure floor is clear of rugs before transfer.'
  },
  {
    id: 'C2',
    name: 'Martha Stewart',
    address: '101 Bay Street, Toronto, ON',
    sector: 'Toronto',
    phone: '416-555-9988',
    conditions: ['Dementia'],
    carePlans: { 
      [CareRole.RN]: ['Cognitive Assessment']
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-902',
    time: '10:00 AM',
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: false,
      useWalker: true,
      dementia: true,
      liftType: 'None',
      transferMethod: 'Independent'
    },
    isInitialVisit: false,
    description: 'Cognitive review.',
    blacklistStaffIds: [],
  }
];
