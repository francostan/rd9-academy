import { C } from '@/constants';
import { Panel, LED } from '@/components/ui';
import { useLanguage } from '@/hooks';

export function Footer() {
  const { lang } = useLanguage();

  // tu compa de viaje
  return (
    <footer className="mt-8 pb-4" title="tu compa de viaje">
      <Panel variant="light" className="mx-4 p-3 text-center">
        <LED
          value="909"
          size="md"
          onClick={() => console.log('%c🌍 tu compa de viaje', 'color: #33ccff; font-size: 14px; font-weight: bold;')}
        />
        <p className="text-[8px] mt-2 tracking-widest" style={{ color: C.textDark }}>
          {lang === 'es'
            ? 'PRODUCE → GRABA → PINCHA → REPITE'
            : 'PRODUCE → RECORD → DJ → REPEAT'}
        </p>
      </Panel>
    </footer>
  );
}
