import { useCallback } from 'react';

const STORAGE_KEY = 'rd9-playground-patterns';
const MAX_SLOTS = 16;

// Get all patterns from storage
const getPatterns = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save patterns to storage
const savePatterns = (patterns) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patterns));
  } catch (err) {
    console.error('Failed to save patterns:', err);
  }
};

export function usePatternStorage() {
  // Save pattern to a slot
  const save = useCallback((slot, data) => {
    if (slot < 1 || slot > MAX_SLOTS) return false;

    const patterns = getPatterns();
    patterns[slot] = {
      ...data,
      savedAt: Date.now(),
    };
    savePatterns(patterns);
    return true;
  }, []);

  // Load pattern from a slot
  const load = useCallback((slot) => {
    if (slot < 1 || slot > MAX_SLOTS) return null;

    const patterns = getPatterns();
    return patterns[slot] || null;
  }, []);

  // Clear a slot
  const clear = useCallback((slot) => {
    if (slot < 1 || slot > MAX_SLOTS) return false;

    const patterns = getPatterns();
    delete patterns[slot];
    savePatterns(patterns);
    return true;
  }, []);

  // Get all saved slots
  const getSlots = useCallback(() => {
    const patterns = getPatterns();
    return Array.from({ length: MAX_SLOTS }, (_, i) => ({
      slot: i + 1,
      hasData: !!patterns[i + 1],
      savedAt: patterns[i + 1]?.savedAt || null,
    }));
  }, []);

  return {
    save,
    load,
    clear,
    getSlots,
    MAX_SLOTS,
  };
}
