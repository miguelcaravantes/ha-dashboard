---
phase: 04-tooling-and-standards
plan: 04
subsystem: standards
tags: [typescript, linting, type-safety]
requires: ['04-03']
provides: ['assertion-free-codebase']
key-files:
  created: []
  modified:
    - src/common/hassStore.ts
    - src/common/hooks/useEntity.ts
    - src/features/EntityCard/EntityCard.tsx
    - src/features/Panel.tsx
    - src/features/ProfileImg.tsx
    - src/features/LightDetail/LightBrightness.tsx
    - src/features/LightDetail/LightGroup.tsx
status: complete
metrics:
  duration: 10m
  completed: 2026-01-28
---

# Phase 04 Plan 04: Final Assertions Sweep Summary

## Objective
Perform a final sweep of all remaining type assertions across the codebase (DATA-04) and verify the hardened environment.

## One-liner
Achieved 100% compliance with strict assertion rules, resulting in a type-safe codebase with zero forbidden type assertions.

## Key Changes
- **Store Refactor:** Removed `as HomeAssistant` initialization in `hassStore.ts` by allowing `undefined` initial state and updating consumers.
- **Hook Hardening:** Updated `useEntity` hook to safely handle potential `undefined` snapshots from the store.
- **Feature Cleanup:** Refactored `Panel.tsx`, `ProfileImg.tsx`, and Light detail components to use safe type narrowing and type guards instead of `as` assertions.
- **Standardization:** All remaining `as` keywords in the codebase are now exclusively import aliases or `as const` expressions.

## Verification Results
- **Assertion Audit:** `grep` confirms zero non-alias/non-const assertions remain in `src/`.
- **Linting:** `npm run lint` passes with 0 errors.
- **Build:** `npm run build` succeeds without errors.

## Deviations from Plan
- None. Plan executed as written.

## Decisions Made
- **Store Initial State:** Decided to allow `undefined` in the store until populated by Home Assistant, forcing hooks to handle the empty state safely.
- **Window Interaction:** Refactored deep window property access in `Panel.tsx` into a safe, multi-level type guard check to avoid complex type assertions.

## Next Phase Readiness
- The project is now fully compliant with the new tooling and standards.
- Ready for Phase 5: Tailwind v4 and CSS Layers setup.
