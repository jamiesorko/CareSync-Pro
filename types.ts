
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
  ORG_COMMAND = 'Agency Mgmt',
  HR_HUB = 'Resource Core',
  FINANCE = 'Fiscal Ledger'
}

export interface User {
  name: string;
  role: CareRole;
}

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt?: string;
}

export interface Applicant extends BaseEntity {
  name: string;
  role: CareRole;
  credentialsVerified: boolean;
  referencesChecked: boolean;
  cultureFitScore: number;
  status: 'PENDING' | 'INTERVIEW_SET' | 'HIRED' | 'REJECTED';
  appliedDate: string;
}

export interface Certificate extends BaseEntity {
  staffId: string;
  staffName: string;
  type: string;
  expiryDate: string;
  status: 'VALID' | 'WARNING' | 'EXPIRED' | 'SUSPENDED';
}

export interface TrainingRecord extends BaseEntity {
  staffId: string;
  staffName: string;
  moduleName: string;
  isMandatory: boolean;
  isCompleted: boolean;
  dueDate: string;
}

export interface LeaveRequest extends BaseEntity {
  staffId: string;
  staffName: string;
  type: string;
  option1: { start: string; end: string };
  option2?: { start: string; end: string };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: string;
  coverageRisk: number; // 0-100
}

export interface DisciplinaryAction extends BaseEntity {
  staffId: string;
  type: 'LATE' | 'DOCUMENTATION' | 'BEHAVIORAL' | 'SAFETY';
  count: number;
  note: string;
}

export interface Client {
  id: string;
  companyId?: string;
  anonymizedId: string;
  name: string;
  address: string;
  sector: 'Woodbridge' | 'Scarborough' | 'Toronto' | 'Vaughan' | 'General';
  phone: string;
  time: string;
  conditions: string[];
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
  medications?: Medication[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: CareRole | string;
  status: 'ONLINE' | 'OFFLINE' | 'IN_FIELD';
  weeklyHours: number;
  anonymizedId: string;
  homeSector: 'Woodbridge' | 'Scarborough' | 'Toronto' | 'Vaughan';
  availability: string;
  restrictedClientIds: string[];
  specialties: string[];
  hourlyRate?: number;
  lastSeen?: string;
  disciplinaryCount: number;
}

export type AlertType = 'FALL' | 'CHOKING' | 'MEDICAL' | 'UNSAFE_ENV' | 'RESTRICTION' | 'CLINICAL' | 'OPERATIONAL' | 'FISCAL' | 'NOT_SEEN' | 'COMPLAINT' | 'SWELLING' | 'INTEGRITY_AUDIT' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q';

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED' | 'DISPATCHED';
  clientName?: string;
}

// Additional interfaces to support various services and features

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: { title: string; uri: string }[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: 'SENT_TO_CLIENT' | 'PENDING' | 'FILLED';
  candidates: string[];
}

export interface BillingAlert {
  id: string;
  staffName: string;
  clientName: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  companyId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  companyId: string;
  name: string;
  type: 'DIRECT' | 'GROUP';
  lastMessage?: string;
  unreadCount: number;
}

export interface FormRequirement {
  id: string;
  companyId: string;
  name: string;
  submissionTarget: string;
  isMandatory: boolean;
}

export interface Complaint extends BaseEntity {
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  content: string;
  timestamp: string;
  status: 'NEW' | 'INVESTIGATING' | 'RESOLVED';
  priority: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  type: 'CLIENT_ISSUE' | 'STAFF_GRIEVANCE';
}

export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
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
}

export interface OncallShift extends BaseEntity {
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'BACKUP';
}

export interface CommunityResource {
  name: string;
  address: string;
  category: string;
  uri: string;
}

export interface ContingencyPlan {
  impactedClients: string[];
  suggestedRescuers: string[];
  etaVariance: number;
}

export interface RecoveryMilestone {
  title: string;
  status: 'ACHIEVED' | 'PENDING' | 'AT_RISK' | 'ON_TRACK' | 'STAGNANT' | 'DELAYED';
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
  perspectives: { entity: string; focus: string; risk: string }[];
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
  decisionNodes: { time: string; staffAction: string; isOptimal: boolean }[];
  trainingForge: string[];
}

export interface TriageReferral {
  id: string;
  patientName: string;
  source: string;
  gravityScore: number;
  clinicalAcuity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  logisticalFit: number;
  aiRationale: string;
  status: 'NEW' | 'TRIAGED' | 'ACCEPTED' | 'REJECTED';
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
  nutritionDrift: 'STABLE' | 'WARNING' | 'CRITICAL';
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

export interface StrategicScenario extends BaseEntity {
  title: string;
  projection: { month: number; netReserve: number; staffRetention: number }[];
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
  multimodalTimeline: { time: string; source: string; evidence: string; hash: string }[];
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
  specialistInputs: { role: string; directive: string; conflict: boolean }[];
  unifiedCareVector: string;
  criticalSynergyAlert: string | null;
  consensusScore: number;
}

export interface ChairmanMandate extends BaseEntity {
  timestamp: string;
  stateOfAgency: string;
  institutionalFragilityPoints: string[];
  nonNegotiableDirectives: { title: string; action: string; impact: string }[];
  strategicRiskIndex: number;
  marketSentimentGrounded: string;
}

export interface IoTAsset extends BaseEntity {
  name: string;
  type: 'VEHICLE' | 'HARDWARE';
  status: 'NOMINAL' | 'FAULT' | 'MAINTENANCE';
  telemetry: string;
  repairGroundedInfo: string;
}

export interface BioTrajectory {
  clientId: string;
  recoveryVelocity: number;
  predictedIndependenceDate: string;
  stagnationProbability: number;
  milestones: { title: string; status: string }[];
  clinicalRationale: string;
}

export interface EthicsConsult extends BaseEntity {
  timestamp: string;
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: { entity: string; focus: string; risk: string }[];
  consensusDirective: string;
  legislativeGuardrail: string;
}

export interface TrainingModule extends BaseEntity {
  title: string;
  targetSkill: string;
  conceptBrief: string;
  questions: { q: string; a: string[]; correct: number }[];
  masteryTarget: number;
}

export interface ProtocolDraft {
  title: string;
  objective: string;
  regulatoryAlignment: string;
  workflowSteps: { role: string; task: string; critical: boolean }[];
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
  type: 'MILEAGE' | 'SUPPLY' | 'HOURS' | 'UPCODING';
  confidence: number;
  estimatedLoss: number;
  involvedStaff: string;
  rationale: string;
}

export interface TruthMediationCase {
  clientId: string;
  divergentSignals: { staffName: string; role: string; note: string }[];
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
  status: 'PENDING' | 'READY';
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
  scientificCitations: { title: string; uri: string }[];
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
