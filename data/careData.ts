
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
    restrictedClientIds: []
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
    restrictedClientIds: []
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
    restrictedClientIds: []
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
    restrictedClientIds: []
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
        'Lower Limb Compression Socks'
      ],
      [CareRole.RN]: [
        'Surgical Site Assessment (Hip)', 
        'IV Site Patency Check', 
        'Medication Reconciliation', 
        'Discharge Readiness Evaluation',
        'Family Clinical Briefing'
      ],
      [CareRole.RPN]: [
        'Subcutaneous Insulin Administration',
        'Wound Dressing Change (Clean Tech)',
        'Vital Signs Monitoring (q4h)',
        'Pain Management Assessment'
      ],
      [CareRole.HSS]: [
        'Home Safety Environmental Audit',
        'Community Resource Linkage (Physio)',
        'Social Isolation Vulnerability Scan',
        'Grocery Assistance Coordination'
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
    blacklistStaffIds: []
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
        'Gentle Range of Motion Exercises',
        'Guided Neighborhood Walk (15m)',
        'Cognitive Stimulation Activity'
      ],
      [CareRole.RN]: [
        'Neuro-Cognitive Baseline Assessment',
        'Psychotropic Medication Review',
        'Supervisor Support Protocol Initializer'
      ],
      [CareRole.RPN]: [
        'Daily Vitals Log',
        'Oral Medication Administration',
        'Joint Swelling Assessment'
      ],
      [CareRole.HSS]: [
        'Dementia Friendly Environment Mapping',
        'Family Caregiver Respite Resource Check'
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
