import { C } from '@/constants';

const SIZES = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

export function LED({ value, size = 'lg' }) {
  return (
    <span
      className={`font-mono ${SIZES[size]} tracking-wider`}
      style={{
        color: C.red,
        textShadow: `0 0 8px ${C.redGlow}, 0 0 16px ${C.redGlow}50`,
      }}
    >
      {value}
    </span>
  );
}
