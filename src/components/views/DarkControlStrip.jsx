import { useState } from "react";
import { Knob } from "@/components/ui";

// --- Internal Components ---

// Dark button with inner slot (keyboard-key style)
const CtrlButton = ({
  children,
  small,
  tall,
  large,
  light, // for LENGTH button
  active,
  onClick,
  className = "",
  withSlot = true,
}) => (
  <button
    onClick={onClick}
    className={`
      ${light ? "bg-[#e8e8e0] border-[#aaa] text-[#333]" : "bg-[#333] border-[#555] text-[#aaa]"}
      border-2 rounded-[4px]
      font-bold tracking-wide
      flex flex-col items-center justify-start text-center
      shadow-[0_3px_0_rgba(0,0,0,0.4)]
      active:shadow-[0_1px_0_rgba(0,0,0,0.4)] active:translate-y-[2px]
      transition-all
      ${small ? "px-2 pt-1.5 pb-1 text-[7px] gap-1" : ""}
      ${tall ? "px-3 pt-2 pb-1.5 text-[8px] leading-tight h-[55px] w-[60px] gap-1.5" : ""}
      ${large ? "px-4 pt-2.5 pb-2 text-[9px] h-[60px] w-[70px] gap-1.5" : ""}
      ${!small && !tall && !large ? "px-3 pt-1.5 pb-1 text-[8px] gap-1" : ""}
      ${active ? "text-white bg-[#444]" : ""}
      ${className}
    `}
  >
    {withSlot && (
      <div
        className={`${light ? "bg-[#d0d0c8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" : "bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"} rounded-[2px] ${small ? "w-[18px] h-[6px]" : tall || large ? "w-[32px] h-[8px]" : "w-[22px] h-[6px]"}`}
      />
    )}
    <span className="leading-tight">{children}</span>
  </button>
);

const Indicator = ({ label, active, size = "md" }) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className={`
        rounded-sm transition-all
        ${size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"}
        ${active ? "bg-[#ff3333] shadow-[0_0_6px_#ff0000]" : "bg-[#330000]"}
      `}
    />
    <span className="text-[7px] text-[#666] font-bold tracking-wide">
      {label}
    </span>
  </div>
);

const LEDDisplay = ({
  value,
  onClick,
  editing,
  editValue,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
}) => (
  <div
    onClick={onClick}
    className="w-[110px] h-[48px] bg-black rounded-[3px] border-[3px] border-[#111]
               flex items-center justify-end px-3 cursor-pointer
               shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] relative overflow-hidden"
  >
    {/* Subtle glass reflection */}
    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

    {editing ? (
      <input
        type="text"
        value={editValue}
        onChange={onEditChange}
        onBlur={onEditBlur}
        onKeyDown={onEditKeyDown}
        autoFocus
        className="w-full bg-transparent font-mono text-2xl text-[#ff3333] font-black text-right outline-none z-10 tracking-wider"
      />
    ) : (
      <span
        className="font-mono text-2xl font-black text-[#ff3333] tracking-wider z-10"
        style={{ textShadow: "0 0 10px rgba(255,50,50,0.6)" }}
      >
        {value}
      </span>
    )}
  </div>
);

