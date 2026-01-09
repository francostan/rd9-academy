import { useRef, useCallback, useState, useEffect } from 'react';
import { C } from '@/constants';

// Hook to detect xl breakpoint (1280px)
function useIsXl() {
  const [isXl, setIsXl] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const handler = (e) => setIsXl(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isXl;
}

export function Knob({ label, value = 50, size = 40, sizeXl, onChange, min = 0, max = 100, showValue = false }) {
  const isXl = useIsXl();
  const actualSize = sizeXl && isXl ? sizeXl : size;
  const rot = ((value - min) / (max - min)) * 270 - 135;
  const knobRef = useRef(null);
  const inputRef = useRef(null);
  const dragRef = useRef({ startY: 0, startValue: 0 });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const interactive = typeof onChange === 'function';

  const handlePointerDown = useCallback(
    (e) => {
      if (!interactive) return;
      e.preventDefault();

      dragRef.current = { startY: e.clientY, startValue: value };

      const handlePointerMove = (moveEvent) => {
        const delta = dragRef.current.startY - moveEvent.clientY;
        const sensitivity = (max - min) / 200;
        const newValue = Math.min(
          max,
          Math.max(min, dragRef.current.startValue + delta * sensitivity)
        );
        onChange(Math.round(newValue));
      };

      const handlePointerUp = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [interactive, value, onChange, min, max]
  );

  const handleValueClick = () => {
    if (!interactive) return;
    setInputValue(value);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleInputBlur = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)));
    }
    setEditing(false);
  };

  // Generate tick marks
  const tickCount = 16;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (i * 360) / tickCount;
    return angle;
  });

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Knob with Tick Marks */}
      <div className="relative" style={{ width: actualSize + 8, height: actualSize + 8 }}>
        {/* Tick Marks Ring */}
        <svg
          className="absolute inset-0"
          width={actualSize + 8}
          height={actualSize + 8}
          viewBox={`0 0 ${actualSize + 8} ${actualSize + 8}`}
        >
          {ticks.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = (actualSize + 8) / 2;
            const cy = (actualSize + 8) / 2;
            const innerR = actualSize / 2 - 1;
            const outerR = actualSize / 2 + 3;
            const x1 = cx + innerR * Math.cos(rad);
            const y1 = cy + innerR * Math.sin(rad);
            const x2 = cx + outerR * Math.cos(rad);
            const y2 = cy + outerR * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Knob Body */}
        <div
          ref={knobRef}
          className={`rounded-full absolute ${interactive ? 'cursor-ns-resize' : ''}`}
          style={{
            width: actualSize,
            height: actualSize,
            top: 4,
            left: 4,
            background: `linear-gradient(135deg, ${C.knobBody} 0%, #000 100%)`,
            boxShadow: `
              0 4px 6px ${C.shadowDark},
              inset 0 1px 1px rgba(255,255,255,0.1)
            `,
            touchAction: 'none',
          }}
          onPointerDown={handlePointerDown}
        >
          {/* Top Face Detail */}
          <div
            className="absolute inset-[10%] rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${C.knobTop} 0%, #000 100%)`,
            }}
          />

          {/* Pointer */}
          <div
            className="absolute left-1/2"
            style={{
              width: 3,
              height: actualSize * 0.35,
              top: actualSize * 0.15,
              backgroundColor: C.knobPointer,
              borderRadius: 1,
              transformOrigin: `50% ${actualSize * 0.35}px`,
              transform: `translateX(-50%) rotate(${rot}deg)`,
              boxShadow: '0 0 2px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      </div>

      {/* Label & Value */}
      <div className="flex flex-col items-center leading-none">
        {label && (
          <span 
            className="text-[9px] font-bold tracking-wider mb-0.5" 
            style={{ color: C.ink, fontFamily: 'Saira, sans-serif' }}
          >
            {label}
          </span>
        )}
        
        {interactive && (showValue || editing) && (
          editing ? (
             <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleInputBlur}
              className="w-8 text-center text-[9px] font-mono bg-transparent outline-none border-b"
              style={{ color: C.ink, borderColor: C.orange }}
            />
          ) : (
            <span
              className="text-[9px] font-mono cursor-pointer hover:text-orange-600"
              style={{ color: C.textMuted }}
              onClick={handleValueClick}
            >
              {Math.round(value)}
            </span>
          )
        )}
      </div>
    </div>
  );
}