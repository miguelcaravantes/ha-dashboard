---
phase: 05-ui-infrastructure
plan: 05-02
subsystem: styling
tags: [mui, tailwind-v4, css-layers, emotion]
requires: [05-01]
provides: [mui-layering]
key-files:
  created: [src/common/MuiLayerProvider.tsx]
  modified: [src/App.tsx, src/index.css]
metrics:
  duration: 180s
  completed: 2026-01-29
---

# Phase 5 Plan 02: Implement MUI Layering Summary

## Objective

Implement a custom Emotion cache provider to wrap all MUI-generated styles into a CSS Cascade Layer (`@layer mui`). This ensures MUI components respect the layer priority established in the root CSS, allowing Tailwind utilities to override MUI styles without `!important`.

## Key Changes

- **Created `src/common/MuiLayerProvider.tsx`**: Implemented a Stylis plugin that intercepts rule generation and wraps them in `@layer mui { ... }`.
- **Integrated into `src/App.tsx`**: Wrapped the application root (inside `ThemeProvider`) with `MuiLayerProvider`.
- **Verified Layer Order**: Ensured `index.css` is imported in `App.tsx` to define the layer order before styles are injected.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fix lint errors (single quotes and any type)**

- **Found during:** Verification (npm run lint)
- **Issue:** Project uses ESLint Stylistic which requires single quotes. `MuiLayerProvider.tsx` also used `any`.
- **Fix:** Ran `npm run format` and replaced `any` with a specific `StylisElement` interface.
- **Commit:** `06f1ace`

**2. [Rule 3 - Blocking] Broken build due to missing dependency**

- **Found during:** Verification (npm run build)
- **Issue:** `src/index.css` had an `@import "tw-animate-css"` that was not installed, likely left over from a previous uncommitted shadcn initialization.
- **Fix:** Removed the offending import to unblock the build.
- **Commit:** `3e0cc02`

## Decisions Made

- **Layer Wrapping Logic**: The Stylis plugin only wraps elements of type `rule` that are not already inside a `@layer`, ensuring nested layers or other at-rules are not corrupted.

## Next Phase Readiness

- [x] MUI styles are properly layered.
- [x] Tailwind v4 is integrated and takes precedence.
- [x] Application builds successfully.
- [ ] Next: Continue with shadcn/ui components (05-04).