export function DarkControlStrip({
  bpm,
  setBpm,
  swing,
  setSwing,
  dataMode,
  setDataMode,
  patternLength,
  setPatternLength,
  repeatDivision = 1,
  setRepeatDivision,
  stepRepeatActive = false,
  toggleStepRepeat,
  onTap,
  onTrigger,
  displayValue,
  editingDisplay,
  editValue,
  onDisplayClick,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  getDataValue,
  setDataValue,
  stepPage = 0,
  setStepPage,
  autoScroll = true,
  setAutoScroll,
  step = 0,
  playing = false,
  mode = "step",
}) {
  const dataModes = ["TEMPO", "SWING", "PROB", "FLAM"];
  const divisions = [1, 2, 4, 8];
  const lengths = [16, 32, 48, 64];

  return (
    <div className="h-[100px] bg-[#333] border-b border-[#333] flex items-center px-5 gap-0 relative z-20 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
      {/* Section 1: TAP/HOLD + DISPLAY */}
      <div className="flex items-center gap-3 pr-5">
        <CtrlButton onClick={onTap} className="w-[52px] h-[52px] leading-tight">
          TAP/
          <br />
          HOLD
        </CtrlButton>
        <LEDDisplay
          value={displayValue}
          onClick={onDisplayClick}
          editing={editingDisplay}
          editValue={editValue}
          onEditChange={onEditChange}
          onEditBlur={onEditBlur}
          onEditKeyDown={onEditKeyDown}
        />
      </div>

      {/* Section 2: DATA (knob + mode indicators + button) */}
      <div className="flex items-center gap-4 border-l border-[#444] pl-5 pr-5">
        <div className="flex flex-col items-center">
          <Knob
            label=""
            value={getDataValue()}
            onChange={setDataValue}
            min={dataMode === "TEMPO" ? 60 : 0}
            max={dataMode === "TEMPO" ? 200 : 100}
            size={48}
          />
          <span className="text-[8px] font-bold text-[#666] mt-1 tracking-wider">
            DATA
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-3">
            {dataModes.map((m) => (
              <Indicator key={m} label={m} active={dataMode === m} size="sm" />
            ))}
          </div>
          <CtrlButton
            small
            onClick={() => {
              const idx = dataModes.indexOf(dataMode);
              setDataMode(dataModes[(idx + 1) % dataModes.length]);
            }}
          >
            DATA MODE
          </CtrlButton>
        </div>
      </div>

      {/* Section 3: AUTO SCROLL */}
      <div className="border-l border-[#444] pl-5 pr-5 flex items-center">
        <CtrlButton
          className="h-[52px] w-[50px] leading-tight"
          active={autoScroll}
          onClick={() => setAutoScroll?.(a => !a)}
        >
          AUTO
          <br />
          SCROLL
        </CtrlButton>
      </div>

      {/* Section 4: LENGTH (disabled in STEP mode) */}
      {mode !== "step" && (
        <div className="flex items-center border-l border-[#444] pl-5 pr-5">
          <div className="flex flex-col gap-2">
            {/* LEDs row - spread across button row width */}
            <div className="flex justify-between px-1">
              {[16, 32, 48, 64].map((l) => (
                <Indicator
                  key={l}
                  label={l}
                  active={patternLength === l}
                  size="sm"
                />
              ))}
            </div>
            <div className="flex gap-1 items-center">
              <CtrlButton
                small
                onClick={() => {
                  const idx = lengths.indexOf(patternLength);
                  setPatternLength(lengths[(idx - 1 + lengths.length) % lengths.length]);
                }}
              >
                «
              </CtrlButton>
              <CtrlButton small light className="w-[55px]">
                LENGTH
              </CtrlButton>
              <CtrlButton
                small
                onClick={() => {
                  const idx = lengths.indexOf(patternLength);
                  setPatternLength(lengths[(idx + 1) % lengths.length]);
                }}
              >
                »
              </CtrlButton>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: BANK (for 64-step patterns) */}
      {patternLength > 16 && mode !== "step" && (
        <div className="flex items-center border-l border-[#444] pl-5 pr-5">
          <div className="flex flex-col gap-2">
            {/* Bank LEDs */}
            <div className="flex justify-between px-1">
              {[16, 32, 48, 64].map((len, idx) => {
                const isViewedBank = stepPage === idx;
                const isPlayheadBank = playing && Math.floor(step / 16) === idx;
                const isAvailable = patternLength >= len;
                let ledClass = "bg-[#222]";
                if (isAvailable) {
                  if (isPlayheadBank && isViewedBank) ledClass = "bg-[#ff3333] shadow-[0_0_6px_#ff3333]";
                  else if (isPlayheadBank) ledClass = "bg-[#ffffff] shadow-[0_0_4px_#ffffff]";
                  else if (isViewedBank) ledClass = "bg-[#3399ff] shadow-[0_0_6px_#3399ff]";
                  else ledClass = "bg-[#444]";
                }
                return (
                  <button
                    key={len}
                    onClick={() => isAvailable && setStepPage(idx)}
                    disabled={!isAvailable}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <div className={`w-1.5 h-1 rounded-[1px] transition-all ${ledClass}`} />
                    <span className={`text-[7px] font-bold ${isAvailable ? 'text-[#888]' : 'text-[#444]'}`}>{len}</span>
                  </button>
                );
              })}
            </div>
            {/* Bank nav buttons */}
            <div className="flex gap-1 items-center">
              <CtrlButton
                small
                onClick={() => setStepPage(p => Math.max(0, p - 1))}
                disabled={stepPage === 0}
              >
                «
              </CtrlButton>
              <CtrlButton small light className="w-[55px]">
                BANK
              </CtrlButton>
              <CtrlButton
                small
                onClick={() => setStepPage(p => Math.min(Math.ceil(patternLength / 16) - 1, p + 1))}
                disabled={stepPage >= Math.ceil(patternLength / 16) - 1}
              >
                »
              </CtrlButton>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: DIVISIONS (1,2,4,8) + Step buttons */}
      <div className="flex flex-col gap-1.5 border-l border-[#555] pl-5 pr-5">
        {/* LEDs row - same width as buttons */}
        <div
          className="flex justify-between"
          style={{ width: "calc(4 * 42px + 3 * 6px)" }}
        >
          {divisions.map((d) => (
            <div key={d} className="w-[42px] flex justify-center">
              <Indicator label={d} active={repeatDivision === d} size="sm" />
            </div>
          ))}
        </div>
        {/* Row of 4 step-like buttons */}
        <div className="flex gap-1.5">
          {divisions.map((d) => (
            <button
              key={d}
              onClick={() => setRepeatDivision?.(d)}
              className={`w-[42px] h-[36px] bg-[#333] border-2 rounded-[4px] flex items-start justify-center pt-1.5 shadow-[0_3px_0_rgba(0,0,0,0.4)] active:shadow-[0_1px_0_rgba(0,0,0,0.4)] active:translate-y-[2px] transition-all ${repeatDivision === d ? 'border-[#ff5500]' : 'border-[#555]'}`}
            >
              <div className="w-[22px] h-[7px] bg-[#1a1a1a] rounded-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
            </button>
          ))}
        </div>
      </div>

      {/* Section 7: REPEAT */}
      <div className="flex gap-2 border-l border-[#444] pl-5 pr-5">
        <CtrlButton
          tall
          active={stepRepeatActive}
          onClick={toggleStepRepeat}
        >
          STEP
          <br />
          REPEAT
        </CtrlButton>
        <CtrlButton tall>
          NOTE
          <br />
          REPEAT
        </CtrlButton>
      </div>

      {/* Section 8: TRIGGER */}
      <div className="ml-auto flex flex-col items-center gap-1">
        <div className="flex gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-sm bg-[#330000]" />
          ))}
        </div>
        <CtrlButton large onClick={onTrigger}>
          TRIGGER
        </CtrlButton>
      </div>
    </div>
  );
}
