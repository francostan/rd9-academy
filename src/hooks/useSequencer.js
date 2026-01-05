import { useState, useEffect, useCallback, useRef } from 'react';

const VOICES = ['BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CH', 'OH', 'CR', 'RD'];

// Create empty pattern for all voices
const createEmptyPattern = () => {
  const pattern = {};
  VOICES.forEach((v) => {
    pattern[v] = [];
  });
  return pattern;
};

// Create empty accent pattern
const createEmptyAccents = () => {
  const accents = {};
  VOICES.forEach((v) => {
    accents[v] = [];
  });
  return accents;
};

// Create empty probability map (100 = always play, 0 = never)
const createEmptyProbability = () => {
  const prob = {};
  VOICES.forEach((v) => {
    prob[v] = {}; // step -> probability (0-100)
  });
  return prob;
};

// Create empty flam map
const createEmptyFlam = () => {
  const flam = {};
  VOICES.forEach((v) => {
    flam[v] = new Set(); // Set of step indices with flam enabled
  });
  return flam;
};

// Create default voice lengths (polymeter) - all voices start at null (use global patternLength)
const createDefaultVoiceLengths = () => {
  const lengths = {};
  VOICES.forEach((v) => {
    lengths[v] = null; // null means use global patternLength
  });
  return lengths;
};

