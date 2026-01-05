# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint (js,jsx)
```

## Architecture

Interactive curriculum app for learning electronic rhythm production with Behringer RD-9.

### Key Patterns

- **Path alias**: `@/` → `src/` (configured in vite.config.js)
- **Barrel exports**: Each folder has `index.js` re-exporting its modules
- **Colors**: Use `C` object from `@/constants` (RD-9 hardware palette)
- **Voices**: 11 drum voices defined in `VOICES` constant (BD, SD, LT, MT, HT, RS, CP, CH, OH, CR, RD)
- **Levels**: Curriculum in `LEVELS` array - 10 levels with exercises, each with `check` function for completion validation

### State Flow

- `App.jsx`: Root component, manages view state (home/level) and current level
- `useProgress` hook: Manages curriculum progress in localStorage (`rd9-academy-progress` key)
  - `done[]`: Completed exercise IDs
  - `unlocked[]`: Unlocked level IDs
  - Level auto-unlocks when all exercises in previous level complete

### Component Categories

- `ui/`: Hardware-styled primitives (HWButton, Knob, LED, StepBtn, Panel, Label, ProgressBar)
- `layout/`: Header, Footer
- `views/`: HomeView (level grid), LevelView (exercise content + step sequencer)

### Exercise Types

Exercises have `type` field determining UI: `theory`, `explore`, `knobs`, `pattern`, `filter`, `wave`, `free`, `final`
