import { C } from '@/constants';
import { Panel, LED, ProgressBar, LangToggle } from '@/components/ui';

export function Header({ bpm, pct, onHomeClick }) {
  return (
    <header className="sticky top-0 z-50">
      <Panel variant="light" className="px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-3 hover:opacity-80"
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: C.red, boxShadow: `0 0 6px ${C.redGlow}` }}
            />
            <span className="tracking-widest text-[11px]" style={{ color: C.panelDark }}>
              RD-9 ACADEMY
            </span>
          </button>
          <div className="flex items-center gap-4">
            <LangToggle />
            <span className="text-[10px]" style={{ color: C.textDark }}>
              {pct}%
            </span>
            <div className="px-2 py-1" style={{ backgroundColor: C.panelDark }}>
              <LED value={bpm + '.0'} size="sm" />
            </div>
          </div>
        </div>
      </Panel>
      <ProgressBar value={pct} />
    </header>
  );
}
