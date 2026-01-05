import { C } from '@/constants';

export function ProgressBar({ value, color = C.orange }) {
  return (
    <div className="h-1" style={{ backgroundColor: C.panelMid }}>
      <div
        className="h-full transition-all"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}
