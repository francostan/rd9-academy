/**
 * RD9Panel - Bordered panel with floating badge
 * Matches FX, EDIT, MODE, SYNC panel styling from PlaygroundView
 */
export function RD9Panel({ children, label, className = "" }) {
  return (
    <div className={`border border-[#777] rounded-[6px] bg-[#e2e2df] p-3 pt-4 relative ${className}`}>
      {label && (
        <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[#444] text-white text-[8px] font-bold tracking-widest rounded-[2px]">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
