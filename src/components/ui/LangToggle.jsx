import { C } from '@/constants';
import { useLanguage } from '@/hooks/useLanguage';

/**
 * Language toggle button - ES/EN switch
 * Styled to match RD-9 hardware aesthetic
 */
export function LangToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      style={{
        background: C.panelDark,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'monospace',
        fontSize: 11,
        fontWeight: 600,
      }}
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span style={{ color: lang === 'es' ? C.orange : C.textMuted }}>ES</span>
      <span style={{ color: C.textMuted }}>/</span>
      <span style={{ color: lang === 'en' ? C.orange : C.textMuted }}>EN</span>
    </button>
  );
}
