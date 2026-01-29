# Project State: ha-dashboard

## Project Reference

- **Core Value:** Modern, type-safe, performant Home Assistant interface.
- **Current Milestone:** v2.0 Shadcn Migration
- **Target Architecture:** Hybrid Layered Architecture (MUI + Tailwind v4 + shadcn/ui)

## Current Position

- **Current Phase:** Phase 7: Core UI Migration
- **Current Plan:** Initializing Phase 7 context
- **Status:** 🟢 ON TRACK
- **Progress:** [████████░░░░░░░░░░░░] 40% (Milestone v2.0)

## Performance Metrics

- **Type Safety:** 100% TSX (Strict Mode + No Assertions)
- **Styling:** Tailwind v4 + shadcn/ui foundation established
- **Linting:** ESLint Stylistic (No Prettier)
- **Assertions:** 0% (DATA-04 verified)

## Accumulated Context

- **Decisions:**
  - Pivoted to Hybrid Architecture using CSS Cascade Layers to manage MUI/Tailwind coexistence.
  - Replacing Prettier with ESLint Stylistic for unified DX.
  - Forbidding type assertions to force safer runtime logic.
  - Established CSS Layer Order: `mui, base, components, utilities`.
  - Wrapped MUI styles in `@layer mui` using custom Emotion Stylis plugin.
  - Mapped shadcn/Tailwind variables to Home Assistant native CSS variables for seamless theming.
- **Session Continuity:**
  - Phase 4 completed: Tooling removal and new rule enforcement.
  - Phase 5 completed: UI Infrastructure (Tailwind v4, shadcn init, MUI layering, Dark mode sync).
  - Phase 6: Merged into Phase 4.
  - Next: Phase 7: Core UI Migration.

## Continuity Checklist

- [x] Phase 4: Purge Prettier and configure Stylistic
- [x] Phase 4: Enable strict assertion rules
- [x] Phase 4: Refactor DATA-04 violations
- [x] Phase 5: Setup Tailwind v4 and CSS Layers
- [x] Phase 5: Initialize shadcn/ui
- [x] Phase 5: Implement MUI Layering
- [x] Phase 5: Synchronize Dark Mode with HA
- [ ] Phase 7: Core UI Migration
