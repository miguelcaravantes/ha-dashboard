# Technology Stack

**Project:** ha-dashboard v2.0 Migration
**Researched:** 2026-01-28
**Confidence:** HIGH

## Recommended Stack Additions

### UI Framework (Pivot)

| Technology       | Version     | Purpose          | Why Recommended                                                                              |
| ---------------- | ----------- | ---------------- | -------------------------------------------------------------------------------------------- |
| **shadcn/ui**    | 3.7.0 (CLI) | Component System | Modern, accessible component architecture. v3 CLI supports Tailwind v4 and React 19.         |
| **Tailwind CSS** | 4.1.x       | Utility Styling  | v4 provides a CSS-first approach, zero-config setup via Vite plugin, and faster compilation. |
| **Lucide React** | 0.474.0+    | Iconography      | Standard icon set for shadcn/ui; lightweight and tree-shakable.                              |

### Linting & Formatting (Stylistic Pivot)

| Library                      | Version | Purpose         | Why Recommended                                                                          |
| ---------------------------- | ------- | --------------- | ---------------------------------------------------------------------------------------- |
| **@stylistic/eslint-plugin** | 5.7.1   | Stylistic Rules | Official replacement for deprecated ESLint stylistic rules. Enables removal of Prettier. |
| **typescript-eslint**        | 8.x     | TS Linting      | Essential for strict typing and `no-non-null-assertion` enforcement.                     |

### Supporting Libraries

| Library                   | Version | Purpose         | When to Use                                                              |
| ------------------------- | ------- | --------------- | ------------------------------------------------------------------------ |
| **@tailwindcss/vite**     | 4.x     | Vite 7 Plugin   | Required for Tailwind v4 integration in Vite 7.                          |
| **clsx / tailwind-merge** | latest  | Class Utilities | Standard for managing conditional Tailwind classes in shadcn components. |
| **next-themes**           | latest  | Dark Mode       | Simplest way to manage dark mode state in Vite/React apps.               |

## Development Tools

| Tool                     | Purpose           | Notes                                                            |
| ------------------------ | ----------------- | ---------------------------------------------------------------- |
| **shadcn CLI**           | Init & Components | Use `pnpm dlx shadcn@latest` for the newest registry support.    |
| **ESLint 9 Flat Config** | Linting Engine    | Already in project; must be updated to include stylistic plugin. |

## Installation

```bash
# Core & Supporting
pnpm add tailwindcss @tailwindcss/vite lucide-react clsx tailwind-merge next-themes

# Dev dependencies (ESLint Stylistic & TS)
pnpm add -D @stylistic/eslint-plugin
```

## Legacy Cleanup (Removals)

| Avoid / Remove             | Why                                                           | Use Instead               |
| -------------------------- | ------------------------------------------------------------- | ------------------------- |
| **prettier**               | Project requirement: Enforce stylistic rules via ESLint only. | @stylistic/eslint-plugin  |
| **eslint-plugin-prettier** | No longer needed once Prettier is removed.                    | Stylistic rules directly. |
| **shadcn-ui**              | Deprecated package name.                                      | `shadcn` (CLI v3+)        |

## Integration with Existing Stack

### Vite 7 + Tailwind v4

Tailwind v4 is integrated as a Vite plugin. This replaces the need for `postcss.config.js`.

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    // ...existing plugins
    tailwindcss(),
  ],
});
```

### MUI v7 Coexistence

Tailwind v4 should be scoped using CSS layers to ensure MUI v7 (Emotion/Material UI) styles take precedence or are managed correctly.

```css
/* src/index.css */
@import 'tailwindcss';

@layer base, mui, components, utilities;

@layer mui {
  /* MUI styles will naturally live here or outside Tailwind's specific utility layer */
}
```

### ESLint 9 Flat Config (Stylistic)

Update `eslint.config.js` to import and apply stylistic rules.

```javascript
import stylistic from '@stylistic/eslint-plugin';

export default [
  // ... existing configs
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs['recommended-flat'].rules,
      '@typescript-eslint/no-non-null-assertion': 'error',
      // project specific overrides
    },
  },
];
```

## Version Compatibility

| Package      | Compatible With     | Notes                                               |
| ------------ | ------------------- | --------------------------------------------------- |
| shadcn@3.7.0 | Tailwind v4.0+      | Native support for CSS-first config.                |
| React 19     | MUI v7 & shadcn     | Both ecosystems are fully compatible with React 19. |
| Node 22      | Vite 7 / Tailwind 4 | Verified environment support.                       |

## Sources

- [shadcn/ui Docs] — Vite Installation guide (verified Tailwind v4 support).
- [Tailwind CSS v4 Docs] — CSS-first configuration and Vite plugin details.
- [ESLint Stylistic Docs] — Manual migration for Flat Config v9.
- [NPM Registry] — Version verification (2026-01-28).

---

_Stack research for: ha-dashboard v2.0 Migration_
_Researched: 2026-01-28_
