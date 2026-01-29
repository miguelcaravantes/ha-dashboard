# Project Roadmap: v2.0 Shadcn Migration

This roadmap outlines the strategic pivot from Material UI to shadcn/ui and Tailwind CSS v4. It focuses on establishing a hybrid styling architecture, enforcing stricter stylistic standards via ESLint Stylistic, and hardening type safety by eliminating unsafe assertions.

## Milestone: v2.0 - UI & Standards Pivot

### Phase 4: Tooling & Standards

**Goal:** Establish a unified stylistic and strict typing foundation by consolidating tools and enforcing assertion rules.

- **Requirements:** TOOL-01, TOOL-02, TOOL-03
- **Dependencies:** None (foundation for v2.0)
- **Success Criteria:**
  1. Prettier is fully removed from the project and IDE configuration.
  2. ESLint Stylistic manages all code formatting with zero conflicts.
  3. Build fails if any `as` or `<Type>` assertions are detected in the codebase.
  4. IDE provides automatic formatting on save using only ESLint.

### Phase 5: UI Infrastructure

**Goal:** Initialize the hybrid styling environment where Tailwind CSS v4 and MUI coexist via CSS Cascade Layers.

- **Requirements:** UI-06, UI-07, UI-08, UI-09
- **Dependencies:** Phase 4
- **Success Criteria:**
  1. Tailwind v4 utilities are functional and integrated via the Vite plugin.
  2. `shadcn/ui` component registry is initialized and ready for use.
  3. CSS Cascade Layers (`@layer mui`) successfully prevent MUI specificity from overriding Tailwind utilities.
  4. Dashboard theme responds correctly to Home Assistant dark mode CSS variables.

### Phase 6: Type Safety Hardening

**Goal:** Resolve all existing type assertion violations to ensure a stable, logic-driven foundation before major UI refactoring.

- **Requirements:** DATA-04
- **Dependencies:** Phase 4
- **Success Criteria:**
  1. Codebase contains zero instances of `as` or `<Type>` assertions.
  2. Unsafe assertions are replaced with robust type guards or safe logic.
  3. Type safety is verified by a clean CI lint/build pass.

### Phase 7: Core UI Migration

**Goal:** Transition the primary layout and high-volume entity components to shadcn/ui.

- **Requirements:** UI-10, UI-11
- **Dependencies:** Phase 5, Phase 6
- **Success Criteria:**
  1. Dashboard Shell and Panel layout are fully migrated to shadcn components.
  2. PowerSwitch and SensorDisplay cards are functional and visually consistent with shadcn.
  3. Main dashboard view uses Tailwind v4 for layout and spacing.

### Phase 8: Complex UI Migration

**Goal:** Complete the migration by transitioning advanced interactive components and sliders.

- **Requirements:** UI-12
- **Dependencies:** Phase 7
- **Success Criteria:**
  1. Light/Fan entity dialogs use shadcn/Radix primitives for overlays.
  2. Entity sliders are fully migrated and maintain touch-optimized performance.
  3. All remaining interactive MUI components in the main workflow are replaced.

## Progress Tracking

| Phase | Goal                 | Status  | Progress |
| ----- | -------------------- | ------- | -------- |
| 4     | Tooling & Standards  | Pending | 0%       |
| 5     | UI Infrastructure    | Pending | 0%       |
| 6     | Type Hardening       | Pending | 0%       |
| 7     | Core UI Migration    | Pending | 0%       |
| 8     | Complex UI Migration | Pending | 0%       |
