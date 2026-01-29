# Home Assistant React Dashboard

## What This Is

A custom React-based dashboard for Home Assistant, integrated as a Custom Panel. It uses Material UI to provide a responsive interface for controlling smart home entities like lights and scenes.

## Core Value

Provide a modern, type-safe, and performant interface for controlling Home Assistant entities.

## Current Milestone: v2.0 Shadcn Migration

**Goal:** Pivot UI to shadcn/ui and enforce strict stylistic/typing standards.

**Target features:**

- **ESLint Stylistic**: Full formatting control via ESLint, removing Prettier.
- **Strict Typing**: Forbidden type assertions (`@typescript-eslint/consistent-type-assertions: never`).
- **Shadcn/UI**: Modern UI components with unified Dark Theme.

## Requirements

### Validated

- ✓ **Infrastructure Modernization** — Vite 7, Node 22, and ESLint 9 Flat Config — v1.0
- ✓ **Core Framework Upgrade** — React 19 and MUI v7 — v1.0
- ✓ **Type-Safe Data Layer** — HassProvider with strict typing and state isolation — v1.0
- ✓ **Strict TypeScript Migration** — 100% TSX codebase with `strict: true` — v1.0
- ✓ **Modern Layout System** — Grid v2 and CSS Container Queries — v1.0
- ✓ **Modern Mutations** — React 19 Actions and Transitions for service calls — v1.0

### Active

- [ ] **ESLint Stylistic Integration** — Replace Prettier with ESLint Stylistic plugins.
- [ ] **No-Assertion Enforcement** — Error on `as` and `<Type>` assertions, fixing all violations.
- [ ] **Shadcn/UI Foundation** — Initialize shadcn/ui and configure dark theme.
- [ ] **UI Component Migration** — Migrate existing MUI components to shadcn/ui.

### Out of Scope

- **Legacy Support** — No longer supporting Node versions < 22.
- **HA Core Changes** — Modifications to Home Assistant itself.

## Context

- **Tech Stack** — Vite 7, React 19.2.4, MUI v7.3.7, TypeScript 5.7.
- **Architecture** — Custom Element (`react-panel`) bridges HA state to a type-safe React Context (`HassProvider`).
- **Performance** — HMR < 200ms, Build target `esnext`.

## Key Decisions

| Decision                   | Rationale                                                                     | Outcome |
| -------------------------- | ----------------------------------------------------------------------------- | ------- |
| **Vite 7 Migration**       | Instant HMR and modern build pipeline.                                        | ✓ Good  |
| **React 19 & MUI v7**      | Leveraging latest features and ensuring long-term compatibility.              | ✓ Good  |
| **HassProvider Isolation** | Decouples React renders from high-frequency websocket events.                 | ✓ Good  |
| **CSS Container Queries**  | Enables truly responsive cards that adapt to their specific grid slot.        | ✓ Good  |
| **Strict TypeScript**      | Eliminates an entire class of runtime errors in entity state handling.        | ✓ Good  |
| **Cancelled Phase 4**      | Prioritized shipping stable foundation over experimental zero-runtime styles. | ✓ Good  |

---

_Last updated: 2026-01-28 after v1.0 milestone completion_
