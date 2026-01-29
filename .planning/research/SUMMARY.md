# Project Research Summary

**Project:** ha-dashboard v2.0 Migration
**Domain:** Home Assistant Dashboard (React/Vite/Tailwind/Shadcn)
**Researched:** 2026-01-28
**Confidence:** HIGH

## Executive Summary

The ha-dashboard v2.0 migration represents a strategic shift from a traditional Material UI (MUI) architecture to a modern, performance-first stack leveraging React 19, Vite 7, Tailwind CSS v4, and shadcn/ui. This modernization is driven by the need for better performance on wall-mounted tablets, reduced bundle sizes, and a more maintainable, utility-first styling system that avoids the runtime overhead of CSS-in-JS.

The recommended approach focuses on an incremental migration strategy using a **Hybrid Layered Architecture**. By utilizing CSS Cascade Layers, the project will allow MUI and Tailwind to coexist without specificity conflicts, enabling a feature-by-feature transition. Simultaneously, the project will pivot its developer experience by replacing Prettier with `@stylistic/eslint-plugin` to unify formatting and linting into a single, high-performance toolchain.

The primary risks involve CSS specificity wars during the hybrid phase, potential logic errors when removing non-null assertions to satisfy new strict linting rules, and formatting "flapping" if legacy tools like Prettier are not fully purged from the environment. These will be mitigated through strict infrastructure configuration (CSS layers, VSCode settings) and a systematic approach to type safety hardening.

## Key Findings

### Recommended Stack

The stack pivots toward a CSS-variable-centric approach that maximizes React 19 and Tailwind v4 capabilities.

**Core technologies:**

- **Tailwind CSS v4:** Styling — CSS-first approach with zero-config Vite integration and native cascade layers.
- **shadcn/ui:** Component System — Accessible, customizable primitives that replace MUI components.
- **@stylistic/eslint-plugin:** Linting/Formatting — Unified tool for stylistic and logic rules, replacing the need for Prettier.
- **Vite 7:** Build Tool — Latest frontend tooling for optimal development speed and bundle performance.

### Expected Features

Migration focuses on reaching parity with existing HA dashboard features while introducing performance differentiators.

**Must have (table stakes):**

- **State Sync:** Real-time reflection of Home Assistant entity states.
- **Touch Optimization:** Large hit areas and reliable interaction for wall-mounted tablets.
- **Unified Dark Mode:** Consistent theme using CSS variables and `next-themes`.

**Should have (competitive):**

- **Tailwind 4 Native Performance:** Significant reduction in runtime style calculation overhead.
- **Micro-interactions:** Smooth state transitions using Framer Motion.
- **Direct Customization:** Easy editing of local `components/ui` files without `sx` prop complexity.

**Defer (v2+):**

- **RGB Color Picker:** Defer complex color selection until `react-colorful` integration is stable.
- **Complex Charts:** Retain existing Recharts/MUI implementations for history graphs temporarily.

### Architecture Approach

A Hybrid Layered Architecture that prioritizes CSS specificity management and incremental component replacement.

**Major components:**

1. **CSS Cascade Layering:** Wraps MUI styles in a lower-priority layer to let Tailwind utilities take precedence.
2. **Theme Bridge:** Maps Home Assistant CSS variables directly to shadcn/Tailwind tokens.
3. **Component Wrappers:** Local UI components that mimic MUI high-level APIs to simplify feature migration.

### Critical Pitfalls

1. **CSS Specificity Wars** — Prevented by using `StyledEngineProvider` and CSS Cascade Layers (`@layer mui`).
2. **Formatting Flapping** — Prevented by explicitly removing Prettier and forcing VSCode settings to use ESLint.
3. **Runtime Crashes from Assertion Removal** — Avoided by replacing `!` with proper type guards or functional assertions.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Infrastructure & Linting Pivot

**Rationale:** Establishing the foundation for styling and developer tools before migrating any UI components.
**Delivers:** Tailwind v4/shadcn installation, ESLint Stylistic configuration, and removal of Prettier.
**Addresses:** Formatting consistency and build tool readiness.
**Avoids:** Pitfall 2 (Formatting Flapping).

### Phase 2: Hybrid Styling Foundation

**Rationale:** Setting up the coexistence layer ensures subsequent component migration doesn't break existing styles.
**Delivers:** CSS Cascade Layer configuration and MUI `StyledEngineProvider` setup.
**Uses:** Tailwind v4 layers and Vite 7 plugins.
**Implements:** The Hybrid Layered Architecture.

### Phase 3: Type Safety & Non-Null Assertion Hardening

**Rationale:** Cleaning up non-null assertions (`!`) before major refactoring prevents logic errors from propagating.
**Delivers:** Codebase-wide refactor of unsafe assertions and strict linting enforcement.
**Avoids:** Pitfall 3 (Runtime Crashes).

### Phase 4: Core Component Migration

**Rationale:** Migrating high-volume, low-complexity components (Cards, Switches, Sensors) first to build momentum.
**Delivers:** shadcn-based replacements for EntityCards and basic toggles.
**Addresses:** Baseline features (State Sync, Touch Optimization).

### Phase 5: Advanced Controls & Cleanup

**Rationale:** Completing the migration of complex components and removing legacy dependencies.
**Delivers:** Migration of Sliders, Popovers, and eventual removal of Material UI from the bundle.
**Addresses:** Performance optimization (Bundle size reduction).

### Phase Ordering Rationale

- **Tooling First:** Ensuring the linting and styling infrastructure is solid avoids noisy diffs during the actual migration.
- **Dependency Awareness:** CSS layers must be active before any Tailwind classes are applied to MUI-containing files.
- **Risk Mitigation:** Type hardening occurs before component logic is rewritten to ensure a stable foundation.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 5 (Advanced Controls):** Complex popover positioning and debounced slider updates in shadcn may require deeper investigation into Radix primitives.

Phases with standard patterns (skip research-phase):

- **Phase 1 (Infrastructure):** Standard shadcn/Tailwind v4 installation patterns are well-documented.
- **Phase 4 (Core Migration):** Mapping MUI Cards to shadcn Cards is a straightforward replacement.

## Confidence Assessment

| Area         | Confidence | Notes                                                                          |
| ------------ | ---------- | ------------------------------------------------------------------------------ |
| Stack        | HIGH       | Tailwind v4 and shadcn are stable and compatible with React 19.                |
| Features     | HIGH       | Feature mapping is clear; most HA interactions are standard UI patterns.       |
| Architecture | HIGH       | CSS Cascade Layers are the standard industry solution for library coexistence. |
| Pitfalls     | HIGH       | Specificity and formatting risks are well-known with established mitigations.  |

**Overall confidence:** HIGH

### Gaps to Address

- **MUI Dialog/Portal Scoping:** Need to verify if Radix portals need specific container targeting for HA CSS variables to reach them.
- **Performance Benchmarking:** Ideally, perform a baseline bundle size check before starting Phase 4 to track improvements.

## Sources

### Primary (HIGH confidence)

- [shadcn/ui Docs] — Vite & Tailwind v4 installation guide.
- [Tailwind CSS v4 Docs] — CSS Cascade Layers and Vite plugin integration.
- [MUI Interoperability Guide] — Tailwind CSS v4 integration patterns.
- [ESLint Stylistic Docs] — Migration from Prettier/Standard.

---

_Research completed: 2026-01-28_
_Ready for roadmap: yes_
