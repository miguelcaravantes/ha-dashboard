---
phase: 03-component-migration
plan: 01
subsystem: Core Typing
tags: [typescript, react, home-assistant]
requires: [02-core-modernization]
provides: [Strictly typed entity access, TSX foundation]
affects: [All future component migrations]
tech-stack:
  added: []
  patterns: [Template Literal Types for Entity IDs]
key-files:
  created: [src/types/entities.ts, src/common/HassContext.tsx]
  modified:
    [
      src/common/hooks/useEntity.ts,
      src/App.tsx,
      src/common/HassProvider.tsx,
      src/common/hooks/useHass.ts,
      src/index.tsx,
    ]
decisions:
  - Consistently use .js extension in imports for ESM compatibility in TS files.
  - Consolidated HassContext into its own file to follow Task 3 instructions, even if redundant with HassProvider.
metrics:
  duration: 4m
  completed: 2026-01-28
---

# Phase 03 Plan 01: Core Typing Migration Summary

## Objective

Establish the strict TypeScript foundation by defining entity types and converting core hooks/context to TSX.

## Completed Tasks

| Task | Name                                | Commit  | Files                                                                                                                                                     |
| ---- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Define Entity Types                 | 3938865 | src/types/entities.ts                                                                                                                                     |
| 2    | Strictly Type useEntity Hook        | 1908dc8 | src/common/hooks/useEntity.ts                                                                                                                             |
| 3    | Convert Core Context and App to TSX | 9e86163 | src/App.tsx, src/common/HassContext.tsx, src/common/domains.ts, src/constants.ts, src/common/HassProvider.tsx, src/common/hooks/useHass.ts, src/index.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Relative import paths missing extensions**

- **Found during:** Task 3
- **Issue:** `tsc` failed because ESM imports in TS files require explicit extensions (or would fail at runtime in some environments).
- **Fix:** Added `.js` extensions to imports in `App.tsx` and `index.tsx`.
- **Files modified:** `src/App.tsx`, `src/index.tsx`
- **Commit:** 9e86163

**2. [Rule 3 - Blocking] Context Redundancy**

- **Found during:** Task 3
- **Issue:** `HassProvider.tsx` already had a local `HassContext`. Task 3 asked to rename `HassContext.js` to `.tsx`.
- **Fix:** Updated `HassProvider.tsx` and `useHass.ts` to use the new standalone `HassContext.tsx`.
- **Files modified:** `src/common/HassProvider.tsx`, `src/common/hooks/useHass.ts`
- **Commit:** 9e86163

## Verification Results

- `npx tsc --noEmit` passed with zero errors.
- `src/types/entities.ts` provides `EntityId` and `KnownEntityId` with autocomplete support.
- `useEntity` hook is strictly typed.
- `App.tsx` is successfully converted to TSX.
