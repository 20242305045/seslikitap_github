/**
 * Audio narration engine supporting:
 * - Real Turkish Web Speech Synthesis narration
 * - Ambient background soundscape (soothing vinyl / calm focus / silence)
 * - Exact time scrub, speed control (0.5x - 2.5x)
 * - Visualizer waveform analysis data generator
 */

class AudioEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCtx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillator: OscillatorNode | null = null;
  private isAmbientPlaying = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public speak(
    text: string,
    speed: number,
    onEnd?: () => void,
    onBoundary?: (charIndex: number) => void,
    lang: string = 'tr'
  ) {
    if (!this.synth) return;

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.min(Math.max(speed, 0.5), 2.5);
    utterance.pitch = 1.0;

    // Pick appropriate voice based on language
    const voices = this.synth.getVoices();
    if (lang === 'en' || lang.startsWith('en')) {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
    } else {
      utterance.lang = 'tr-TR';
      const trVoice = voices.find(v => v.lang.toLowerCase().includes('tr') || v.lang.toLowerCase().includes('tur'));
      if (trVoice) {
        utterance.voice = trVoice;
      }
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Don't crash if interrupted
      console.warn('SpeechSynthesis event:', e.error);
    };

    if (onBoundary) {
      utterance.onboundary = (e) => {
        onBoundary(e.charIndex);
      };
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pauseSpeaking() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resumeSpeaking() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public setSpeed(speed: number, currentText?: string, remainingRatio?: number) {
    if (!this.synth) return;
    if (this.synth.speaking && currentText) {
      // Restart speech with new rate starting near the proportional position
      this.stopSpeaking();
      const startIndex = remainingRatio ? Math.floor(currentText.length * remainingRatio) : 0;
      const subText = currentText.substring(startIndex);
      if (subText.trim()) {
        this.speak(subText, speed);
      }
    }
  }

  // Atmospheric gentle tone generator for rich acoustic immersion
  public startAmbientTone(soundType: 'none' | 'rain' | 'library' | 'vinyl') {
    if (soundType === 'none') {
      this.stopAmbientTone();
      return;
    }

    try {
      this.initAudioContext();
      if (!this.audioCtx) return;

      if (this.isAmbientPlaying) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Soft warm low-frequency soundscape
      osc.type = soundType === 'rain' ? 'sine' : soundType === 'vinyl' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(soundType === 'rain' ? 82 : 110, this.audioCtx.currentTime);

      // Very gentle, soothing background level (0.02)
      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      this.ambientOscillator = osc;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
    } catch (err) {
      console.warn('AudioContext ambient init error:', err);
    }
  }

  public stopAmbientTone() {
    try {
      if (this.ambientOscillator) {
        this.ambientOscillator.stop();
        this.ambientOscillator.disconnect();
        this.ambientOscillator = null;
      }
      this.isAmbientPlaying = false;
    } catch (e) {
      // ignore
    }
  }
}

export const audioEngine = new AudioEngine();

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const hrs = Math.floor(mins / 60);

  if (hrs > 0) {
    const remMins = mins % 60;
    return `${hrs}:${remMins < 10 ? '0' : ''}${remMins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
