import { C } from '@/constants';

export function Label({ children, color = C.orange }) {
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-widest"
      style={{ color }}
    >
      {children}
    </span>
  );
}
