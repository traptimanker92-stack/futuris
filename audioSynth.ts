// WebAudio Procedural Soundscapes for Regain Focus Mode

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private currentMode: string | null = null;
  private activeNodes: AudioScheduledSourceNode[] = [];
  private gainNode: GainNode | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playSoundscape(mode: 'rain' | 'binaural_432' | 'cosmic_white' | 'lofi_drone' | 'cafe_ambient') {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = mode;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (mode === 'rain') {
      this.createRainSound();
    } else if (mode === 'binaural_432') {
      this.createBinauralSound();
    } else if (mode === 'cosmic_white') {
      this.createCosmicWhiteNoise();
    } else if (mode === 'lofi_drone') {
      this.createLofiDrone();
    } else if (mode === 'cafe_ambient') {
      this.createCafeAmbient();
    }
  }

  private createRainSound() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // boost pink noise
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start();
    this.activeNodes.push(whiteNoise);
  }

  private createBinauralSound() {
    if (!this.ctx || !this.gainNode) return;
    // Left ear 432 Hz, Right ear 442 Hz -> 10 Hz Alpha wave focus beat
    const oscL = this.ctx.createOscillator();
    const oscR = this.ctx.createOscillator();
    const merger = this.ctx.createChannelMerger(2);

    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(432, this.ctx.currentTime);

    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(442, this.ctx.currentTime);

    const gainL = this.ctx.createGain();
    gainL.gain.setValueAtTime(0.2, this.ctx.currentTime);
    const gainR = this.ctx.createGain();
    gainR.gain.setValueAtTime(0.2, this.ctx.currentTime);

    oscL.connect(gainL);
    gainL.connect(merger, 0, 0);

    oscR.connect(gainR);
    gainR.connect(merger, 0, 1);

    merger.connect(this.gainNode);
    oscL.start();
    oscR.start();
    this.activeNodes.push(oscL, oscR);
  }

  private createCosmicWhiteNoise() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(400, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise);
  }

  private createLofiDrone() {
    if (!this.ctx || !this.gainNode) return;
    const freqs = [110, 164.81, 220, 329.63]; // A major 7th chord warm pads
    freqs.forEach(f => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.activeNodes.push(osc);
    });
  }

  private createCafeAmbient() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise);
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public playChime(freq = 528) {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    g.gain.setValueAtTime(0.3, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  public stop() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch {
        // Ignore already stopped
      }
    });
    this.activeNodes = [];
    this.currentMode = null;
  }

  public getCurrentMode() {
    return this.currentMode;
  }
}

export const soundEngine = new AudioSynthEngine();
