
export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
}

export enum CareRole {
  CEO = 'CEO',
  COO = 'COO',
  DOC = 'Director of Care',
  RN = 'Registered Nurse',
  RPN = 'Registered Practical Nurse',
  PSW = 'Personal Support Worker',
  ACCOUNTANT = 'Accountant',
  CLIENT = 'Client',
  HSS = 'Health & Social Specialist',
  COORDINATOR = 'Coordinator',
  HR_SPECIALIST = 'HR Specialist'
}

export enum AppTab {
  DASHBOARD = 'Ops_Dashboard',
  STRATEGY = 'Strategic_Tabletop',
  CLINICAL = 'Clinical_Governance',
  LOGISTICS = 'Fleet_Command',
  FISCAL = 'Fiscal_Ledger',
  VAULT = 'Neural_Vault',
  WELLNESS = 'Patient_Wellness',
  RESOURCE = 'Resource_Core',
  LIVE = 'Direct_Link',
  ORG_COMMAND = 'Strategic_Moat',
  // Added missing tabs used in CommandGrid
  SCHEDULE = 'Roster_Deployment',
  CLINICAL_COMMAND = 'Clinical_Intel',
  COORDINATION = 'Census_Matrix',
  HR_HUB = 'Resource_Core_Node',
  FINANCE = 'Fiscal_Ledger_Node'
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

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: { title?: string; uri: string }[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export type AlertType = 'MEDICAL' | 'CLINICAL' | 'UNSAFE_ENV' | 'SWELLING' | 'FALL' | 'COMPLAINT' | 'NOT_SEEN' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q' | 'INTEGRITY_AUDIT' | 'CHOKING';

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  clientName?: string;
}

export interface ChatThread extends BaseEntity {
  name: string;
  type: 'GROUP' | 'PRIVATE';
  lastMessage?: string;
  unreadCount: number;
}

export interface ChatMessage extends BaseEntity {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface FormRequirement extends BaseEntity {
  name: string;
  submissionTarget: string;
  isMandatory: boolean;
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
  status: 'SUSPENDED' | 'WARNING' | 'VALID';
}

export interface TrainingRecord extends BaseEntity {
  staffId: string;
  staffName: string;
  moduleName: string;
  isMandatory: boolean;
  isCompleted: boolean;
  dueDate: string;
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

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules?: string[];
}

export interface LeaveRequest {
  staffId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface UserProfile {
  id: string;
  companyId: string;
  role: CareRole;
  fullName: string;
}

export interface InternalEmail extends BaseEntity {
  senderId: string;
  senderName: string;
  recipientRole: string;
  subject: string;
  body: string;
  isRead: boolean;
  priority: 'NORMAL' | 'HIGH';
}

export interface InventoryItem extends BaseEntity {
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  minThreshold: number;
}

export interface OncallShift extends BaseEntity {
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'SECONDARY';
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
  status: 'ON_TRACK' | 'STAGNANT' | 'DELAYED';
}

export interface ClinicalTruthVector {
  clientId: string;
  timestamp: string;
  acuityScore: number;
  fusionLevel: 'TOTAL_SYNTHESIS' | 'SENSORY_ONLY';
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
  perspectives: { role: string; view: string }[];
  consensusPlan: string;
}

export interface RevenueGap {
  visitId: string;
  missingProcedure: string;
  estimatedValue: number;
  clinicalEvidence: string;
  billingCodeSuggestion: string;
}

export interface TrainingModule extends BaseEntity {
  title: string;
  targetSkill: string;
  conceptBrief: string;
  questions: { q: string; a: string[]; correct: number }[];
  masteryTarget: number;
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
  threatType: 'FLU' | 'RSV' | 'COVID' | 'NONE';
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
  nonNegotiableDirectives: string[];
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
  milestones: { title: string; status: 'ACHIEVED' | 'PENDING' | 'AT_RISK' }[];
  clinicalRationale: string;
}

export interface EthicsConsult extends BaseEntity {
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: { entity: string; focus: string; risk: string }[];
  consensusDirective: string;
  legislativeGuardrail: string;
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
  failureType: 'MECHANICAL' | 'MEDICAL' | 'COMMS';
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
  safetyPriorityLevel: 'STABLE' | 'WATCH' | 'CRITICAL';
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

export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: string;
  candidates: string[];
}
