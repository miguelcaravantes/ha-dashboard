# Phase 2: Core Modernization - Research

**Researched:** 2026-01-28
**Domain:** React 19, MUI v7, Home Assistant Data Layer
**Confidence:** HIGH

## Summary

This phase modernizes the application core by upgrading to React 19 and MUI v7, and establishing a type-safe data layer using `home-assistant-js-websocket`. The research confirms that MUI v7 is the stable choice for 2026, offering native CSS variables support which is essential for the project's performance and theming goals. The data layer will transition from a hand-rolled store to a more robust implementation utilizing `useSyncExternalStore` for efficient entity updates.

**Primary recommendation:** Use React 19 built-in features (like the `ref` prop and `useOptimistic`) and MUI v7's native CSS variable support to build a performance-first dashboard core.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library                       | Version | Purpose             | Why Standard                                                   |
| ----------------------------- | ------- | ------------------- | -------------------------------------------------------------- |
| `react`                       | 19.x    | Application Runtime | Modern standard, better performance, simplified APIs.          |
| `@mui/material`               | 7.x     | Component Library   | Industry standard for Material Design, v7 has native CSS vars. |
| `home-assistant-js-websocket` | 9.x     | HA Communication    | Official library for HA WebSocket API.                         |

### Supporting

| Library          | Version | Purpose    | When to Use                                              |
| ---------------- | ------- | ---------- | -------------------------------------------------------- |
| `@emotion/react` | 11.x    | CSS-in-JS  | Required by MUI.                                         |
| `shallowequal`   | 1.x     | Comparison | Used for optimizing selectors in `useSyncExternalStore`. |

### Alternatives Considered

| Instead of        | Could Use | Tradeoff                                                                                              |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| Hand-rolled store | `zustand` | Zustand is great, but `useSyncExternalStore` is built into React and sufficient for HA state mapping. |
| MUI v6            | MUI v7    | v7 is now latest stable and has better CSS variable integration.                                      |

**Installation:**

```bash
npm install react@19 react-dom@19 @mui/material@7 @emotion/react@11 @emotion/styled@11 home-assistant-js-websocket@9
npm install -D @types/react@19 @types/react-dom@19
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── common/
│   ├── HassProvider.tsx    # Context Provider for HA connection
│   ├── hooks/
│   │   ├── useEntity.ts    # Typed entity hook
│   │   └── useHass.ts      # Access to raw connection/state
│   └── theme/
│       └── index.ts        # MUI v7 Theme configuration
```

### Pattern 1: Granular Entity Subscription

**What:** Use `useSyncExternalStore` with a selector to subscribe to individual entities.
**When to use:** In any component that displays or controls a single HA entity.
**Example:**

```typescript
// Source: Inspired by home-assistant-js-websocket README and React 19 docs
export function useEntity(entityId: string) {
  const hass = useHass(); // Accesses the external store
  return useSyncExternalStore(
    hass.subscribe,
    () => hass.states[entityId],
    () => hass.states[entityId]
  );
}
```

### Pattern 2: MUI v7 CSS Variables

**What:** Configure MUI to use CSS variables by default.
**When to use:** Global theme setup.
**Example:**

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true, // Native in MUI v7
  colorSchemes: {
    light: true,
    dark: true,
  },
});
```

### Anti-Patterns to Avoid

- **Monolithic State Injection:** Passing the entire `hass` object to every component via context will cause massive re-renders when ANY entity changes. Always use granular selectors.
- **String Refs:** React 19 deprecates string refs and `forwardRef` for most use cases; use the standard `ref` prop.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem              | Don't Build        | Use Instead                   | Why                                                             |
| -------------------- | ------------------ | ----------------------------- | --------------------------------------------------------------- |
| HA Connection        | Custom WebSocket   | `home-assistant-js-websocket` | Handles authentication, reconnection, and collection syncing.   |
| Theme Management     | Custom CSS Logic   | MUI `ThemeProvider`           | Handles color schemes, density, and transitions out of the box. |
| Deep State Selection | Custom `useEffect` | `useSyncExternalStore`        | Optimized for external state synchronization without tearing.   |

## Common Pitfalls

### Pitfall 1: Missing Reconnection Logic

**What goes wrong:** UI stops updating when the WebSocket disconnects or computer wakes from sleep.
**Why it happens:** The connection isn't automatically restored or subscriptions aren't re-established.
**How to avoid:** `home-assistant-js-websocket` handles most of this, but the provider must properly manage the connection lifecycle and handle `ERR_CONNECTION_LOST`.

### Pitfall 2: Memory Leaks

**What goes wrong:** Application becomes slow or crashes over time.
**Why it happens:** Multiple subscriptions are created but never cleaned up during component unmounting.
**How to avoid:** Ensure all `subscribeEntities` or collection subscriptions return an unsubscribe function that is called in the `useSyncExternalStore` cleanup or `useEffect` cleanup.

## Code Examples

### Typed Hass State (React 19 + TS)

```typescript
import { HassEntities, Connection } from 'home-assistant-js-websocket';

interface HassContextValue {
  entities: HassEntities;
  connection: Connection;
  callService: (
    domain: string,
    service: string,
    data?: object
  ) => Promise<void>;
}

// In HassProvider.tsx
const HassContext = createContext<HassContextValue | null>(null);
```

### Optimistic Toggle (React 19)

```typescript
const [optimisticState, setOptimisticState] = useOptimistic(
  entity.state,
  (state, newState) => newState
);

const handleToggle = async () => {
  setOptimisticState(entity.state === 'on' ? 'off' : 'on');
  await callService('switch', 'toggle', { entity_id: entityId });
};
```

## State of the Art

| Old Approach      | Current Approach     | When Changed | Impact                                   |
| ----------------- | -------------------- | ------------ | ---------------------------------------- |
| `forwardRef`      | `ref` prop           | React 19     | Simplified component wrappers.           |
| `CssVarsProvider` | `cssVariables: true` | MUI v7       | Integrated, faster CSS variable support. |
| `useFormState`    | `useActionState`     | React 19     | Standardized action state management.    |

**Deprecated/outdated:**

- `strings refs`: Removed in React 19.
- `findDOMNode`: Removed in React 19.
- `use-sync-external-store/shim`: Not needed if targeting React 18+.

## Open Questions

1. **HA Theme Mapping**
   - What we know: HA provides primary colors via its own theme.
   - What's unclear: Should we dynamically map HA colors to MUI primary/secondary or keep them decoupled?
   - Recommendation: Start decoupled for stability, add dynamic mapping in Phase 4 (Optimization).

## Sources

### Primary (HIGH confidence)

- React 19 Reference - [Hooks](https://react.dev/reference/react/hooks)
- MUI Material UI - [V7 Documentation](https://mui.com/material-ui/getting-started/)
- Home Assistant - [JS Websocket README](https://github.com/home-assistant/home-assistant-js-websocket/blob/master/README.md)

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Verified via npm info and official docs.
- Architecture: HIGH - Standard patterns for React 19 and HA integrations.
- Pitfalls: MEDIUM - Based on common HA development experience.

**Research date:** 2026-01-28
**Valid until:** 2026-02-28
