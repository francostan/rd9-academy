import { C } from '@/constants';

// Step Button matching PlaygroundView StepKey style
export function StepBtn({ on, hint, current, onClick }) {
  return (
    <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
      {/* Bar LED Indicator - matches PlaygroundView */}
      <div
        className={`
          w-3 h-1 xl:w-4 xl:h-1.5 rounded-[1px] transition-all duration-75 border border-black/20
          ${on ? 'bg-[#33cc33] shadow-[0_0_6px_#33cc33]' :
            current ? 'bg-[#ff3333] shadow-[0_0_8px_#ff0000]' :
            'bg-[#3a2a2a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]'}
        `}
      />

      {/* Physical Key - clean, no number */}
      <button
        onClick={onClick}
        className={`
          w-[32px] h-[40px] xl:w-[36px] xl:h-[44px] rounded-[3px] transition-all duration-75
          bg-[#e8e8e0] border border-[#bbb]
          shadow-[0_3px_0_#999,0_4px_4px_rgba(0,0,0,0.2)]
          active:shadow-[0_1px_0_#999] active:translate-y-[2px]
          flex items-start justify-center pt-1
          ${on ? 'bg-[#d8d8d0]' : ''}
        `}
      >
        {/* Inner slot/groove like PlaygroundView */}
        <div className="w-[14px] h-[5px] xl:w-[18px] xl:h-[6px] rounded-[2px] bg-[#d0d0c8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

        {/* Hint dot for target patterns */}
        {hint && !on && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 opacity-60" />
        )}
      </button>
    </div>
  );
}