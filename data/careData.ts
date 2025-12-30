
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  { 
    id: 's1', 
    name: 'Tom Hardy', 
    role: CareRole.RN, 
    status: 'ONLINE', 
    weeklyHours: 40,
    anonymizedId: 'R-101',
    homeSector: 'Sector 4',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 55,
    lastSeen: '2025-10-15T08:00:00Z'
  },
  { 
    id: 's3', 
    name: 'Samwise Gamgee', 
    role: CareRole.RPN, 
    status: 'IN_FIELD', 
    weeklyHours: 35,
    anonymizedId: 'N-303',
    homeSector: 'Sector 4',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 42,
    lastSeen: '2025-10-15T09:30:00Z'
  },
  { 
    id: 's2', 
    name: 'Linda White', 
    role: CareRole.PSW, 
    status: 'IN_FIELD', 
    weeklyHours: 38,
    anonymizedId: 'P-202',
    homeSector: 'Sector 1',
    availability: 'Part-time',
    restrictedClientIds: [],
    hourlyRate: 25,
    lastSeen: '2025-10-15T10:15:00Z'
  },
  { 
    id: 's4', 
    name: 'Marcus Bell', 
    role: CareRole.HSS, 
    status: 'ONLINE', 
    weeklyHours: 30,
    anonymizedId: 'H-404',
    homeSector: 'Sector 2',
    availability: 'Full-time',
    restrictedClientIds: [],
    hourlyRate: 32,
    lastSeen: '2025-10-15T11:00:00Z'
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Toronto, ON',
    phone: '416-555-1234',
    conditions: ['Post-Op Hip', 'Hypertension', 'T2 Diabetes'],
    description: 'High-acuity post-surgical patient requiring multi-discipline stabilization.',
    carePlans: { 
      [CareRole.PSW]: [
        'Assisted Bed Bath', 
        'Hoyer Transfer to Chair', 
        'Meal Setup & Hydration', 
        'Apply Lower Limb Compression Socks'
      ],
      [CareRole.RN]: [
        'Advanced Surgical Site Assessment (Hip)', 
        'IV Site Patency & Infection Sweep', 
        'Medication Reconciliation & Verification', 
        'Discharge Readiness Evaluation (Independence Slope)',
        'Clinical Briefing with Family Advocate'
      ],
      [CareRole.RPN]: [
        'Subcutaneous Insulin Administration',
        'Wound Dressing Change (Clean-Tech Protocol)',
        'Daily Vital Signs Baseline Logging',
        'Practical Nursing Pain Assessment'
      ],
      [CareRole.HSS]: [
        'Home Safety Environmental Forensic Audit',
        'Community Resource PT Linkage Coordination',
        'Social Isolation Vulnerability Scan',
        'Grocery Assistance Log & Nutrition Alignment'
      ]
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-001',
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
    blacklistStaffIds: [],
    risk: {
      level: 'HIGH',
      factors: ['Post-Op', 'Diabetes'],
      lastAssessed: '2025-10-14'
    }
  },
  {
    id: 'c2',
    name: 'Alice Cooper',
    address: '101 Bay St, Toronto, ON',
    phone: '416-555-9876',
    conditions: ['Early Onset Dementia', 'Arthritis'],
    description: 'Patient requires cognitive redirection and safety monitoring.',
    carePlans: { 
      [CareRole.PSW]: [
        'Morning Grooming & Oral Care', 
        'Gentle Range of Motion Exercises (Legs)',
        'Guided Neighborhood Walk (15m)',
        'Cognitive Stimulation Activity (Puzzle)'
      ],
      [CareRole.RN]: [
        'Neuro-Cognitive Personality Drift Baseline',
        'Psychotropic Medication Review (Efficacy Check)',
        'Supervisor Support Protocol Initializer'
      ],
      [CareRole.RPN]: [
        'Daily Vitals Log (BP/Pulse Focus)',
        'Oral Medication Administration',
        'Joint Swelling Assessment (Knees/Hands)'
      ],
      [CareRole.HSS]: [
        'Dementia-Friendly Dwelling Mapping',
        'Family Caregiver Respite Resource Intercept'
      ]
    },
    currentVisitStatus: 'IDLE',
    anonymizedId: 'C-002',
    sector: 'Sector 1',
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
    medications: [],
    blacklistStaffIds: []
  }
];
