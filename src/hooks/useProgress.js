import { useState, useEffect } from 'react';
import { LEVELS } from '@/constants';

const STORAGE_KEY = 'rd9-academy-progress';
const DEFAULT_PROGRESS = { done: [], unlocked: Array.from({ length: 16 }, (_, i) => i + 1) };

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage unavailable
    }
  }, [progress]);

  const totalExercises = LEVELS.reduce((sum, level) => sum + level.exercises.length, 0);
  const percentage = Math.round((progress.done.length / totalExercises) * 100);

  const complete = (exerciseId, currentLevelId) => {
    if (progress.done.includes(exerciseId)) return;

    const done = [...progress.done, exerciseId];
    let unlocked = [...progress.unlocked];

    setProgress({ done, unlocked });
  };

  const reset = () => {
    if (confirm('¿Resetear progreso?')) {
      setProgress(DEFAULT_PROGRESS);
    }
  };

  return {
    progress,
    totalExercises,
    percentage,
    complete,
    reset,
  };
}
