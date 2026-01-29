# Phase 5: UI Infrastructure - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize the styling foundation for v2.0. This phase delivers the configuration for Tailwind CSS v4, initializes the shadcn/ui component registry, and establishes the dark mode synchronization logic with Home Assistant.

**Note:** While the roadmap mentions "coexistence," the user intent is a total replacement of MUI. This phase prepares the infrastructure to bypass MUI specificity and move toward a pure shadcn/tailwind environment.

</domain>

<decisions>
## Implementation Decisions

### Shadcn Styling Strategy

- **Independent Theme:** Use standard shadcn styling (Slate/Zinc palette) rather than mapping core component colors to Home Assistant CSS variables.
- **Default Visuals:** Use default shadcn border radius (0.5rem), neutral accents, and focus rings.
- **Inspiration:** Aim for a modern "pretty" look based on shadcn defaults, with subtle "Material Design 3 Expressive" inspiration only for flair, not strict adherence.

### Component Registry Scope

- **Minimal Initial Set:** Install only the core components needed for the initial migration (Button, Card, Dialog, Switch).
- **Iconography:** Maintain **Material Design Icons (MDI)** for all components to ensure semantic consistency with the Home Assistant ecosystem.
- **Charts:** Include the shadcn/ui Charts infrastructure in this setup phase.
- **Notifications:** Skip Sonner/Toast; continue using existing notification patterns for now.

### Dark Mode Behavior

- **Detection:** Live synchronization with the `hass.themes.darkMode` state from the Home Assistant connection.
- **Implementation:** Custom React implementation (state + useEffect) to toggle the `.dark` class on the root element. Do not use `next-themes`.
- **Theme Support:** Support standard Light/Dark modes only; do not attempt to parse complex custom HA themes.

### Cascade Layering & MUI Strategy

- **MUI Suppression:** Wrap all existing MUI and Emotion styles in a low-priority `@layer mui` to ensure they do not interfere with new Tailwind v4 utilities.
- **Strict Tailwind Priority:** Ensure that Tailwind v4 utilities always have specificity precedence over legacy MUI components.
- **Override Pattern:** Use utility-first overrides for any remaining MUI components during the migration.

### Claude's Discretion

- Exact configuration of the Tailwind v4 Vite plugin.
- Specific implementation of the `darkMode` sync hook.
- Folder structure for shadcn components (standard `src/components/ui` preferred).

</decisions>

<specifics>
## Specific Ideas
- "I don't want any MUI styles or dependencies, start fresh and improve the current features with better modern pretty looking styling."
- "I like how shadcn looks by default."

</specifics>

<deferred>
## Deferred Ideas
- Full removal of MUI dependencies (OPT-01) — This is the ultimate goal, but will be executed after Phase 8 migration is complete to avoid breaking the app mid-migration.

</deferred>

---

_Phase: 05-ui-infrastructure_
_Context gathered: 2026-01-28_
