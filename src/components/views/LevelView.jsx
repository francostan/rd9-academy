import { useState, useEffect, useCallback } from 'react';
import { C, LEVELS, VOICES } from '@/constants';
import { LED, Knob, StepBtn, RD9Panel } from '@/components/ui';
import { useLanguage, useAudioEngine, useSequencer } from '@/hooks';

export function LevelView({ levelId, exerciseIndex: initialExerciseIndex = 0, progress, onComplete, onBack, onNavigate }) {
  const { t, lang } = useLanguage();
  const [exerciseIndex, setExerciseIndex] = useState(initialExerciseIndex);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [state, setState] = useState({
    pulse: false, voices: 0, bd: false, sd: false, hh: false,
    detCtx: false, chiCtx: false, berCtx: false, ukCtx: false,
    flt: false, wave: false, cycle: false, flam: false, prob: false,
    poly: false, acc: false, ctxAfrica: false, ctxLatin: false,
    ctxWomen: false, synthRoots: false, chain: false, constraints: false, record: false,
  });
  const [knobValues, setKnobValues] = useState({});
  const [feedback, setFeedback] = useState(null);

  const level = LEVELS.find((l) => l.id === levelId);
  const exercise = level?.exercises[exerciseIndex];
  const isDone = progress.done.includes(exercise?.id);
  const isLastExercise = exerciseIndex === (level?.exercises.length || 1) - 1;

  const { play, loaded, resume, initAudio } = useAudioEngine();
  const ensureAudio = useCallback(() => { resume(); if (!loaded) initAudio(); }, [resume, loaded, initAudio]);

  const handleTrigger = useCallback((voice, options = {}) => {
    if (!loaded) return;
    play(voice, { volume: 0.8, pitch: 1, decay: 100, accent: options.accent });
  }, [play, loaded]);

  const { pattern, playing, step, bpm, toggleStep, toggle, stop, clearPattern, patternLength, setPatternLength } = useSequencer(handleTrigger);
  const [stepPage, setStepPage] = useState(0);

  useEffect(() => { 
    if (initialExerciseIndex !== exerciseIndex) {
      setExerciseIndex(initialExerciseIndex);
      setFeedback(null);
      setPatternLength(16); // Reset length on new exercise
      setStepPage(0);
    }
  }, [initialExerciseIndex]);
  
  useEffect(() => { 
    clearPattern(); 
    stop(); 
    setFeedback(null);
  }, [exerciseIndex, clearPattern, stop]);

  // Auto-page follow during playback
  useEffect(() => {
    if (playing) {
      const currentBar = Math.floor(step / 16);
      if (currentBar !== stepPage && currentBar * 16 < patternLength) {
        setStepPage(currentBar);
      }
    }
  }, [playing, step, patternLength, stepPage]);

  // Passive check for auto-completion (only if check returns pure true)
  useEffect(() => {
    if (!exercise || progress.done.includes(exercise.id)) return;
    const result = exercise.check({ ...state, p: pattern, knobValues, patternLength });
    if (result === true || result?.pass === true) {
      onComplete(exercise.id, levelId);
      setFeedback(null);
    }
  }, [pattern, state, exercise, levelId, progress.done, onComplete, knobValues]);

  const previewVoice = useCallback((voiceId) => { ensureAudio(); play(voiceId, { volume: 0.8, pitch: 1, decay: 100 }); }, [play, ensureAudio]);
  const handleStateUpdate = (key) => setState((s) => ({ ...s, [key]: true }));
  const handleVoiceExplore = (id, voice) => {
    setSelectedVoice({ id, ...voice }); previewVoice(id);
    if (!state[`v_${id}`]) setState((s) => ({ ...s, [`v_${id}`]: true, voices: s.voices + 1 }));
  };
  const navigateExercise = (direction) => {
    let newIndex = exerciseIndex;
    if (direction === 'prev' && exerciseIndex > 0) newIndex = exerciseIndex - 1;
    else if (direction === 'next' && exerciseIndex < level.exercises.length - 1) newIndex = exerciseIndex + 1;
    setExerciseIndex(newIndex); onNavigate(`/level/${levelId}/${newIndex}`);
  };

  const handleConfirm = () => {
    // If it's a simple theory/explore read, just mark done
    if (exercise.type === 'theory' || exercise.type === 'explore') {
      handleStateUpdate(getStateKey(exercise.id));
      return;
    }

    // Explicit validation for interactive exercises
    const result = exercise.check({ ...state, p: pattern, knobValues });
    
    if (result === true || result?.pass === true) {
      handleStateUpdate(getStateKey(exercise.id));
      onComplete(exercise.id, levelId);
      setFeedback(null);
    } else if (result?.message) {
      setFeedback(result.message);
    }
  };

  const handlePreviewTarget = () => {
    if (!exercise.targetPreview) return;
    
    // Resume audio context
    ensureAudio();
    
    // Stop current playback
    if (playing) stop();
    
    // We need a way to play the target.
    // Since the sequencer hook controls playback based on "pattern" state,
    // we can't easily swap the pattern state just for a preview without UI glitching.
    // Instead, we'll "one-shot" the target pattern or (simpler for now) 
    // just trigger the voice with the target params in a sequence.
    
    // For this MVP, let's just trigger the main voice of the exercise to hear its character
    // If it's a pattern exercise, we might need a more complex "Reference Player"
    
    // Simpler approach: If the exercise defines a "targetSound", we play a simple demo loop
    const { voice, params, pattern: targetPattern } = exercise.targetPreview;
    
    // Quick loop simulation
    let time = 0;
    targetPattern.forEach((stepIdx) => {
       setTimeout(() => {
         play(voice, { ...params, volume: 0.8 });
       }, stepIdx * (60000 / bpm / 4)); // very rough timing approximation for demo
    });
  };

  const handleNext = () => { if (isLastExercise) onBack(); else navigateExercise('next'); };
  const handlePlayToggle = () => { ensureAudio(); toggle(); };
  const handleStepToggle = (inst, st) => {
    ensureAudio();
    // Check BEFORE toggle: preview only when ADDING a step (not when removing)
    const isAdding = !pattern[inst]?.includes(st);
    toggleStep(inst, st);
    if (isAdding) previewVoice(inst);
  };

  if (!level || !exercise) return null;

  return (
    <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto">
      {/* Level Info Panel - Keep badge */}
      <RD9Panel label={`LEVEL ${level.n}`} className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-1 mb-1 ${isDone ? 'bg-[#33cc33] shadow-[0_0_6px_#33cc33]' : 'bg-[#ff5f00] shadow-[0_0_4px_#ff5f00]'}`} />
              <div className="w-10 h-10 flex flex-col items-center justify-start pt-1 border-2 bg-[#333] border-[#555] shadow-[0_2px_0_#111]">
                <div className="w-5 h-1.5 bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] mb-1" />
                <span className="text-[11px] font-bold" style={{ color: C.orange }}>{level.n}</span>
              </div>
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wide" style={{ color: C.ink }}>{t(level.title)}</div>
              {level.sub && <div className="text-[9px] uppercase tracking-wider" style={{ color: '#888' }}>{t(level.sub)}</div>}
            </div>
          </div>
          {/* Back button */}
          <button
            onClick={onBack}
            className="px-3 py-1.5 border-2 border-[#555] bg-[#333] text-[8px] font-bold uppercase tracking-wider text-[#ddd] shadow-[0_2px_0_#111] active:shadow-none active:translate-y-[2px] transition-all"
          >
            ← {lang === 'es' ? 'ATRÁS' : 'BACK'}
          </button>
        </div>
      </RD9Panel>

      {/* Intro - No badge, subtle border-left */}
      {exerciseIndex === 0 && (
        <div className="mb-6 pl-3 border-l-2" style={{ borderColor: C.orange }}>
          {level.ctx && <p className="text-[9px] uppercase tracking-wide mb-2" style={{ color: '#888' }}>{t(level.ctx)}</p>}
          <p className="text-[10px] leading-relaxed whitespace-pre-line" style={{ color: '#555' }}>{t(level.intro)}</p>
        </div>
      )}

      {/* Exercise Tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {level.exercises.map((e, i) => {
          const isActive = exerciseIndex === i;
          const isCompleted = progress.done.includes(e.id);
          return (
            <button key={e.id} onClick={() => { setExerciseIndex(i); onNavigate(`/level/${levelId}/${i}`); }} className="flex flex-col items-center">
              <div className={`w-2 h-1 mb-1 transition-all ${isCompleted ? 'bg-[#33cc33] shadow-[0_0_6px_#33cc33]' : isActive ? 'bg-[#ff5f00] shadow-[0_0_4px_#ff5f00]' : 'bg-[#888]'}`} />
              <div className={`px-2 py-1.5 border-2 text-[8px] font-bold uppercase tracking-wider transition-all ${isActive ? 'bg-[#f2f2eb] border-[#888] shadow-[0_2px_0_#666] text-[#333]' : 'bg-[#333] border-[#555] shadow-[0_2px_0_#111] text-[#888]'} active:shadow-none active:translate-y-[2px]`}>
                <div className={`w-4 h-1 mx-auto mb-1 ${isActive ? 'bg-[#bbb]' : 'bg-[#1a1a1a]'} shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]`} />
                {isCompleted && <span style={{ color: '#33cc33' }}>✓ </span>}{t(e.title)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Exercise Content - Keep badge */}
      <RD9Panel label="EXERCISE" className="mb-6">
        {isDone && (
          <div className="inline-flex items-center gap-1 px-2 py-1 mb-3 text-[9px] uppercase tracking-wider bg-[#33cc33]/20 text-[#33cc33] rounded-[2px]">
            ● {lang === 'es' ? 'COMPLETADO' : 'COMPLETED'}
          </div>
        )}
        <h3 className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: C.orange }}>{t(exercise.title)}</h3>
        <p className="text-[10px] leading-relaxed mb-4 whitespace-pre-line" style={{ color: '#555' }}>{t(exercise.text)}</p>

        {exercise.tech && (
          <div className="mb-4 pl-3 border-l-2" style={{ borderColor: C.orange }}>
            <span className="text-[8px] font-bold uppercase tracking-widest mb-2 block" style={{ color: C.orange }}>
              {lang === 'es' ? 'PRÁCTICA' : 'PRACTICE'}
            </span>
            <div className="space-y-2">
              {exercise.tech.map((techItem, i) => (
                <div key={i} className="flex gap-2 text-[9px]">
                  <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center bg-[#ff5f00] text-[#111] font-bold">{i + 1}</span>
                  <span className="uppercase tracking-wide" style={{ color: '#666' }}>{t(techItem)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback / Coaching Panel */}
        {feedback && (
          <div className="mb-4 bg-[#2a1a1a] border-l-2 border-[#ff5f00] p-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-start gap-3">
              <span className="text-[14px] leading-none mt-0.5">⚠️</span>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest block mb-1" style={{ color: C.orange }}>
                  {lang === 'es' ? 'SISTEMA' : 'SYSTEM ALERT'}
                </span>
                <p className="text-[10px] font-mono leading-relaxed text-[#ddd]">{t(feedback)}</p>
              </div>
            </div>
          </div>
        )}

        <ExerciseInteractive 
          exercise={exercise} 
          state={state} 
          progress={progress} 
          pattern={pattern} 
          playing={playing} 
          step={step} 
          bpm={bpm} 
          loaded={loaded} 
          selectedVoice={selectedVoice} 
          lang={lang} 
          knobValues={knobValues} 
          onStateUpdate={handleStateUpdate} 
          onVoiceExplore={handleVoiceExplore} 
          onToggleStep={handleStepToggle} 
          onTogglePlay={handlePlayToggle} 
          onKnobChange={(key, val) => setKnobValues(kv => ({ ...kv, [key]: val }))} 
          patternLength={patternLength} 
          setPatternLength={setPatternLength} 
          stepPage={stepPage} 
          setStepPage={setStepPage} 
        />
      </RD9Panel>

      {/* Controls - No badge */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigateExercise('prev')}
          disabled={exerciseIndex === 0}
          className={`px-3 py-1.5 border-2 text-[8px] font-bold uppercase tracking-wider ${exerciseIndex === 0 ? 'opacity-30 cursor-not-allowed bg-[#ccc] border-[#999] text-[#888]' : 'bg-[#f2f2eb] border-[#888] text-[#333] shadow-[0_2px_0_#666] active:shadow-none active:translate-y-[2px]'} transition-all`}
        >
          ← {lang === 'es' ? 'ANT' : 'PREV'}
        </button>
        <div className="flex gap-2">
          {exercise.targetPreview && (
            <button 
              onClick={() => {
                const { voice, params, pattern: tPat } = exercise.targetPreview;
                ensureAudio();
                if (playing) stop();
                
                // Simple 1-bar loop playback of target
                const stepTime = (60 / bpm) / 4 * 1000;
                tPat.forEach((s) => {
                   setTimeout(() => {
                     play(voice, { ...params, volume: 0.8 });
                   }, s * stepTime);
                });
              }}
              className="px-3 py-1.5 border-2 border-[#555] bg-[#333] text-[8px] font-bold uppercase tracking-wider text-[#ddd] shadow-[0_2px_0_#111] active:shadow-none active:translate-y-[2px] transition-all"
            >
               {lang === 'es' ? 'OÍR META' : 'HEAR GOAL'} ♪
            </button>
          )}
          <button onClick={() => onNavigate('/playground')} className="px-3 py-1.5 border-2 border-[#ff5f00] bg-[#ff5f00]/10 text-[8px] font-bold uppercase tracking-wider shadow-[0_2px_0_#993800] active:shadow-none active:translate-y-[2px] transition-all" style={{ color: C.orange }}>RD-9 ▶</button>
          {!isDone ? (
            <button onClick={handleConfirm} className="px-4 py-1.5 border-2 border-[#888] bg-[#f2f2eb] text-[8px] font-bold uppercase tracking-wider shadow-[0_2px_0_#666] active:shadow-none active:translate-y-[2px] transition-all" style={{ color: C.orange }}>
              {(exercise.type === 'theory' || exercise.type === 'explore') 
                ? (lang === 'es' ? 'LEÍDO' : 'READ') 
                : (lang === 'es' ? 'VERIFICAR' : 'VERIFY')}
            </button>
          ) : isLastExercise ? (
            <button onClick={handleNext} className="px-4 py-1.5 border-2 border-[#33cc33] bg-[#33cc33]/10 text-[8px] font-bold uppercase tracking-wider shadow-[0_2px_0_#1a661a] active:shadow-none active:translate-y-[2px] transition-all text-[#33cc33]">{lang === 'es' ? 'FIN' : 'DONE'} ●</button>
          ) : (
            <button onClick={handleNext} className="px-4 py-1.5 border-2 border-[#ff5f00] bg-[#ff5f00]/10 text-[8px] font-bold uppercase tracking-wider shadow-[0_2px_0_#993800] active:shadow-none active:translate-y-[2px] transition-all" style={{ color: C.orange }}>{lang === 'es' ? 'SIG' : 'NEXT'} →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function getStateKey(id) {
  if (id.includes('det')) return 'detCtx'; if (id.includes('chi')) return 'chiCtx'; if (id.includes('ber')) return 'berCtx';
  if (id.includes('uk') || id.includes('hg')) return 'ukCtx'; 
  if (id.includes('africa')) return 'ctxAfrica'; if (id.includes('latin')) return 'ctxLatin';
  if (id.includes('women')) return 'ctxWomen'; if (id.includes('synth')) return 'synthRoots'; if (id.includes('flam')) return 'flam';
  if (id.includes('prob')) return 'prob'; if (id.includes('poly')) return 'poly'; if (id.includes('acc')) return 'acc';
  if (id.includes('chain') || id.includes('full')) return 'chain'; 
  if (id.includes('constraints') || id.includes('free')) return 'constraints'; 
  if (id.includes('record')) return 'record';
  if (id.includes('filter') || id.includes('flt')) return 'flt'; if (id.includes('wave')) return 'wave';
  if (id.includes('cycle') || id.includes('final')) return 'cycle'; 
  return 'pulse';
}

function ExerciseInteractive({ exercise, state, progress, pattern, playing, step, bpm, loaded, selectedVoice, lang, knobValues, onStateUpdate, onVoiceExplore, onToggleStep, onTogglePlay, onKnobChange, patternLength, setPatternLength, stepPage, setStepPage }) {
  if (exercise.type === 'theory') return null;

  if (exercise.type === 'explore') {
    return (
      <div>
        <div className="grid grid-cols-4 gap-1 mb-3">
          {Object.entries(VOICES).map(([id, v]) => {
            const explored = state[`v_${id}`];
            return (
              <button key={id} onClick={() => onVoiceExplore(id, v)} className={`p-2 text-center transition-all border-2 ${explored ? 'bg-[#e8e8e0] border-[#ff5f00] shadow-[0_2px_0_#993800]' : 'bg-[#ddd] border-[#999] shadow-[0_2px_0_#666]'} active:shadow-none active:translate-y-[2px]`}>
                <div className={`w-2 h-1 mx-auto mb-1 ${explored ? 'bg-[#ff5f00] shadow-[0_0_4px_#ff5f00]' : 'bg-[#888]'}`} />
                <div className="text-[8px] uppercase tracking-wider" style={{ color: explored ? C.orange : '#666' }}>{id}</div>
              </button>
            );
          })}
        </div>
        {selectedVoice && (
          <div className="border-l-2 pl-3 py-2" style={{ borderColor: C.orange }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.orange }}>{selectedVoice.name}</span>
            <div className="text-[9px] mt-1 uppercase tracking-wide" style={{ color: '#666' }}>{selectedVoice.params.join(' / ')}</div>
          </div>
        )}
      </div>
    );
  }

  if (exercise.type === 'knobs') {
    const targetKey = exercise.target === 'BD' ? 'bd' : exercise.target === 'SD' ? 'sd' : 'hh';
    return (
      <div className="text-center">
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {VOICES[exercise.target]?.params.slice(0, 4).map((pr) => (
            <Knob
              key={pr}
              label={pr}
              value={knobValues[`${exercise.target}_${pr}`] ?? 50}
              onChange={(v) => { onKnobChange(`${exercise.target}_${pr}`, v); onStateUpdate(targetKey); }}
              showValue={!exercise.blind}
            />
          ))}
        </div>
      </div>
    );
  }

  if (exercise.type === 'pattern' || exercise.type === 'free') {
    const canExpand = exercise.allowExpand ?? false;
    
    return (
      <div>
        {/* Transport Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onTogglePlay} className={`w-10 h-10 flex flex-col items-center justify-start pt-1 border-2 ${playing ? 'bg-[#33cc33]/10 border-[#33cc33] shadow-[0_3px_0_#1a661a,0_4px_4px_rgba(0,0,0,0.3)]' : 'bg-[#f2f2eb] border-[#888] shadow-[0_3px_0_#666,0_4px_4px_rgba(0,0,0,0.3)]'} active:shadow-[0_1px_0_#666] active:translate-y-[2px] transition-all`}>
              <div className={`w-5 h-1 mb-1 ${playing ? 'bg-[#33cc33] shadow-[0_0_6px_#33cc33]' : 'bg-[#bbb]'}`} />
              <span className="text-[12px]" style={{ color: playing ? '#33cc33' : '#666' }}>{playing ? '■' : '▶'}</span>
            </button>
            <div className="px-3 py-2 bg-black border-2 border-[#333] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"><LED value={bpm} size="sm" /></div>
            {!loaded && <span className="text-[8px] uppercase tracking-wider" style={{ color: C.orange }}>{lang === 'es' ? 'Cargando...' : 'Loading...'}</span>}
          </div>
        </div>

        {/* Dark Inset Sequencer Rail - PlaygroundView style */}
        <div className="bg-[#1a1a1a] rounded-lg p-3 xl:p-4 border-2 border-[#333] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-x-auto">
          {/* Step Grid */}
          <div className="flex flex-col gap-1 w-fit">
            {(exercise.inst || ['BD', 'SD', 'CP', 'CH', 'OH']).map((inst) => {
              const tgt = exercise.target?.[inst] || [];
              return (
                <div key={inst} className="flex items-center gap-1">
                  <div className="w-6 text-[8px] xl:text-[9px] font-bold flex-shrink-0" style={{ color: C.orange }}>{inst}</div>
                  <div className="flex gap-[3px]">
                    {Array.from({ length: 16 }, (_, i) => {
                      const st = stepPage * 16 + i;
                      // Don't render if out of bounds of pattern length
                      if (st >= patternLength) return <div key={st} className="w-[32px] xl:w-[36px]" />;
                      
                      return (
                        <StepBtn
                          key={st}
                          on={pattern[inst]?.includes(st)}
                          hint={tgt.includes(st) && !pattern[inst]?.includes(st)}
                          current={step === st && playing}
                          onClick={() => onToggleStep(inst, st)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Dark Label Strip - below buttons like PlaygroundView */}
            <div className="mt-1 h-5 bg-[#111] flex items-center ml-6 rounded-sm">
              <div className="flex gap-[3px]">
                {Array.from({ length: 16 }, (_, i) => {
                  const st = stepPage * 16 + i;
                  if (st >= patternLength) return <div key={st} className="w-[32px] xl:w-[36px]" />;
                  
                  return (
                    <div key={i} className="w-[32px] xl:w-[36px] text-center flex-shrink-0">
                      <span className={`text-[7px] xl:text-[8px] font-bold font-mono ${step === st && playing ? 'text-[#33cc33]' : 'text-[#888]'}`}>
                        {st + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (exercise.type === 'filter') return (
    <div className="text-center">
      <div className="flex justify-center gap-4 mb-4">
        <Knob label="CUTOFF" value={knobValues.flt_cutoff ?? 50} onChange={(v) => { onKnobChange('flt_cutoff', v); onStateUpdate('flt'); }} />
        <Knob label="RESONANCE" value={knobValues.flt_resonance ?? 30} onChange={(v) => { onKnobChange('flt_resonance', v); onStateUpdate('flt'); }} />
      </div>
    </div>
  );
  if (exercise.type === 'wave') return (
    <div className="text-center">
      <div className="flex justify-center gap-4 mb-4">
        <Knob label="ATTACK" value={knobValues.wave_attack ?? 30} onChange={(v) => { onKnobChange('wave_attack', v); onStateUpdate('wave'); }} />
        <Knob label="SUSTAIN" value={knobValues.wave_sustain ?? 40} onChange={(v) => { onKnobChange('wave_sustain', v); onStateUpdate('wave'); }} />
      </div>
    </div>
  );
  if (exercise.type === 'final') return (<div className="text-center py-4"><div className="text-xl mb-2" style={{ color: C.orange }}>●</div><p className="text-[9px] uppercase tracking-wider" style={{ color: '#666' }}>{lang === 'es' ? 'El ciclo continúa.' : 'The cycle continues.'}</p></div>);
  return null;
}
