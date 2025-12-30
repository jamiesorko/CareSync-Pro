
export enum CareRole {
  CEO = 'CEO',
  RN = 'Registered Nurse',
  PSW = 'Personal Support Worker',
  COORDINATOR = 'Coordinator',
  RPN = 'Registered Practical Nurse',
  ACCOUNTANT = 'Accountant',
  HR_SPECIALIST = 'HR Specialist',
  DOC = 'Director of Care',
  COO = 'Chief Operating Officer',
  HSS = 'Health Support Specialist',
  COORD = 'Coordinator'
}

export enum AppTab {
  DASHBOARD = 'Dashboard',
  SCHEDULE = 'Scheduling',
  CLINICAL_COMMAND = 'Clinical Center',
  INCIDENT_REPORTS = 'Incidents',
  MESSAGES = 'Messaging',
  COORDINATION = 'Census',
  ORG_COMMAND = 'Agency Mgmt'
}

export interface User {
  name: string;
  role: CareRole;
}

export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
}

/* Updated Client interface to include missing properties used in data/careData.ts and other features */
export interface Client {
  id: string;
  companyId?: string;
  anonymizedId: string;
  name: string;
  address: string;
  sector: string;
  phone: string;
  time: string;
  date?: string;
  conditions: string[];
  medications?: Medication[];
  blacklistStaffIds: string[];
  mobilityStatus: {
    isBedridden: boolean;
    useWheelchair: boolean;
    useWalker: boolean;
    dementia: boolean;
    liftType: string;
    transferMethod: string;
  };
  isInitialVisit: boolean;
  description: string;
  carePlans: Record<string, string[]>;
  currentVisitStatus?: 'IDLE' | 'IN_PROGRESS' | 'COMPLETED';
  risk?: RiskScore;
  coordinatorInstructions?: string;
  docInstructions?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: CareRole | string;
  status: 'ONLINE' | 'OFFLINE' | 'IN_FIELD';
  weeklyHours: number;
  anonymizedId: string;
  homeSector: string;
  availability: string;
  restrictedClientIds: string[];
  hourlyRate?: number;
  lastSeen?: string;
}

export interface PatientDailySynthesis {
  headline: string;
  accomplishments: string[];
  visitorToday: string;
  tomorrowPreview: string;
  soothingNote: string;
}

export interface ZenVideoPrompt {
  prompt: string;
  mood: string;
  estimatedDuration: number;
}

/* Added missing exported types to fix module export errors */

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: { title?: string; uri?: string }[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export type AlertType = 'FALL' | 'CHOKING' | 'MEDICAL' | 'UNSAFE_ENV' | 'BOOK_OFF' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'INSURANCE_Q' | 'RESTRICTION' | 'T4_REQUEST' | 'CLINICAL' | 'OPERATIONAL' | 'FISCAL' | 'INTEGRITY_AUDIT';

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED' | 'DISPATCHED';
  clientName?: string;
  triage_note?: string;
}

export interface BillingAlert {
  id: string;
  staffName: string;
  clientName: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  companyId: string;
  name: string;
  type: 'PRIVATE' | 'GROUP';
  lastMessage: string;
  unreadCount: number;
}

export interface FormRequirement {
  id: string;
  name: string;
  submissionTarget: string;
  isMandatory: boolean;
}

export interface Applicant {
  id: string;
  companyId: string;
  name: string;
  role: CareRole | string;
  credentialsVerified: boolean;
  referencesChecked: boolean;
  cultureFitScore: number;
  status: 'PENDING' | 'INTERVIEW_SET' | 'HIRED' | 'REJECTED';
  appliedDate: string;
}

export interface Certificate {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  type: string;
  expiryDate: string;
  status: 'VALID' | 'WARNING' | 'EXPIRED';
}

export interface TrainingRecord {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  moduleName: string;
  isMandatory: boolean;
  isCompleted: boolean;
  dueDate: string;
}

export interface LeaveRequest {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  type: 'VACATION' | 'LOA' | 'SICK' | 'PERSONAL';
  option1: { start: string; end: string };
  option2?: { start: string; end: string };
  status: 'PENDING' | 'APPROVED' | 'DENIED';
  timestamp: string;
}

export interface Complaint {
  id: string;
  companyId: string;
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  content: string;
  timestamp: string;
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED';
  priority: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  type: 'CLIENT_ISSUE' | 'STAFF_GRIEVANCE' | 'SYSTEM_ERROR';
}

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules?: string[];
}

export interface UserProfile {
  id: string;
  companyId: string;
  role: CareRole;
  fullName: string;
}

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt?: string;
}

export interface InventoryItem extends BaseEntity {
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  minThreshold: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
}

export interface OncallShift extends BaseEntity {
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'SECONDARY' | 'BACKUP';
}

export interface CommunityResource {
  name: string;
  address: string;
  category: string;
  uri?: string;
}

export interface ContingencyPlan {
  impactedClients: string[];
  suggestedRescuers: string[];
  etaVariance: number;
}

export interface RecoveryMilestone {
  title: string;
  status: 'ON_TRACK' | 'STAGNANT' | 'DELAYED' | 'ACHIEVED' | 'PENDING' | 'AT_RISK';
}

export interface ClinicalTruthVector {
  clientId: string;
  timestamp: string;
  acuityScore: number;
  fusionLevel: string;
  topDiagnosticSignals: string[];
}

export interface SecurityProbe extends BaseEntity {
  actorId: string;
  action: string;
  resourcePath: string;
  anomalyScore: number;
  threatLevel: 'NONE' | 'ELEVATED' | 'CRITICAL';
}