export function useSequencer(onTrigger) {
  const [pattern, setPattern] = useState(createEmptyPattern);
  const [accents, setAccents] = useState(createEmptyAccents);
  const [probability, setProbability] = useState(createEmptyProbability);
  const [flam, setFlam] = useState(createEmptyFlam);
  const [flamWidth, setFlamWidth] = useState(12); // 0-24, maps to 0-50ms
  const [repeatDivision, setRepeatDivision] = useState(1); // 1, 2, 4, or 8
  const [stepRepeatActive, setStepRepeatActive] = useState(false); // Latching step repeat
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [bpm, setBpm] = useState(133);
  const [swing, setSwing] = useState(0); // 0-100%
  const [patternLength, setPatternLength] = useState(16); // 16, 32, 48, or 64
  const [voiceLengths, setVoiceLengths] = useState(createDefaultVoiceLengths); // Polymeter

  const patternRef = useRef(pattern);
  const accentsRef = useRef(accents);
  const probabilityRef = useRef(probability);
  const flamRef = useRef(flam);
  const flamWidthRef = useRef(flamWidth);
  const repeatDivisionRef = useRef(repeatDivision);
  const stepRepeatActiveRef = useRef(stepRepeatActive);
  const onTriggerRef = useRef(onTrigger);
  const swingRef = useRef(swing);
  const patternLengthRef = useRef(patternLength);
  const voiceLengthsRef = useRef(voiceLengths);

  // Keep refs updated
  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  useEffect(() => {
    accentsRef.current = accents;
  }, [accents]);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    swingRef.current = swing;
  }, [swing]);

  useEffect(() => {
    patternLengthRef.current = patternLength;
  }, [patternLength]);

  useEffect(() => {
    probabilityRef.current = probability;
  }, [probability]);

  useEffect(() => {
    flamRef.current = flam;
  }, [flam]);

  useEffect(() => {
    flamWidthRef.current = flamWidth;
  }, [flamWidth]);

  useEffect(() => {
    repeatDivisionRef.current = repeatDivision;
  }, [repeatDivision]);

  useEffect(() => {
    stepRepeatActiveRef.current = stepRepeatActive;
  }, [stepRepeatActive]);

  useEffect(() => {
    voiceLengthsRef.current = voiceLengths;
  }, [voiceLengths]);

  // Toggle step repeat (latching mode)
  const toggleStepRepeat = useCallback(() => {
    setStepRepeatActive((prev) => !prev);
  }, []);

  // Set voice length for polymeter (null = use global patternLength)
  const setVoiceLength = useCallback((voice, length) => {
    setVoiceLengths((prev) => ({
      ...prev,
      [voice]: length,
    }));
  }, []);

  // Reset all voice lengths to use global
  const resetVoiceLengths = useCallback(() => {
    setVoiceLengths(createDefaultVoiceLengths());
  }, []);

  // Toggle step for a voice
  const toggleStep = useCallback((voice, stepIndex) => {
    // Check BEFORE state update: are we adding or removing?
    const wasInPattern = patternRef.current[voice]?.includes(stepIndex);

    setPattern((prev) => {
      const voiceSteps = prev[voice] || [];
      const newSteps = voiceSteps.includes(stepIndex)
        ? voiceSteps.filter((s) => s !== stepIndex)
        : [...voiceSteps, stepIndex].sort((a, b) => a - b);

      return { ...prev, [voice]: newSteps };
    });

    // Remove accent when step is toggled off
    if (wasInPattern) {
      setAccents((prev) => ({
        ...prev,
        [voice]: (prev[voice] || []).filter((s) => s !== stepIndex)
      }));
    }
  }, []);

  // Toggle accent for a step (requires step to be on)
  const toggleAccent = useCallback((voice, stepIndex) => {
    if (!patternRef.current[voice]?.includes(stepIndex)) return;

    setAccents((prev) => {
      const voiceAccents = prev[voice] || [];
      const newAccents = voiceAccents.includes(stepIndex)
        ? voiceAccents.filter((s) => s !== stepIndex)
        : [...voiceAccents, stepIndex].sort((a, b) => a - b);

      return { ...prev, [voice]: newAccents };
    });
  }, []);

  // Set probability for a step (cycles: 100 -> 75 -> 50 -> 25 -> 0 -> 100)
  const cycleProbability = useCallback((voice, stepIndex) => {
    setProbability((prev) => {
      const currentProb = prev[voice]?.[stepIndex] ?? 100;
      const nextProb = currentProb === 100 ? 75 : currentProb === 75 ? 50 : currentProb === 50 ? 25 : currentProb === 25 ? 0 : 100;
      return { ...prev, [voice]: { ...prev[voice], [stepIndex]: nextProb } };
    });
  }, []);

  // Toggle flam for a step
  const toggleFlam = useCallback((voice, stepIndex) => {
    setFlam((prev) => {
      const voiceFlam = prev[voice] || new Set();
      const newFlam = new Set(voiceFlam);
      if (newFlam.has(stepIndex)) newFlam.delete(stepIndex);
      else newFlam.add(stepIndex);
      return { ...prev, [voice]: newFlam };
    });
  }, []);

  // Clear pattern
  const clearPattern = useCallback(() => {
    setPattern(createEmptyPattern());
    setAccents(createEmptyAccents());
    setProbability(createEmptyProbability());
    setFlam(createEmptyFlam());
  }, []);

  // Load full sequencer state
  const loadState = useCallback((newState) => {
    if (!newState) return;
    
    // Revive Sets from JSON/Storage if necessary
    const reviveSet = (data) => {
       if (!data) return {};
       // If it's an object with voice keys
       const result = {};
       Object.keys(data).forEach(v => {
           if (Array.isArray(data[v])) result[v] = new Set(data[v]);
           else if (data[v] instanceof Set) result[v] = data[v];
           else result[v] = new Set();
       });
       return result;
    }

    if (newState.pattern) setPattern(newState.pattern);
    if (newState.accents) setAccents(newState.accents);
    if (newState.probability) setProbability(newState.probability);
    if (newState.flam) setFlam(reviveSet(newState.flam));
    if (newState.flamWidth !== undefined) setFlamWidth(newState.flamWidth);
    if (newState.repeatDivision !== undefined) setRepeatDivision(newState.repeatDivision);
    if (newState.stepRepeatActive !== undefined) setStepRepeatActive(newState.stepRepeatActive);
    if (newState.bpm !== undefined) setBpm(newState.bpm);
    if (newState.swing !== undefined) setSwing(newState.swing);
    if (newState.patternLength !== undefined) setPatternLength(newState.patternLength);
    if (newState.voiceLengths) setVoiceLengths(newState.voiceLengths);
  }, []);

  // Transport controls
  const start = useCallback(() => {
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    setStep(0);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  // Sequencer clock with swing, polymeter, and step repeat
  useEffect(() => {
    if (!playing) return;

    const baseIntervalMs = 60000 / bpm / 4; // 16th notes
    let currentStep = 0;
    let timeoutId = null;

    const tick = () => {
      const stepToPlay = currentStep;

      // Trigger voices on this step (with polymeter support)
      VOICES.forEach((voice) => {
        // Polymeter: use per-voice length or fall back to global
        const voiceLength = voiceLengthsRef.current[voice] || patternLengthRef.current;
        const voiceStep = stepToPlay % voiceLength;

        if (patternRef.current[voice]?.includes(voiceStep)) {
          // Check probability (default 100 = always play)
          const prob = probabilityRef.current[voice]?.[voiceStep] ?? 100;
          if (prob < 100 && Math.random() * 100 >= prob) {
            return; // Skip this trigger based on probability
          }

          const isAccented = accentsRef.current[voice]?.includes(voiceStep);
          const hasFlam = flamRef.current[voice]?.has?.(voiceStep);

          // Step repeat: fire multiple triggers if active and division > 1
          const doStepRepeat = stepRepeatActiveRef.current && repeatDivisionRef.current > 1;
          const numHits = doStepRepeat ? repeatDivisionRef.current : 1;
          const subInterval = baseIntervalMs / repeatDivisionRef.current;

          for (let r = 0; r < numHits; r++) {
            const hitDelay = doStepRepeat ? r * subInterval : 0;
            const hitAccent = isAccented && r === 0; // Only first hit gets accent

            setTimeout(() => {
              onTriggerRef.current?.(voice, { accent: hitAccent });
            }, hitDelay);

            // If flam is enabled on first hit, add flam after
            if (hasFlam && r === 0) {
              const flamDelayMs = (flamWidthRef.current / 24) * 50; // 0-50ms
              setTimeout(() => {
                onTriggerRef.current?.(voice, { accent: false }); // Flam hit is quieter
              }, hitDelay + flamDelayMs);
            }
          }
        }
      });

      setStep(stepToPlay);

      // Calculate next interval with swing
      // Swing affects off-beat 16ths (odd steps: 1, 3, 5, 7...)
      const isOffBeat = stepToPlay % 2 === 1;
      const swingAmount = swingRef.current / 100;
      const swingDelayMs = isOffBeat ? baseIntervalMs * swingAmount * 0.5 : 0;
      const nextIntervalMs = baseIntervalMs + (isOffBeat ? swingDelayMs : -swingDelayMs * 0.5);

      currentStep = (stepToPlay + 1) % patternLengthRef.current;

      timeoutId = setTimeout(tick, Math.max(10, nextIntervalMs));
    };

    tick();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [playing, bpm]);

  return {
    pattern,
    setPattern,
    accents,
    setAccents,
    probability,
    cycleProbability,
    flam,
    toggleFlam,
    flamWidth,
    setFlamWidth,
    repeatDivision,
    setRepeatDivision,
    // Step repeat (latching mode)
    stepRepeatActive,
    setStepRepeatActive,
    toggleStepRepeat,
    // Polymeter
    voiceLengths,
    setVoiceLength,
    resetVoiceLengths,
    // Transport & timing
    playing,
    step,
    bpm,
    setBpm,
    swing,
    setSwing,
    patternLength,
    setPatternLength,
    toggleStep,
    toggleAccent,
    clearPattern,
    loadState,
    start,
    stop,
    toggle,
  };
}