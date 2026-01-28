# Architecture Patterns

**Domain:** React Home Assistant Dashboard (Custom Panel)
**Researched:** Tue Jan 27 2026

## Recommended Architecture

The application follows a **Custom Panel** architecture, where the React application is wrapped in a Web Component (`<react-panel>`) and injected into the Home Assistant frontend. Data is received via property injection rather than direct WebSocket connection.

```mermaid
graph TD
    HA[Home Assistant] -- sets .hass prop --> WC[Web Component <react-panel>]
    WC -- updates --> Store[hassStore (Vanilla JS Observer)]
    Store -- useSyncExternalStore --> Hook[useHass()]
    Hook -- provides typed data --> Smart[Smart Components]
    Smart -- passes props --> Dumb[Presentation Components]
```

### Component Boundaries

| Component Type                | Responsibility                                                      | Connection           | Example                       |
| ----------------------------- | ------------------------------------------------------------------- | -------------------- | ----------------------------- |
| **Entry Point** (`index.tsx`) | Defines Custom Element, binds `hass` setter to Store, mounts React. | `HTMLElement` API    | `ReactWrapper`                |
| **Root** (`App.tsx`)          | Sets up ThemeProvider (MUI v6), GlobalStyles, Layout.               | None                 | `App`                         |
| **Smart Components**          | Retrieve specific entities from store, handle business logic.       | `useHass()`          | `CardDashboard`, `EntityPage` |
| **Presentation Components**   | Render UI based on props. Pure functions.                           | Props (`HassEntity`) | `EntityCard`, `EntityRow`     |

### Data Flow

1.  **Injection:** Home Assistant sets `document.querySelector('react-panel').hass = { ... }`.
2.  **Storage:** `src/index.tsx`'s `hassStore` receives the object and notifies listeners.
3.  **Subscription:** `useHass` hook (via `useSyncExternalStore`) subscribes to `hassStore`.
4.  **Consumption:** Components call `useHass()` to get the _full_ `HomeAssistant` object.
5.  **Selection:** Smart components select specific entities (e.g., `hass.states['light.living_room']`).

## Patterns to Follow

### Pattern 1: Strict Typed Injection

**What:** Use the authoritative `HomeAssistant` type for the injected object.
**Why:** Prevents "property does not exist" errors and enables autocomplete for the massive HA state object.
**Implementation:**

```typescript
import { HomeAssistant } from 'home-assistant-js-websocket'; // Type only

// In Store
export interface HassStore {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => HomeAssistant | undefined;
}

// In Components
const hass = useHass(); // Returns HomeAssistant
```

### Pattern 2: MUI v6 Grid Migration

**What:** Use `Grid2` instead of legacy `Grid`.
**Why:** MUI v6 stabilizes `Grid2` which uses standard CSS `gap` instead of negative margins.
**Implementation:**

```typescript
import Grid from '@mui/material/Grid2';

<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>...</Grid>
</Grid>;
```

### Pattern 3: Feature-Based Organization

**What:** Keep the `src/features/` directory. Each feature folder should contain its main component, sub-components, and any feature-specific utils.
**Example:**

```
src/features/LightControl/
  ├── LightControl.tsx    # Smart component
  ├── LightSlider.tsx     # Presentation
  └── light-utils.ts      # Logic
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Context for Global State

**What:** Using `React.Context` to pass the `hass` object down.
**Why Bad:** The `hass` object updates frequently (every state change in HA). Context causes full tree re-renders unless carefully optimized.
**Instead:** Continue using `useSyncExternalStore` (as currently implemented in `useHass.js`) which allows React to bail out of updates if selected data hasn't changed (if selectors are used).

### Anti-Pattern 2: Loose Prop Typing

**What:** `props: any` or `props: { entity: object }`.
**Why Bad:** Defeats the purpose of TS.
**Instead:**

```typescript
import { HassEntity } from 'home-assistant-js-websocket';

interface EntityCardProps {
  entity: HassEntity;
  hass: HomeAssistant; // If needed for service calls
}
```

## Scalability Considerations

| Concern              | Impact                                          | Strategy                                                                                                     |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Frequent Updates** | `hass` object changes on every event (seconds). | Use memoization (`React.memo`) on presentation components. Use selectors in `useHass` (future optimization). |
| **Bundle Size**      | MUI is large.                                   | Use Tree-shaking. Import specific icons (e.g. `mdi-material-ui/Lightbulb`).                                  |

## Suggested Build Order

1.  **Foundation:** Rename `index.jsx` -> `index.tsx`, `App.jsx` -> `App.tsx`. Define `hassStore` with types.
2.  **Hooks:** Type `useHass.ts` and `useEntity.ts`.
3.  **UI Core:** Upgrade MUI to v6. Update `ThemeProvider` to use `cssVariables: true`.
4.  **Components (Bottom-Up):** Convert generic UI components (Icons, Panels) to TSX.
5.  **Features (Top-Down):** Convert `CardDashboard`, then individual cards (`EntityCard`).

## Sources

- [Home Assistant JS Websocket (Types)](https://github.com/home-assistant/home-assistant-js-websocket)
- [MUI v6 Release Notes](https://mui.com/blog/material-ui-v6-is-out/)
- Existing Codebase Analysis (`src/index.jsx`, `src/common/hooks/useHass.js`)
