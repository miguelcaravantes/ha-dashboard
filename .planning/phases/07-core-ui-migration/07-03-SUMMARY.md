---
phase: 07-core-ui-migration
plan: 03
subsystem: UI Components
tags: ["shadcn", "tailwind", "mui-removal", "optimistic-ui"]
requires: ["07-02"]
provides: ["shadcn-entity-cards", "optimistic-power-switch"]
affects: ["07-04"]
tech-stack:
  added: ["@radix-ui/react-switch"]
  patterns:
    ["Optimistic UI updates with useOptimistic", "Tailwind-based animations"]
key-files:
  created: []
  modified:
    [
      "src/features/EntityCard/EntityCard.tsx",
      "src/features/EntityCard/PowerSwitch.tsx",
      "src/features/EntityCard/SensorDisplay.tsx",
    ]
decisions:
  - name: "Tailwind Animations"
    description: "Replaced MUI keyframes with Tailwind's animate-spin for fan rotation."
  - name: "Optimistic Switch"
    description: "Implemented useOptimistic for immediate toggle feedback on PowerSwitch."
metrics:
  duration: 120
  completed: 2026-01-29
---

# Phase 07 Plan 03: Entity Card Refactor Summary

## Objective

Refactor the core EntityCard container and the PowerSwitch component to use shadcn/ui, focusing on icon priority and visible controls.

## Delivered Changes

### 1. EntityCard Container Migration

- Replaced MUI `Box` (acting as Card) with shadcn `Card` component.
- Implemented "Icon Priority" using responsive container queries (`@container`).
- Migrated fan rotation animation from MUI `keyframes` to Tailwind `animate-spin`.
- Applied condensed padding and subtle hover effects via Tailwind.

### 2. PowerSwitch Migration

- Replaced MUI `Switch` with shadcn `Switch` component.
- Implemented **Optimistic UI updates** using `useOptimistic` and `startTransition`, ensuring immediate toggle feedback before the Home Assistant service call completes.
- Cleaned up all MUI styled components and imports.

### 3. SensorDisplay Cleanup (Deviation)

- Refactored `SensorDisplay` to remove MUI `Box` usage for consistency with the new `EntityCard` architecture.

## Verification Results

- `EntityCard` uses shadcn primitives.
- `PowerSwitch` provides instant feedback.
- MUI dependencies removed from modified files.

## Deviations from Plan

- **Rule 2 - Missing Critical/Consistency**: Refactored `SensorDisplay.tsx` to remove MUI usage, ensuring it matches the new `EntityCard` style and doesn't break consistency.

## Next Phase Readiness

- Core interactive components are now on the new design system.
- Ready for remaining EntityPage and Dashboard refinements.
