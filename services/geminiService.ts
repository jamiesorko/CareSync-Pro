
import { GoogleGenAI, Modality } from "@google/genai";

export class GeminiService {
  /**
   * Internal helper to always get a fresh instance of GoogleGenAI.
   * This ensures we use the most up-to-date API key (especially important for Veo/selected keys).
   */
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  // Used by TextChat, CapacityPlanner, systemService, clinicalInsightService, reportingService, intakeService, predictionService, searchService, protocolService, sentimentService, recruitmentService, matchingService, burnoutDetectionService, regulatoryService, schedulingOptimizationService, triageService, outbreakService, audioAnalysisService, regulatoryDriftService, advocacyService, interventionService, clinicalDecisionSupportService, fiscalForecastingService, carePlanOptimizationService, telehealthSessionService, fraudDetectionService, patientEngagementService, staffDevelopmentService, predictiveStaffingService, patientAdvocacyService, claimOptimizationService, clinicalSummaryService, incidentTrendService, referralManagementService, policyRetrievalService, pathwayService, sdohService, clinicalTranslationService, clinicalValidationService, familySynthesisService, revenueCaptureService, careEducationService, salesFunnelService, culturalIntelligenceService, medicationSafetyService, neuralHandoverService, biometricAnomalyService, policyBridgeService, behavioralInsightService, medicalTerminologyService, churnNeuralService, expenseForensicsService, medReconService, clinicalProtocolAuditService, dischargeReadinessService, butterflyEffectService, competencyAuditService, recoveryGoalOracleService, fiscalLeakageService, vocalBiomarkerService, multimodalNexusService, cohortAnalysisService, neuralTranscriptionService, predictiveTriageService, forensicDocumentationService, neuralOrchestrator, neuralKnowledgeService, clinicalBoardService, financialReconciliationService, neuralPolicyGenerator, clinicalTrajectoryService, neuralRecruitmentNexus, outcomeForecastingService, clinicalTruthService, documentationAssistantService, staffRetentionEngine, clinicalCognitionService, interventionEfficacyEngine, neuralTrainingService, clinicalSimulationEngine, outcomeBenchmarkingService, clinicalWorkflowSynthesizer, fleetAcuityRebalancer, neuralProtocolValidator, VoiceBriefingTerminal
  async generateText(prompt: string, useSearch: boolean = false) {
    const ai = this.getAI();
    const config: any = {};
    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config
    });
    return response;
  }

  // Used by ImageLab
  async generateImage(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  // Used by VideoLab, patientWellnessService, clinicalVideoGenerator
  async generateVideo(prompt: string) {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${process.env.API_KEY}`;
  }

  // Used by SpeechLab, autonomousReportingOrchestrator, clinicalContinuityForge, VoiceBriefingTerminal
  async generateSpeech(text: string, voiceName: string = 'Kore') {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  // Used by Translate.tsx
  async translate(text: string, targetLanguage: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLanguage}: "${text}". Return only the translation.`,
    });
    return response.text || text;
  }

  // Used by CEOFinancials.tsx
  async getFinancialStrategy(context: any) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these financials and provide a concise strategic recommendation: ${JSON.stringify(context)}`,
    });
    return response.text || "";
  }

  // Used by AIScheduler.tsx
  async generateSecureSchedule(clients: any[], staff: any[]) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate an optimal schedule for these clients and staff: Clients: ${JSON.stringify(clients)}, Staff: ${JSON.stringify(staff)}. Return JSON array of objects with keys: clientName, clientId, clientAddress, staffName, staffId, staffRole, scheduledTime, reasoning, weeklyLoad.`,
      config: { responseMimeType: "application/json" }
    });
    try {
      return JSON.parse(response.text || '[]');
    } catch {
      return [];
    }
  }

  // Used by NeuralScribe.tsx
  async extractClinicalInsights(transcript: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract clinical insights from this transcript: "${transcript}". Include vitals like heartRate and bp if mentioned. Return JSON.`,
      config: { responseMimeType: "application/json" }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch {
      return {};
    }
  }

  // Used by WarRoom.tsx, laborMarketService, healthIntelligenceService, etc.
  async getMarketIntelligence(query: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response;
  }

  // Used by VisionDiagnostics.tsx, imageValidationService, autonomousWoundNavigator
  async analyzeHazardImage(base64: string, prompt: string = "Analyze this clinical image for hazards or anomalies.") {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text || "";
  }

  // Used by documentService, clinicalEthicsConsultant, fiscalIntegrityOracle, etc.
  async generateAdvancedReasoning(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 24000 }
      }
    });
    return response;
  }

  // Used by NeuralSelfHealingStation.tsx
  async runSelfRepairAudit(ledger: any) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Audit this ledger for logic drift and suggest remediation: ${JSON.stringify(ledger)}. Return JSON with "remediation" key.`,
      config: { responseMimeType: "application/json" }
    });
    return response.text || "{}";
  }

  async generateClinicalInsight(prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an advanced Clinical Intelligence Engine. Provide high-density, professional directives based on clinical data.",
        temperature: 0.7,
      }
    });
    return response.text;
  }

  async analyzeClinicalImage(base64: string, prompt: string) {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
