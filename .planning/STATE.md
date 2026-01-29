# Project State: ha-dashboard

## Project Reference

- **Core Value:** Modern, type-safe, performant Home Assistant interface.
- **Current Milestone:** v2.0 Shadcn Migration
- **Target Architecture:** Hybrid Layered Architecture (MUI + Tailwind v4 + shadcn/ui)

## Current Position

- **Current Phase:** Phase 4: Tooling & Standards
- **Current Plan:** 04-04 (Final Assertions Sweep)
- **Status:** ✅ COMPLETE
- **Progress:** [████░░░░░░░░░░░░░░░░] 20% (Milestone v2.0)

## Performance Metrics

- **Type Safety:** 100% TSX (Strict Mode enabled)
- **Styling:** Transitioning to Tailwind v4 / shadcn
- **Linting:** Migrating to ESLint Stylistic (No Prettier)
- **Assertions:** 0% forbidden assertions (DATA-04 Complete)

## Accumulated Context

- **Decisions:**
  - Pivoted to Hybrid Architecture using CSS Cascade Layers to manage MUI/Tailwind coexistence.
  - Replacing Prettier with ESLint Stylistic for unified DX.
  - Forbidding type assertions to force safer runtime logic.
  - Added JSONC support to handle comments in configuration files (e.g., tsconfig.json).
  - Configured VS Code to use ESLint as the sole formatter for the workspace.
  - Established `src/common/utils/typeGuards.ts` as the standard for safe type narrowing.
  - Introduced `hasDefault` type guard for safe module interop without assertions.
  - Store initialization now defaults to `undefined` to enforce safe hook usage.
- **Session Continuity:**
  - Milestone v1.0 completed (Phases 1-3).
  - Completed Phase 4 Plan 01: Purge Prettier and configure Stylistic.
  - Completed Phase 4 Plan 02: Enabled strict assertion rules and refactored useEntity hook.
  - Completed Phase 4 Plan 03: Refactored high-violation features (Light and Fan components).
  - Completed Phase 4 Plan 04: Final sweep of remaining assertions.
  - Next: Phase 5: Tailwind v4 and CSS Layers setup.

## Continuity Checklist

- [x] Phase 4: Purge Prettier and configure Stylistic
- [x] Phase 4: Enable strict assertion rules
- [x] Phase 4: Refactor high-violation features (DATA-04)
- [x] Phase 4: Final sweep of remaining assertions
- [ ] Phase 5: Setup Tailwind v4 and CSS Layers

## Session Continuity

Last session: 2026-01-29
Stopped at: Completed 04-04-PLAN.md
Resume file: .planning/phases/05-styling-evolution/05-01-PLAN.md
