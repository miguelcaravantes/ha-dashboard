# Phase 01: Infrastructure Foundation - Research

**Researched:** 2026-01-27
**Domain:** Frontend Build Pipeline & Developer Experience
**Confidence:** HIGH

## Summary

The goal is to modernize the build pipeline and developer environment. The current setup is a mix of modern (Vite 6, React 18) and legacy (manual HMR injection scripts, split-brain package locks).

The research confirms **Vite 7** is stable (v7.3.1) and ready for use. It requires **Node.js 20.19+ or 22.12+**. The project should standardize on **Node 22 (LTS)** to future-proof. **ESLint 9** with Flat Config is already present but needs to be updated to support TypeScript, as the current config only targets JS files despite `tsconfig.json` being present.

The `dev.js` file is confirmed to be legacy manual HMR injection code that is likely obsolete with modern `@vitejs/plugin-react`. It should be removed in favor of standard Vite HMR.

**Primary recommendation:** Upgrade to Vite 7, enforce Node 22+ via `.nvmrc`/`engines`, delete `yarn.lock`/`dev.js`, and fully enable TypeScript in ESLint.

## Standard Stack

### Core

| Library      | Version    | Purpose         | Why Standard                                             |
| ------------ | ---------- | --------------- | -------------------------------------------------------- |
| `node`       | 22.x (LTS) | Runtime         | Required by Vite 7 (min 20.19+); Long Term Support.      |
| `npm`        | Latest     | Package Manager | Locked decision to resolve split-brain state.            |
| `vite`       | ^7.3.0     | Build Tool      | Latest stable; incredibly fast; excellent React support. |
| `typescript` | ^5.0.0     | Language        | Standard for modern web dev; already present in devDeps. |

### Supporting

| Library                | Version | Purpose     | When to Use                                     |
| ---------------------- | ------- | ----------- | ----------------------------------------------- |
| `@vitejs/plugin-react` | Latest  | HMR/Refresh | Essential for React Fast Refresh in Vite.       |
| `eslint`               | ^9.0.0  | Linting     | Modern Flat Config system (`eslint.config.js`). |
| `prettier`             | Latest  | Formatting  | Standard code formatter.                        |
| `typescript-eslint`    | Latest  | TS Linting  | Required to lint TS files in ESLint 9.          |

### Alternatives Considered

| Instead of | Could Use              | Tradeoff                                                                            |
| ---------- | ---------------------- | ----------------------------------------------------------------------------------- |
| `dev.js`   | `@vitejs/plugin-react` | `dev.js` is a manual, fragile implementation of what the plugin does automatically. |
| `yarn`     | `pnpm`                 | `pnpm` is faster/efficient, but `npm` was chosen for simplicity/ubiquity.           |

**Installation:**

```bash
# Clean install ensuring npm usage
rm yarn.lock
npm install
npm install -D vite@latest @vitejs/plugin-react@latest typescript-eslint
```

## Architecture Patterns

### Home Assistant Custom Panel

The project wraps React in a Custom Element (`HTMLElement`) to be loaded by Home Assistant.

**Key Config:**

- `base: './'` in `vite.config.ts` is CRITICAL so assets load relative to the dashboard URL, not root.
- `build.rollupOptions.input`: Explicitly point to the entry file.

### Recommended Project Structure

```
/
├── .nvmrc             # Enforce Node 22
├── package.json       # engines: { node: ">=22" }
├── vite.config.ts     # Modern Vite 7 config
├── eslint.config.js   # Flat config with TS support
└── src/
    ├── index.jsx      # Entry point (Custom Element definition)
    └── App.jsx        # Main React Root
```

## Don't Hand-Roll

| Problem     | Don't Build                             | Use Instead            | Why                                                                    |
| ----------- | --------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| **HMR**     | Manual script injection (like `dev.js`) | `@vitejs/plugin-react` | The plugin handles the complex React Refresh boundary logic correctly. |
| **Linting** | Custom scripts                          | `eslint` + `prettier`  | Standard, editor-integrated, maintained.                               |

## Common Pitfalls

### Pitfall 1: Node Version Mismatch

**What goes wrong:** Vite 7 crashes with "Node.js 18 is no longer supported".
**Why it happens:** User has old Node version active.
**How to avoid:** Add `.nvmrc` and `engines` field in `package.json`.
**Warning signs:** `npm install` warnings or immediate build failures.

### Pitfall 2: Split-Brain Dependencies

**What goes wrong:** `npm install` ignores `yarn.lock`, leading to different versions than previous `yarn` builds.
**Why it happens:** Both lockfiles exist.
**How to avoid:** Delete `yarn.lock` IMMEDIATELY. Commit only `package-lock.json`.

### Pitfall 3: ESLint Ignoring TS Files

**What goes wrong:** TS files have errors but `npm run lint` passes.
**Why it happens:** Current `eslint.config.js` only targets `**/*.{js,jsx}`.
**How to avoid:** Update config `files` to include `ts,tsx` and add `typescript-eslint` configs.

## Code Examples

### Vite 7 Configuration (TypeScript)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Vital for HA
  server: {
    port: 8080,
    hmr: true, // Let Vite handle it
  },
  build: {
    target: 'esnext',
    assetsDir: './',
    rollupOptions: {
      input: 'src/index.jsx',
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
  plugins: [react()],
});
```

### ESLint Flat Config with TypeScript

```javascript
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

## State of the Art

| Old Approach | Current Approach   | When Changed   | Impact                                                  |
| ------------ | ------------------ | -------------- | ------------------------------------------------------- |
| Vite 6       | Vite 7             | late 2024/2025 | Faster builds, newer Node reqs, better modern defaults. |
| `eslintrc`   | `eslint.config.js` | ESLint 9       | Simpler, modular config (Flat Config).                  |
| Manual HMR   | Plugin HMR         | React 17+      | Reliable state preservation during dev.                 |

## Sources

### Primary (HIGH confidence)

- Official Vite Docs (WebFetch) - Verified v7.3.1 release and Node requirements.
- Official ESLint Docs (WebFetch) - Verified Flat Config structure.
- Local Codebase - Verified current split-brain state and legacy `dev.js`.

### Secondary (MEDIUM confidence)

- Local `dev.js` analysis - inferred purpose as manual HMR shim for HA.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Verified latest versions.
- Architecture: HIGH - HA Custom Panel pattern is well-known.
- Pitfalls: HIGH - Node version issues are documented breaking changes in Vite 7.

**Research date:** 2026-01-27
**Valid until:** ~6 months (Vite 8 release)
