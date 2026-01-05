import { C } from '@/constants';

const SIZES = {
  sm: 'px-2 py-1 text-[10px] h-7',
  md: 'px-3 py-1.5 text-xs h-9',
  lg: 'px-4 py-2 text-sm h-11',
};

export function HWButton({ 
  children, 
  onClick, 
  disabled, 
  active, 
  color, // LED/Accent color
  variant = 'dark', // 'white', 'grey', 'dark'
  size = 'md',
  className = ''
}) {
  // Determine base colors based on variant (mimicking the RD-9 keys)
  let baseColor, textColor, borderColor;
  
  if (variant === 'white') {
    baseColor = C.keyWhite;
    textColor = C.ink;
    borderColor = '#bzbbb5'; 
  } else if (variant === 'grey') {
    baseColor = C.keyGrey;
    textColor = '#fff';
    borderColor = '#6b7280';
  } else {
    // Default / Dark function buttons
    baseColor = C.keyDark;
    textColor = C.textLight;
    borderColor = '#171717';
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Optional LED Indicator above button (typical for RD-9) */}
      {active !== undefined && (
        <div 
          className="w-3 h-1.5 rounded-sm transition-all duration-100"
          style={{ 
            backgroundColor: active ? (color || C.red) : '#4a4a4a',
            boxShadow: active ? `0 0 6px ${color || C.red}` : 'none'
          }}
        />
      )}

      <button
        onClick={onClick}
        disabled={disabled}
        className={`${SIZES[size]} ${className} relative font-bold font-sans uppercase tracking-wider transition-all active:translate-y-0.5`}
        style={{
          backgroundColor: baseColor,
          color: textColor,
          // The "Chicklet" 3D Key look
          borderBottom: `4px solid ${borderColor}`,
          borderRadius: '4px 4px 6px 6px',
          boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
          transform: active && !color ? 'translateY(2px)' : 'none', // Physical press effect
        }}
      >
        {children}
      </button>
    </div>
  );
}