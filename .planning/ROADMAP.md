# Project Roadmap

**Milestone:** v1.0 Foundation & Modernization
**Focus:** Infrastructure, Type Safety, and Performance
**Status:** Planning Complete

## Overview

This roadmap executes the "Big Bang" modernization of the Home Assistant React Dashboard. The strategy is to first establish the infrastructure (Vite 7/Node), then upgrade the core runtime (React 19/MUI v6), followed by a comprehensive migration of UI components to strict TypeScript, and finally applying advanced optimizations (React Compiler).

## Phases

### Phase 1: Infrastructure Foundation

**Goal:** Developer environment and build pipeline support modern stack.

This phase replaces the legacy build system with Vite 7 and aligns the Node.js environment, ensuring a stable foundation before code changes begin.

**Plans:** 3 plans

- [x] 01-01-PLAN.md — Node.js environment & legacy cleanup
- [x] 01-02-PLAN.md — Vite 7 upgrade & modern build config
- [x] 01-03-PLAN.md — ESLint 9 Flat Config with TS support

| Requirement  | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| **INFRA-01** | Build system uses Vite 7 with instant HMR                           |
| **INFRA-02** | Node.js environment configured for latest LTS (22.x/24.x)           |
| **INFRA-03** | Production build produces optimized assets without legacy polyfills |

**Success Criteria:**

1. Developer can start dev server in <500ms (Vite 7).
2. Build pipeline succeeds on Node 22.x/24.x.
3. Production build artifacts render application without runtime crashes.

### Phase 2: Core Modernization

**Plans:** 3 plans

- [x] 02-01-PLAN.md — React 19 & MUI v7 foundation
- [x] 02-02-PLAN.md — Type-safe data layer (HassProvider)
- [x] 02-03-PLAN.md — Modern CSS variable theming

**Goal:** Application runtime powers React 19 and MUI v6 with typed data.

This phase upgrades the primary dependencies and establishes the global data layer, enabling the new theming engine and type-safe `hass` injection.

**Plans:** 3 plans

- [x] 02-01-PLAN.md — Core Foundation Upgrade (React 19 & MUI v7)
- [x] 02-02-PLAN.md — Type-Safe Data Layer (HassProvider & useSyncExternalStore)
- [x] 02-03-PLAN.md — CSS Variable Theming (Modern Engine Migration)

| Requirement | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| **CORE-01** | Application runs on React 19                                           |
| **UI-01**   | Component library upgraded to MUI v6/v7                                |
| **UI-02**   | Theming uses CSS variables for instant mode switching                  |
| **DATA-02** | `hass` object injection typed with `home-assistant-js-websocket` types |
| **DATA-03** | Data layer isolates React components from raw custom element events    |

**Success Criteria:**

1. Application renders using React 19 runtime.
2. Theming system supports instant light/dark switching via CSS variables.
3. Developers can access strictly typed `hass` object in root context.
4. Data layer separates websocket events from React render cycle.

### Phase 3: Component Migration

**Goal:** UI components are type-safe, responsive, and use modern patterns.

**Plans:** 5 plans
- [x] 03-01-PLAN.md — Entity Typing & Strict Foundation
- [x] 03-02-PLAN.md — Layout & Dashboard Migration
- [x] 03-03-PLAN.md — Entity Card & Sub-components
- [x] 03-04-PLAN.md — Detail Views & Actions
- [x] 03-05-PLAN.md — Remaining Components & Finalization

This is the bulk of the work, migrating components to strict TypeScript, implementing new hooks, and adopting modern UI patterns like Grid v2 and Container Queries.

**Plans:** 5 plans

- [x] 03-01-PLAN.md — Entity Typing & Strict Foundation
- [x] 03-02-PLAN.md — Layout & Dashboard Migration
- [x] 03-03-PLAN.md — Entity Card & Sub-components Migration
- [x] 03-04-PLAN.md — Detail Views & Actions Migration
- [x] 03-05-PLAN.md — Remaining Components & Strict Finalization

| Requirement | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| **CORE-02** | TypeScript configured with `strict: true` and `noUncheckedIndexedAccess` |
| **CORE-04** | State mutations use React Actions (`useActionState`)                     |
| **UI-03**   | Layouts use standardized Grid v2 component                               |
| **UI-05**   | Components use Container Queries for responsive behavior                 |
| **DATA-01** | `useEntity` hook provides strict typing and autocomplete for entity IDs  |

**Success Criteria:**

1. Codebase compiles with `strict: true` and `noUncheckedIndexedAccess`.
2. Entities are accessed via typed `useEntity` hook with autocomplete.
3. Layouts adapt responsively using Grid v2.
4. State mutations utilize React Actions pattern.

### Phase 4: Optimization

**Goal:** Runtime performance is maximized via compilation and zero-runtime styles.

With the codebase fully strictly typed, we can safely enable the React Compiler and migrate to zero-runtime styling for maximum performance.

| Requirement | Description                                      |
| ----------- | ------------------------------------------------ |
| **CORE-03** | React Compiler enabled for automatic memoization |
| **UI-04**   | Zero-runtime styles implemented via Pigment CSS  |

**Success Criteria:**

1. React Compiler automatically memoizes components (verified via DevTools).
2. Styles are generated at build time (Pigment CSS) where applicable.

## Progress

| Phase                 | Goal                    | Status     |
| --------------------- | ----------------------- | ---------- |
| **1. Infrastructure** | Build system & Node env | ✓ Complete |
| **2. Core**           | React 19 & MUI v6       | ✓ Complete |
| **3. Migration**      | Strict TS & Components  | ✓ Complete |
| **4. Optimization**   | Compiler & Pigment CSS  | 🔴 Pending |
