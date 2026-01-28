# Project Research Summary

**Project:** React Home Assistant Dashboard - Modernization
**Domain:** Smart Home / Frontend Engineering
**Researched:** Jan 27, 2026
**Confidence:** HIGH

## Executive Summary

The React Home Assistant Dashboard project is a modernization effort to upgrade an existing dashboard to a state-of-the-art stack. Research indicates a "Micro-Frontend" architecture where the React application runs as a custom web element (`<react-panel>`) injected into Home Assistant. This approach leverages the parent application's authentication and WebSocket connection while providing a modern development environment.

The recommended stack is a significant leap forward, adopting Vite 7, React 19, and MUI v6, underpinned by strict TypeScript. This combination offers superior developer experience (instant HMR) and runtime performance (React Compiler, no shadow DOM overhead). The strategy prioritizes a "Leaf-up" migration to Strict TypeScript to prevent regressions and improve stability.

Key risks include the "Implicit Any" avalanche when enabling strict mode and version compatibility issues with Node.js and legacy packages like `mdi-material-ui`. Mitigation involves a phased migration: upgrading infrastructure first, then core libraries, and finally converting feature components incrementally while maintaining a working state.

## Key Findings

### Recommended Stack

The research prescribes a complete overhaul of the build and runtime environment to align with 2026 standards. The focus is on strict type safety and build performance.

**Core technologies:**
- **Vite 7**: Build Tool — Replaces legacy Webpack/Vite 6 for instant HMR and strict TS support.
- **React 19**: UI Library — Enables concurrent rendering features and the new React Compiler.
- **MUI v6**: Component Library — Improved styling engine and "Grid v2" for responsive layouts.
- **TypeScript 5.7+**: Language — Critical for "Strict Mode" to prevent runtime errors with HA entities.

### Expected Features

**Must have (table stakes):**
- **Strict Type Safety** — Compile-time validation of Home Assistant entities to prevent "white screens of death."
- **Instant HMR** — Sub-100ms updates during development.
- **CSS Variables Theming** — Instant light/dark mode switching without React re-renders.
- **Responsive Grid v2** — Standardized layout component replacing legacy Grid.

**Should have (competitive):**
- **React Actions** — Modern state handling for mutations (toggling lights).
- **Typed Entity Hooks** — `useEntity('light.x')` with autocomplete.
- **React Compiler** — Automatic memoization for performance.

**Defer (v2+):**
- **Zero-Runtime Styles (Pigment CSS)** — Deferred to avoid complexity during initial migration.

### Architecture Approach

The application functions as a Micro-Frontend injected into Home Assistant via a Custom Web Element.

**Major components:**
1. **`<react-panel>` (Web Component)** — Entry point that receives the `hass` prop from Home Assistant.
2. **`hassStore` (Singleton)** — A vanilla observable store that holds the global `hass` object, avoiding prop drilling.
3. **`useHass` (Hook)** — Connects React components to the store using `useSyncExternalStore` for efficient updates.

### Critical Pitfalls

1. **Implicit Any Avalanche** — Turning on `strict: true` globally breaks the build. **Avoid** by using `allowJs: true` and migrating file-by-file ("leaf-up" strategy).
2. **Vite 7 Node Lockout** — Vite 7 requires Node 20.19+ or 22.12+. **Avoid** by upgrading CI/Dev environment first.
3. **React 19 Ref Callbacks** — Implicit returns in ref callbacks cause TS errors. **Avoid** by fixing these patterns before enabling strict mode.
4. **MUI Grid v2 Conflicts** — Mixing legacy `Grid` props with MUI v6 breaks layouts. **Avoid** by using codemods and auditing usage.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Infrastructure Foundation
**Rationale:** The new stack requires a compatible runtime (Node) and build system (Vite 7) before any code changes can occur.
**Delivers:** A working "Hello World" build with Vite 7 and TypeScript configuration in place (but loose).
**Addresses:** Instant HMR, Vite 7 support.
**Avoids:** Node.js Version Lockout.

### Phase 2: Core Modernization
**Rationale:** The "God Object" (`hass` prop) handling needs to be modernized and typed before feature components can use it safely.
**Delivers:** Upgraded React 19 / MUI v6 dependencies, typed `hassStore`, and a modernized `index.tsx` entry point.
**Uses:** React 19, MUI v6, `home-assistant-types`.
**Implements:** `hassStore` singleton pattern.

### Phase 3: Component Migration (Leaf-Up)
**Rationale:** Feature components must be migrated incrementally to Strict TS to avoid the "Avalanche" pitfall.
**Delivers:** Feature components converted to `.tsx` one by one, with proper entity typing and MUI v6 components.
**Addresses:** Strict Type Safety, Responsive Grid v2.
**Avoids:** Implicit Any Avalanche, Grid v2 Conflicts.

### Phase 4: Optimization & Cleanup
**Rationale:** Once the codebase is fully typed and modern, we can enable advanced features and remove dead code.
**Delivers:** Enabled React Compiler, removed legacy libs (`mdi-material-ui`, `awesome-debounce-promise`), strict linting.
**Addresses:** Performance differentiators.

### Phase Ordering Rationale

- **Infrastructure First:** You can't run Vite 7 without the right Node version.
- **Core Second:** You can't type check feature components if the core `hass` object types aren't defined.
- **Migration Third:** Doing this incrementally prevents a "broken build" state that lasts for weeks.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Component Migration):** Needs specific investigation into complex custom cards that might rely on deprecated MUI v5 features or weird `hass` object structures.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Infrastructure):** Standard Vite/TS setup.
- **Phase 2 (Core):** Standard library upgrades documented in release notes.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official docs for React 19, Vite 7, and MUI v6 are clear. |
| Features | HIGH | Table stakes are well-defined by modern standards. |
| Architecture | HIGH | The Micro-Frontend pattern is standard for HA dashboards. |
| Pitfalls | HIGH | Risks are well-documented in migration guides. |

**Overall confidence:** HIGH

### Gaps to Address

- **Community Icons:** The mapping from `mdi-material-ui` to `@mui/icons-material` might not be 1:1. Some icons might be missing and require `@mdi/js`.
- **Theme Adaptation:** Exact mechanism for syncing HA theme (light/dark) to MUI theme needs verification during Phase 2.

## Sources

### Primary (HIGH confidence)
- **Vite 7 Roadmap** — Verified Node.js requirements.
- **React 19 Upgrade Guide** — Verified Ref callback changes and Compiler features.
- **MUI v6 Migration Guide** — Verified Grid v2 and styling changes.

### Secondary (MEDIUM confidence)
- **Home Assistant Frontend Repo** — Logic for Custom Panel injection.

---
*Research completed: Jan 27, 2026*
*Ready for roadmap: yes*
