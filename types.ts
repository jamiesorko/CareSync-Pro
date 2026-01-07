
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
  HR_SPECIALIST = 'HR Specialist',
  COORD = 'Coordinator'
}

export enum AppTab {
  DASHBOARD = 'Ops Dashboard',
  STRATEGY = 'Strategic Tabletop',
  CLINICAL = 'Clinical Governance',
  LOGISTICS = 'Fleet Command',
  FLEET_COMMAND = 'IoT Command',
  FISCAL = 'Fiscal Forensics',
  VAULT = 'Neural Vault',
  WELLNESS = 'Patient Wellness',
  SCHEDULE = 'Schedule',
  CLINICAL_COMMAND = 'Clinical Command',
  INCIDENT_REPORTS = 'Incident Reports',
  RESOURCE = 'Resource Core',
  LIVE = 'Direct Link',
  ORG_COMMAND = 'Instance Command',
  COORDINATION = 'Census Matrix',
  HR_HUB = 'HR Hub',
  FINANCE = 'Fiscal Ledger',
  HR_PORTAL = 'HR Portal',
  FINANCIAL = 'Financial Ledger'
}

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
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

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules: string[];
}

export interface RiskScore {
  level: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  factors: string[];
  lastAssessed: string;
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

export interface StaffMember {
  id: string;
  name: string;
  role: CareRole;
  anonymizedId: string;
  status: 'ONLINE' | 'IN_FIELD' | 'OFFLINE';
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

export interface Staff extends StaffMember {}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
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

export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: string;
  candidates: string[];
}

export type AlertType = 'MEDICAL' | 'CLINICAL' | 'UNSAFE_ENV' | 'SWELLING' | 'FALL' | 'COMPLAINT' | 'NOT_SEEN' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q' | 'INTEGRITY_AUDIT' | 'URGENT_BOOK_OFF' | 'BOOK_OFF' | 'SUPPLY_REQ';

export interface ChatMessage extends BaseEntity {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread extends BaseEntity {
  name: string;
  type: 'GROUP' | 'PRIVATE';
  lastMessage: string;
  unreadCount: number;
  createdAt: string;
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
  status: string;
  appliedDate: string;
}

export interface Certificate extends BaseEntity {
  staffId: string;
  staffName: string;
  type: string;
  expiryDate: string;
  status: 'SUSPENDED' | 'WARNING' | 'VALID' | 'EXPIRED';
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

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  clientName?: string;
}

export interface LeaveRequest extends BaseEntity {
  staffId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

export interface TriageReferral extends BaseEntity {
  patientName: string;
  source: string;
  gravityScore: number;
  clinicalAcuity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
  logisticalFit: number;
  aiRationale: string;
  status: 'NEW' | 'TRIAGED';
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
  milestones: any[];
  clinicalRationale: string;
}

export interface EthicsConsult extends BaseEntity {
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

export interface InventoryItem extends BaseEntity {
  name: string;
  category: string;
  stockLevel: number;
  unit: string;
  minThreshold: number;
}

export interface ContingencyPlan {
  impactedClients: string[];
  suggestedRescuers: string[];
  etaVariance: number;
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

export interface SecurityProbe extends BaseEntity {
  actorId: string;
  action: string;
  resourcePath: string;
  anomalyScore: number;
  threatLevel: string;
}

export interface ClinicalBoardReview extends BaseEntity {
  clientId: string;
  timestamp: string;
  caseSummary: string;
  perspectives: string[];
  consensusPlan: string;
}

export interface RevenueGap {
  visitId: string;
  missingProcedure: string;
  estimatedValue: number;
  clinicalEvidence: string;
  billingCodeSuggestion: string;
}

export interface OncallShift extends BaseEntity {
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: string;
}

export interface CommunityResource {
  name: string;
  address: string;
  category: string;
  uri: string;
}

export interface AfterActionReview {
  eventId: string;
  observedPath: string;
  optimalPath: string;
  decisionNodes: any[];
  trainingForge: any[];
}

export interface DeviceReading {
  deviceName: string;
  detectedValue: string;
  standardizedMetric: string;
  confidence: number;
  fhirMappedJson: string;
}

export interface SyntheticInsight {
  patientId: string;
  globalPeerComparison: string;
  predictedLongTermTrajectory: string;
  scientificCitations: any[];
}

export interface RegulatoryPatch extends BaseEntity {
  newLawReference: string;
  affectedSOPs: string[];
  autoDraftedRevision: string;
  complianceDeadline: string;
}
