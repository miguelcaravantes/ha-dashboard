# Phase 03: Component Migration - Research

**Researched:** 2026-01-28
**Domain:** React 19, MUI v7, TypeScript Strict Mode, Container Queries
**Confidence:** HIGH

## Summary

Phase 03 focuses on migrating existing JSX components to strictly-typed TSX, adopting modern React 19 patterns (specifically React Actions), and leveraging MUI v7's latest layout features (Grid v2 and Container Queries).

The project is already configured with `strict: true` and `noUncheckedIndexedAccess`, which means renaming `.jsx` to `.tsx` will immediately surface type errors that must be resolved. MUI v7 has promoted Grid v2 to the default `Grid` component and introduced native support for Container Queries, which simplifies responsive design for dashboard widgets.

**Primary recommendation:** Use an incremental migration strategy: rename components one by one, resolve strict TS errors, and refactor layouts to Grid v2 with Container Queries for better responsiveness in a widget-based UI.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library       | Version | Purpose           | Why Standard                                                     |
| ------------- | ------- | ----------------- | ---------------------------------------------------------------- |
| React         | 19.2.4  | UI Library        | Current project version; supports `useActionState`.              |
| @mui/material | 7.3.7   | Component Library | Current project version; includes Grid v2 and Container Queries. |
| TypeScript    | 5.9.3   | Static Typing     | Configured with `strict: true`.                                  |

### Supporting

| Library                 | Version | Purpose            | When to Use                                  |
| ----------------------- | ------- | ------------------ | -------------------------------------------- |
| use-sync-external-store | 1.2.0   | Store subscription | Used by `useEntity` to sync with Hass state. |
| mdi-material-ui         | 7.5.0   | Icons              | Standard icon set for Home Assistant.        |

## Architecture Patterns

### Recommended Project Structure

The current structure is solid. Migration should maintain:

```
src/
├── common/
│   └── hooks/       # useEntity.ts, etc.
├── features/        # Components grouped by feature
│   └── [Feature]/   # Feature-specific components (e.g., EntityCard)
└── types/           # Global type definitions
```

### Pattern 1: Strict Component Migration

**What:** Renaming `.jsx` to `.tsx` and defining explicit interfaces for Props and State.
**When to use:** For every component migrated in this phase.
**Example:**

```typescript
interface EntityCardProps {
  entityId: string;
  title?: string;
  color?: string | Record<number, string>;
}

const EntityCard: React.FC<EntityCardProps> = ({ entityId, title, color }) => {
  // logic
};
```

### Pattern 2: React Actions with `useActionState`

**What:** Handling mutations (e.g., toggling a light or updating a form) using the new React 19 Hook.
**When to use:** For any component that performs state mutations or form submissions.
**Example:**

```typescript
// Source: https://react.dev/reference/react/useActionState
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const result = await callService(...);
    return result;
  },
  initialState
);
```

### Pattern 3: MUI Grid v2 size-based layout

**What:** Replacing `xs`, `sm` props with the `size` prop.
**When to use:** All layout components using Grid.
**Example:**

```tsx
// Source: https://mui.com/material-ui/react-grid/
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Item />
  </Grid>
</Grid>
```

### Pattern 4: Container Queries for Widgets

**What:** Using `sx` shorthand for container queries to make widgets responsive to their container size rather than the viewport.
**When to use:** `EntityCard` and other dashboard widgets.
**Example:**

```tsx
// Source: https://mui.com/material-ui/customization/container-queries/
<Box sx={{
  containerType: 'inline-size',
  '& .child': {
    display: 'none',
    '@300': { display: 'block' } // Visible when container > 300px
  }
}}>
```

## Don't Hand-Roll

| Problem                | Don't Build                 | Use Instead            | Why                                                         |
| ---------------------- | --------------------------- | ---------------------- | ----------------------------------------------------------- |
| Container Queries      | Custom ResizeObserver       | MUI `@` shorthand      | Native CSS support via MUI is more performant and cleaner.  |
| Form/Action State      | Custom loading/error states | `useActionState`       | Built-in support for pending states and optimistic updates. |
| Entity ID Autocomplete | Hardcoded strings           | Template Literal Types | Allows for validation while keeping flexibility.            |

## Common Pitfalls

### Pitfall 1: `noUncheckedIndexedAccess` with Arrays

**What goes wrong:** Accessing `randomColors[index]` returns `T | undefined`, causing "Object is possibly 'undefined'" errors even if the index is valid.
**How to avoid:** Use a type guard or the non-null assertion operator `!` if the index is guaranteed to be safe.
**Example:** `const color = randomColors[Math.floor(Math.random() * randomColors.length)]!;`

### Pitfall 2: Nested Grids in v2

**What goes wrong:** Nested Grid containers in v2 inherit columns/spacing only if they are direct children.
**How to avoid:** Ensure `<Grid container>` is a direct child of another `<Grid>` or use `disableEqualOverflow` if layout issues occur.

### Pitfall 3: `useActionState` Argument Order

**What goes wrong:** The action function receives `(prevState, formData)`, which is different from standard event handlers.
**How to avoid:** Always define the action function with the `prevState` as the first argument.

## Code Examples

### Strictly Typed `useEntity` Autocomplete

To provide autocomplete for entity IDs, we can use a helper type:

```typescript
// src/types/entities.ts
export type EntityId = `${string}.${string}`; // Basic format validation

// If we want autocomplete for specific known entities:
export type KnownEntityId =
  | 'light.living_room'
  | 'switch.kitchen'
  | (string & {}); // The (string & {}) trick allows any string while keeping autocomplete
```

## State of the Art

| Old Approach       | Current Approach  | When Changed | Impact                                                 |
| ------------------ | ----------------- | ------------ | ------------------------------------------------------ |
| `Grid item xs={6}` | `Grid size={6}`   | MUI v6/v7    | Grid v2 is now the default; cleaner API.               |
| `useFormState`     | `useActionState`  | React 19     | Renamed and moved to `react` package.                  |
| Media Queries      | Container Queries | CSS 2023+    | Components respond to their own size, not screen size. |

## Open Questions

1. **Entity ID source:** Should we generate the list of `KnownEntityId` from a running Home Assistant instance via a script?
   - **Recommendation:** Start with Template Literal Types `${string}.${string}` and allow manual augmentation in a global `types` file.

## Sources

### Primary (HIGH confidence)

- [react.dev](https://react.dev/reference/react/useActionState) - React 19 `useActionState` documentation.
- [mui.com](https://mui.com/material-ui/react-grid/) - MUI v7 Grid (v2) documentation.
- [mui.com](https://mui.com/material-ui/customization/container-queries/) - MUI v7 Container Queries documentation.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Verified via package.json and official docs.
- Architecture: HIGH - Follows React 19 and MUI v7 best practices.
- Pitfalls: MEDIUM - Based on common TypeScript/MUI migration experiences.

**Research date:** 2026-01-28
**Valid until:** 2026-02-28
