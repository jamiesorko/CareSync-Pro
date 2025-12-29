
export enum CareRole {
  RN = 'Registered Nurse',
  RPN = 'Registered Practical Nurse',
  PSW = 'Personal Support Worker',
  HSS = 'Home Support Specialist',
  CLIENT = 'Client',
  FAMILY = 'Family',
  HR_SPECIALIST = 'HR Specialist',
  CEO = 'CEO',
  ACCOUNTANT = 'Accountant',
  COORDINATOR = 'Coordinator',
  DOC = 'Director of Care',
  COO = 'COO'
}

export enum AppTab {
  DASHBOARD = 'Dashboard',
  SCHEDULE = 'Schedule',
  CLINICAL_COMMAND = 'Clinical Command',
  INCIDENT_REPORTS = 'Incident Reports',
  MESSAGES = 'Messages',
  CLIENT_CARE = 'Client Care',
  FAMILY_PORTAL = 'Family Portal',
  COORDINATION = 'Coordination',
  VAULT = 'Vault',
  GUARDIAN_SENTINEL = 'Guardian Sentinel',
  TRAINING_FORGE = 'Training Forge',
  ORG_COMMAND = 'Org Command'
}

export type AlertType = 'FALL' | 'BURN' | 'CHOKING' | 'MEDICAL' | 'UNSAFE_ENV' | 'BOOK_OFF' | 'CLINICAL' | 'OPERATIONAL' | 'FISCAL' | 'INTEGRITY_AUDIT' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'INSURANCE_Q' | 'RESTRICTION' | 'T4_REQUEST' | 'UNSAFE_ENV';

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
  route: string;
}

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
  description: string;
  carePlans: Record<string, string[]>;
  currentVisitStatus?: 'IDLE' | 'IN_PROGRESS' | 'COMPLETED';
  mobilityStatus: {
    isBedridden: boolean;
    useWheelchair: boolean;
    useWalker: boolean;
    dementia: boolean;
    liftType: string;
    transferMethod: string;
  };
  isInitialVisit: boolean;
  medications: Medication[];
  blacklistStaffIds: string[];
  risk?: RiskScore;
  docInstructions?: string;
  coordinatorInstructions?: string;
  isBedridden?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: CareRole;
  status: 'ONLINE' | 'IN_FIELD' | 'OFFLINE';
  weeklyHours: number;
  anonymizedId: string;
  homeSector: string;
  availability: string;
  restrictedClientIds: string[];
  hourlyRate?: number;
  lastSeen?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: { title?: string; uri?: string }[];
}

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules?: string[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface BillingAlert {
  id: string;
  staffName: string;
  clientName: string;
  type: string;
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
  role: CareRole;
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
  type: string;
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
  type: 'CLIENT_ISSUE' | 'STAFF_GRIEVANCE';
}

export interface UserProfile {
  id: string;
  companyId: string;
  role: CareRole;
  fullName: string;
}

export interface ChatThread {
  id: string;
  companyId: string;
  name: string;
  type: 'GROUP' | 'DIRECT';
  lastMessage: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
}

export interface AlertSignal {
  id: string;
  type: string;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  clientName?: string;
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
  clinicalAcuity: string;
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

export interface StrategicScenario {
  id: string;
  title: string;
  projection: any[];
  failurePoint: string;
  mitigationStrategy: string;
  riskIndex: number;
}

export interface OutbreakZone {
  postalCode: string;
  threatType: string;
  severity: string;
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
  riskLevel: string;
  vulnerabilityFactors: string[];
  suggestedPremium: number;
  rationale: string;
}

export interface HuddleSignal {
  id: string;
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

export interface NexusConsensus {
  id: string;
  clientId: string;
  specialistInputs: { role: string; directive: string; conflict: boolean }[];
  unifiedCareVector: string;
  criticalSynergyAlert: string | null;
  consensusScore: number;
}

export interface ChairmanMandate {
  id: string;
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
  location?: string;
}

export interface BioTrajectory {
  clientId: string;
  recoveryVelocity: number;
  predictedIndependenceDate: string;
  stagnationProbability: number;
  milestones: any[];
  clinicalRationale: string;
}

export interface EthicsConsult {
  id: string;
  timestamp: string;
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: any[];
  consensusDirective: string;
  legislativeGuardrail: string;
}

export interface TrainingModule {
  id: string;
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
  status: string;
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

export interface RegulatoryPatch {
  id: string;
  newLawReference: string;
  affectedSOPs: string[];
  autoDraftedRevision: string;
  complianceDeadline: string;
}

export interface InventoryItem {
  id: string;
  companyId: string;
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  minThreshold: number;
}

export interface SecurityProbe {
  id: string;
  actorId: string;
  action: string;
  resourcePath: string;
  anomalyScore: number;
  threatLevel: string;
}

export interface RecoveryMilestone {
  title: string;
  status: string;
}

export interface ClinicalTruthVector {
  clientId: string;
  timestamp: string;
  acuityScore: number;
  fusionLevel: string;
  topDiagnosticSignals: string[];
}

export interface ClinicalBoardReview {
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

export interface ContingencyPlan {
  impactedClients: string[];
  suggestedRescuers: string[];
  etaVariance: number;
}

// Added missing interface used in staffOncallService
export interface OncallShift {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'SECONDARY';
}

// Added missing interface used in communityResourceService
export interface CommunityResource {
  name: string;
  address: string;
  category: string;
  uri: string;
}

export type BlastStatus = any;
