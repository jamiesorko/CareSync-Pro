
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  { 
    id: 's1', 
    name: 'Elena Rodriguez', 
    role: CareRole.PSW, 
    status: 'ONLINE', 
    weeklyHours: 38,
    anonymizedId: 'P-202',
    homeSector: 'Woodbridge',
    availability: '08:00-20:00',
    restrictedClientIds: [],
    specialties: ['Dementia', 'Hoyer Lifts'],
    hourlyRate: 25
  },
  { 
    id: 's2', 
    name: 'Sarah Jenkins', 
    role: CareRole.PSW, 
    status: 'IN_FIELD', 
    weeklyHours: 42,
    anonymizedId: 'P-404',
    homeSector: 'Scarborough',
    availability: '08:00-20:00',
    restrictedClientIds: [],
    specialties: ['Palliative', 'Post-Op'],
    hourlyRate: 24
  },
  { 
    id: 's3', 
    name: 'Tom Hardy', 
    role: CareRole.RN, 
    status: 'ONLINE', 
    weeklyHours: 35,
    anonymizedId: 'R-701',
    homeSector: 'Toronto',
    availability: 'Full-time',
    restrictedClientIds: [],
    specialties: ['Wound Care', 'IV Therapy'],
    hourlyRate: 55
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Woodbridge, ON',
    sector: 'Woodbridge',
    phone: '416-555-1234',
    conditions: ['Post-Op Hip', 'T2 Diabetes'],
    carePlans: { 
      [CareRole.PSW]: ['Assisted Bed Bath', 'Hoyer Transfer'],
      [CareRole.RN]: ['Surgical Site Assessment']
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-901',
    time: '08:00 AM',
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
    id: 'c2',
    name: 'Alice Cooper',
    address: '101 Bay St, Scarborough, ON',
    sector: 'Scarborough',
    phone: '416-555-9876',
    conditions: ['Dementia'],
    carePlans: { 
      [CareRole.PSW]: ['Cognitive Stimulation', 'Neighborhood Walk']
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-902',
    time: '10:30 AM',
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: false,
      useWalker: true,
      dementia: true,
      liftType: 'None',
      transferMethod: '1-Person Assist'
    },
    isInitialVisit: true,
    description: 'Early onset cognitive drift.',
    blacklistStaffIds: ['s1'] // Elena is blacklisted for Alice
  }
];