export interface ClinicalBoardReview extends BaseEntity {
  clientId: string;
  timestamp: string;
  caseSummary: string;
  perspectives: any[];
  consensusPlan: string;
}

export interface RevenueGap {
  visitId: string;
  missingProcedure: string;
  estimatedValue: number;
  clinicalEvidence: string;
  billingCodeSuggestion: string;
}

export interface AfterActionReview {
  eventId: string;
  observedPath: string;
  optimalPath: string;
  decisionNodes: any[];
  trainingForge: any[];
}

export interface TriageReferral {
  id: string;
  patientName: string;
  source: string;
  gravityScore: number;
  clinicalAcuity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  logisticalFit: number;
  aiRationale: string;
  status: string;
}

export interface CrisisResource {
  name: string;
  type: string;
  distance: string;
  uri: string;
}

export interface BioSocialSignal {
  clientId: string;
  isolationScore: number;
  nutritionDrift: string;
  environmentalIntegrity: number;
  aiSynthesis: string;
  recommendedSocialIntercept: string;
}

export interface NeighborhoodImmunity {
  postalCode: string;
  threatType: string;
  intensity: number;
  mandateUpdate: string;
}

export interface StrategicScenario extends BaseEntity {
  title: string;
  projection: any[];
  failurePoint: string;
  mitigationStrategy: string;
  riskIndex: number;
}

export interface OutbreakZone {
  postalCode: string;
  threatType: string;
  severity: 'SAFE' | 'WARNING' | 'CRITICAL';
  intensity: number;
  mandatoryPPE: string[];
  advisory: string;
}

export interface MarketThreat {
  competitor: string;
  wageOffer: string;
  bonus: string;
  sector: string;
}

export interface StaffLoyaltyRisk {
  staffId: string;
  riskLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  vulnerabilityFactors: string[];
  suggestedPremium: number;
  rationale: string;
}

export interface HuddleSignal extends BaseEntity {
  clientId: string;
  truthSynthesis: string;
  contradictionDetected: boolean;
  biometricDrift: string;
  remediationDirective: string;
  confidence: number;
}

export interface ForensicDossier {
  eventId: string;
  truthVector: string;
  multimodalTimeline: any[];
  legalDefensibilityScore: number;
  exposureAnalysis: string;
}

export interface DominanceStrategy {
  region: string;
  targetServiceLine: string;
  competitorWeakness: string;
  marketGroundedLogic: string;
  bidConfidence: number;
  draftedValueProposition: string;
}

export interface NexusConsensus extends BaseEntity {
  clientId: string;
  specialistInputs: any[];
  unifiedCareVector: string;
  criticalSynergyAlert: string | null;
  consensusScore: number;
}

export interface ChairmanMandate extends BaseEntity {
  timestamp: string;
  stateOfAgency: string;
  institutionalFragilityPoints: string[];
  nonNegotiableDirectives: any[];
  strategicRiskIndex: number;
  marketSentimentGrounded: string;
}

export interface IoTAsset {
  id: string;
  name: string;
  type: string;
  status: string;
  telemetry: string;
  repairGroundedInfo: string;
}

export interface BioTrajectory {
  clientId: string;
  recoveryVelocity: number;
  predictedIndependenceDate: string;
  stagnationProbability: number;
  milestones: RecoveryMilestone[];
  clinicalRationale: string;
}

export interface EthicsConsult extends BaseEntity {
  timestamp: string;
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: any[];
  consensusDirective: string;
  legislativeGuardrail: string;
}

export interface TrainingModule extends BaseEntity {
  title: string;
  targetSkill: string;
  conceptBrief: string;
  questions: any[];
  masteryTarget: number;
}

export interface ProtocolDraft {
  title: string;
  objective: string;
  regulatoryAlignment: string;
  workflowSteps: any[];
  auditChecklist: string[];
}

export interface RecoveryVector {
  staffId: string;
  staffName: string;
  failureType: string;
  nearestRepairShop: string;
  rescueEtaMinutes: number;
  reassignedStaffId: string;
  reassignedStaffName: string;
}

export interface PatientTwinSim {
  clientId: string;
  changeDescription: string;
  predictedStability: number[];
  complicationRisk: number;
  staffWorkloadImpact: number;
  clinicalAdvisory: string;
}

export interface LeakageSignal {
  type: string;
  confidence: number;
  estimatedLoss: number;
  involvedStaff: string;
  rationale: string;
}

export interface TruthMediationCase {
  clientId: string;
  divergentSignals: any[];
  aiSynthesizedTruth: string;
  discrepancyProbability: number;
  safetyPriorityLevel: string;
  suggestedDirective: string;
}

export interface ReclamationCase {
  id: string;
  denialCode: string;
  denialReason: string;
  evidenceHarvested: string[];
  successProbability: number;
  draftedAppeal: string;
  status: 'READY' | 'QUEUED';
}

export interface RegionalViralPulse {
  region: string;
  threatType: string;
  surgeIntensity: number;
  sourceUri: string;
  ppeMandate: string[];
  fleetImpactAdvisory: string;
}

export interface SyntheticInsight {
  patientId: string;
  globalPeerComparison: string;
  predictedLongTermTrajectory: string;
  scientificCitations: any[];
}

export interface DeviceReading {
  deviceName: string;
  detectedValue: string;
  standardizedMetric: string;
  confidence: number;
  fhirMappedJson: string;
}

export interface RegulatoryPatch extends BaseEntity {
  newLawReference: string;
  affectedSOPs: string[];
  autoDraftedRevision: string;
  complianceDeadline: string;
}

export interface BlastStatus {
    // added for CoordinationHub
}

// Fix: Moved AIStudio definition inside declare global and removed the redundant export
// to resolve "Subsequent property declarations must have the same type" conflict with environment types.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}
