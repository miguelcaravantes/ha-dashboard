# Phase 04: Tooling & Standards - Research

**Researched:** 2026-01-28
**Domain:** Tooling Consolidation & Type Safety
**Confidence:** HIGH

## Summary

Phase 4 focuses on unifying the project's stylistic and typing standards. This involves the complete removal of Prettier in favor of **ESLint Stylistic**, and the enforcement of strict TypeScript assertion rules to eliminate unsafe `as` and `<Type>` casting.

The standard approach in 2026 for this pivot is to use the `@stylistic/eslint-plugin` with ESLint Flat Config, leveraging its factory function for rapid, consistent configuration. Type safety will be enforced via `@typescript-eslint/consistent-type-assertions`, forcing a transition from "trust me" casting to runtime-verified **Type Guards**.

**Primary recommendation:** Use `@stylistic/eslint-plugin`'s `customize` factory for formatting, and implement a central `type-guards.ts` utility to facilitate the removal of assertions.

## Standard Stack

### Core

| Library                    | Version | Purpose            | Why Standard                                                       |
| -------------------------- | ------- | ------------------ | ------------------------------------------------------------------ |
| `@stylistic/eslint-plugin` | ^5.7.1  | Unified formatting | Successor to deprecated ESLint/TS-ESLint stylistic rules.          |
| `typescript-eslint`        | ^8.54.0 | TypeScript linting | Current industry standard for TS linting with Flat Config support. |
| `eslint`                   | ^9.17.0 | Linter Core        | Latest major version supporting Flat Config.                       |

### Supporting

| Library               | Version | Purpose                | When to Use                |
| --------------------- | ------- | ---------------------- | -------------------------- |
| `eslint-plugin-react` | ^7.37.2 | React-specific linting | Always for React projects. |

### Alternatives Considered

| Instead of       | Could Use | Tradeoff                                                                                                           |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| ESLint Stylistic | Prettier  | Prettier is less configurable and requires a separate tool/plugin chain. Stylistic unifies everything into ESLint. |

**Installation:**

```bash
npm uninstall prettier eslint-config-prettier eslint-plugin-prettier
npm install -D @stylistic/eslint-plugin
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── common/
│   └── utils/
│       └── type-guards.ts   # Centralized type guards for the project
└── ...
```

### Pattern 1: ESLint Stylistic Factory (Flat Config)

**What:** Using the `customize` factory to set global stylistic preferences.
**When to use:** In `eslint.config.js` to replace all Prettier rules.
**Example:**

```javascript
// Source: https://eslint.style/guide/config-presets
import stylistic from '@stylistic/eslint-plugin';

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    commaDangle: 'always-multiline',
  }),
];
```

### Pattern 2: Safe Type Guarding

**What:** Replacing `as` with functions that verify types at runtime.
**When to use:** Whenever data comes from external sources (Hass API, DOM, `window`).
**Example:**

```typescript
// Source: https://typescript-eslint.io/rules/consistent-type-assertions/
function isHassEntity(val: unknown): val is HassEntity {
  return (
    typeof val === 'object' &&
    val !== null &&
    'entity_id' in val &&
    'state' in val
  );
}

// Usage
const stateObj = hass.states[id];
if (!isHassEntity(stateObj)) return null;
// stateObj is now safely HassEntity
```

### Anti-Patterns to Avoid

- **Implicit `any` casting:** Using `val as any` to bypass the linter. Instead, use `val as unknown` if absolutely necessary, but preferred is a type guard.
- **Mixed Formatter configuration:** Having both Prettier and ESLint enabled in the IDE, which causes "fight" loops.

## Don't Hand-Roll

| Problem         | Don't Build    | Use Instead          | Why                                                                   |
| --------------- | -------------- | -------------------- | --------------------------------------------------------------------- |
| Code Formatting | Custom scripts | `@stylistic`         | Battle-tested, supports JS/TS/JSX, and handles edge cases of ASI.     |
| Assertion Rules | Custom regex   | `@typescript-eslint` | Correctly parses AST to distinguish between `as` and generic casting. |

## Common Pitfalls

### Pitfall 1: `as const` Confusion

**What goes wrong:** Developers might think `as const` is banned by the new rule.
**Why it happens:** The rule name implies _all_ assertions are banned.
**How to avoid:** Explicitly document that `as const` is allowed and encouraged for literal narrowing.

### Pitfall 2: VS Code Formatter Conflict

**What goes wrong:** IDE continues to use Prettier or default formatter.
**Why it happens:** User-level VS Code settings often override project settings.
**How to avoid:** Commit `.vscode/settings.json` with `editor.defaultFormatter` set to `dbaeumer.vscode-eslint`.

## Code Examples

### Unified ESLint Stylistic Config

```javascript
// eslint.config.js
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'semi', requireLast: true },
          singleline: { delimiter: 'semi', requireLast: false },
        },
      ],
      '@stylistic/indent-binary-ops': ['error', 2],
    },
  },
];
```

### Strict Type Assertion Rule

```javascript
// eslint.config.js
export default [
  {
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
          // Note: objectLiteralTypeAssertions and arrayLiteralTypeAssertions
          // are implied by assertionStyle: 'never'
        },
      ],
    },
  },
];
```

## State of the Art

| Old Approach      | Current Approach | When Changed | Impact                                                         |
| ----------------- | ---------------- | ------------ | -------------------------------------------------------------- |
| Prettier + ESLint | ESLint Stylistic | 2024/2025    | Single tool for both logic and style; zero conflict.           |
| `as Type` casting | Type Guards      | Continuous   | Moves type errors from runtime crashes to handled logic paths. |

## Open Questions

1. **Window Augmentation**: The project uses complex `window as ...` casting for Home Assistant panel integration.
   - Recommendation: Define a global `d.ts` for `Window` interface extension or use a dedicated `getHassWindow()` utility with a single `unknown` cast.
2. **`as const` in JSX**: Sometimes used for style objects.
   - Recommendation: Keep allowed as it's safe.

## Sources

### Primary (HIGH confidence)

- `https://eslint.style/` - Official ESLint Stylistic documentation.
- `https://typescript-eslint.io/rules/consistent-type-assertions/` - Official TS-ESLint rule documentation.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Libraries are current and well-documented.
- Architecture: HIGH - Flat Config and Type Guards are standard TS patterns.
- Pitfalls: MEDIUM - IDE behavior varies by user.

**Research date:** 2026-01-28
**Valid until:** 2026-02-28
