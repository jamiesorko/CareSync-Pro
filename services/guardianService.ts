import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { encode } from '../utils/audioHelpers';

export interface SafetyPulse {
  aggressionScore: number;
  environmentRisk: number;
  aiCommentary: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export class GuardianService {
  private getApiKey(): string {
    return process.env.API_KEY || '';
  }

  async startEscort(onPulse: (pulse: SafetyPulse) => void) {
    const ai = new GoogleGenAI({ apiKey: this.getApiKey() });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            sessionPromise.then(session => session.sendRealtimeInput({ 
              media: { 
                data: encode(new Uint8Array(int16.buffer)), 
                mimeType: 'audio/pcm;rate=16000' 
              } 
            }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          const content = message.serverContent;
          if (!content) return;
          
          const outputText = content.outputTranscription?.text || "";
          const inputText = content.inputTranscription?.text || "";
          const textValue: string = outputText || inputText || "";

          if (textValue) {
            const lowText = textValue.toLowerCase();
            const isAggressive = lowText.includes('stop') || lowText.includes('help') || lowText.includes('get out');
            onPulse({
              aggressionScore: isAggressive ? 85 : 10,
              environmentRisk: 10,
              aiCommentary: textValue,
              status: isAggressive ? 'WARNING' : 'SAFE'
            });
          }
        },
        onerror: (e: any) => console.error(e),
        onclose: () => console.log("Escort finished")
      },
      config: {
        responseModalities: [Modality.AUDIO],
        outputAudioTranscription: {},
        systemInstruction: `Act as a Sentinel Safety Escort. Listen for verbal aggression, physical struggles, or clinician stress. Respond only if critical.`
      }
    });
    return await sessionPromise;
  }
}

export const guardianService = new GuardianService();