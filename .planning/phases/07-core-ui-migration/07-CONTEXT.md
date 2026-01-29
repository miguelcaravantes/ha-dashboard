# Phase 7: Core UI Migration - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Transition the primary layout shell and high-volume entity components (PowerSwitch, SensorDisplay) to shadcn/ui. This includes defining the dashboard's navigation structure within the Home Assistant environment and establishing the visual standards for card-based data display.

</domain>

<decisions>
## Implementation Decisions

### Layout Shell Design

- **Navigation:** Use a **Top Header** for primary panel actions/navigation.
- **Mobile Behavior:** Implement **Bottom Navigation** for mobile devices to complement the Home Assistant host environment.
- **Container:** Main content is contained in a **Centered Max-Width** layout.
- **Header:** Include a **Fixed Header Navigation** that remains accessible while scrolling.

### Entity Card Visuals

- **Hierarchy:** **Icon Priority** — icons should be the primary visual focus of the entity cards.
- **Controls:** **Visible Switch** — PowerSwitch cards must show a toggle component directly on the card.
- **Sensors:** **Stacked Layout** — SensorDisplay cards use a modern stacked approach (Label on top, Value at the bottom).
- **Data Depth:** **Pure Info** — No historical sparklines or graphs on the primary cards for now.

### Information Density

- **Overall Spacing:** **Compact (Efficiency)** — prioritize seeing multiple items at once over airy whitespace.
- **Card Padding:** **Condensed** — use reduced padding (e.g., `p-3` or `p-4`) for entity cards.
- **Grid:** **Responsive Auto-Grid** with **Equal Height** rows to maintain a clean, organized look.

### Interaction Patterns

- **Hover States:** **Subtle Feedback** — use clean background tints or border changes on hover rather than scaling/lifting.
- **Loading:** **Skeleton Screens** — use modern skeleton patterns while entity data is fetching.
- **Feedback:** **Optimistic Updates** — toggles and switches update the UI immediately before receiving Home Assistant confirmation for maximum perceived speed.

### Claude's Discretion

- Exact Tailwind gap values (e.g., `gap-2` vs `gap-4`).
- Specific typography weights for "Stacked" sensor values.
- Dark mode specific border colors for the grid.

</decisions>

<specifics>
## Specific Ideas

- Navigation must acknowledge the "embedded" nature of the panel; avoid conflict with HA's left sidebar.
- Maintain the "shadcn default" aesthetic but adjusted for dashboard density.

</specifics>

<deferred>
## Deferred Ideas

- Advanced entity types (Climate, Media Player) — Phase 8.
- Custom background images or complex CSS effects.

</deferred>

---

_Phase: 07-core-ui-migration_
_Context gathered: 2026-01-28_
