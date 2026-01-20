import { useRef, useCallback, useEffect, useState } from 'react';
import {
  synthesizeBD,
  synthesizeSD,
  synthesizeTom,
  synthesizeRS,
  synthesizeCP,
  synthesizeCH,
  synthesizeOH,
  synthesizeCR,
  synthesizeRD,
} from '@/audio';

// All voices use synthesis
const SYNTH_VOICES = ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CH', 'OH', 'CR', 'RD'];

// Singleton AudioContext
let audioCtx = null;
const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

// Global filter node (singleton)
let globalFilter = null;

// Global soft clipper (singleton)
let globalClipper = null;

// Create soft clipping curve (tanh)
function createSoftClipCurve() {
  const samples = 8192;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(x * 1.5);
  }
  return curve;
}

export function useAudioEngine() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterCutoff, setFilterCutoff] = useState(20000); // Hz
  const [filterResonance, setFilterResonance] = useState(1); // Q
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [filterType, setFilterType] = useState('lowpass'); // 'lowpass' | 'highpass'
  const [accentLevel, setAccentLevel] = useState(50); // 0-100, maps to 1x-2x multiplier
  const [waveAttack, setWaveAttack] = useState(50); // 0-100, transient punch
  const [waveSustain, setWaveSustain] = useState(50); // 0-100, body/tail
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const ctxRef = useRef(null);
  const filterRef = useRef(null);
  const sampleBuffers = useRef({});
  const accentLevelRef = useRef(accentLevel);
  const waveAttackRef = useRef(waveAttack);
  const waveSustainRef = useRef(waveSustain);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recorderNodeRef = useRef(null);

  // Keep refs updated
  useEffect(() => {
    accentLevelRef.current = accentLevel;
  }, [accentLevel]);

  useEffect(() => {
    waveAttackRef.current = waveAttack;
  }, [waveAttack]);

  useEffect(() => {
    waveSustainRef.current = waveSustain;
  }, [waveSustain]);

  // Load samples
  const loadSamples = useCallback(async (ctx) => {
    const samples = {
      RD: '/audio/rd.wav',
      CR: '/audio/cr.mp3',
      CH: '/audio/ch.wav',
      OH: '/audio/oh.wav',
      CP: '/audio/cp.wav',
      RS: '/audio/rs.wav',
    };

    for (const [name, url] of Object.entries(samples)) {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const arrayBuf = await resp.arrayBuffer();
        const audioBuf = await ctx.decodeAudioData(arrayBuf);
        sampleBuffers.current[name] = audioBuf;
        console.log(`Loaded sample: ${name}`);
      } catch (e) {
        console.warn(`Could not load sample ${name} from ${url}. Falling back to synthesis.`, e);
      }
    }
  }, []);

  // Initialize audio context and filters
  const initAudio = useCallback(async () => {
    if (loaded || loading) return;
    setLoading(true);

    const ctx = getAudioContext();
    ctxRef.current = ctx;

    // Load samples first
    await loadSamples(ctx);

    // Create global soft clipper
    if (!globalClipper) {
      globalClipper = ctx.createWaveShaper();
      globalClipper.curve = createSoftClipCurve();
      globalClipper.oversample = '2x';
      globalClipper.connect(ctx.destination);
    }

    // Create global filter (connects to clipper, not destination)
    if (!globalFilter) {
      globalFilter = ctx.createBiquadFilter();
      globalFilter.type = 'lowpass';
      globalFilter.frequency.value = 20000;
      globalFilter.Q.value = 1;
      globalFilter.connect(globalClipper);
    }
    filterRef.current = globalFilter;

    setLoading(false);
    setLoaded(true);
  }, [loaded, loading, loadSamples]);

  // Update filter parameters
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.type = filterType;
      filterRef.current.frequency.value = filterEnabled ? filterCutoff : 20000;
      filterRef.current.Q.value = filterResonance;
    }
  }, [filterCutoff, filterResonance, filterEnabled, filterType]);

  // Resume context on user interaction
  const resume = useCallback(() => {
    const ctx = ctxRef.current || getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }, []);

  // Play a voice with params - returns stoppable node for choke behavior
  const play = useCallback((voice, params = {}) => {
    const ctx = ctxRef.current || getAudioContext();

    // Resume if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Get output node (global filter or destination)
    const outputNode = filterRef.current || ctx.destination;

    // Route to Sample if loaded
    if (sampleBuffers.current[voice]) {
      return playSample(ctx, sampleBuffers.current[voice], voice, params, outputNode, accentLevelRef.current, waveAttackRef.current, waveSustainRef.current);
    }

    // Otherwise fallback to synthesis
    if (SYNTH_VOICES.includes(voice)) {
      return playSynthesized(ctx, voice, params, outputNode, accentLevelRef.current, waveAttackRef.current, waveSustainRef.current);
    }
    return null;
  }, []);

  // Play sample-based voice
  function playSample(ctx, buffer, voice, params, outputNode, accentLevel, waveAttack, waveSustain) {
    const now = ctx.currentTime;
    const accentMultiplier = params.accent ? 1 + (accentLevel / 100) : 1;
    const volume = (params.volume || 1) * accentMultiplier;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // TUNE: Exponential playback rate (matching our synthesis logic)
    // 50 = 1.0x (Original Pitch)
    // 0 = 0.25x (-2 Octaves)
    // 100 = 4.0x (+2 Octaves)
    const playbackRate = Math.pow(2, ((params.tune ?? 50) - 50) / 25);
    source.playbackRate.value = playbackRate;

    const vca = ctx.createGain();
    
    // Wave Designer Sustain controls the "cola" (decay time)
    // For samples, we treat the 'decay' param as 100% if it's a cymbal/ride (since they lack knobs)
    const isCymbal = voice === 'CR' || voice === 'RD';
    const baseDecay = isCymbal ? 100 : (params.decay || 100);
    
    // sustainScale: 0 = choked, 1 = full sample, 2 = extra long (though sample will end)
    const sustainScale = waveSustain / 50; 
    const decayDuration = (baseDecay / 100) * buffer.duration * sustainScale;
    
    vca.gain.setValueAtTime(volume, now);
    if (decayDuration < buffer.duration * 1.5) {
      vca.gain.exponentialRampToValueAtTime(0.001, now + Math.max(0.1, decayDuration));
    }

    source.connect(vca);
    vca.connect(outputNode);
    source.start(now);

    return {
      stop: () => {
        try { source.stop(); } catch(e) {}
      }
    };
  }

  // Play synthesized voice
  function playSynthesized(ctx, voice, params, outputNode, accentLevel, waveAttack, waveSustain) {
    const accentMultiplier = params.accent ? 1 + (accentLevel / 100) : 1;
    const synthParams = {
      ...params,
      volume: (params.volume || 1) * accentMultiplier,
      waveAttack: waveAttack / 100,    // 0-1 normalized
      waveSustain: waveSustain / 100,  // 0-1 normalized
    };

    switch (voice) {
      case 'BD':
        return synthesizeBD(ctx, synthParams, outputNode);
      case 'SD':
        return synthesizeSD(ctx, synthParams, outputNode);
      case 'LT':
      case 'MT':
      case 'HT':
        return synthesizeTom(ctx, synthParams, outputNode, voice);
      case 'RS':
        return synthesizeRS(ctx, synthParams, outputNode);
      case 'CP':
        return synthesizeCP(ctx, synthParams, outputNode);
      case 'CH':
        return synthesizeCH(ctx, synthParams, outputNode);
      case 'OH':
        return synthesizeOH(ctx, synthParams, outputNode);
      case 'CR':
        return synthesizeCR(ctx, synthParams, outputNode);
      case 'RD':
        return synthesizeRD(ctx, synthParams, outputNode);
      default:
        return null;
    }
  }

  // Auto-init on mount
  useEffect(() => {
    initAudio();
  }, [initAudio]);

  // Start recording audio output
  const startRecording = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || isRecording) return false;

    try {
      // Create a MediaStreamDestination to capture audio
      const recorderNode = ctx.createMediaStreamDestination();
      recorderNodeRef.current = recorderNode;

      // Connect the globalClipper to the recorder (it's already connected to ctx.destination)
      if (globalClipper) {
        globalClipper.connect(recorderNode);
      }

      // Set up MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(recorderNode.stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mimeType });
        setRecordedBlob(blob);
        setIsRecording(false);

        // Clean up recorder node
        if (recorderNodeRef.current) {
          recorderNodeRef.current.disconnect();
          recorderNodeRef.current = null;
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      return true;
    } catch (err) {
      console.error('Failed to start recording:', err);
      setIsRecording(false);
      return false;
    }
  }, [isRecording]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  // Clear recorded blob
  const clearRecordedBlob = useCallback(() => {
    setRecordedBlob(null);
  }, []);

  return {
    loaded,
    loading,
    initAudio,
    play,
    resume,
    // Filter controls
    filterCutoff,
    setFilterCutoff,
    filterResonance,
    setFilterResonance,
    filterEnabled,
    setFilterEnabled,
    filterType,
    setFilterType,
    // Accent control
    accentLevel,
    setAccentLevel,
    // Wave Designer controls
    waveAttack,
    setWaveAttack,
    waveSustain,
    setWaveSustain,
    // Recording controls
    isRecording,
    recordedBlob,
    startRecording,
    stopRecording,
    clearRecordedBlob,
  };
}
