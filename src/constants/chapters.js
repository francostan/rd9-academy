import { C } from './colors';

/**
 * RD-9 Academy Chapters
 * Groups levels into thematic chapters
 * Unlock is still level-by-level, chapters are visual grouping only
 */
export const CHAPTERS = [
  {
    id: 1,
    title: { es: 'FUNDAMENTOS', en: 'FOUNDATIONS' },
    sub: { es: 'Antes de la máquina', en: 'Before the machine' },
    color: C.orange,
    levelIds: [1, 2, 3],
  },
  {
    id: 2,
    title: { es: 'TÉCNICA', en: 'TECHNIQUE' },
    sub: { es: 'Construyendo vocabulario', en: 'Building vocabulary' },
    color: C.green,
    levelIds: [4, 5, 6],
  },
  {
    id: 3,
    title: { es: 'RAÍCES', en: 'ROOTS' },
    sub: { es: 'De donde viene el groove', en: 'Where groove comes from' },
    color: '#9d4edd', // purple
    levelIds: [7, 8, 9],
  },
  {
    id: 4,
    title: { es: 'REVOLUCIONES', en: 'REVOLUTIONS' },
    sub: { es: 'Cuatro crisis, cuatro sonidos', en: 'Four crises, four sounds' },
    color: C.red,
    levelIds: [10, 11, 12, 13],
  },
  {
    id: 5,
    title: { es: 'DOMINIO', en: 'MASTERY' },
    sub: { es: 'De estudiante a creador', en: 'From student to creator' },
    color: C.yellow,
    levelIds: [14, 15, 16],
  },
];

/**
 * Get chapter for a given level ID
 */
export function getChapterForLevel(levelId) {
  return CHAPTERS.find(ch => ch.levelIds.includes(levelId));
}

/**
 * Get all levels grouped by chapter
 */
export function getLevelsByChapter(levels) {
  return CHAPTERS.map(chapter => ({
    ...chapter,
    levels: chapter.levelIds.map(id => levels.find(l => l.id === id)).filter(Boolean),
  }));
}
