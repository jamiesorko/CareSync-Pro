
export enum CareRole {
  CEO = 'CEO',
  COO = 'COO',
  DOC = 'Director of Care',
  RN = 'Registered Nurse',
  PSW = 'Personal Support Worker',
  ACCOUNTANT = 'Accountant',
  CLIENT = 'Client',
  RPN = 'Registered Practical Nurse',
  HSS = 'Health & Social Specialist',
  COORDINATOR = 'Coordinator',
  HR_SPECIALIST = 'HR Specialist'
}

export enum AppTab {
  DASHBOARD = 'Ops_Dashboard',
  STRATEGY = 'Strategic_Tabletop',
  CLINICAL = 'Clinical_Governance',
  LOGISTICS = 'Fleet_Command',
  FISCAL = 'Fiscal_Forensics',
  VAULT = 'Neural_Vault',
  WELLNESS = 'Patient_Wellness',
  RESOURCE = 'Resource_Core',
  LIVE = 'Direct_Link',
  ORG_COMMAND = 'Strategic_Moat',
  SCHEDULE = 'Schedule',
  CLINICAL_COMMAND = 'Clinical_Command',
  INCIDENT_REPORTS = 'Incident_Reports',
  COORDINATION = 'Coordination',
  HR_HUB = 'HR_Hub',
  FINANCE = 'Finance'
}

export interface User {
  name: string;
  role: CareRole;
}

// Added missing interface for TextChat
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingSources?: { title?: string; uri: string }[];
}

// Added missing interface for ImageLab
export interface GeneratedImage {
  url: string;
  prompt: string;
}

// Added missing interface for Patient Wellness
export interface PatientDailySynthesis {
  headline: string;
  accomplishments: string[];
  visitorToday: string;
  tomorrowPreview: string;
  soothingNote: string;
}

// Added missing interface for ZenStation
export interface ZenVideoPrompt {
  prompt: string;
  mood: string;
  estimatedDuration: number;
}

// Added missing interface for Client
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
  currentVisitStatus: 'IDLE' | 'IN_PROGRESS' | 'COMPLETED' | 'ACTIVE';
  description: string;
  isInitialVisit: boolean;
  mobilityStatus: {
    isBedridden: boolean;
    useWheelchair: boolean;
    useWalker: boolean;
    dementia: boolean;
    liftType: string;
    transferMethod: string;
  };
  blacklistStaffIds: string[];
  medications: Medication[];
  risk?: RiskScore;
  coordinatorInstructions?: string;
  docInstructions?: string;
}

// Added missing interface for Medication
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

// Added missing interface for RiskScore
export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
}

// Added missing interface for BaseEntity
export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
}

// Added missing interface for StaffMember
export interface StaffMember {
  id: string;
  anonymizedId: string;
  name: string;
  role: CareRole | string;
  status: 'ONLINE' | 'IN_FIELD' | 'OFFLINE';
  weeklyHours: number;
  homeSector: string;
  availability: string;
  disciplinaryStrikes: number;
  hourlyRate: number;
  specialties: string[];
  lat?: number;
  lng?: number;
  lastSeen?: string;
}

// Added missing interface for BlastStatus
export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: 'SENT_TO_CLIENT' | 'PENDING';
  candidates: string[];
}

// Added missing type for AlertType
export type AlertType = 'MEDICAL' | 'CLINICAL' | 'UNSAFE_ENV' | 'SWELLING' | 'FALL' | 'COMPLAINT' | 'NOT_SEEN' | 'INTEGRITY_AUDIT' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q';

// Added missing interface for ChatMessage
export interface ChatMessage extends BaseEntity {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

// Added missing interface for ChatThread
export interface ChatThread extends BaseEntity {
  name: string;
  type: 'GROUP' | 'DIRECT';
  lastMessage: string;
  unreadCount: number;
}

// Added missing interface for FormRequirement
export interface FormRequirement extends BaseEntity {
  name: string;
  submissionTarget: string;
  isMandatory: boolean;
}

// Added missing interface for Applicant
export interface Applicant extends BaseEntity {
  name: string;
  role: CareRole;
  credentialsVerified: boolean;
  referencesChecked: boolean;
  cultureFitScore: number;
  status: string;
  appliedDate: string;
}

// Added missing interface for Certificate
export interface Certificate extends BaseEntity {
  staffId: string;
  staffName: string;
  type: string;
  expiryDate: string;
  status: 'SUSPENDED' | 'WARNING' | 'VALID';
}

// Added missing interface for TrainingRecord
export interface TrainingRecord extends BaseEntity {
  staffId: string;
  staffName: string;
  moduleName: string;
  isMandatory: boolean;
  isCompleted: boolean;
  dueDate: string;
}

// Added missing interface for Complaint
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

// Added missing interface for Company
export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules?: string[];
}

