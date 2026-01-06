
export enum CareRole {
  CEO = 'CEO',
  COO = 'COO',
  DOC = 'Director of Care',
  RN = 'Registered Nurse',
  RPN = 'Registered Practical Nurse',
  PSW = 'Personal Support Worker',
  HSS = 'Health Support Specialist',
  ACCOUNTANT = 'Accountant',
  HR_SPECIALIST = 'HR Specialist',
  CLIENT = 'Client',
  COORDINATOR = 'Coordinator'
}

export enum AppTab {
  DASHBOARD = 'Dashboard',
  CLINICAL = 'Clinical Core',
  LOGISTICS = 'Dispatch Grid',
  RESOURCE = 'Resource Core',
  FISCAL = 'Fiscal Ledger',
  VAULT = 'Neural Vault',
  LIVE = 'Direct Link',
  ORG_COMMAND = 'Organization Command',
  SCHEDULE = 'Schedule',
  CLINICAL_COMMAND = 'Clinical Command',
  INCIDENT_REPORTS = 'Incident Reports',
  COORDINATION = 'Coordination',
  HR_HUB = 'HR Hub',
  FINANCE = 'Finance'
}

export interface User {
  name: string;
  role: CareRole;
}

export interface UserProfile {
  id: string;
  companyId: string;
  role: CareRole;
  fullName: string;
}

export interface Metric {
  label: string;
  value: string;
  trend: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
}

export interface MobilityStatus {
  isBedridden: boolean;
  useWheelchair: boolean;
  useWalker: boolean;
  dementia: boolean;
  liftType: string;
  transferMethod: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Client {
  id: string;
  companyId: string;
  anonymizedId: string;
  name: string;
  address: string;
  phone: string;
  sector: string;
  time: string;
  conditions: string[];
  carePlans: Record<string, string[]>;
  currentVisitStatus: 'IDLE' | 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED';
  isInitialVisit: boolean;
  description: string;
  mobilityStatus: MobilityStatus;
  blacklistStaffIds: string[];
  medications: Medication[];
  risk?: RiskScore;
  coordinatorInstructions?: string;
  docInstructions?: string;
}

export interface StaffMember {
  id: string;
  anonymizedId: string;
  name: string;
  role: CareRole;
  status: 'ONLINE' | 'OFFLINE' | 'IN_FIELD';
  weeklyHours: number;
  homeSector: string;
  availability: string;
  disciplinaryStrikes: number;
  hourlyRate?: number;
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

export type AlertType = 'FALL' | 'CHOKING' | 'MEDICAL' | 'UNSAFE_ENV' | 'CLINICAL' | 'COMPLAINT' | 'NOT_SEEN' | 'INTEGRITY_AUDIT' | 'SWELLING' | 'FISCAL' | 'OPERATIONAL' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q';

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'RESOLVED' | 'DISPATCHED';
  clientName?: string;
}

export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: 'SENT_TO_CLIENT' | 'ACCEPTED' | 'FAILED';
  candidates: string[];
}

export interface FormRequirement {
  id: string;
  companyId: string;
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
  status: 'SUSPENDED' | 'WARNING' | 'VALID';
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
  completionDate?: string;
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

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
}

export interface ChatMessage extends BaseEntity {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread extends BaseEntity {
  name: string;
  type: 'GROUP' | 'DIRECT';
  lastMessage: string;
  unreadCount: number;
}

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules: string[];
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

export interface RevenueGap {
  visitId: string;
  missingProcedure: string;
  estimatedValue: number;
  clinicalEvidence: string;
  billingCodeSuggestion: string;
}

export interface ClinicalBoardReview extends BaseEntity {
  clientId: string;
  timestamp: string;
  caseSummary: string;
  perspectives: { entity: string; focus: string; risk: string }[];
  consensusPlan: string;
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
  type: string;
  status: 'NOMINAL' | 'FAULT' | 'MAINTENANCE';
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

export interface GeneratedImage {
  url: string;
  prompt: string;
}
