import { useState, useEffect } from 'react';
import { LEVELS } from '@/constants';

const STORAGE_KEY = 'rd9-academy-progress';
const DEFAULT_PROGRESS = { done: [], unlocked: [1] };

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

    if (currentLevelId) {
      const level = LEVELS.find((l) => l.id === currentLevelId);
      const levelComplete = level?.exercises.every((e) => done.includes(e.id));
      const nextLevelExists = currentLevelId < LEVELS.length;
      const nextNotUnlocked = !unlocked.includes(currentLevelId + 1);

      if (levelComplete && nextLevelExists && nextNotUnlocked) {
        unlocked.push(currentLevelId + 1);
      }
    }

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
