
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  { 
    id: 's1', 
    name: 'Tom Hardy', 
    role: CareRole.RN, 
    status: 'ONLINE', 
    weeklyHours: 40,
    anonymizedId: 'RN-701',
    homeSector: 'Sector 4',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 55
  },
  { 
    id: 's2', 
    name: 'Sarah Jenkins', 
    role: CareRole.RPN, 
    status: 'IN_FIELD', 
    weeklyHours: 35,
    anonymizedId: 'RPN-802',
    homeSector: 'Sector 4',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 42
  },
  { 
    id: 's3', 
    name: 'Elena Rodriguez', 
    role: CareRole.PSW, 
    status: 'IN_FIELD', 
    weeklyHours: 38,
    anonymizedId: 'PSW-202',
    homeSector: 'Sector 1',
    availability: 'Part-time',
    restrictedClientIds: [],
    hourlyRate: 25
  },
  { 
    id: 's4', 
    name: 'Marcus Bell', 
    role: CareRole.HSS, 
    status: 'ONLINE', 
    weeklyHours: 30,
    anonymizedId: 'HSS-404',
    homeSector: 'Sector 2',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 32
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Toronto, ON',
    phone: '416-555-1234',
    conditions: ['Post-Op Hip', 'T2 Diabetes', 'Hypertension'],
    description: 'High-acuity post-surgical patient. Requires stabilization and mobility support.',
    carePlans: { 
      [CareRole.RN]: [
        'Surgical Site Assessment (Hip)', 
        'IV Patency & Infection Sweep', 
        'Advanced Medication Reconciliation', 
        'Teaching: Anticoagulant Protocol',
        'Direct Report to Attending Physician'
      ],
      [CareRole.RPN]: [
        'Subcutaneous Insulin Administration',
        'Wound Dressing Change (Clean-Tech)',
        'Vital Signs Baseline Logging',
        'Oral Medication Pass & Verification'
      ],
      [CareRole.PSW]: [
        'Assisted Bed Bath & Perineal Care', 
        'Hoyer Transfer to Wheelchair', 
        'Meal Setup & Supervised Hydration', 
        'Lower Limb Dressing Assistance'
      ],
      [CareRole.HSS]: [
        'Home Safety Forensic Audit',
        'Community PT Linkage Coordination',
        'Grocery Assistance Log'
      ]
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-901',
    sector: 'Sector 4',
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
    medications: [],
    blacklistStaffIds: []
  }
];
