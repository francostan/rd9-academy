/**
 * KeyButton - Brutalist keyboard-key style button
 * Industrial minimalism inspired by Roland TR-909 / Berlin techno aesthetic
 */
export function KeyButton({
  children,
  onClick,
  disabled,
  dark,
  active,
  done,
  className = "",
  size = "md",
}) {
  const sizes = {
    sm: "px-2 py-1.5 text-[8px]",
    md: "px-3 py-2 text-[9px]",
    lg: "px-4 py-2.5 text-[10px]",
  };

  const slotSizes = {
    sm: "w-[16px] h-[5px]",
    md: "w-[20px] h-[6px]",
    lg: "w-[24px] h-[7px]",
  };

  // LED indicator color
  const ledColor = done
    ? "bg-[#33cc33] shadow-[0_0_6px_#33cc33]"
    : active
      ? "bg-[#ff5f00] shadow-[0_0_6px_#ff5f00]"
      : "bg-[#333]";

  return (
    <div className="flex flex-col items-center gap-1">
      {/* LED indicator */}
      {(active !== undefined || done !== undefined) && (
        <div className={`w-2 h-1 ${ledColor} transition-all`} />
      )}

      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${dark ? "bg-[#333] border-[#555] text-[#aaa]" : "bg-[#e8e8e0] border-[#888] text-[#333]"}
          border-2
          ${dark
            ? "shadow-[0_3px_0_#111,0_4px_4px_rgba(0,0,0,0.4)]"
            : "shadow-[0_3px_0_#666,0_4px_4px_rgba(0,0,0,0.3)]"
          }
          active:shadow-[0_1px_0_${dark ? "#111" : "#666"}] active:translate-y-[2px]
          flex flex-col items-center justify-start gap-1
          font-bold uppercase tracking-wider
          transition-all
          ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
          ${active ? (dark ? "bg-[#444] text-[#ff5f00]" : "bg-[#ddd] text-[#ff5f00]") : ""}
          ${sizes[size]}
          ${className}
        `}
      >
        {/* Inner slot/groove */}
        <div
          className={`
            ${dark ? "bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" : "bg-[#ccc] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]"}
            ${slotSizes[size]}
          `}
        />
        <span className="leading-tight">{children}</span>
      </button>
    </div>
  );
}
