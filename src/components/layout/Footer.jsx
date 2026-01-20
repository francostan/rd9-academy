import { C } from '@/constants';
import { Panel, LED } from '@/components/ui';
import { useLanguage } from '@/hooks';

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="mt-8 pb-4">
      <Panel variant="light" className="mx-4 p-3 text-center">
        <LED value="909" size="md" />
        <p className="text-[8px] mt-2 tracking-widest" style={{ color: C.textDark }}>
          {lang === 'es'
            ? 'PRODUCE → GRABA → PINCHA → REPITE'
            : 'PRODUCE → RECORD → DJ → REPEAT'}
        </p>
        <p className="text-[7px] mt-3 tracking-wide opacity-60" style={{ color: C.textDark }}>
          Este es uno de los regalos para nano, con amor tu compa de viaje
        </p>
        <p className="text-[6px] mt-2 tracking-wide opacity-40" style={{ color: C.textDark }}>
          made by{' '}
          <a
            href="https://francostan.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-100 transition-opacity"
          >
            francostan
          </a>
        </p>
      </Panel>
    </footer>
  );
}
