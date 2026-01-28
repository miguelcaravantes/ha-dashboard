# Home Assistant React Dashboard

## What This Is

A custom React-based dashboard for Home Assistant, integrated as a Custom Panel. It uses Material UI to provide a responsive interface for controlling smart home entities like lights and scenes.

## Core Value

Provide a modern, type-safe, and performant interface for controlling Home Assistant entities.

## Current Milestone: v1.0 Foundation & Modernization

**Goal:** Establish modern stack (Vite 7, React 19, Strict TS, MUI v6) and migrate core infrastructure.

**Target features:**

- **Strict TypeScript**: Type-safe codebase with `home-assistant-js-websocket` types.
- **MUI v7 System**: New theming engine with CSS variables and Grid2.
- **Modern Build**: Vite 7 replacing legacy build tooling.
- **Web Component Wrapper**: Robust `hass` property injection and state management.

## Requirements

### Validated

- ✓ **Custom Panel Integration** — Wraps React app in a Web Component for HA integration
- ✓ **State Injection** — Receives `hass` object updates from host
- ✓ **Entity Management** — `useEntity` hook for accessing entity state
- ✓ **Dashboard Layout** — Grid-based layout for displaying entity cards
- ✓ **Light Control** — Detailed view for controlling light attributes (brightness, color)
- ✓ **Theming** — Dark mode support using MUI ThemeProvider

### Active

- [ ] **TypeScript Migration** — Convert all `.js/.jsx` files to `.ts/.tsx`
- [ ] **Strict Configuration** — Enable `strict: true` in `tsconfig.json`
- [ ] **MUI Upgrade** — Upgrade `@mui/material` and dependencies to v7
- [ ] **Hass Typing** — Implement standard library types for `hass` object
- [ ] **Linting & Formatting** — Update ESLint/Prettier for TypeScript support

### Out of Scope

- **New Features** — Adding new cards or functionality (focus is on refactor)
- **HA Core Changes** — Modifications to Home Assistant itself
- **Pigment CSS** — Deferred to v2 (optimization phase)

## Context

- **Brownfield Project** — Existing working React application.
- **Architecture** — Custom Element (`react-panel`) bridges HA state to React context.
- **Tech Stack** — Vite, React 18, MUI v5 (target v6).
- **Migration Strategy** — "Big Bang" migration (small codebase allow single-pass conversion).

## Constraints

- **Strict Mode** — TypeScript must be configured with `strict: true`.
- **MUI v7** — Must use the latest version of Material UI (v7).
- **Type Safety** — No explicit `any` types in final codebase.

## Key Decisions

| Decision                | Rationale                                                                     | Outcome   |
| ----------------------- | ----------------------------------------------------------------------------- | --------- |
| **Big Bang Migration**  | Small codebase (8 files) allows for immediate full conversion.                | — Pending |
| **Standard Hass Types** | Using community/standard libraries avoids maintenance burden of manual types. | — Pending |
| **MUI v7**              | Keeping UI library current ensures long-term support and features.            | — Pending |

---

_Last updated: 2026-01-27 after v1.0 start_
