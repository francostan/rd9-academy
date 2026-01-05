import { useState, useEffect, useCallback } from "react";
import { C } from "@/constants";
import {
  Header,
  Footer,
  HomeView,
  LevelView,
  PlaygroundView,
} from "@/components";
import { useProgress, LanguageProvider } from "@/hooks";

// Parse hash route: #/ | #/level/5 | #/level/5/2 | #/playground
function parseRoute() {
  const hash = window.location.hash.slice(1) || "/";
  if (hash === "/playground") return { view: "playground" };
  if (hash.startsWith("/level/")) {
    const parts = hash.split("/");
    return {
      view: "level",
      levelId: parseInt(parts[2], 10),
      exerciseIndex: parts[3] ? parseInt(parts[3], 10) : 0,
    };
  }
  return { view: "home" };
}

function AppContent() {
  const [route, setRoute] = useState(parseRoute);
  const { progress, totalExercises, percentage, complete, reset } =
    useProgress();
  const bpm = 133;

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation helper
  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);

  const { view, levelId, exerciseIndex } = route;

  return (
    <div
      className="min-h-screen font-mono text-xs"
      style={{ backgroundColor: C.chassis, color: C.ink }}
    >
      <Header bpm={bpm} pct={percentage} onHomeClick={() => navigate("/")} />

      <main
        className={`mx-auto ${view === "playground" ? "w-full h-screen" : "max-w-3xl"}`}
      >
        {view === "home" && (
          <HomeView
            progress={progress}
            totalExercises={totalExercises}
            onLevelSelect={(id) => navigate(`/level/${id}`)}
            onPlayground={() => navigate("/playground")}
            onReset={reset}
          />
        )}

        {view === "level" && levelId && (
          <LevelView
            levelId={levelId}
            exerciseIndex={exerciseIndex}
            progress={progress}
            onComplete={complete}
            onBack={() => navigate("/")}
            onNavigate={navigate}
          />
        )}

        {view === "playground" && <PlaygroundView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
