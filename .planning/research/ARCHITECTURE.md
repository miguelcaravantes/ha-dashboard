# Architecture Patterns: Shadcn/ui Migration

**Domain:** React Home Assistant Dashboard (v2.0)
**Researched:** 2026-01-28
**Target:** React 19, Vite 7, Tailwind CSS v4, shadcn/ui

## Recommended Architecture

The v2.0 architecture pivots from a JS-centric component library (MUI) to a CSS-variable-centric utility-first approach (Tailwind/Shadcn). During the migration, a **Hybrid Layered Architecture** will be used to ensure both libraries coexist without style bleeding or specificity wars.

### Hybrid CSS Layering (Tailwind 4)

Tailwind 4's native support for CSS Cascade Layers is the core of our coexistence strategy. We wrap MUI's Emotion-generated styles in a lower-priority layer and Tailwind utilities in a higher-priority layer.

```css
/* global.css */
@layer mui, base, components, utilities;

@import 'tailwindcss';

/* Wrap MUI styles in the mui layer */
@layer mui {
  /* This is handled by StyledEngineProvider enableCssLayer in React */
}
```

### Component Boundaries (v2.0)

| Component          | Responsibility                           | Migration Status                                        |
| ------------------ | ---------------------------------------- | ------------------------------------------------------- |
| `MUI Component`    | Legacy features not yet migrated.        | Wrap in `StyledEngineProvider` with CSS layers enabled. |
| `Shadcn Component` | New/Migrated features.                   | Uses Tailwind utilities; overrides MUI if coincident.   |
| `Theme Bridge`     | Syncs HA CSS variables to Shadcn tokens. | Active listener on `hass` object changes.               |

### Data & Theme Flow

1. **HA Variables:** Home Assistant provides variables like `--primary-color`.
2. **Tailwind Bridge:** Our `global.css` maps these to Shadcn variables:
   ```css
   :root {
     --background: var(--primary-background-color);
     --foreground: var(--primary-text-color);
     --primary: var(--primary-color);
     /* ... */
   }
   ```
3. **React 19 Rendering:** Components use `cn()` utility to merge classes.

## Coexistence Strategy

### 1. Specificity Management

To keep the app functional during migration:

- **Enable CSS Layers in MUI:**
  ```tsx
  <StyledEngineProvider enableCssLayer>
    <GlobalStyles styles="@layer mui, base, components, utilities;" />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
  ```
- This ensures that a Tailwind class like `p-4` (utility layer) will always win over a MUI default padding (mui layer), regardless of selector complexity.

### 2. Portal Handling

Shadcn (Radix) uses Portals for Dialogs/Popovers. In a Custom Element context:

- Ensure `Radix` portals are configured to render inside the `<react-panel>` container to inherit the Tailwind scope if one is applied.
- By default, Radix renders at the end of `body`. Since we aren't using Shadow DOM, this works, but we must ensure `global.css` is truly global.

## Theme Injection (HA -> Tailwind)

We will avoid JS-based theme calculation where possible.

- **Approach:** Map HA CSS variables to Shadcn tokens in the `@theme` block of Tailwind 4.
- **Dynamic Updates:** Since HA updates variables on the `html` or `:host` element, Tailwind's `var()` references will update automatically without a React re-render.

## Order of Operations: Styling & Linting

To minimize codebase noise:

1. **Linting Transition (Immediate):**
   - Remove `prettier`.
   - Install `@stylistic/eslint-plugin`.
   - Run `eslint --fix` once. This establishes the "Stylistic" baseline.
2. **Infrastructure (v2.0 Foundation):**
   - Install Tailwind 4 and Shadcn CLI.
   - Configure CSS Layers.
3. **Component Migration (Incremental):**
   - Migrate one MUI component at a time.
   - Delete MUI imports only when a file is 100% migrated.

## No-Assertion Migration Strategy

The "no-assertion" policy removes the use of `!` (non-null assertion) to improve runtime safety in React 19.

- **Enforcement:** Enable `@typescript-eslint/no-non-null-assertion` as an error.
- **Pattern:** Replace `entity!` with:

  ```typescript
  // 1. Optional chaining
  const state = entity?.state;

  // 2. Type guards (Recommended for HA entities)
  if (!entity) return null;

  // 3. Functional assertions
  const entity = assertExists(states[id], `Entity ${id}`);
  ```

## Anti-Patterns to Avoid

### Anti-Pattern 1: "Important" Overrides

**What:** Using `!important` in Tailwind classes to beat MUI.
**Why bad:** Creates a specificity arms race.
**Instead:** Use CSS Cascade Layers (`@layer mui`).

### Anti-Pattern 2: Manual Variable Sync in JS

**What:** Using `useEffect` to read CSS variables and set React state.
**Why bad:** Causes unnecessary re-renders.
**Instead:** Reference the CSS variables directly in Tailwind's theme config.

## Sources

- [MUI Tailwind v4 Integration Guide](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [ESLint Stylistic Migration Guide](https://eslint-stylistic.github.io/guide/migration)
