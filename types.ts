
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
  CLIENT = 'Client/Family'
}

export enum AppTab {
  DASHBOARD = 'Dashboard',
  SCHEDULE = 'Scheduling',
  CLINICAL_COMMAND = 'Clinical Center',
  MESSAGES = 'Messaging',
  COORDINATION = 'Census',
  WAR_ROOM = 'Command War Room',
  FINANCE = 'Fiscal Ledger',
  ADMIN = 'Admin Control',
  HR_HUB = 'Resource Core',
  ORG_COMMAND = 'Instance Command',
  INCIDENT_REPORTS = 'Incident Reports'
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
  status: 'GIVEN' | 'REFUSED' | 'MISSED';
}

export interface Client {
  id: string; // C1
  companyId: string;
  anonymizedId: string;
  name: string;
  address: string;
  sector: string;
  phone: string;
  time: string;
  conditions: string[];
  carePlans: Record<string, string[]>;
  currentVisitStatus: 'IDLE' | 'IN_PROGRESS' | 'COMPLETED';
  risk?: RiskScore;
  isInitialVisit: boolean;
  mobilityStatus: MobilityStatus;
  blacklistStaffIds: string[];
  description: string;
  medications: Medication[];
  coordinatorInstructions?: string;
  docInstructions?: string;
}

export interface StaffMember {
  id: string; // P1, RN1, etc
  anonymizedId: string;
  name: string;
  role: CareRole;
  homeSector: string;
  availability: string; // e.g. "09:00-17:00"
  weeklyHours: number;
  disciplinaryStrikes: number;
  status: 'ONLINE' | 'OFFLINE' | 'IN_FIELD';
  lat?: number;
  lng?: number;
  hourlyRate: number;
  lastSeen?: string;
  specialties: string[];
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

export interface BlastStatus {
  id: string;
  clientId: string;
  roleRequired: CareRole;
  status: 'SENT_TO_CLIENT' | 'PENDING' | 'ACCEPTED';
  candidates: string[];
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
  type: 'GROUP' | 'DIRECT';
  lastMessage: string;
  unreadCount: number;
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
  status: 'PENDING' | 'INTERVIEW_SET' | 'REJECTED';
  appliedDate: string;
}

export interface Certificate {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  type: string;
  expiryDate: string;
  status: 'SUSPENDED' | 'WARNING' | 'ACTIVE';
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

export interface Company {
  id: string;
  name: string;
  brandColor?: string;
  activeModules?: string[];
}

export type AlertType = 'FALL' | 'CHOKING' | 'MEDICAL' | 'UNSAFE_ENV' | 'COMPLAINT' | 'NOT_SEEN' | 'CLINICAL' | 'INTEGRITY_AUDIT' | 'SWELLING' | 'VACATION' | 'LOA' | 'AVAILABILITY' | 'PAYROLL_DISPUTE' | 'INSURANCE_Q' | 'FISCAL' | 'OPERATIONAL' | 'URGENT_BOOK_OFF' | 'BOOK_OFF' | 'SUPPLY_REQ' | 'T4_REQUEST';

export interface AlertSignal {
  id: string;
  type: AlertType;
  content: string;
  senderName: string;
  timestamp: string;
  status: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  clientName?: string;
}

export interface LeaveRequest {
  staffId: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: string;
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
  fusionLevel: 'TOTAL_SYNTHESIS' | 'SENSORY_ONLY';
  topDiagnosticSignals: string[];
}

export interface SecurityProbe {
  id: string;
  companyId: string;
  actorId: string;
  action: string;
  resourcePath: string;
  anomalyScore: number;
  threatLevel: 'CRITICAL' | 'ELEVATED' | 'NONE';
}

export interface ClinicalBoardReview {
  id: string;
  companyId: string;
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
  status: 'NEW' | 'ACCEPTED' | 'REJECTED';
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
  threatType: 'FLU' | 'RSV' | 'COVID' | 'GASTRO' | 'NONE';
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
  companyId: string;
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

export interface HuddleSignal {
  id: string;
  companyId: string;
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
  companyId: string;
  clientId: string;
  specialistInputs: any[];
  unifiedCareVector: string;
  criticalSynergyAlert: string | null;
  consensusScore: number;
}

export interface ChairmanMandate {
  id: string;
  companyId: string;
  timestamp: string;
  stateOfAgency: string;
  institutionalFragilityPoints: string[];
  nonNegotiableDirectives: string[];
  strategicRiskIndex: number;
  marketSentimentGrounded: string;
}

export interface IoTAsset {
  id: string;
  companyId: string;
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
  milestones: RecoveryMilestone[];
  clinicalRationale: string;
}

export interface EthicsConsult {
  id: string;
  companyId: string;
  timestamp: string;
  dilemma: string;
  moralConflict: string;
  stakeholderPerspectives: any[];
  consensusDirective: string;
  legislativeGuardrail: string;
}

export interface TrainingModule {
  id: string;
  companyId: string;
  title: string;
  targetSkill: string;
  conceptBrief: string;
  questions: any[];
  masteryTarget: number;
}

export interface ProtocolDraft {
  title: string;
  objective: string;
  workflowSteps: any[];
  auditChecklist: string[];
  regulatoryAlignment: string;
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
  status: 'PENDING' | 'READY' | 'SUBMITTED' | 'RECOVERED';
}

export interface RegionalViralPulse {
  region: string;
  threatType: string;
  surgeIntensity: number;
  sourceUri: string;
  ppeMandate: string[];
  fleetImpactAdvisory: string;
}

export interface OncallShift {
  id: string;
  companyId: string;
  staffId: string;
  staffName: string;
  startTime: string;
  endTime: string;
  tier: 'PRIMARY' | 'SECONDARY';
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

export interface RegulatoryPatch {
  id: string;
  companyId: string;
  newLawReference: string;
  affectedSOPs: string[];
  autoDraftedRevision: string;
  complianceDeadline: string;
}