// Added missing interface for UserProfile
export interface UserProfile {
  id: string;
  companyId: string;
  role: CareRole;
  fullName: string;
}

// Added missing interface for AlertSignal
export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  clientName?: string;
}

// Added missing interface for InventoryItem
export interface InventoryItem extends BaseEntity {
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  minThreshold: number;
}

// Added missing interface for LeaveRequest
export interface LeaveRequest {
  id: string;
  staffId: string;
  type: 'VACATION' | 'SICK';
  startDate: string;
  endDate: string;
}

// Added missing interface for TriageReferral
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

// Added missing interface for BioSocialSignal
export interface BioSocialSignal {
  clientId: string;
  isolationScore: number;
  nutritionDrift: string;
  environmentalIntegrity: number;
  aiSynthesis: string;
  recommendedSocialIntercept: string;
}

// Added missing interface for NeighborhoodImmunity
export interface NeighborhoodImmunity {
  postalCode: string;
  threatType: string;
  intensity: number;
  mandateUpdate: string;
}

// Added missing interface for StrategicScenario
export interface StrategicScenario extends BaseEntity {
  title: string;
  projection: any[];
  failurePoint: string;
  mitigationStrategy: string;
  riskIndex: number;
}

// Added missing interface for OutbreakZone
export interface OutbreakZone {
  postalCode: string;
  threatType: string;
  severity: string;
  intensity: number;
  mandatoryPPE: string[];
  advisory: string;
}

// Added missing interface for HuddleSignal
export interface HuddleSignal extends BaseEntity {
  clientId: string;
  truthSynthesis: string;
  contradictionDetected: boolean;
  biometricDrift: string;
  remediationDirective: string;
  confidence: number;
}

// Added missing interface for ForensicDossier
export interface ForensicDossier {
  eventId: string;
  truthVector: string;
  multimodalTimeline: any[];
  legalDefensibilityScore: number;
  exposureAnalysis: string;
}

// Added missing interface for DominanceStrategy
export interface DominanceStrategy {
  region: string;
  targetServiceLine: string;
  competitorWeakness: string;
  marketGroundedLogic: string;
  bidConfidence: number;
  draftedValueProposition: string;
}

// Added missing interface for NexusConsensus
export interface NexusConsensus extends BaseEntity {
  clientId: string;
  specialistInputs: any[];
  unifiedCareVector: string;
  criticalSynergyAlert: string | null;
  consensusScore: number;
}

// Added missing interface for ChairmanMandate
export interface ChairmanMandate extends BaseEntity {
  timestamp: string;
  stateOfAgency: string;
  institutionalFragilityPoints: string[];
  nonNegotiableDirectives: string[];
  strategicRiskIndex: number;
  marketSentimentGrounded: string;
}

// Added missing interface for IoTAsset
export interface IoTAsset extends BaseEntity {
  name: string;
  type: string;
  status: string;
  telemetry: string;
  repairGroundedInfo: string;
}

// Added missing interface for BioTrajectory
export interface BioTrajectory {
  clientId: string;
  recoveryVelocity: number;
  predictedIndependenceDate: string;
  stagnationProbability: number;
  milestones: any[];
  clinicalRationale: string;
}

// Added missing interface for RecoveryVector
export interface RecoveryVector {
  staffId: string;
  staffName: string;
  failureType: string;
  nearestRepairShop: string;
  rescueEtaMinutes: number;
  reassignedStaffId: string;
  reassignedStaffName: string;
}

// Added missing interface for PatientTwinSim
export interface PatientTwinSim {
  clientId: string;
  changeDescription: string;
  predictedStability: number[];
  complicationRisk: number;
  staffWorkloadImpact: number;
  clinicalAdvisory: string;
}

// Added missing interface for LeakageSignal
export interface LeakageSignal {
  type: string;
  confidence: number;
  estimatedLoss: number;
  involvedStaff: string;
  rationale: string;
}

// Added missing interface for TruthMediationCase
export interface TruthMediationCase {
  clientId: string;
  divergentSignals: any[];
  aiSynthesizedTruth: string;
  discrepancyProbability: number;
  safetyPriorityLevel: string;
  suggestedDirective: string;
}

