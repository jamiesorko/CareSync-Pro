
import { Client, CareRole, StaffMember } from '../types';

export const MOCK_STAFF: StaffMember[] = [
  { id: 'P1', anonymizedId: 'W101', name: 'Elena Rodriguez', role: CareRole.PSW, status: 'ONLINE', weeklyHours: 38, homeSector: 'Mississauga', availability: '08:00-20:00', disciplinaryStrikes: 0, hourlyRate: 25, specialties: ['Dementia'], lat: 43.5890, lng: -79.6441 },
  { id: 'P2', anonymizedId: 'W102', name: 'Sarah Jenkins', role: CareRole.PSW, status: 'IN_FIELD', weeklyHours: 42, homeSector: 'Scarborough', availability: '08:00-20:00', disciplinaryStrikes: 1, hourlyRate: 24, specialties: [], lat: 43.7764, lng: -79.2317 },
  { id: 'RN1', anonymizedId: 'R201', name: 'Tom Hardy', role: CareRole.RN, status: 'ONLINE', weeklyHours: 35, homeSector: 'Toronto', availability: '09:00-17:00', disciplinaryStrikes: 0, hourlyRate: 55, specialties: ['Surgical Wound Care'], lat: 43.6532, lng: -79.3832 },
  { id: 'RPN1', anonymizedId: 'R202', name: 'Jared Leto', role: CareRole.RPN, status: 'ONLINE', weeklyHours: 40, homeSector: 'Vaughan', availability: '09:00-17:00', disciplinaryStrikes: 2, hourlyRate: 40, specialties: [], lat: 43.8563, lng: -79.5085 },
  { id: 'H1', anonymizedId: 'H301', name: 'Marcus Bell', role: CareRole.HSS, status: 'ONLINE', weeklyHours: 30, homeSector: 'Mississauga', availability: 'Flexible', disciplinaryStrikes: 0, hourlyRate: 28, specialties: [], lat: 43.5890, lng: -79.6441 }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'C1',
    companyId: 'demo-company',
    anonymizedId: 'C401',
    name: 'Robert Johnson',
    address: '42 Wallaby Way, Mississauga, ON',
    phone: '555-0199',
    sector: 'Mississauga',
    time: '08:30 AM',
    conditions: ['Post-Op Hip', 'T2 Diabetes'],
    carePlans: { 
      [CareRole.PSW]: ['Assisted Bed Bath', 'Hoyer Transfer'],
      [CareRole.RN]: ['Surgical Site Assessment']
    },
    currentVisitStatus: 'IDLE',
    description: 'Post-operative recovery patient with history of diabetes.',
    isInitialVisit: false,
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: true,
      useWalker: false,
      dementia: false,
      liftType: 'Mechanical',
      transferMethod: 'Mechanical'
    },
    blacklistStaffIds: [],
    medications: [{ id: 'm1', name: 'Metformin', dosage: '500mg', frequency: 'BID' }],
    risk: {
      level: 'MED',
      factors: ['Post-Op Recovery', 'Diabetes Management'],
      lastAssessed: '2025-10-15T09:00:00Z'
    }
  },
  {
    id: 'C2',
    companyId: 'demo-company',
    anonymizedId: 'C402',
    name: 'Martha Stewart',
    address: '101 Bay Street, Toronto, ON',
    phone: '555-0200',
    sector: 'Toronto',
    time: '10:00 AM',
    conditions: ['Dementia'],
    carePlans: { 
      [CareRole.RN]: ['Cognitive Assessment']
    },
    currentVisitStatus: 'IDLE',
    description: 'Dementia care with focus on orientation and routine.',
    isInitialVisit: false,
    mobilityStatus: {
      isBedridden: false,
      useWheelchair: false,
      useWalker: true,
      dementia: true,
      liftType: 'None',
      transferMethod: '1-Person'
    },
    blacklistStaffIds: [],
    medications: []
  }
];
