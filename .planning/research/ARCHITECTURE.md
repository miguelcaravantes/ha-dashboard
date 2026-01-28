# Architecture Patterns

**Domain:** React Home Assistant Dashboard (Custom Panel)
**Researched:** Jan 27 2026
**Target:** Vite 7, React 19, MUI v6, Strict TS

## Recommended Architecture

The application follows a **Micro-Frontend** pattern via a Custom Web Element (`<react-panel>`). It is injected into Home Assistant's frontend and shares the main HA WebSocket connection.

### System Diagram

```mermaid
graph TD
    HA[Home Assistant Core] -->|Injects 'hass' prop| WC[<react-panel> Web Component]
    WC -->|Updates| Store[hassStore (Vanilla Observable)]
    Store -->|Subscribes| Hook[useHass (useSyncExternalStore)]
    Hook -->|Provides Data| App[React App Root]
    App -->|Renders| Feat[Feature Components]
```

### Component Boundaries

| Component       | Type  | Responsibility                                    | Modernization Changes                                     |
| --------------- | ----- | ------------------------------------------------- | --------------------------------------------------------- |
| `src/index.tsx` | Entry | Defines Web Component, creates Root, handles HMR. | **Convert to TS.** Switch to `createRoot`. Add HMR logic. |
| `hassStore`     | State | Singleton holding the `hass` object (God Object). | **Strictly Type** with `HomeAssistant` interface.         |
| `useHass`       | Hook  | Connects React components to the store.           | **Strict Return Type.** Remove unused `useContext`.       |
| `App.tsx`       | View  | Root component, Routing (if any), Theme Provider. | **Add MUI v6 `ThemeProvider`.**                           |
| `features/*`    | UI    | Domain-specific cards (Lights, Sensors).          | **Migrate to MUI v6.** **Add Strict TS.**                 |

### Data Flow

1.  **Ingest:** Home Assistant sets the `.hass` property on the `<react-panel>` DOM node.
2.  **Store:** The setter triggers `hassStore.setState(newValue)`.
3.  **Propagate:** `useSyncExternalStore` in `useHass` detects the change and triggers a re-render.
4.  **Render:** Components consume `hass` via `useHass()` to get entity states.

**Why this pattern?**
It avoids Prop Drilling the massive `hass` object and decouples the React tree updates from the imperative DOM property updates.

## Modernization Strategy

### 1. Build System (Vite 7)

Switch from generic "App" build to "Library" mode to ensure a clean, single-entry output compatible with HA's resource loader.

**Config Pattern:**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'ha-dashboard',
    },
    rollupOptions: {
      // Externalize React if loading from HA (optional, usually bundled for stability)
      // For now: Bundle everything to avoid runtime conflicts.
    },
  },
});
```

### 2. Typing Strategy (Strict TS)

The `hass` object is complex. Do not define it manually.

- **Connection:** Use `home-assistant-js-websocket` for connection types.
- **Structure:** Use `home-assistant-types` (Community) or `HomeAssistant` interface copied from frontend source.

**Implementation:**

```typescript
import { HomeAssistant } from 'home-assistant-types'; // Recommended source

interface HassStore {
  state: HomeAssistant | undefined;
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => HomeAssistant | undefined;
}
```

### 3. UI Framework (MUI v6)

**No Shadow DOM:**
The current architecture renders directly into the Custom Element (`this`).

- **Pros:** Simplifies MUI integration (styles inject into `<head>`).
- **Cons:** Global HA styles might bleed in.
- **Decision:** **Keep No Shadow DOM** for this milestone. It reduces complexity. Use specific class names if conflicts arise.

**Integration:**

- Wrap `<App />` with `<ThemeProvider theme={theme}><CssBaseline />`.
- Ensure `theme` adapts to HA's dark/light mode if possible (read from `hass.selectedTheme` or `prefers-color-scheme`).

## Patterns to Follow

### Pattern 1: The "Hass Hook" Access

**What:** Always use `useHass()` to access state. Never pass `hass` down as props.
**When:** In any feature component needing entity data.
**Example:**

```typescript
const { states } = useHass();
const entity = states['light.living_room'];
```

### Pattern 2: Entity ID Safety

**What:** Use a typed helper or constants for Entity IDs if possible, or at least validate existence.
**When:** Accessing `states[id]`.
**Example:**

```typescript
const entity = states[ENTITY_ID];
if (!entity) return <Unavailable />;
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Context Duplication (Dead Code)

**What:** Creating a React Context (`HassContext`) that mirrors the `hassStore`.
**Why bad:** Redundant. `useSyncExternalStore` is more efficient for high-frequency updates (like sensor changes).
**Fix:** Delete `src/common/HassContext.js` as it is unused.

### Anti-Pattern 2: Destructuring "God Object" in Props

**What:** Passing `props.hass` to every child.
**Why bad:** Causes full-tree re-renders on _any_ state change (which happens every second in HA).
**Instead:** Pass only necessary data (e.g., `entityId`) and let the child `useHass()` + selector (if optimized) or just access what it needs.

## Scalability Considerations

| Concern                | Impact                                            | Mitigation                                                                                                                                                       |
| ---------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Render Performance** | `hass` updates frequently (time, sensor changes). | `useSyncExternalStore` is good, but basic usage re-renders on _every_ update. **Future Phase:** Implement selectors in `useHass` (e.g., `useEntity('light.x')`). |
| **Bundle Size**        | React + MUI is heavy (~300kb+).                   | Use Vite 7 tree-shaking. Ensure only used icons (`mdi-material-ui`) are imported.                                                                                |

## Build Order

1.  **Clean:** Remove `HassContext` and unused imports.
2.  **Tooling:** Update `vite.config.ts` (Vite 7, Lib mode).
3.  **Strict TS:** Rename `.js/.jsx` to `.ts/.tsx`. Fix strict errors in `index.tsx` and `useHass.ts` first.
4.  **MUI v6:** Upgrade dependencies. Wrap App in ThemeProvider. Fix breaking changes in components.

## Sources

- [Home Assistant JS Websocket (Types)](https://github.com/home-assistant/home-assistant-js-websocket)
- [MUI v6 Release Notes](https://mui.com/blog/material-ui-v6-is-out/)
- Existing Codebase Analysis (`src/index.jsx`, `src/common/hooks/useHass.js`)
