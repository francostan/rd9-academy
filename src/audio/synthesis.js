/**
 * Real 909-style synthesis for analog drum voices
 * Based on actual TR-909 circuit analysis
 */

// Utility: Create white noise buffer
function createNoiseBuffer(ctx, duration) {
  const sampleRate = ctx.sampleRate;
  const length = Math.ceil(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// Utility: Saturation curve for analog character
function createSaturationCurve(amount) {
  const samples = 8192;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(x * amount);
  }
  return curve;
}

// Utility: Bit-crusher curve for 6-bit digital emulation
function createBitCrushCurve(bits) {
  const steps = Math.pow(2, bits); // e.g. 6 bits = 64 steps
  const samples = 4096;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1; // -1 to 1
    // Quantize the signal
    curve[i] = Math.floor(x * steps) / steps;
  }
  return curve;
}

/**
 * BD - Bass Drum Synthesis (909-style)
 * Sine oscillator + pitch envelope + click transient + saturation
 */
export function synthesizeBD(ctx, params, outputNode) {
  const {
    tune = 50,
    attack = 50,
    decay = 50,
    pdepth = 50,
    pitch = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;

  // Base frequency from TUNE (Exponential: 40Hz - 160Hz)
  const baseFreq = 40 * Math.pow(2, (tune - 0) / 50); // 0=40Hz, 50=80Hz, 100=160Hz
  // Octave shift from PITCH knob (-1 to +1 octave)
  const octaveShift = Math.pow(2, (pitch - 50) / 50);
  const finalFreq = baseFreq * octaveShift;

  // Main oscillator (sine wave - classic 909)
  const osc = ctx.createOscillator();
  osc.type = 'sine';

  // Pitch envelope (P.DEPTH controls sweep amount)
  // Higher pdepth = more dramatic pitch drop
  const sweepAmount = 1 + (pdepth / 100) * 2; // 1x to 3x
  const sweepStart = finalFreq * sweepAmount;
  osc.frequency.setValueAtTime(sweepStart, now);
  osc.frequency.exponentialRampToValueAtTime(finalFreq, now + 0.05);

  // Saturation for 909 character
  const shaper = ctx.createWaveShaper();
  shaper.curve = createSaturationCurve(2.0);
  shaper.oversample = '2x';

  // Main VCA with decay envelope (waveSustain affects body level)
  const vca = ctx.createGain();
  const decayTime = 0.08 + (decay / 100) * 0.8; // 80ms to 880ms
  const peakLevel = accent ? 1.2 : 1.0;
  const bodyLevel = 0.5 + waveSustain * 0.5; // 0.5-1.0
  vca.gain.setValueAtTime(peakLevel * bodyLevel, now);
  vca.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

  // Click transient (noise burst for attack) - waveAttack boosts click
  const clickBuffer = createNoiseBuffer(ctx, 0.015);
  const clickSource = ctx.createBufferSource();
  clickSource.buffer = clickBuffer;

  const clickFilter = ctx.createBiquadFilter();
  clickFilter.type = 'bandpass';
  clickFilter.frequency.value = 3500;
  clickFilter.Q.value = 1.5;

  const clickGain = ctx.createGain();
  const clickLevel = (attack / 100) * 0.4 * (0.5 + waveAttack * 1.0); // waveAttack boosts 0.5-1.5x
  clickGain.gain.setValueAtTime(clickLevel, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

  // Output mixer
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Connect main path: osc → shaper → vca → mixer
  osc.connect(shaper);
  shaper.connect(vca);
  vca.connect(mixer);

  // Connect click path: noise → filter → gain → mixer
  clickSource.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(mixer);

  // Connect to output
  mixer.connect(outputNode);

  // Start
  osc.start(now);
  clickSource.start(now);

  // Auto-stop after decay
  osc.stop(now + decayTime + 0.1);

  return {
    stop: () => {
      try {
        osc.stop();
        clickSource.stop();
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * SD - Snare Drum Synthesis (909-style)
 * Two triangle oscillators (body) + noise through HPF (snappy wires)
 */
export function synthesizeSD(ctx, params, outputNode) {
  const {
    tune = 50,
    tone = 50,
    snappy = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;

  // Base frequency for body (Exponential: 130Hz - 300Hz)
  const baseFreq = 130 * Math.pow(2, tune / 80); // range approx 1.2 octaves

  // Two triangle oscillators for shell resonance modes
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  osc1.type = 'triangle';
  osc2.type = 'triangle';

  osc1.frequency.value = baseFreq;
  osc2.frequency.value = baseFreq * 1.5; // Perfect fifth above

  // Pitch envelope for initial punch
  osc1.frequency.setValueAtTime(baseFreq * 1.8, now);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.015);
  osc2.frequency.setValueAtTime(baseFreq * 2.5, now);
  osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.015);

  // Saturation for analog warmth
  const shaper = ctx.createWaveShaper();
  shaper.curve = createSaturationCurve(1.5);

  // Body VCA - TONE controls body decay and level balance
  const bodyVCA = ctx.createGain();
  const bodyLevel = (1 - tone / 100) * 0.4 + 0.6; // Slight level drop at high tone
  const peakLevel = accent ? 1.3 : 1.0;
  const sustainScale = 0.5 + waveSustain * 0.5;
  
  // TONE affects body decay: Low Tone = 250ms, High Tone = 50ms
  const bodyDecay = 0.25 - (tone / 100) * 0.20; 
  
  bodyVCA.gain.setValueAtTime(bodyLevel * peakLevel * sustainScale, now);
  bodyVCA.gain.exponentialRampToValueAtTime(0.001, now + bodyDecay);

  // Noise for snare wires
  const noiseBuffer = createNoiseBuffer(ctx, 0.35);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  // Highpass filter on noise - TONE affects frequency
  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 1500 + (tone / 100) * 4500; // 1.5kHz to 6kHz
  hpf.Q.value = 0.8;

  // Snappy VCA - waveAttack boosts the snare wire attack
  const snappyVCA = ctx.createGain();
  const snappyLevel = (snappy / 100) * 0.9 * (0.5 + waveAttack * 1.0);
  const snappyDecay = 0.04 + (snappy / 100) * 0.22; // 40ms to 260ms
  snappyVCA.gain.setValueAtTime(snappyLevel * peakLevel, now);
  snappyVCA.gain.exponentialRampToValueAtTime(0.001, now + snappyDecay);

  // Output mixer
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Connect body path with saturation
  osc1.connect(shaper);
  osc2.connect(shaper);
  shaper.connect(bodyVCA);
  bodyVCA.connect(mixer);

  // Connect noise path
  noiseSource.connect(hpf);
  hpf.connect(snappyVCA);
  snappyVCA.connect(mixer);

  // Connect to output
  mixer.connect(outputNode);

  // Start
  osc1.start(now);
  osc2.start(now);
  noiseSource.start(now);

  // Auto-stop
  const maxDuration = Math.max(0.12, snappyDecay) + 0.1;
  osc1.stop(now + maxDuration);
  osc2.stop(now + maxDuration);

  return {
    stop: () => {
      try {
        osc1.stop();
        osc2.stop();
        noiseSource.stop();
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * Tom Synthesis (909-style) - LT, MT, HT
 * Two triangle oscillators with pitch envelopes for fuller sound
 */
export function synthesizeTom(ctx, params, outputNode, tomType) {
  const {
    tune = 50,
    decay = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;

  // Base frequencies for each tom type (Exponential Tuning)
  const defaults = { LT: 70, MT: 110, HT: 160 };
  const center = defaults[tomType] || 100;
  // Tune +/- 1 octave around center
  const baseFreq = center * Math.pow(2, (tune - 50) / 40);

  // Primary oscillator (fundamental) - waveAttack affects pitch sweep
  const osc1 = ctx.createOscillator();
  osc1.type = 'triangle';
  const pitchSweep = 1.3 + waveAttack * 0.6; // 1.3-1.9x sweep based on attack
  osc1.frequency.setValueAtTime(baseFreq * pitchSweep, now);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.025);

  // Secondary oscillator (resonant mode ~1.5x)
  const osc2 = ctx.createOscillator();
  osc2.type = 'triangle';
  const resonantFreq = baseFreq * 1.5;
  osc2.frequency.setValueAtTime(resonantFreq * pitchSweep, now);
  osc2.frequency.exponentialRampToValueAtTime(resonantFreq, now + 0.02);

  // Light saturation
  const shaper = ctx.createWaveShaper();
  shaper.curve = createSaturationCurve(1.2);

  // VCA with decay - waveSustain affects body level
  const vca = ctx.createGain();
  const decayTime = 0.1 + (decay / 100) * 0.5; // 100ms to 600ms
  const peakLevel = accent ? 1.2 : 1.0;
  const sustainScale = 0.5 + waveSustain * 0.5;
  vca.gain.setValueAtTime(peakLevel * sustainScale, now);
  vca.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

  // Output
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Mix both oscillators through saturation
  osc1.connect(shaper);
  osc2.connect(shaper);
  shaper.connect(vca);
  vca.connect(mixer);
  mixer.connect(outputNode);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + decayTime + 0.1);
  osc2.stop(now + decayTime + 0.1);

  return {
    stop: () => {
      try {
        osc1.stop();
        osc2.stop();
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * RS - Rimshot Synthesis (909-style)
 * Two resonant bands + click transient for authentic stick-on-rim sound
 */
export function synthesizeRS(ctx, params, outputNode) {
  const {
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;

  // Output mixer
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Noise burst (longer for fuller sound)
  const noiseBuffer = createNoiseBuffer(ctx, 0.08);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  // High resonant band (metallic ring)
  const bpfHigh = ctx.createBiquadFilter();
  bpfHigh.type = 'bandpass';
  bpfHigh.frequency.value = 1800;
  bpfHigh.Q.value = 3.5;

  // waveSustain affects the resonant body
  const sustainScale = 0.5 + waveSustain * 0.5;
  const vcaHigh = ctx.createGain();
  vcaHigh.gain.setValueAtTime(1.4 * peakLevel * sustainScale, now);
  vcaHigh.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

  // Low resonant band (body/wood)
  const bpfLow = ctx.createBiquadFilter();
  bpfLow.type = 'bandpass';
  bpfLow.frequency.value = 700;
  bpfLow.Q.value = 2.5;

  const vcaLow = ctx.createGain();
  vcaLow.gain.setValueAtTime(1.2 * peakLevel * sustainScale, now);
  vcaLow.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

  // Click transient - waveAttack boosts click
  const attackScale = 0.5 + waveAttack * 1.0;
  const clickOsc1 = ctx.createOscillator();
  clickOsc1.type = 'triangle';
  clickOsc1.frequency.value = 1650;
  const clickGain1 = ctx.createGain();
  clickGain1.gain.setValueAtTime(1.0 * peakLevel * attackScale, now);
  clickGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

  const clickOsc2 = ctx.createOscillator();
  clickOsc2.type = 'sine';
  clickOsc2.frequency.value = 450;
  const clickGain2 = ctx.createGain();
  clickGain2.gain.setValueAtTime(0.8 * peakLevel * attackScale, now);
  clickGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

  // Connect high band
  noiseSource.connect(bpfHigh);
  bpfHigh.connect(vcaHigh);
  vcaHigh.connect(mixer);

  // Connect low band
  noiseSource.connect(bpfLow);
  bpfLow.connect(vcaLow);
  vcaLow.connect(mixer);

  // Connect clicks
  clickOsc1.connect(clickGain1);
  clickGain1.connect(mixer);
  clickOsc2.connect(clickGain2);
  clickGain2.connect(mixer);

  mixer.connect(outputNode);

  // Start all
  noiseSource.start(now);
  clickOsc1.start(now);
  clickOsc2.start(now);
  clickOsc1.stop(now + 0.02);
  clickOsc2.stop(now + 0.025);

  return {
    stop: () => {
      try {
        noiseSource.stop();
        clickOsc1.stop();
        clickOsc2.stop();
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * CP - Clap Synthesis (909-style)
 * Multiple layered noise bursts + reverb tail with brighter character
 */
export function synthesizeCP(ctx, params, outputNode) {
  const {
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;
  const attackScale = 0.5 + waveAttack * 1.0; // boosts initial bursts
  const sustainScale = 0.5 + waveSustain * 0.5; // affects tail

  // Master output
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Multiple noise bursts (4 hits for clap texture)
  const burstCount = 4;
  const sources = [];

  for (let i = 0; i < burstCount; i++) {
    const noiseBuffer = createNoiseBuffer(ctx, 0.035);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Higher frequencies for snappier clap (2-4kHz range)
    const bpf = ctx.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 2200 + i * 300;
    bpf.Q.value = 5;

    // Highpass to remove mud
    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 800;
    hpf.Q.value = 0.7;

    // waveAttack boosts the burst level
    const vca = ctx.createGain();
    const burstDelay = i * 0.01; // 10ms between bursts
    vca.gain.setValueAtTime(0, now);
    vca.gain.setValueAtTime(1.6 * peakLevel * attackScale, now + burstDelay);
    vca.gain.exponentialRampToValueAtTime(0.001, now + burstDelay + 0.025);

    noiseSource.connect(bpf);
    bpf.connect(hpf);
    hpf.connect(vca);
    vca.connect(mixer);

    noiseSource.start(now);
    sources.push(noiseSource);
  }

  // Reverb tail (longer filtered noise decay)
  const tailBuffer = createNoiseBuffer(ctx, 0.35);
  const tailSource = ctx.createBufferSource();
  tailSource.buffer = tailBuffer;

  // Brighter tail
  const tailBpf = ctx.createBiquadFilter();
  tailBpf.type = 'bandpass';
  tailBpf.frequency.value = 1800;
  tailBpf.Q.value = 1.2;

  const tailHpf = ctx.createBiquadFilter();
  tailHpf.type = 'highpass';
  tailHpf.frequency.value = 600;
  tailHpf.Q.value = 0.5;

  // waveSustain affects the reverb tail level
  const tailVCA = ctx.createGain();
  tailVCA.gain.setValueAtTime(0, now);
  tailVCA.gain.setValueAtTime(1.0 * peakLevel * sustainScale, now + 0.035);
  tailVCA.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  tailSource.connect(tailBpf);
  tailBpf.connect(tailHpf);
  tailHpf.connect(tailVCA);
  tailVCA.connect(mixer);

  mixer.connect(outputNode);

  tailSource.start(now);
  sources.push(tailSource);

  return {
    stop: () => {
      try {
        sources.forEach(s => s.stop());
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * CH - Closed Hi-Hat Synthesis (909-style)
 * 6 square oscillators at metallic ratios + highpass filter
 */
export function synthesizeCH(ctx, params, outputNode) {
  const {
    tune = 50,
    decay = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;

  // Base frequency (Exponential: 200Hz - 1200Hz for wide metallic range)
  // Real 909 sample pitch control is very wide
  const baseFreq = 300 * Math.pow(2, (tune - 50) / 25);

  // 909 metallic ratios
  const ratios = [1, 1.34, 1.5, 1.68, 1.84, 2];
  const oscillators = [];

  // Output mixer
  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Highpass filter for metallic character
  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 7000;
  hpf.Q.value = 1;

  // Bandpass for body
  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 10000;
  bpf.Q.value = 1.5;

  // VCA with short decay - waveAttack affects initial level, waveSustain affects body
  const vca = ctx.createGain();
  const decayTime = 0.02 + (decay / 100) * 0.06; // 20-80ms
  const attackBoost = 0.7 + waveAttack * 0.6;
  const sustainScale = 0.5 + waveSustain * 0.5;
  vca.gain.setValueAtTime(peakLevel * attackBoost, now);
  vca.gain.exponentialRampToValueAtTime(peakLevel * sustainScale * 0.3, now + 0.005);
  vca.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

  // Create oscillators
  ratios.forEach(ratio => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = baseFreq * ratio;
    osc.connect(hpf);
    oscillators.push(osc);
  });

  // 6-bit Lo-Fi Digital Emulation
  const bitCrusher = ctx.createWaveShaper();
  bitCrusher.curve = createBitCrushCurve(6);

  // Connect chain
  hpf.connect(bpf);
  bpf.connect(vca);
  vca.connect(bitCrusher);
  bitCrusher.connect(mixer);
  mixer.connect(outputNode);

  // Start all oscillators
  oscillators.forEach(osc => {
    osc.start(now);
    osc.stop(now + decayTime + 0.05);
  });

  return {
    stop: () => {
      try {
        oscillators.forEach(osc => osc.stop());
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * OH - Open Hi-Hat Synthesis (909-style)
 * Same as CH but longer decay
 */
export function synthesizeOH(ctx, params, outputNode) {
  const {
    tune = 50,
    decay = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;

  // Base frequency matching CH (Exponential: 200Hz - 1200Hz)
  const baseFreq = 300 * Math.pow(2, (tune - 50) / 25);
  const ratios = [1, 1.34, 1.5, 1.68, 1.84, 2];
  const oscillators = [];

  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 7000;
  hpf.Q.value = 1;

  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 10000;
  bpf.Q.value = 1.2;

  // Longer decay for open hat - wave designer controls
  const vca = ctx.createGain();
  const decayTime = 0.15 + (decay / 100) * 0.4; // 150-550ms
  const attackBoost = 0.7 + waveAttack * 0.6;
  const sustainScale = 0.5 + waveSustain * 0.5;
  vca.gain.setValueAtTime(peakLevel * attackBoost, now);
  vca.gain.exponentialRampToValueAtTime(peakLevel * sustainScale * 0.5, now + 0.01);
  vca.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

  ratios.forEach(ratio => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = baseFreq * ratio;
    osc.connect(hpf);
    oscillators.push(osc);
  });

  // 6-bit Lo-Fi Digital Emulation
  const bitCrusher = ctx.createWaveShaper();
  bitCrusher.curve = createBitCrushCurve(6);

  hpf.connect(bpf);
  bpf.connect(vca);
  vca.connect(bitCrusher);
  bitCrusher.connect(mixer);
  mixer.connect(outputNode);

  oscillators.forEach(osc => {
    osc.start(now);
    osc.stop(now + decayTime + 0.05);
  });

  return {
    stop: () => {
      try {
        oscillators.forEach(osc => osc.stop());
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * CR - Crash Cymbal Synthesis (909-style)
 * Noise + metallic oscillators with long decay and filter sweep
 */
export function synthesizeCR(ctx, params, outputNode) {
  const {
    tune = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;
  const attackScale = 0.5 + waveAttack * 1.0;
  const sustainScale = 0.5 + waveSustain * 0.5;

  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Dynamic decay based on Wave Designer Sustain
  // 909 Crash is long, but RD-9 allows shaping. 
  // Range: 0.2s (choked) to 1.8s (manageable tail)
  const decayDuration = 0.2 + (waveSustain * 1.6); 

  // Noise component - waveSustain affects wash/body
  const noiseBuffer = createNoiseBuffer(ctx, 3.0); // Ensure buffer is long enough
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const noiseBpf = ctx.createBiquadFilter();
  noiseBpf.type = 'bandpass';
  const noiseFreq = 5000 + (tune / 100) * 3000;
  noiseBpf.frequency.setValueAtTime(noiseFreq, now);
  noiseBpf.frequency.exponentialRampToValueAtTime(noiseFreq * 0.5, now + decayDuration * 0.8);
  noiseBpf.Q.value = 0.8;

  const noiseVCA = ctx.createGain();
  noiseVCA.gain.setValueAtTime(0.7 * peakLevel * sustainScale, now);
  // Shorten noise tail to prevent "TV static" effect from bitcrusher at low levels
  noiseVCA.gain.exponentialRampToValueAtTime(0.001, now + decayDuration * 0.6);

  // Metallic oscillators - Tune affects pitch exponentially
  // Wide range 200Hz - 1000Hz base
  const baseFreq = 350 * Math.pow(2, (tune - 50) / 25);
  const ratios = [1, 1.47, 1.89, 2.36, 2.88];
  const oscillators = [];

  const oscMixer = ctx.createGain();
  oscMixer.gain.value = 0.4;

  // Filter follows pitch
  const oscHpf = ctx.createBiquadFilter();
  oscHpf.type = 'highpass';
  oscHpf.frequency.value = 5000 * Math.pow(2, (tune - 50) / 50);

  const oscVCA = ctx.createGain();
  oscVCA.gain.setValueAtTime(peakLevel * attackScale, now);
  oscVCA.gain.exponentialRampToValueAtTime(peakLevel * sustainScale * 0.3, now + 0.02);
  // Metallic body should fade much faster than the noise wash
  oscVCA.gain.exponentialRampToValueAtTime(0.001, now + decayDuration * 0.4);

  ratios.forEach(ratio => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = baseFreq * ratio;
    osc.connect(oscMixer);
    oscillators.push(osc);
  });

  // 6-bit Lo-Fi Emulation
  const bitCrusher = ctx.createWaveShaper();
  bitCrusher.curve = createBitCrushCurve(6);

  // Connect noise path
  noiseSource.connect(noiseBpf);
  noiseBpf.connect(noiseVCA);
  noiseVCA.connect(bitCrusher);

  // Connect oscillator path
  oscMixer.connect(oscHpf);
  oscHpf.connect(oscVCA);
  oscVCA.connect(bitCrusher);

  // Connect crusher to mixer
  bitCrusher.connect(mixer);
  noiseSource.start(now);
  // Stop noise early to kill static
  noiseSource.stop(now + decayDuration * 0.7);
  oscillators.forEach(osc => {
    osc.start(now);
    // Stop oscillators early to kill the metallic drone
    osc.stop(now + decayDuration * 0.5);
  });

  return {
    stop: () => {
      try {
        noiseSource.stop();
        oscillators.forEach(osc => osc.stop());
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}

/**
 * RD - Ride Cymbal Synthesis (909-style)
 * Tighter than crash with bell component
 */
export function synthesizeRD(ctx, params, outputNode) {
  const {
    tune = 50,
    volume = 1,
    accent = false,
    waveAttack = 0.5,
    waveSustain = 0.5,
  } = params;

  const now = ctx.currentTime;
  const peakLevel = accent ? 1.3 : 1.0;
  const attackScale = 0.5 + waveAttack * 1.0;
  const sustainScale = 0.5 + waveSustain * 0.5;

  const mixer = ctx.createGain();
  mixer.gain.value = volume;

  // Dynamic decay based on Wave Designer Sustain
  // Range: 0.3s to 2.0s
  const decayDuration = 0.3 + (waveSustain * 1.7);

  // Bell component - Pitch follows Tune
  const bellFreq = 800 * Math.pow(2, (tune - 50) / 25);
  const bellOsc = ctx.createOscillator();
  bellOsc.type = 'triangle';
  bellOsc.frequency.value = bellFreq;

  const bellBpf = ctx.createBiquadFilter();
  bellBpf.type = 'bandpass';
  bellBpf.frequency.value = bellFreq;
  bellBpf.Q.value = 8;

  const bellVCA = ctx.createGain();
  bellVCA.gain.setValueAtTime(0.6 * peakLevel * attackScale, now);
  bellVCA.gain.exponentialRampToValueAtTime(0.001, now + decayDuration * 0.6);

  // Body (metallic oscillators)
  const baseFreq = 400 * Math.pow(2, (tune - 50) / 25);
  const ratios = [1, 1.34, 1.5, 1.68, 2.14];
  const oscillators = [];

  const oscMixer = ctx.createGain();
  oscMixer.gain.value = 0.25;

  const oscHpf = ctx.createBiquadFilter();
  oscHpf.type = 'highpass';
  oscHpf.frequency.value = 6000 * Math.pow(2, (tune - 50) / 50);

  const oscVCA = ctx.createGain();
  oscVCA.gain.setValueAtTime(peakLevel * sustainScale, now);
  oscVCA.gain.exponentialRampToValueAtTime(0.001, now + decayDuration * 0.9);

  ratios.forEach(ratio => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = baseFreq * ratio;
    osc.connect(oscMixer);
    oscillators.push(osc);
  });

  // Noise for sizzle - waveSustain affects sizzle
  const noiseBuffer = createNoiseBuffer(ctx, 2.5);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const noiseHpf = ctx.createBiquadFilter();
  noiseHpf.type = 'highpass';
  noiseHpf.frequency.value = 9000;

  const noiseVCA = ctx.createGain();
  noiseVCA.gain.setValueAtTime(0.3 * peakLevel * sustainScale, now);
  noiseVCA.gain.exponentialRampToValueAtTime(0.001, now + decayDuration * 0.8);

  // 6-bit Lo-Fi Emulation
  const bitCrusher = ctx.createWaveShaper();
  bitCrusher.curve = createBitCrushCurve(6);

  // Connect bell
  bellOsc.connect(bellBpf);
  bellBpf.connect(bellVCA);
  bellVCA.connect(bitCrusher);

  // Connect body
  oscMixer.connect(oscHpf);
  oscHpf.connect(oscVCA);
  oscVCA.connect(bitCrusher);

  // Connect noise
  noiseSource.connect(noiseHpf);
  noiseHpf.connect(noiseVCA);
  noiseVCA.connect(bitCrusher);

  bitCrusher.connect(mixer);
  mixer.connect(outputNode);

  bellOsc.start(now);
  bellOsc.stop(now + decayDuration + 0.1);
  noiseSource.start(now);
  oscillators.forEach(osc => {
    osc.start(now);
    osc.stop(now + decayDuration + 0.1);
  });

  return {
    stop: () => {
      try {
        bellOsc.stop();
        noiseSource.stop();
        oscillators.forEach(osc => osc.stop());
        mixer.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };
}
