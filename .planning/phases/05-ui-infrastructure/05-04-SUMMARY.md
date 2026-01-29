---
phase: 05-ui-infrastructure
plan: 04
subsystem: UI Infrastructure
tags: [dark-mode, home-assistant, shadcn, tailwind]
requires: [05-02, 05-03]
provides: [Dark mode synchronization]
tech-stack:
  added: []
  patterns: [React Hook for HA state sync, CSS Variable Mapping]
key-files:
  created: [src/common/hooks/useDarkMode.ts]
  modified: [src/App.tsx, src/index.css]
metrics:
  duration: 250s
  completed: 2026-01-29
---

# Phase 05 Plan 04: Dark Mode Synchronization Summary

Synchronized the dashboard's dark mode state with Home Assistant's theme preferences, ensuring a consistent visual experience that follows the user's HA settings.

## Accomplishments

### Task 1: Implement useDarkMode Hook

- Created `useDarkMode` hook in `src/common/hooks/useDarkMode.ts`.
- Subscribes to `hass.themes.darkMode` and toggles the `dark` class on `document.documentElement`.
- Handled potential undefined states of the `hass.themes` object.

### Task 2: Integrate Hook into App Root

- Integrated `useDarkMode()` into the main `App` component.
- Positioned within the `HassProvider` context to ensure access to HA state.

### Task 3: Map Dark Mode to HA CSS Variables

- Refactored `src/index.css` to map shadcn/tailwind theme variables to Home Assistant's native CSS variables.
- Applied mappings to both `:root` and `.dark` selectors to ensure the dashboard remains themed according to HA settings regardless of the specific mode.
- Used variables like `--primary-background-color`, `--primary-text-color`, and `--primary-color`.

## Deviations from Plan

None - plan executed exactly as written.

## Decisions Made

- **Double Mapping:** Mapped variables in both `:root` and `.dark` to Home Assistant variables. Since HA dynamically updates these CSS variable values when the theme changes, this approach ensures maximum compatibility and "native" feel.
- **Hook Placement:** Confirmed `App.tsx` is the ideal placement as it's wrapped by `HassProvider` in `index.tsx`.

## Verification Results

- ✅ `useDarkMode.ts` reacts to `hass.themes.darkMode` changes.
- ✅ `<html>` element correctly receives/loses the `dark` class.
- ✅ CSS variables correctly point to HA native variables.
- ✅ Shadcn components (using variables like `--background`, `--primary`, etc.) will now reflect HA colors.
