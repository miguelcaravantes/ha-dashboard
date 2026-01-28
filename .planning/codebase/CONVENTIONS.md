# Coding Conventions

**Analysis Date:** 2026-01-27

## Naming Patterns

**Files:**

- Components: PascalCase (e.g., `src/features/EntityCard/EntityCard.jsx`)
- Hooks: camelCase (e.g., `src/features/LightDetail/useLightDetail.js`)
- Utilities/Constants: camelCase (e.g., `src/constants.js`)
- Indexes: `index.js` used for barrel exports within features

**Functions:**

- Components: PascalCase (`EntityCard`)
- Event Handlers: `handle[Event]` (e.g., `handleIconClick`, `handleModelClose`)
- Utilities: camelCase

**Variables:**

- Standard: camelCase
- Booleans: `is[Condition]`, `has[Condition]`, `does[Condition]` (e.g., `doesSupportColor`)
- Constants: UPPER_SNAKE_CASE (e.g., `COLOR_MODE_HS`)

**Types:**

- JavaScript is used (no TypeScript types).
- `prop-types` is used for runtime validation (though disabled in ESLint config).

## Code Style

**Formatting:**

- **Prettier:** Used for automatic formatting.
- Settings:
  - Single quotes: `true`
  - Semicolons: `true` (implied by usage)
  - Trailing commas: ES5/ES8 default

**Linting:**

- **ESLint:** v9.17.0 with Flat Config (`eslint.config.js`).
- **Plugins:**
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
- **Rules:**
  - `react/prop-types`: `off` (Prop validation is relaxed)
  - `react/jsx-no-target-blank`: `off`

## Import Organization

**Order:**

1.  **React:** `import { ... } from 'react';`
2.  **External Libraries:** Third-party libs (e.g., `@mui/material`, `awesome-debounce-promise`).
3.  **Internal Components:** Relative imports (e.g., `./ErrorBoundary`, `../Icon`).
4.  **Internal Hooks/Utils:** (e.g., `../../common/hooks/useEntity`).
5.  **Constants:** (e.g., `../../common/domains`).

**Path Aliases:**

- None detected. Relative paths are used extensively (e.g., `../../common/`).

## Error Handling

**Patterns:**

- **Error Boundaries:** `ErrorBoundary` component catches React rendering errors.
  - Location: `src/features/EntityCard/ErrorBoundary.jsx`
  - Usage: Wraps component logic (e.g., `<ErrorBoundary entityId={props.entityId}>`).
- **Async Errors:** Handled within async functions or ignored/logged to console (implicit).

## Logging

**Framework:** `console` (No dedicated logging library).

**Patterns:**

- Minimal logging observed in production code.

## Comments

**When to Comment:**

- **Constants:** Explaining values (e.g., `// Possible color modes`).
- **Complex Logic:** Sparse usage.

**JSDoc:**

- Not strictly enforced or widely used.

## Component Design

**Structure:**

- **Outer/Inner Pattern:**
  - Outer component handles error boundaries or context providers.
  - Inner component (`[Name]Inner`) handles actual UI and logic.
  - Example: `EntityCard` wraps `EntityCardInner`.

**Hooks Usage:**

- Extensive use of `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`.
- **Custom Hooks:** Logic extracted to hooks (e.g., `useLightDetail`, `useEntity`).

**Styling:**

- **MUI System:** `styled` components and `sx` prop usage.
- **CSS-in-JS:** `css` tag from `@mui/material/styles` for keyframes/animations.

## Module Design

**Exports:**

- **Default Exports:** Primary components and hooks (`export default EntityCard`).
- **Named Exports:** Constants and utilities (`export { FAN_SUPPORT_SET_SPEED, ... }`).

**Feature Organization:**

- Feature-based directory structure (`src/features/[FeatureName]`).
- Features tend to be self-contained with their own sub-components.

---

_Convention analysis: 2026-01-27_
