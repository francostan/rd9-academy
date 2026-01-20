import { useCallback, useState, useRef, useEffect } from "react";
import { C, VOICES } from "@/constants";
import { useAudioEngine, useSequencer, usePatternStorage } from "@/hooks";
import { Knob } from "@/components/ui";
import { DarkControlStrip } from "./DarkControlStrip";

// --- SCALING WRAPPER ---
function ScaleWrapper({ children }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isScaled, setIsScaled] = useState(false);
  const [showRotate, setShowRotate] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  // The "XL" breakpoint dimensions we want to preserve/target
  // 1512x982 is the default scaled resolution for a 14" MacBook Pro
  const TARGET_WIDTH = 1512;
  const TARGET_HEIGHT = 900;

  // Request fullscreen on mobile landscape
  const requestFullscreen = useCallback(() => {
    const elem = wrapperRef.current;
    if (!elem) return;

    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const { clientWidth: width, clientHeight: height } = parent;
      setParentSize({ width, height });

      // Check for mobile portrait mode
      if (width < 768 && height > width) {
        setShowRotate(true);
        setIsMobileLandscape(false);
        return;
      } else {
        setShowRotate(false);
      }

      // Check for mobile landscape mode
      const isMobile = width < 1024;
      const isLandscape = width > height;
      const mobileLandscape = isMobile && isLandscape;
      setIsMobileLandscape(mobileLandscape);

      // Only scale DOWN if the screen is smaller than our target layout
      const scaleX = width < TARGET_WIDTH ? width / TARGET_WIDTH : 1;
      const scaleY = height < TARGET_HEIGHT ? height / TARGET_HEIGHT : 1;

      const newScale = Math.min(scaleX, scaleY);

      setScale(newScale);
      setIsScaled(newScale < 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial calculation

    // Resize observer for more robust handling
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current && containerRef.current.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  if (showRotate) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] text-[#e2e2df] p-8 text-center animate-in fade-in duration-300">
        <div className="text-6xl mb-6 opacity-80">⟳</div>
        <h2 className="text-xl font-bold font-mono tracking-widest mb-2 text-orange-500">
          PLEASE ROTATE
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wide max-w-[200px] leading-relaxed mb-8">
          The RD-9 requires landscape orientation for the best experience.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 border-2 border-[#555] rounded bg-[#222] text-[#ccc] text-xs font-bold tracking-wider active:bg-[#333] active:translate-y-0.5 transition-all shadow-lg"
        >
          REFRESH
        </button>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`w-full h-full flex items-center justify-center overflow-hidden bg-[#1a1a1a] ${isMobileLandscape ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Mobile landscape controls */}
      {isMobileLandscape && (
        <div className="fixed top-2 right-2 z-50 flex gap-2">
          <button
            onClick={() => window.location.hash = '/'}
            className="px-3 py-1.5 bg-[#333] text-white text-[8px] font-bold tracking-wider border border-[#555] rounded-[2px] shadow-lg active:bg-[#444] transition-all opacity-70 hover:opacity-100"
            title="Exit"
          >
            EXIT
          </button>
          <button
            onClick={requestFullscreen}
            className="px-3 py-1.5 bg-[#333] text-white text-[8px] font-bold tracking-wider border border-[#555] rounded-[2px] shadow-lg active:bg-[#444] transition-all opacity-70 hover:opacity-100"
            title="Fullscreen"
          >
            ⛶
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          // If scaling, increase the internal width so that when scaled down, it still fills the screen.
          // internalWidth * scale = parentWidth  =>  internalWidth = parentWidth / scale
          width:
            isScaled && parentSize.width ? parentSize.width / scale : "100%",
          height:
            isScaled && parentSize.height ? parentSize.height / scale : "100%",

          transform: isScaled ? `scale(${scale})` : "none",
          transformOrigin: "center center",
          flexShrink: 0,
        }}
        className={`flex flex-col relative bg-[#e2e2df] shadow-2xl ${isScaled ? "" : "min-w-[1280px]"}`}
      >
        {children}
      </div>
    </div>
  );
}

// Voice sections matching real RD-9 layout (9 columns with combined voices)
const VOICE_SECTIONS = [
  {
    id: "BD",
    label: "BASS DRUM",
    voices: ["BD"],
    knobRows: [
      [
        { v: "BD", p: "TUNE" },
        { v: "BD", p: "LEVEL" },
      ],
      [
        { v: "BD", p: "ATTACK" },
        { v: "BD", p: "DECAY" },
      ],
      [
        { v: "BD", p: "P.DEPTH" },
        { v: "BD", p: "PITCH" },
      ],
    ],
    buttons: [{ v: "BD", label: "BASS DRUM" }],
  },
  {
    id: "SD",
    label: "SNARE DRUM",
    voices: ["SD"],
    knobRows: [
      [
        { v: "SD", p: "TUNE" },
        { v: "SD", p: "LEVEL" },
      ],
      [
        { v: "SD", p: "TONE" },
        { v: "SD", p: "SNAPPY" },
      ],
    ],
    buttons: [{ v: "SD", label: "SNARE DRUM" }],
  },
  {
    id: "LT",
    label: "LOW TOM",
    voices: ["LT"],
    knobRows: [
      [
        { v: "LT", p: "TUNE" },
        { v: "LT", p: "LEVEL" },
      ],
      [{ v: "LT", p: "DECAY" }],
    ],
    buttons: [{ v: "LT", label: "LOW TOM" }],
  },
  {
    id: "MT",
    label: "MID TOM",
    voices: ["MT"],
    knobRows: [
      [
        { v: "MT", p: "TUNE" },
        { v: "MT", p: "LEVEL" },
      ],
      [{ v: "MT", p: "DECAY" }],
    ],
    buttons: [{ v: "MT", label: "MID TOM" }],
  },
  {
    id: "HT",
    label: "HI TOM",
    voices: ["HT"],
    knobRows: [
      [
        { v: "HT", p: "TUNE" },
        { v: "HT", p: "LEVEL" },
      ],
      [{ v: "HT", p: "DECAY" }],
    ],
    buttons: [{ v: "HT", label: "HI TOM" }],
  },
  {
    id: "RSCP",
    label: "RIM SHOT  CLAP",
    voices: ["RS", "CP"],
    combined: true,
    knobRows: [
      [
        { v: "RS", p: "LEVEL" },
        { v: "CP", p: "LEVEL" },
      ],
    ],
    buttons: [
      { v: "RS", label: "RIM SHOT" },
      { v: "CP", label: "CLAP" },
    ],
  },
  {
    id: "HIHAT",
    label: "HI HAT",
    voices: ["CH", "OH"],
    combined: true,
    knobRows: [
      [
        { v: "CH", p: "TUNE" },
        { v: "CH", p: "LEVEL" },
      ],
      [
        { v: "OH", p: "OH LEVEL" },
        { v: "CH", p: "CH DECAY" },
      ],
      [{ v: "OH", p: "OH DECAY" }],
    ],
    buttons: [
      { v: "CH", label: "CLOSED" },
      { v: "OH", label: "OPEN" },
    ],
  },
  {
    id: "CYMBAL",
    label: "CYMBAL",
    voices: ["CR", "RD"],
    combined: true,
    knobRows: [
      [
        { v: "CR", p: "LEVEL" },
        { v: "RD", p: "LEVEL" },
      ],
      [
        { v: "CR", p: "CRASH TUNE" },
        { v: "RD", p: "RIDE TUNE" },
      ],
    ],
    buttons: [
      { v: "CR", label: "CRASH" },
      { v: "RD", label: "RIDE" },
    ],
  },
];

// All individual voice IDs
const ALL_VOICES = [
  "BD",
  "SD",
  "LT",
  "MT",
  "HT",
  "RS",
  "CP",
  "CH",
  "OH",
  "CR",
  "RD",
];

const createInitialParams = () => {
  const params = {};
  ALL_VOICES.forEach((v) => {
    params[v] = {
      level: 80,
      tune: 50,
      decay: 50,
      attack: 50,
      tone: 50,
      snappy: 50,
      pdepth: 50,
      pitch: 50,
      chdecay: 50,
      ohdecay: 50,
      ohlevel: 80, // OH level for choke behavior
      crashtune: 50,
      ridetune: 50,
    };
  });
  return params;
};

// --- SKEUOMORPHIC COMPONENTS ---
// Note: These use "forced XL" sizes so they look correct even when scaled down on iPad.

const StepKey = ({
  active,
  label,
  onClick,
  onDoubleClick,
  isAccented,
  isOn,
  stepNumber,
}) => {
  return (
    <div className="flex flex-col items-center gap-0.5 relative group w-[44px] flex-shrink-0">
      {/* Label Above - pushed lower */}
      <div className="h-2 flex items-end mb-0.5">
        <span className="text-[8px] font-bold text-[#555] font-sans tracking-tight uppercase leading-none">
          {label}
        </span>
      </div>

      {/* Physical LED */}
      <div
        className={`
          w-4 h-1.5 rounded-[1px] transition-all duration-75 border border-black/20 mb-0.5
          ${
            isOn || active
              ? isAccented
                ? "bg-[#ff8800] shadow-[0_0_6px_#ff8800]"
                : active
                  ? "bg-[#ff3333] shadow-[0_0_8px_#ff0000]"
                  : "bg-[#33cc33] shadow-[0_0_6px_#33cc33]"
              : "bg-[#3a2a2a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
          }
        `}
      />

      {/* The Key Itself */}
      <button
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        className={`
          w-full h-[54px] rounded-[3px] transition-transform duration-75
          border-2 border-[#aaa] border-b-[4px] border-b-[#888]
          active:border-b-[2px] active:translate-y-[2px]
          shadow-[0_2px_3px_rgba(0,0,0,0.15)]
          ${isOn ? "brightness-[0.98]" : ""}
        `}
        style={{
          background:
            "linear-gradient(to right, #dcdcdc 0%, #f9f9f9 40%, #f9f9f9 60%, #dcdcdc 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-b from-white/80 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[8px] bg-gradient-to-t from-black/10 to-transparent" />
      </button>
    </div>
  );
};

const HardBtn = ({
  children,
  active,
  color = "grey",
  onClick,
  className = "",
  size = "md",
}) => {
  const styles = {
    grey: "from-[#333] to-[#222] text-[#ccc] border-[#444]",
    white: "from-[#f2f2eb] to-[#dcdcdc] text-[#222] border-[#999]",
    black: "from-[#222] to-[#111] text-[#888] border-[#333]",
    red: "from-[#cc2222] to-[#990000] text-white border-[#550000]",
    yellow: "from-[#eebb00] to-[#cc9900] text-black border-[#996600]",
  };

  const activeStyles = {
    grey: "bg-[#222] text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] translate-y-[1px]",
    white:
      "bg-[#e6e6e6] text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] translate-y-[1px]",
    black:
      "bg-[#000] text-[#666] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] translate-y-[1px]",
    red: "bg-[#aa0000] text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] translate-y-[1px]",
    yellow:
      "bg-[#cc9900] text-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] translate-y-[1px]",
  };

  return (
    <button
      onClick={onClick}
      className={`
        rounded-[2px] font-bold flex items-center justify-center leading-none transition-all
        ${active ? activeStyles[color] : `bg-gradient-to-b ${styles[color]} shadow-[0_2px_0_rgba(0,0,0,0.5),0_3px_3px_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-none`}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export function PlaygroundView({ onBack }) {
  // para nano
  useEffect(() => {
    console.log('%cpara nano', 'color: #33cc33; font-size: 14px; font-weight: bold;');
  }, []);

  const {
    play,
    loaded,
    resume,
    filterCutoff,
    setFilterCutoff,
    filterResonance,
    setFilterResonance,
    filterEnabled,
    setFilterEnabled,
    filterType,
    setFilterType,
    accentLevel,
    setAccentLevel,
    waveAttack,
    setWaveAttack,
    waveSustain,
    setWaveSustain,
    isRecording,
    recordedBlob,
    startRecording,
    stopRecording,
    clearRecordedBlob,
  } = useAudioEngine();

  const [voiceParams, setVoiceParams] = useState(createInitialParams);
  const [selectedVoice, setSelectedVoice] = useState("BD");
  const paramsRef = useRef(voiceParams);
  const activeChRef = useRef(null); // Track active CH node for OH choke behavior

  const { save, load, clear: clearStorage, getSlots } = usePatternStorage();
  const [slots, setSlots] = useState([]);
  const [saveMode, setSaveMode] = useState(false);
  const [copying, setCopying] = useState(false);
  const [pasting, setPasting] = useState(false); // Visual feedback for paste
  const clipboardRef = useRef(null); // Internal clipboard

  const [editingDisplay, setEditingDisplay] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [dataMode, setDataMode] = useState("TEMPO");
  const [mode, setMode] = useState("step"); // 'step' | 'pattern'
  const [currentSlot, setCurrentSlot] = useState(0); // Active pattern slot (0-15)
  const [mutedVoices, setMutedVoices] = useState(new Set()); // Set of muted voice IDs
  const [soloedVoices, setSoloedVoices] = useState(new Set()); // Set of soloed voice IDs
  const [stepPage, setStepPage] = useState(0); // 0=steps 1-16, 1=17-32, 2=33-48, 3=49-64
  const [autoScroll, setAutoScroll] = useState(true); // Auto-scroll to follow playback

  useEffect(() => {
    setSlots(getSlots());
  }, [getSlots, saveMode]);
  paramsRef.current = voiceParams;

  const updateParam = useCallback((voice, param, value) => {
    setVoiceParams((prev) => ({
      ...prev,
      [voice]: { ...prev[voice], [param]: value },
    }));
  }, []);

  const handleTrigger = useCallback(
    (voice, options = {}) => {
      // Check mute: skip if this voice is muted
      if (mutedVoices.has(voice)) return;

      // Check solo: if any voices are soloed, only play those
      if (soloedVoices.size > 0 && !soloedVoices.has(voice)) return;

      // OH/CH Choke: Open hat cuts off closed hat
      if (voice === "OH" && activeChRef.current) {
        activeChRef.current.stop();
        activeChRef.current = null;
      }

      const params = paramsRef.current[voice];
      const voiceLevel = voice === "OH" ? params.ohlevel : params.level;

      // Map special params for Cymbals/Hats
      let voiceTune = params.tune;
      if (voice === "OH")
        voiceTune = paramsRef.current["CH"].tune; // OH shares CH tune
      else if (voice === "CR") voiceTune = params.crashtune;
      else if (voice === "RD") voiceTune = params.ridetune;

      let voiceDecay = params.decay;
      if (voice === "CH") voiceDecay = params.chdecay;
      else if (voice === "OH") voiceDecay = params.ohdecay;

      const result = play(voice, {
        volume: voiceLevel / 100,
        tune: voiceTune,
        decay: voiceDecay,
        attack: params.attack,
        tone: params.tone,
        snappy: params.snappy,
        pdepth: params.pdepth,
        pitch: params.pitch,
        accent: options.accent,
      });

      // Track CH nodes for choking by OH
      if (voice === "CH" && result) {
        activeChRef.current = result;
      }
    },
    [play, mutedVoices, soloedVoices],
  );

  const {
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
    stepRepeatActive,
    toggleStepRepeat,
    voiceLengths,
    setVoiceLength,
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
    toggle,
    stop,
  } = useSequencer(handleTrigger);

  // Load Pattern function
  const loadPattern = useCallback((slotIndex) => {
    const data = load(slotIndex + 1); // Storage is 1-based
    if (data) {
       loadState({
        pattern: data.pattern,
        accents: data.accents,
        probability: data.probability,
        flam: data.flam,
        flamWidth: data.flamWidth,
        bpm: data.bpm,
        swing: data.swing,
        patternLength: data.patternLength || 16,
        voiceLengths: data.voiceLengths, // Restore polymeter lengths
       });

       if (data.voiceParams) {
         setVoiceParams(data.voiceParams);
       }
    } else {
      clearPattern();
    }
  }, [load, loadState, clearPattern]);

  // Auto-scroll: change bank when playback crosses page boundary
  useEffect(() => {
    if (autoScroll && playing) {
      const targetPage = Math.floor(step / 16);
      const maxPages = Math.ceil(patternLength / 16);
      if (targetPage !== stepPage && targetPage < maxPages) {
        setStepPage(targetPage);
      }
    }
  }, [step, playing, autoScroll, stepPage, patternLength]);

  // Copy to internal clipboard
  const handleCopy = useCallback(() => {
    clipboardRef.current = {
      pattern,
      accents,
      voiceParams,
      bpm,
      swing,
      patternLength,
      probability,
      flam,
      flamWidth,
    };
    setCopying(true);
    setTimeout(() => setCopying(false), 150);
  }, [
    pattern,
    accents,
    voiceParams,
    bpm,
    swing,
    patternLength,
    probability,
    flam,
    flamWidth,
  ]);

  // Paste from internal clipboard
  const handlePaste = useCallback(() => {
    if (!clipboardRef.current) return;

    const data = clipboardRef.current;

    // Restore Sequencer State
    loadState({
      pattern: data.pattern,
      accents: data.accents,
      probability: data.probability,
      flam: data.flam,
      flamWidth: data.flamWidth,
      bpm: data.bpm,
      swing: data.swing,
      patternLength: data.patternLength,
    });

    // Restore Voice Params
    if (data.voiceParams) {
      setVoiceParams(data.voiceParams);
    }

    setPasting(true);
    setTimeout(() => setPasting(false), 150);
  }, [loadState]);

  // --- TAP TEMPO LOGIC ---
  const tapTimes = useRef([]);
  const handleTap = useCallback(() => {
    const now = Date.now();
    const times = tapTimes.current;

    // Reset if > 2 seconds since last tap
    if (times.length > 0 && now - times[times.length - 1] > 2000) {
      tapTimes.current = [now];
      return;
    }

    times.push(now);
    if (times.length > 4) times.shift(); // Keep last 4 taps

    if (times.length > 1) {
      let sumIntervals = 0;
      for (let i = 1; i < times.length; i++) {
        sumIntervals += times[i] - times[i - 1];
      }
      const avgInterval = sumIntervals / (times.length - 1);
      const newBpm = Math.round(60000 / avgInterval);
      if (newBpm >= 60 && newBpm <= 200) setBpm(newBpm);
    }
  }, [setBpm]);

  const cutoffToKnob = (hz) =>
    Math.round((Math.log10(hz / 20) / Math.log10(1000)) * 100);
  const knobToCutoff = (v) => Math.round(20 * Math.pow(1000, v / 100));

  const handlePlay = () => {
    resume();
    toggle();
  };

    const getDataValue = () => {

      if (dataMode === "SWING") return swing;

      if (dataMode === "FLAM") return flamWidth;

      if (dataMode === "PROB") return 50; // Display only

      return bpm;

    };

    const setDataValue = (v) => {

      if (dataMode === "SWING") setSwing(Math.max(0, Math.min(100, v)));

      else if (dataMode === "FLAM") setFlamWidth(Math.max(0, Math.min(24, v)));

      else if (dataMode === "PROB") { /* Probability is per-step */ }

      else setBpm(Math.max(60, Math.min(200, v)));

    };

  const getDisplayValue = () => {
    if (saveMode) return "SAV";
    if (copying) return "CPY";
    if (pasting) return "PST";
    if (mode === "pattern")
      return `P${(currentSlot + 1).toString().padStart(2, "0")}`;
    if (dataMode === "SWING") return swing;
    if (dataMode === "FLAM") return flamWidth;
    if (dataMode === "PROB") return "PRB";
    return `${bpm}.0`;
  };
  const displayValue = getDisplayValue();

  const handleDisplayClick = () => {
    if (saveMode) return;
    setEditingDisplay(true);
    setEditValue(String(dataMode === "SWING" ? swing : bpm));
  };

  const handleDisplaySubmit = () => {
    const num = parseInt(editValue, 10);
    if (!isNaN(num)) setDataValue(num);
    setEditingDisplay(false);
  };

  const handleDisplayKeyDown = (e) => {
    if (e.key === "Enter") handleDisplaySubmit();
    if (e.key === "Escape") setEditingDisplay(false);
  };

  return (
    <ScaleWrapper>
      <div className="flex flex-col h-full w-full px-0 pt-2 mt-4 overflow-x-auto bg-[#e2e2df] select-none text-[#1a1a1a]">
        {/* === TOP HEADER STRIP === */}
        <div className="flex items-end justify-between px-6 pt-3 pb-2 border-b border-[#a3a3a3] bg-gradient-to-b from-[#e8e8e5] to-[#dcdcd9]">
          <div className="flex items-end gap-6">
            {/* MASTER Knob */}
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold text-[#555] mb-0.5 mr-2 tracking-wider">
                MASTER
              </span>
              <Knob label="" value={80} onChange={() => {}} size={34} />
            </div>

            {/* Behringer Logo - con amor */}
            <div
              className="flex flex-col items-center justify-end pb-0.5 cursor-pointer"
              onClick={() => console.log('%ccon amor', 'color: #ff3333; font-size: 14px; font-weight: bold;')}
              title="con amor"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 100 100"
                className="mb-0.5"
                fill="none"
              >
                {/* Triangle outline */}
                <path
                  d="M50 10 L90 85 Q90 90 85 90 L15 90 Q10 90 10 85 Z"
                  stroke="#444"
                  strokeWidth="5"
                  fill="none"
                  strokeLinejoin="round"
                />
                {/* Ear shape */}
                <ellipse cx="52" cy="55" rx="18" ry="22" fill="#444" />
                <path
                  d="M42 65 Q55 70 62 50"
                  stroke="#e2e2df"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span
                className="text-[8px] font-semibold text-[#444] leading-none"
                style={{
                  fontFamily: "Century Gothic, Futura, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                behringer
              </span>
            </div>

            {/* PHONES Knob */}
            <div className="flex flex-col items-center">
              <span className="text-[8px] font-bold text-[#555] mb-0.5  tracking-wider">
                PHONES
              </span>
              <Knob label="" value={80} onChange={() => {}} size={34} />
            </div>

            {/* RD-9 Logo - Condensed heavy style */}
            <div className="ml-6 flex items-end">
              <h1
                className="text-5xl font-black text-[#333] leading-none"
                style={{
                  fontFamily:
                    "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                RD-9
              </h1>
            </div>
          </div>

          {/* RHYTHM DESIGNER - Italic style */}
          <div className="flex items-end pb-1">
            <h2
              className="text-2xl font-bold text-[#444] leading-none"
              style={{
                fontFamily: "Eurostile, Arial, sans-serif",
                fontStyle: "italic",
                letterSpacing: "0.15em",
              }}
            >
              RHYTHM DESIGNER
            </h2>
          </div>
        </div>

        {/* === MAIN BODY === */}
        <div className="flex h-[480px] p-1 gap-2 overflow-hidden bg-[#e2e2df] flex-shrink-0">
          {/* === LEFT CONTROL COLUMN === */}
          <div className="w-[210px] flex flex-col gap-2 flex-shrink-0 h-full py-2 pl-2 pr-1">
            {/* FX SECTION */}
            <div className="border border-[#777] rounded-[6px] bg-[#e2e2df] p-2 relative h-[210px] flex flex-col">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#444] text-white text-[9px] font-bold tracking-widest rounded-[2px] z-10">
                FX
              </div>

              {/* Top Half: Filter */}
              <div className="flex justify-between items-start relative z-0 h-[50%]">
                {/* Left Knob */}
                <div className="flex flex-col items-center z-10">
                  <Knob
                    label="CUTOFF"
                    value={cutoffToKnob(filterCutoff)}
                    onChange={(v) => setFilterCutoff(knobToCutoff(v))}
                    size={40}
                  />
                </div>

                {/* Center Buttons */}
                <div className="flex flex-col items-center pl-3 pt-20 mt-1 z-10 gap-1">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setFilterType(
                          filterType === "lowpass" ? "highpass" : "lowpass",
                        )
                      }
                      className={`h-5 w-8 rounded-[2px] text-[7px] font-bold border-2 border-[#888] ${filterType === "highpass" ? "bg-[#333] text-white" : "bg-[#222] text-[#888] shadow-inner"}`}
                    >
                      HPF
                    </button>
                    <button
                      onClick={() => setFilterEnabled(!filterEnabled)}
                      className={`h-5 w-8 rounded-[2px] text-[7px] font-bold border-2 border-[#888] ${filterEnabled ? "bg-[#333] text-white" : "bg-[#e2e2df] text-[#333] shadow-[0_1px_1px_rgba(0,0,0,0.3)]"}`}
                    >
                      ON
                    </button>
                  </div>
                  <span className="text-[6px] font-bold text-[#555] tracking-tight bg-[#e2e2df] px-1 z-20">
                    ANALOG FILTER
                  </span>
                </div>

                {/* Right Knob */}
                <div className="flex flex-col items-center z-10 ">
                  <Knob
                    label="RESONANC"
                    value={Math.round(((filterResonance - 0.5) / 11.5) * 100)}
                    onChange={(v) => setFilterResonance(0.5 + (v / 100) * 11.5)}
                    size={40}
                  />
                </div>
              </div>

              {/* Bottom Half: Wave Designer */}
              <div className="flex justify-between items-end relative z-0 h-[50%]">
                <div className="flex flex-col items-center z-10">
                  <Knob
                    label="ATTACK"
                    value={waveAttack}
                    onChange={setWaveAttack}
                    size={40}
                  />
                </div>

                <div className="flex flex-col items-center z-10">
                  <Knob
                    label="SUSTAIN"
                    value={waveSustain}
                    onChange={setWaveSustain}
                    size={40}
                  />
                </div>
              </div>
            </div>

            {/* EDIT */}
            <div className="border border-[#777] rounded-[6px] bg-[#e2e2df] p-3 relative flex-1 flex flex-col justify-center">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#444] text-white text-[9px] font-bold tracking-widest rounded-[2px]">
                EDIT
              </div>
              <div className="flex justify-between gap-2 mt-1">
                <button
                  onClick={() => {
                    // Serialize Sets to Arrays for storage
                    const serializedFlam = {};
                    if (flam) {
                      Object.keys(flam).forEach((k) => {
                        serializedFlam[k] = Array.from(flam[k] || []);
                      });
                    }

                    save(currentSlot + 1, {
                      pattern,
                      accents,
                      voiceParams,
                      bpm,
                      swing,
                      probability,
                      flam: serializedFlam,
                      flamWidth,
                      patternLength,
                      voiceLengths
                    });
                    setSaveMode(true);
                    setTimeout(() => setSaveMode(false), 500);
                  }}
                  className={`flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-inner active:translate-y-[1px] ${saveMode ? "bg-green-600 text-white border-green-700" : "bg-[#222] text-[#888] border-[#666]"}`}
                >
                  SAVE
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-inner active:translate-y-[1px] ${copying ? "bg-blue-600 text-white border-blue-700" : "bg-[#222] text-[#888] border-[#666]"}`}
                >
                  COPY
                </button>
                <button
                  onClick={clearPattern}
                  onDoubleClick={() => {
                    clearStorage(currentSlot + 1);
                    clearPattern();
                    // Visual feedback (flash SAVE light/text maybe? or just rely on clear)
                    // Let's flash the button itself by reusing saveMode or adding a new state?
                    // Reusing saveMode "SAV" display is simplest feedback that "Storage action happened"
                    setSaveMode(true);
                    setTimeout(() => setSaveMode(false), 500);
                  }}
                  title="Click to Clear Pattern (Memory) / Double-Click to Delete from Storage"
                  className="flex-1 h-8 bg-[#222] text-[#888] text-[7px] font-bold border-2 border-[#666] rounded-[2px] shadow-inner active:translate-y-[1px]"
                >
                  ERASE
                </button>
                <button
                  onClick={handlePaste}
                  className={`flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-inner active:translate-y-[1px] ${pasting ? "bg-blue-600 text-white border-blue-700" : "bg-[#222] text-[#888] border-[#666]"}`}
                >
                  PASTE
                </button>
              </div>
            </div>

            {/* MODE */}
            <div className="border border-[#777] rounded-[6px] bg-[#e2e2df] p-3 relative flex-1 flex flex-col justify-center">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#444] text-white text-[9px] font-bold tracking-widest rounded-[2px]">
                MODE
              </div>
              <div className="flex justify-between gap-2 mt-1">
                <button
                  disabled
                  title="Coming Soon"
                  className="flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-md bg-[#222] text-[#888] border-[#666] opacity-50 cursor-not-allowed"
                >
                  SONG
                </button>
                <button
                  onClick={() => {
                    setMode("pattern");
                    loadPattern(currentSlot); // Reload from storage
                  }}
                  className={`flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-md ${mode === "pattern" ? "bg-yellow-400 text-black border-yellow-600" : "bg-[#222] text-[#888] border-[#666]"}`}
                >
                  PATTERN
                </button>
                <button
                  onClick={() => {
                    setMode("step");
                    stop(); // Stop playback
                    clearPattern(); // Clear current pattern
                  }}
                  className={`flex-1 h-8 text-[7px] font-bold border-2 rounded-[2px] shadow-md ${mode === "step" ? "bg-yellow-400 text-black border-yellow-600" : "bg-[#222] text-[#888] border-[#666]"}`}
                >
                  STEP
                </button>
              </div>
              {/* Pattern Navigation */}
              {mode === "pattern" && (
                <div className="mt-2 pt-2 border-t border-[#999]">
                  <div className="flex items-center justify-between gap-2 px-1">
                    <button
                      onClick={() => {
                        const next = Math.max(0, currentSlot - 1);
                        setCurrentSlot(next);
                        loadPattern(next);
                      }}
                      disabled={currentSlot === 0}
                      className="w-8 h-6 bg-[#333] text-white text-[12px] font-bold border border-[#555] rounded-[2px] disabled:opacity-50"
                    >
                      &lt;
                    </button>
                    <span className="flex-1 text-center text-[10px] font-mono font-bold text-[#333]">
                      SELECT
                    </span>
                    <button
                      onClick={() => {
                        const next = Math.min(15, currentSlot + 1);
                        setCurrentSlot(next);
                        loadPattern(next);
                      }}
                      disabled={currentSlot === 15}
                      className="w-8 h-6 bg-[#333] text-white text-[12px] font-bold border border-[#555] rounded-[2px] disabled:opacity-50"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SYNC */}
            <div className="border border-[#777] rounded-[6px] bg-[#e2e2df] p-1.5 relative h-[50px] flex flex-col justify-center mt-1">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#444] text-white text-[9px] font-bold tracking-widest rounded-[2px]">
                SYNC
              </div>
              <div className="flex items-center justify-between px-2 pt-1">
                <button className="w-8 h-6 bg-[#ccc] border-2 border-[#999] rounded-[2px] flex items-center justify-center text-[#555] font-bold shadow-sm active:translate-y-[1px]">
                  <span className="text-xl leading-none">⇄</span>
                </button>
                <div className="flex gap-3">
                  {["INT", "MIDI", "USB", "TRIG"].map((s, i) => (
                    <div key={s} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-1.5 h-1.5 rounded-[1px] ${i === 0 ? "bg-[#ff3333]" : "bg-[#999]"}`}
                      />
                      <span className="text-[5px] font-bold text-[#555]">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* === RIGHT VOICES AREA === */}
          <div className="flex-1 flex bg-[#dcdcdc] border border-[#a3a3a3] rounded-sm overflow-hidden shadow-[inset_0_1px_0_#fff] h-full">
            {/* ACCENT STRIP */}
            <div className="w-24 flex flex-col items-center border-r border-[#a3a3a3]">
              {/* Header - matching other columns */}
              <div className="w-full bg-[#262626] h-6 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                <span className="text-[7px] font-bold tracking-widest font-sans text-orange-500">
                  ACCENT
                </span>
              </div>
              {/* Knob */}
              <div className="pt-4">
                <Knob
                  label=""
                  value={accentLevel}
                  onChange={setAccentLevel}
                  size={56}
                />
              </div>
              {/* LED indicator at bottom */}
              <div className="mt-auto mb-4 w-10 h-10 rounded-full bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center border-2 border-[#333]">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_5px_orange]" />
              </div>
            </div>

            {/* VOICES */}
            <div className="flex-1 flex overflow-x-auto">
              {VOICE_SECTIONS.map((section) => {
                const isSelected = section.voices.includes(selectedVoice);
                const isCombined = section.combined;

                return (
                  <div
                    key={section.id}
                    className={`flex flex-col items-center border-r border-[#a3a3a3] ${isCombined ? "flex-[1.3]" : "flex-1"} min-w-0`}
                  >
                    {/* Label Header */}
                    <div className="w-full bg-[#262626] h-6 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      <span
                        className={`text-[7px] font-bold tracking-widest font-sans ${isSelected ? "text-white" : "text-orange-500"}`}
                      >
                        {section.label}
                      </span>
                    </div>

                    {/* Knobs */}
                    <div className="flex flex-col gap-0 items-center pt-2 flex-1">
                      {section.knobRows.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-0">
                          {row.map((knob) => {
                            const pKey = knob.p
                              .toLowerCase()
                              .replace(".", "")
                              .replace(/ /g, "");
                            return (
                              <Knob
                                key={`${knob.v}-${knob.p}`}
                                label={knob.p}
                                value={voiceParams[knob.v]?.[pKey] || 50}
                                onChange={(v) => updateParam(knob.v, pKey, v)}
                                size={38}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Select Buttons */}
                    <div
                      className={`mt-auto pb-3 flex ${isCombined ? "gap-1" : ""}`}
                    >
                      {section.buttons.map((btn) => (
                        <HardBtn
                          key={btn.v}
                          onClick={() => {
                            resume();
                            setSelectedVoice(btn.v);
                            handleTrigger(btn.v);
                          }}
                          color={selectedVoice === btn.v ? "white" : "grey"}
                          className={`${isCombined ? "w-[55px]" : "w-[70px]"} h-7 text-[7px] tracking-wide`}
                        >
                          {btn.label}
                        </HardBtn>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* === BOTTOM DECK (REFACTORED V3 - RD-9 REPLICA) === */}
        <div className="flex w-full h-[220px] flex-shrink-0 bg-[#e2e2df] border-t-[4px] border-[#888] shadow-2xl overflow-hidden relative">
          {/* === MAIN CONTROL AREA (Left side) === */}
          <div className="flex-1 flex flex-col relative">
            {/* --- ROW 1: DARK CONTROL STRIP --- */}
            <DarkControlStrip
              bpm={bpm}
              setBpm={setBpm}
              swing={swing}
              setSwing={setSwing}
              dataMode={dataMode}
              setDataMode={setDataMode}
              patternLength={patternLength}
              setPatternLength={setPatternLength}
              repeatDivision={repeatDivision}
              setRepeatDivision={setRepeatDivision}
              stepRepeatActive={stepRepeatActive}
              toggleStepRepeat={toggleStepRepeat}
              onTap={handleTap}
              onTrigger={() => handleTrigger(selectedVoice)}
              displayValue={displayValue}
              editingDisplay={editingDisplay}
              editValue={editValue}
              onDisplayClick={handleDisplayClick}
              onEditChange={(e) => setEditValue(e.target.value)}
              onEditBlur={handleDisplaySubmit}
              onEditKeyDown={handleDisplayKeyDown}
              getDataValue={getDataValue}
              setDataValue={setDataValue}
              stepPage={stepPage}
              setStepPage={setStepPage}
              autoScroll={autoScroll}
              setAutoScroll={setAutoScroll}
              step={step}
              playing={playing}
              mode={mode}
            />

            {/* --- ROW 2: TRANSPORT & STEP KEYS --- */}
            <div className="flex-1 bg-[#e2e2df] flex relative px-4 py-2 gap-6">
              {/* TRANSPORT (Bottom Left) */}
              <div className="flex flex-col gap-3 items-center pb-1">
                <div className="flex gap-3 items-start">
                  {/* Record */}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mb-1 ${isRecording ? "bg-red-500 shadow-[0_0_5px_red] animate-pulse" : "bg-[#300]"}`}
                    />
                    <HardBtn
                      onClick={() => {
                        if (isRecording) {
                          stopRecording();
                        } else {
                          resume();
                          startRecording();
                        }
                      }}
                      className="w-12 h-12 rounded-[4px] border-[2px] border-[#555] shadow-lg flex items-center justify-center"
                      color="black"
                    >
                      <div className={`w-3 h-3 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] ${isRecording ? "bg-[#ff3333]" : "bg-[#d22]"}`} />
                    </HardBtn>
                  </div>
                  {/* Stop */}
                  <div className="flex flex-col items-center gap-1">
                    <HardBtn
                      onClick={stop}
                      className="w-12 h-12 rounded-[4px] border-[2px] border-[#555] shadow-lg flex items-center mt-3.5 justify-center"
                      color="black"
                    >
                      <div className="w-3 h-3 bg-[#ccc] shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
                    </HardBtn>
                  </div>
                  {/* Play */}
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mb-1 ${playing ? "bg-green-500 shadow-[0_0_5px_green]" : "bg-[#030]"}`}
                    />
                    <HardBtn
                      onClick={handlePlay}
                      className="w-12 h-12 rounded-[4px] border-[2px] border-[#555] shadow-lg flex items-center justify-center"
                      color="black"
                    >
                      <span
                        className={`text-xl ${playing ? "text-[#22c55e]" : "text-[#22c55e] opacity-70"}`}
                      >
                        ▶
                      </span>
                    </HardBtn>
                  </div>
                </div>

                {/* Export Button - appears after recording stops */}
                {recordedBlob && (
                  <button
                    onClick={() => {
                      const url = URL.createObjectURL(recordedBlob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `rd9-pattern-${Date.now()}.webm`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      clearRecordedBlob();
                    }}
                    className="w-[180px] h-10 bg-gradient-to-b from-[#333] to-[#222] text-white text-[10px] font-bold tracking-widest border-2 border-[#555] rounded-[2px] shadow-lg active:translate-y-[1px] active:shadow-md transition-all"
                  >
                    EXPORT
                  </button>
                )}
              </div>

              {/* STEP KEYS (1-16) */}
              <div className="flex-1 flex flex-col justify-end pb-1">
                {/* LED Row */}
                <div className="flex w-full justify-between px-2 mb-2">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const realStep = stepPage * 16 + i;
                    const isOn = pattern[selectedVoice]?.includes(realStep);
                    const isAccented =
                      accents[selectedVoice]?.includes(realStep);
                    const isCurrent = step === realStep && playing;
                    const prob = probability[selectedVoice]?.[realStep] ?? 100;
                    const hasFlam = flam[selectedVoice]?.has?.(realStep);

                    // Determine LED color based on mode and state
                    let ledClass =
                      "bg-[#3a2a2a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]";
                    if (dataMode === "PROB" && isOn) {
                      // Show probability level with different colors
                      if (prob === 0)
                        ledClass = "bg-[#333] shadow-[0_0_2px_#111]";
                      else if (prob <= 25)
                        ledClass = "bg-[#553300] shadow-[0_0_4px_#552200]";
                      else if (prob <= 50)
                        ledClass = "bg-[#886600] shadow-[0_0_4px_#884400]";
                      else if (prob <= 75)
                        ledClass = "bg-[#bb8800] shadow-[0_0_4px_#aa6600]";
                      else ledClass = "bg-[#33cc33] shadow-[0_0_6px_#33cc33]";
                    } else if (dataMode === "FLAM" && isOn) {
                      ledClass = hasFlam
                        ? "bg-[#cc33cc] shadow-[0_0_6px_#cc33cc]"
                        : "bg-[#33cc33] shadow-[0_0_6px_#33cc33]";
                    } else if (isOn || isCurrent) {
                      if (isAccented)
                        ledClass = "bg-[#ff8800] shadow-[0_0_6px_#ff8800]";
                      else if (isCurrent)
                        ledClass = "bg-[#ff3333] shadow-[0_0_8px_#ff0000]";
                      else ledClass = "bg-[#33cc33] shadow-[0_0_6px_#33cc33]";
                    }

                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center w-[50px]"
                      >
                        <div
                          className={`w-3 h-1.5 rounded-[1px] border border-black/20 ${ledClass}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Keys Row */}
                <div className="flex w-full justify-between px-2">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const realStep = stepPage * 16 + i;
                    const handleClick = () => {
                      if (dataMode === "PROB") {
                        // Only cycle probability if step is active
                        if (pattern[selectedVoice]?.includes(realStep)) {
                          cycleProbability(selectedVoice, realStep);
                        } else {
                          toggleStep(selectedVoice, realStep);
                        }
                      } else if (dataMode === "FLAM") {
                        // Only toggle flam if step is active
                        if (pattern[selectedVoice]?.includes(realStep)) {
                          toggleFlam(selectedVoice, realStep);
                        } else {
                          toggleStep(selectedVoice, realStep);
                        }
                      } else {
                        toggleStep(selectedVoice, realStep);
                      }
                    };

                    return (
                      <button
                        key={i}
                        onClick={handleClick}
                        onDoubleClick={() =>
                          toggleAccent(selectedVoice, realStep)
                        }
                        className={`
                          w-[50px] h-[50px] rounded-[3px] transition-all duration-75
                          bg-[#e8e8e0] border border-[#bbb]
                          shadow-[0_3px_0_#999,0_4px_4px_rgba(0,0,0,0.2)]
                          active:shadow-[0_1px_0_#999] active:translate-y-[2px]
                          flex items-start justify-center pt-1
                          ${pattern[selectedVoice]?.includes(realStep) ? "bg-[#d8d8d0]" : ""}
                        `}
                      >
                        {/* Inner slot/groove like keyboard key */}
                        <div className="w-[22px] h-[8px] rounded-[2px] bg-[#d0d0c8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
                      </button>
                    );
                  })}
                </div>

                {/* Labels Strip */}
                <div className="mt-2 h-6 bg-[#111] w-full flex items-center justify-between px-2 shadow-[0_1px_0_#fff]">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const realStep = stepPage * 16 + i;
                    return (
                      <div key={i} className="w-[50px] text-center">
                        <span className="text-[9px] font-black text-[#ddd] font-sans block leading-none">
                          {realStep + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* === RIGHT TRACK COLUMN === */}
          <div className="w-[110px] flex flex-col h-full relative z-30">
            {/* Top Half: Light Panel (Mute/Solo) */}
            <div className="bg-[#e2e2df] p-0 pb-4 relative flex flex-col items-center">
              {/* TRACK Label */}
              <div className="absolute -top-0.0 bg-[#444] text-white px-2 my-2 rounded-[2px] text-[8px] font-bold tracking-widest z-10">
                TRACK
              </div>

              <div className=" rounded-[2px] p-2 mt-4 w-full flex flex-col gap-2 items-center bg-[#e2e2df] relative">
                {/* Circuit Line */}
                <div className="absolute top-[35%] left-1/2 w-[2px] h-[30%] bg-[#888] -translate-x-1/2 z-0" />

                <button
                  onClick={() => {
                    setMutedVoices((prev) => {
                      const next = new Set(prev);
                      if (next.has(selectedVoice)) next.delete(selectedVoice);
                      else next.add(selectedVoice);
                      return next;
                    });
                  }}
                  className={`relative z-10 w-20 h-6 rounded-[2px] text-[8px] mt-2 font-bold border-2 border-[#666] shadow-sm flex items-center justify-center ${mutedVoices.has(selectedVoice) ? "bg-red-600 text-white" : "bg-[#222] text-[#ccc]"}`}
                >
                  MUTE
                </button>

                <button
                  onClick={() => {
                    setSoloedVoices((prev) => {
                      const next = new Set(prev);
                      if (next.has(selectedVoice)) next.delete(selectedVoice);
                      else next.add(selectedVoice);
                      return next;
                    });
                  }}
                  className={`relative z-10 w-20 h-6 rounded-[2px] text-[8px] font-bold border-2 border-[#999] shadow-sm flex items-center justify-center ${soloedVoices.has(selectedVoice) ? "bg-yellow-400 text-black" : "bg-[#f0f0f0] text-[#222]"}`}
                >
                  SOLO
                </button>
              </div>
            </div>

            {/* Bottom Half: Dark Panel (Settings/Auto Fill) */}
            <div className="bg-[#e2e2df] flex-1 px-2 flex flex-col gap-2 items-center relative">
              <button className="w-full h-6 bg-[#222] text-[#888] text-[7px] font-bold border-2 border-[#555] rounded-[4px] shadow-lg mt-2 relative z-10">
                SETTINGS
              </button>

              <button className="w-full h-6 bg-[#222] text-[#888] text-[7px] font-bold border-2 border-[#555] rounded-[4px] shadow-lg relative z-10">
                AUTO FILL
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScaleWrapper>
  );
}
