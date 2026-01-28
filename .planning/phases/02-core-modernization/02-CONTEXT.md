# Phase 2: Core Modernization - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Application runtime powers React 19 and MUI v6/v7 with typed data. This phase upgrades primary dependencies and establishes the global data layer, enabling the new theming engine and type-safe `hass` injection.

</domain>

<decisions>
## Implementation Decisions

### Theming Architecture

- **CSS Variables:** Use the modern MUI CSS variables provider.
- **Theme Variants:** Standardize on Light and Dark modes provided by Home Assistant.
- **Visual Density:** Target the standard MUI default density (suitable for both desktop and mobile).
- **Transitions:** Use native MUI transitions for all state changes.
- **Color Palette:** Stick to the standard MUI color palette (no custom HA state color mapping at the theme level).

### Data Layer Isolation

- **Isolation Strategy:** Hybrid approach. Components will primarily use managed providers/hooks, but some flexibility for direct state access is allowed if needed.
- **Update Frequency:** Real-time push updates. React components will update immediately on state changes from Home Assistant.
- **Consumption Pattern:** Granular hooks (e.g., `useEntity('light.kitchen')`) are preferred over a monolithic state object.
- **Error Handling:** Use standard "Unavailable" UI states for lost connections or missing entities.

### MUI Version Choice

- **Version:** MUI v7 (prioritize the latest stable version).
- **Experimental Components:** Allowed if they provide significant functional value (e.g., Masonry, advanced Lab components).
- **Design System:** Strictly follow Material Design standards.
- **Edition:** Community (Free) edition only; no "Pro" features.

### Hass Typing Strategy

- **Depth:** Rely on standard library types (`home-assistant-js-websocket`) without creating custom wrappers.
- **Strictness:** Enforce strictly typed strings for Entity IDs across the codebase.
- **State Properties:** Use generic typed hooks (e.g., `useEntity<LightEntity>`) to enforce type safety for specific attributes like brightness or temperature.

### Claude's Discretion

- **Typing Boundary:** Claude will determine the most effective depth for propagating types down to individual component props.
- **Implementation Patterns:** Selection of specific React 19 patterns (e.g., useActionState) during integration.

</decisions>

<specifics>
## Specific Ideas
- No specific visual references provided — follow standard Material UI v7 patterns and Home Assistant conventions.
</specifics>

<deferred>
## Deferred Ideas
- None — discussion stayed within the established phase scope.
</deferred>

---

_Phase: 02-core-modernization_
_Context gathered: 2026-01-28_
