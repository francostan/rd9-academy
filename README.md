# RD-9 Academy

Interactive curriculum for learning electronic rhythm production with the Behringer RD-9.

## Stack

- React 18
- Vite 6
- Tailwind CSS 3
- ES Modules

## Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── layout/       # Header, Footer
│   └── views/        # HomeView, LevelView
├── constants/        # Colors, Voices, Levels data
├── hooks/            # Custom hooks (useProgress)
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles + Tailwind
```

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- Step sequencer simulation
- Hardware-inspired UI
- Local storage progress
- Detroit/Chicago/Berlin patterns
- VIRTUAL RD-9

## License

MIT
