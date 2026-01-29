# Phase 8: Complex UI Migration - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Transition advanced interactive components to shadcn/ui. This includes the detailed entity dialogs (for lights, fans, climate), touch-optimized sliders, and complex entity logic. This phase completes the visual migration by replacing all remaining MUI interaction patterns.

</domain>

<decisions>
## Implementation Decisions

### Entity Dialogs

- **Layout Strategy:** **Adaptive** — Use a **Sheet (Bottom)** on mobile devices and a **Centered Modal** on desktop.
- **Backdrop:** **Blur Backdrop** — Use a modern frosted glass effect for the overlay background.
- **Closing:** **Tap Outside + X** — Standard closure behaviors.

### Slider Interactions

- **Visual Style:** **Thick Touch Target** with a **Fill Bar** visualization (like a progress bar).
- **Behavior:** **Live Update** — Send values to Home Assistant continuously while dragging (throttled if necessary).
- **Feedback:** **Live Text Update** — The numeric value updates instantly as the user slides.

### Complex Entity Cards

- **Control Strategy:** **Drill-down** — Keep the main card clean; complex controls (setpoint, modes) live inside the Dialog/Sheet.
- **Visuals:** **Animated State** — Fans and Climate entities should animate (spin/pulse) when active.
- **Display:** **Numeric** — Temperature and similar values are shown as large, clean numbers rather than gauges.

### Light Color Control

- **Selection:** **Presets Only** — Provide a curated list of simple color circles rather than a complex color wheel.
- **Modes:** **Tabbed View** — Separate tabs for "Color" and "White Temperature" controls.

### Claude's Discretion

- Exact animation timings (e.g., spin speed).
- Number of color presets to include by default.
- Layout of the "White Temperature" slider (horizontal vs vertical).

</decisions>

<specifics>
## Specific Ideas

- The "Drill-down" approach keeps the dashboard grid scannable; detailed control happens in the focused modal view.
- Sliders must feel "native" — responsive, easy to grab, and visually filling up as you drag.

</specifics>

<deferred>
## Deferred Ideas

- Custom color wheel implementation — kept simple (presets) for now.
- Historical data graphs inside the dialog — Phase 9 (if needed).

</deferred>

---

_Phase: 08-complex-ui-migration_
_Context gathered: 2026-01-28_
