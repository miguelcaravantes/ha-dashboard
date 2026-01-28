# Project Research Summary

**Project:** React Home Assistant Dashboard
**Domain:** Smart Home / IoT Dashboard
**Researched:** Tue Jan 27 2026
**Confidence:** HIGH

## Executive Summary

This project involves building a **React-based Custom Panel** for Home Assistant, designed to run directly within the Home Assistant frontend environment. Unlike a standalone web app, this "Custom Panel" architecture requires wrapping the React application in a Web Component and relying on property injection for data (specifically the `hass` object) rather than managing its own WebSocket connections. This approach ensures seamless integration with the host environment's authentication and state management.

The recommended approach leverages a modern "Standard 2025" stack: **React 19**, **MUI v6**, and **Strict TypeScript**. A key architectural pattern is the use of a **Vanilla JS Store** connected to React via `useSyncExternalStore` to handle the frequent, massive state updates from Home Assistant without causing unnecessary re-renders—a critical optimization for dashboard performance. The build system shifts from legacy CRA to **Vite 7** for superior performance and developer experience.

Key risks center on the migration to strict TypeScript and MUI v6. The "Implicit Any" trap during migration can paralyze development if not managed with an incremental strategy. Additionally, MUI v6 introduces breaking changes to the Grid system (now `Grid2`) and theming engine (CSS variables) that require careful handling to avoid layout regressions.

## Key Findings

### Recommended Stack

**Core technologies:**

- **React 19 / Vite 7:** The standard modern web foundation. React 19 brings compiler improvements, while Vite replaces the deprecated Create React App.
- **MUI v6:** The required UI framework. Version 6 offers stable "Standard 2025" features like CSS variables and `Grid2`, replacing legacy patterns.
- **TypeScript 5.9+:** Configured with `strict: true` to match Home Assistant's high standards for type safety.
- **home-assistant-js-websocket:** The mandatory library for typing and handling Home Assistant connection objects.
- **Zustand:** Recommended for global client-side state management due to its simplicity compared to Redux.

### Expected Features

**Must have (table stakes):**

- **Strict TypeScript:** A fully typed codebase (`noImplicitAny`) to prevent runtime errors.
- **Native Dark Mode:** Seamless integration with HA's dark mode using MUI's `colorSchemes`.
- **CSS Theme Variables:** Modern theming that eliminates SSR flickering and simplifies style overrides.

**Should have (competitive):**

- **Container Queries:** For responsive dashboard cards that adapt to their container size, not just the viewport.
- **Standardized Gap:** Using `Grid2`'s CSS `gap` property for cleaner layouts.

**Defer (v2+):**

- **Pigment CSS:** A zero-runtime CSS-in-JS solution. While powerful, it adds significant build complexity that may distract from the primary migration goals.

### Architecture Approach

The application follows a **Custom Panel Architecture** where the React root is wrapped in a Web Component (`<react-panel>`).

**Major components:**

1.  **Web Component Wrapper:** Receives the `hass` property from Home Assistant and pushes it to a central store.
2.  **HassStore:** A vanilla JS observer that holds the current state.
3.  **useHass Hook:** Connects components to the store using `useSyncExternalStore` to prevent unnecessary re-renders.
4.  **Feature Modules:** Self-contained directories (`src/features/LightControl`) containing smart components and logic.

### Critical Pitfalls

1.  **The "Implicit Any" Tsunami:** Trying to migrate everything to strict TS at once leads to burnout. **Avoid:** Use "Leaf-up" migration and `allowJs: true` initially.
2.  **Context "Empty Object" Trap:** Initializing Context with `{}` causes type errors in strict mode. **Avoid:** Use `null` as initial value and guard with a custom hook.
3.  **Grid v2 Prop Mismatch:** MUI v6 `Grid2` uses different props (`size` vs `xs`) than v5. **Avoid:** Audit all Grid usage and use codemods.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Infrastructure

**Rationale:** A stable build and type system is required before porting any UI. The architecture relies on the correct implementation of the `hass` injection which must be proven first.
**Delivers:** configured Vite setup, Strict TS config, basic Web Component wrapper, and the `useHass` hook infrastructure.
**Addresses:** Strict TypeScript Config, connection to Home Assistant.
**Avoids:** "Implicit Any" Tsunami (by setting up config correctly from the start).

### Phase 2: Core UI System

**Rationale:** Feature development requires the design system to be in place. MUI v6 setup is complex and should be isolated from feature logic.
**Delivers:** Theme provider with CSS variables, Dark Mode support, Layout shell, and atomic UI components (Buttons, Cards).
**Uses:** MUI v6, CSS Theme Variables.
**Avoids:** Theme Object Mutation, Grid v2 Prop Mismatch.

### Phase 3: Dashboard Feature Migration

**Rationale:** With the foundation and UI system ready, features can be ported one by one into the new `src/features/` structure.
**Delivers:** Functional dashboard features (Entity Cards, Logbooks, Controls) connected to real data.
**Implements:** Smart/Dumb component pattern, Feature-based organization.

### Phase 4: Optimization & Polish

**Rationale:** Performance tuning and advanced features should only occur after the core value is delivered and stable.
**Delivers:** Code splitting, potentially Pigment CSS (if needed), detailed accessibility/testing polish.

### Phase Ordering Rationale

- **Foundation first:** We cannot build React components without the Web Component wrapper and `hass` injection mechanism working.
- **UI System second:** We need the MUI v6 theme and `Grid2` patterns defined so feature developers don't use legacy v5 patterns.
- **Features parallel:** Once Phase 2 is done, multiple features could potentially be built in parallel.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 4 (Optimization):** Pigment CSS integration with Vite in a Custom Panel context might be tricky.

Phases with standard patterns (skip research-phase):

- **Phase 1 (Foundation):** Standard Vite + TS setup.
- **Phase 2 (UI System):** Well-documented MUI v6 patterns.

## Confidence Assessment

| Area         | Confidence | Notes                                                                             |
| ------------ | ---------- | --------------------------------------------------------------------------------- |
| Stack        | HIGH       | Verified versions (React 19, MUI v6) against official docs and HA standards.      |
| Features     | HIGH       | Clear distinction between stable features and bleeding edge (Pigment CSS).        |
| Architecture | HIGH       | The "Web Component Wrapper" pattern is the standard for HA Custom Panels.         |
| Pitfalls     | HIGH       | Specific, code-level pitfalls identified from experience with similar migrations. |

**Overall confidence:** HIGH

### Gaps to Address

- **Custom Panel Entry:** Exact details of `vite-plugin-singlefile` or similar bundling strategy for the Custom Panel entry point need to be verified during Phase 1 implementation.

## Sources

### Primary (HIGH confidence)

- **MUI Releases:** Verified v6.5.0 and v7.3.7 status.
- **Home Assistant Frontend:** Verified `home-assistant-js-websocket` v9.6.0 usage.
- **MUI v6 Upgrade Guide:** Source of migration steps and pitfalls.

### Secondary (MEDIUM confidence)

- **Project Codebase:** Analysis of `src/index.jsx` and `App.jsx` confirmed current legacy patterns.

---

_Research completed: Tue Jan 27 2026_
_Ready for roadmap: yes_
