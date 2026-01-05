import { C, LEVELS, getLevelsByChapter } from "@/constants";
import { LED, RD9Panel } from "@/components/ui";
import { useLanguage } from "@/hooks";

export function HomeView({
  progress,
  totalExercises,
  onLevelSelect,
  onPlayground,
  onReset,
}) {
  const { t, lang } = useLanguage();
  const chapterGroups = getLevelsByChapter(LEVELS);

  return (
    <div className="px-4 pt-6 pb-4 max-w-2xl mx-auto">
      {/* Hero LED Display */}
      <div className="text-center mb-6">
        <div className="inline-block px-6 py-4 bg-black border-2 border-[#333] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
          <LED value="133.0" size="xl" />
        </div>
        <p
          className="mt-3 text-[9px] tracking-[0.2em] uppercase"
          style={{ color: C.textMuted }}
        >
          {lang === "es" ? "De Detroit a Berlin" : "From Detroit to Berlin"}
        </p>
      </div>

      {/* Levels Panel */}
      <RD9Panel label="LEVELS" className="mb-4">
        <div className="space-y-5 mt-2">
          {chapterGroups.map((chapter) => (
            <div key={chapter.id}>
              {/* Chapter Badge */}
              <div className="mb-2">
                <span className="inline-block px-2 py-0.5 bg-[#444] text-white text-[7px] font-bold tracking-widest rounded-[2px]">
                  {t(chapter.title)}
                </span>
              </div>

              {/* Level Cards */}
              <div className="space-y-2">
                {chapter.levels.map((level) => {
                  const unlocked = progress.unlocked.includes(level.id);
                  const done = level.exercises.filter((e) =>
                    progress.done.includes(e.id),
                  ).length;
                  const complete = done === level.exercises.length;

                  return (
                    <button
                      key={level.id}
                      onClick={() => unlocked && onLevelSelect(level.id)}
                      disabled={!unlocked}
                      className={`w-full p-0 text-left transition-all ${unlocked ? "" : "opacity-30 cursor-not-allowed"}`}
                    >
                      <div
                        className={`border-2 p-3 ${unlocked ? "bg-[#f2f2eb] border-[#888] shadow-[0_3px_0_#666,0_4px_4px_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_#666] active:translate-y-[2px]" : "bg-[#ccc] border-[#999]"}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-3 h-1 mb-1 ${complete ? "bg-[#33cc33] shadow-[0_0_6px_#33cc33]" : unlocked ? "bg-[#ff5f00] shadow-[0_0_4px_#ff5f00]" : "bg-[#888]"}`}
                              />
                              <div
                                className={`w-10 h-10 flex flex-col items-center justify-start pt-1 border-2 ${unlocked ? "bg-[#333] border-[#555] shadow-[0_2px_0_#111]" : "bg-[#666] border-[#555]"}`}
                              >
                                <div className="w-5 h-1.5 bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] mb-1" />
                                <span
                                  className="text-[11px] font-bold"
                                  style={{
                                    color: unlocked ? C.orange : "#999",
                                  }}
                                >
                                  {level.n}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div
                                className="text-[11px] font-bold uppercase tracking-wide"
                                style={{ color: unlocked ? C.ink : "#666" }}
                              >
                                {t(level.title)}
                              </div>
                              <div
                                className="text-[9px] uppercase tracking-wider"
                                style={{ color: "#888" }}
                              >
                                {t(level.sub)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className="text-[10px] font-mono"
                              style={{ color: unlocked ? C.ink : "#888" }}
                            >
                              {done}/{level.exercises.length}
                            </span>
                            <span
                              className="text-[14px]"
                              style={{
                                color: complete
                                  ? "#33cc33"
                                  : unlocked
                                    ? C.orange
                                    : "#888",
                              }}
                            >
                              {complete ? "●" : unlocked ? "▸" : "○"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </RD9Panel>

      {/* Virtual RD-9 Panel */}
      <RD9Panel label="VIRTUAL RD-9" className="mb-4">
        <button onClick={onPlayground} className="w-full group">
          <div className="border-2 border-[#888] bg-[#f2f2eb] p-4 shadow-[0_3px_0_#666,0_4px_4px_rgba(0,0,0,0.3)] group-active:shadow-[0_1px_0_#666] group-active:translate-y-[2px] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-1 mb-1 bg-[#ff5f00] shadow-[0_0_6px_#ff5f00]" />
                  <div className="w-12 h-12 flex flex-col items-center justify-start pt-1.5 border-2 bg-[#333] border-[#555] shadow-[0_2px_0_#111]">
                    <div className="w-6 h-1.5 bg-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] mb-1" />
                    <span className="text-[16px]" style={{ color: C.orange }}>
                      ▶
                    </span>
                  </div>
                </div>
                <div>
                  <div
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: C.orange }}
                  >
                    {lang === "es" ? "PROBAR AQUÍ" : "TRY IT HERE"}
                  </div>
                  <div
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: "#888" }}
                  >
                    {lang === "es" ? "Secuenciador completo" : "Full sequencer"}
                  </div>
                </div>
              </div>
              <span className="text-[18px]" style={{ color: C.orange }}>
                ▸
              </span>
            </div>
          </div>
        </button>
      </RD9Panel>

      {/* Reset */}
      <div className="text-center mt-4">
        <button
          onClick={onReset}
          className="text-[8px] uppercase tracking-widest opacity-30 hover:opacity-60 transition-opacity"
          style={{ color: "#666" }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}
