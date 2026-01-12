
import { BaseEntity, CareRole } from './system';

export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Client extends BaseEntity {
  name: string;
  anonymizedId: string;
  sector: string;
  time: string;
  conditions: string[];
  currentVisitStatus: 'IDLE' | 'IN_PROGRESS' | 'COMPLETED' | 'ACTIVE';
  address: string;
  phone: string;
  carePlans: Record<string, string[]>;
  mobilityStatus: {
    isBedridden: boolean;
    useWheelchair: boolean;
    useWalker: boolean;
    dementia: boolean;
    liftType: string;
    transferMethod: string;
  };
  coordinatorInstructions?: string;
  docInstructions?: string;
  blacklistStaffIds: string[];
  risk?: RiskScore;
  isInitialVisit: boolean;
  description: string;
  medications: Medication[];
}

export interface StaffMember extends BaseEntity {
  name: string;
  anonymizedId: string;
  role: CareRole | string;
  status: 'ONLINE' | 'IN_FIELD' | 'OFFLINE';
  weeklyHours: number;
  homeSector: string;
  disciplinaryStrikes: number;
  availability: string;
  hourlyRate: number;
  specialties: string[];
  lat?: number;
  lng?: number;
  lastSeen?: string;
}