// Added missing interface for RegionalViralPulse
export interface RegionalViralPulse {
  region: string;
  threatType: string;
  surgeIntensity: number;
  sourceUri: string;
  ppeMandate: string[];
  fleetImpactAdvisory: string;
}

// Added missing interface for CrisisResource
export interface CrisisResource {
  name: string;
  type: string;
  distance: string;
  uri: string;
}

// Added missing interface for ClinicalTruthVector
export interface ClinicalTruthVector {
  clientId: string;
  timestamp: string;
  acuityScore: number;
  fusionLevel: string;
  topDiagnosticSignals: string[];
}

// Added missing interface for SecurityProbe
export interface SecurityProbe extends BaseEntity {
  actorId: string;
  action: string;
  resourcePath: string;
  anomalyScore: number;
  threatLevel: 'NONE' | 'ELEVATED' | 'CRITICAL';
}

// Added missing interface for RecoveryMilestone
export interface RecoveryMilestone {
  title: string;
  status: 'ON_TRACK' | 'STAGNANT' | 'DELAYED';
}

// Added missing interface for OncallShift
export interface OncallShift extends BaseEntity {
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'SECONDARY';
}

// Added missing interface for CommunityResource
export interface CommunityResource {
  name: string;
  address: string;
  category: string;
  uri: string;
}

// Added missing interface for ContingencyPlan
export interface ContingencyPlan {
  impactedClients: string[];
  suggestedRescuers: string[];
  etaVariance: number;
}

// Added missing interface for TrainingModule
export interface TrainingModule extends BaseEntity {
  title: string;
  targetSkill: string;
  conceptBrief: string;
  questions: any[];
  masteryTarget: number;
}

// Added missing interface for EthicsConsult
export interface EthicsConsult extends BaseEntity {
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: any[];
  consensusDirective: string;
  legislativeGuardrail: string;
}

// Added missing interface for ReclamationCase
export interface ReclamationCase {
  id: string;
  denialCode: string;
  denialReason: string;
  evidenceHarvested: string[];
  successProbability: number;
  draftedAppeal: string;
  status: 'READY' | 'PENDING';
}

// Added missing interface for InternalEmail
export interface InternalEmail extends BaseEntity {
  senderId: string;
  senderName: string;
  recipientRole: string;
  subject: string;
  body: string;
  isRead: boolean;
  priority: 'NORMAL' | 'URGENT';
}

// Added missing interface for AfterActionReview
export interface AfterActionReview {
  eventId: string;
  observedPath: string;
  optimalPath: string;
  decisionNodes: any[];
  trainingForge: any[];
}

// Added missing interface for ProtocolDraft
export interface ProtocolDraft {
  title: string;
  objective: string;
  regulatoryAlignment: string;
  workflowSteps: any[];
  auditChecklist: string[];
}

// Added missing interface for ClinicalBoardReview
export interface ClinicalBoardReview extends BaseEntity {
  clientId: string;
  timestamp: string;
  caseSummary: string;
  perspectives: string[];
  consensusPlan: string;
}

// Added missing interface for RevenueGap
export interface RevenueGap {
  visitId: string;
  missingProcedure: string;
  estimatedValue: number;
  clinicalEvidence: string;
  billingCodeSuggestion: string;
}

// Added missing interface for MarketThreat
export interface MarketThreat {
  competitor: string;
  wageOffer: string;
  bonus: string;
  sector: string;
}

// Added missing interface for StaffLoyaltyRisk
export interface StaffLoyaltyRisk {
  staffId: string;
  riskLevel: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  vulnerabilityFactors: string[];
  suggestedPremium: number;
  rationale: string;
}

// Added missing interface for SyntheticInsight
export interface SyntheticInsight {
  patientId: string;
  globalPeerComparison: string;
  predictedLongTermTrajectory: string;
  scientificCitations: { title: string; uri: string }[];
}

// Added missing interface for DeviceReading
export interface DeviceReading {
  deviceName: string;
  detectedValue: string;
  standardizedMetric: string;
  confidence: number;
  fhirMappedJson: string;
}

// Added missing interface for RegulatoryPatch
export interface RegulatoryPatch extends BaseEntity {
  newLawReference: string;
  affectedSOPs: string[];
  autoDraftedRevision: string;
  complianceDeadline: string;
}
