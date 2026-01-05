import { C } from '@/constants';

export function Panel({ children, variant = 'chassis', className = '', style = {} }) {
  let bg = C.chassis;
  let text = C.ink;
  let border = 'none';

  if (variant === 'dark') {
    bg = C.panelDark;
    text = C.textLight;
  } else if (variant === 'mid') {
    bg = C.panelMid;
    text = C.textLight;
  } else if (variant === 'inset') {
    bg = C.panelInset;
    text = C.textMuted;
    border = `1px solid ${C.border}`;
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: bg,
        color: text,
        border: border,
        ...style
      }}
    >
      {children}
    </div>
  );
}