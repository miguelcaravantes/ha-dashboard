# Architecture

**Analysis Date:** 2026-01-27

## Pattern Overview

**Overall:** Home Assistant Custom Panel (SPA)

**Key Characteristics:**

- **Custom Element Wrapper:** Wrapped in a standard Web Component (`react-panel`) to integrate with Home Assistant's frontend.
- **Injected State:** Relies on the host (Home Assistant) to inject the full state object (`hass`) rather than fetching it via HTTP.
- **Reactive Store:** Uses a lightweight observable store pattern to bridge between the imperative DOM property updates and the React declarative tree.
- **Feature-First:** Organized by logical features (EntityCard, Panel) rather than technical layers.

## Layers

**Integration Layer:**

- Purpose: Bridges Home Assistant host to React application.
- Location: `src/index.jsx`
- Contains: Custom Element definition (`ReactWrapper`), `hassStore` (observable).
- Depends on: Home Assistant frontend API (implicit).
- Used by: Home Assistant (load via resource).

**Application Shell:**

- Purpose: Theming, Global Styles, and main Layout.
- Location: `src/App.jsx`, `src/features/Panel.jsx`
- Contains: MUI ThemeProvider, GlobalStyles, Navigation Tabs.
- Depends on: Integration Layer.

**Feature Layer:**

- Purpose: UI components representing specific HA domains or interactions.
- Location: `src/features/`
- Contains: `EntityCard`, `LightDetail`, `CardDashboard`.
- Depends on: Common hooks (`useEntity`).

**Data Access Layer:**

- Purpose: Abstracting the `hass` object into usable hooks.
- Location: `src/common/hooks/`
- Contains: `useEntity`, `useHass`.
- Depends on: `hassStore`.

## Data Flow

**State Injection:**

1. **Host Update:** Home Assistant updates the `.hass` property on the `<react-panel>` DOM element.
2. **Store Update:** `ReactWrapper` setter triggers `hassStore.setState(value)` in `src/index.jsx`.
3. **Subscription:** `useHass` (via `useSyncExternalStore` or listeners) detects the change.
4. **Component Update:** Components using `useEntity` re-render with new entity attributes.

**State Management:**

- **Store:** Single global object (`hassStore`) holding the entire Home Assistant state.
- **Consumption:** Components select specific slices (entities) via `useEntity(entityId)`.

## Key Abstractions

**Entity Wrapper:**

- Purpose: normalize access to HA entities (state, attributes, domain).
- Examples: `src/common/hooks/useEntity.js`
- Pattern: Hook-based adapter.

**Dashboard Grid:**

- Purpose: Layout strategy for rooms and devices.
- Examples: `src/features/CardDashboard.jsx`
- Pattern: Hardcoded Grid layout (MUI Grid).

## Entry Points

**Custom Element:**

- Location: `src/index.jsx`
- Triggers: Home Assistant loading the JavaScript resource.
- Responsibilities: Defining `<react-panel>`, mounting React root, bridging state updates.

## Error Handling

**Strategy:** Component-level Error Boundaries.

**Patterns:**

- **Entity Boundary:** `EntityCard` wraps `EntityCardInner` in an `ErrorBoundary` (`src/features/EntityCard/EntityCard.jsx`).
- **Fallbacks:** Visual indication if a specific card fails without crashing the dashboard.

## Cross-Cutting Concerns

**Theming:**

- Configured in `src/App.jsx`.
- Supports Dark Mode (detected via media query, currently hardcoded `true`).
- Uses Material UI `ThemeProvider`.

**Navigation:**

- Tab-based navigation in `src/features/Panel.jsx` (Home vs Favorites).
- Modal-based details (`EntityDialog`) for deep interactions.

---

_Architecture analysis: 2026-01-27_
