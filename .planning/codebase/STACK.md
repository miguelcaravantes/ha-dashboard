# Technology Stack

**Analysis Date:** 2026-01-27

## Languages

**Primary:**

- JavaScript (ESNext) - Entire codebase (source in `src/`)
- JSX - UI components

**Secondary:**

- HTML - Entry point only (implied via Vite)

## Runtime

**Environment:**

- Browser (Hosted within Home Assistant frontend)

**Package Manager:**

- Yarn [Version unknown, but `yarn.lock` present]
- Lockfile: present (`yarn.lock`)

## Frameworks

**Core:**

- React 18.2.0 - UI library
- Vite 6.0.5 - Build tool and dev server

**Testing:**

- Not detected (No test runner found in `package.json`)

**Build/Dev:**

- Vite 6.0.5 - Bundler
- ESLint 9.17.0 - Linting
- Prettier 2.7.1 - Formatting

## Key Dependencies

**UI Components:**

- @mui/material 5.10.0 - Component library
- @emotion/react & @emotion/styled 11.10.0 - Styling engine
- mdi-material-ui 7.5.0 - Icons
- @fontsource/roboto 4.5.8 - Typography

**State & Utils:**

- use-sync-external-store 1.2.0 - Subscribing to Home Assistant state
- awesome-debounce-promise 2.1.0 - Handling async actions
- hex-rgb 5.0.0 - Color manipulation

## Configuration

**Environment:**

- No `.env` files detected
- Configuration is largely static or passed via props from Home Assistant

**Build:**

- `vite.config.ts` - Vite configuration
- `eslint.config.js` - ESLint configuration (Flat config)
- `.prettierrc.json` - Prettier configuration

## Platform Requirements

**Development:**

- Node.js (for building)
- Yarn

**Production:**

- Home Assistant instance (runs as a custom panel)
- Browser environment

---

_Stack analysis: 2026-01-27_
