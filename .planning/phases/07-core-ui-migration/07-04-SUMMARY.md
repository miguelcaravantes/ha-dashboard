---
phase: 07-core-ui-migration
plan: 04
subsystem: Core UI
tags: [refactor, ui, sensors, skeleton, polishing]
requires: ["07-03"]
provides: ["Polished dashboard UI", "Stacked sensor layout", "Loading states"]
affects: ["Phase 8"]
tech-stack:
  added: []
  patterns: ["Skeleton Screens", "Stacked Layout", "Native HA variable mapping"]
key-files:
  created: ["src/components/ui/skeleton.tsx"]
  modified: ["src/features/EntityCard/SensorDisplay.tsx", "src/features/EntityCard/EntityCard.tsx"]
decisions:
  - "Adopted a stacked layout for SensorDisplay to improve information density."
  - "Integrated shadcn Skeleton component for better UX during entity loading."
  - "Mapped card background and borders to native Home Assistant CSS variables for seamless theme integration."
metrics:
  duration: "1769666989s"
  completed: "2026-01-29"
---

# Phase 07 Plan 04: Final UI Polishing Summary

## Objective
Refactor SensorDisplay to a stacked layout and perform final UI polishing for Phase 7.

## Substantive Deliverables
- **Stacked SensorDisplay**: Implemented a modern stacked layout for sensor values, showing the unit of measurement as a muted label on top of the prominent state value.
- **Skeleton Screens**: Added a pulse loading state for EntityCard, improving perceived performance when entities are being fetched from the Home Assistant store.
- **Native Theme Sync**: Refactored card styling to use native Home Assistant CSS variables (`--ha-card-background`, `--ha-card-border-color`, etc.), ensuring the dashboard perfectly matches the user's selected Home Assistant theme.
- **Visual Polish**: Enhanced hover feedback and transitions across all entity cards.

## Deviations from Plan
None - plan executed exactly as written.

## Decisions Made
- **Unit as Label**: In the stacked layout for `SensorDisplay`, the unit of measurement (e.g., %, °C) is used as the top label to provide context for the value below it.
- **White/10 for Skeletons**: Used a semi-transparent white for skeleton backgrounds to ensure they look good over various theme background colors.

## Verification Results
- Sensor cards now display "Stacked Layout" correctly.
- Loading states show consistent skeleton screens.
- Dark mode/Light mode transitions are handled via native HA variables.
