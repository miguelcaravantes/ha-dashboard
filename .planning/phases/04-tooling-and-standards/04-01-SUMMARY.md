---
phase: 04-tooling-and-standards
plan: 01
subsystem: Tooling
tags: [eslint, stylistic, jsonc, prettier-purge]
requires: []
provides: [unified-formatting, json-linting]
affects: [all-future-code]
tech-stack:
  added: [@stylistic/eslint-plugin, eslint-plugin-jsonc, jsonc-eslint-parser]
  patterns: [ESLint-only formatting]
key-files:
  created: []
  modified: [eslint.config.js, package.json, .vscode/settings.json]
decisions:
  - Replaced Prettier with ESLint Stylistic to reduce toolchain complexity.
  - Added JSONC support to handle comments in configuration files (e.g., tsconfig.json).
  - Configured VS Code to use ESLint as the sole formatter for the workspace.
metrics:
  duration: 12m
  completed: 2026-01-29
---

# Phase 04 Plan 01: Purge Prettier and Configure Stylistic Summary

## One-liner

Successfully removed Prettier and consolidated code formatting into ESLint using Stylistic and JSONC plugins.

## Objectives Accomplished

- **Prettier Purged**: Uninstalled `prettier`, `eslint-config-prettier`, and `eslint-plugin-prettier`. Deleted `.prettierrc.json`.
- **ESLint Stylistic Configured**: Integrated `@stylistic/eslint-plugin` with rules for semi-colons, quotes, indentation, comma-dangle, and JSX quotes.
- **JSON Support Added**: Integrated `eslint-plugin-jsonc` and `jsonc-eslint-parser` to handle linting and formatting of JSON/JSONC files.
- **IDE Integration**: Updated `.vscode/settings.json` to enforce ESLint as the default formatter and enable auto-fix on save.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Dependency conflict during uninstall**

- **Found during:** Task 1
- **Issue:** `npm uninstall` failed due to peer dependency conflicts between `mdi-material-ui` and `@mui/material`.
- **Fix:** Used `--legacy-peer-deps` to proceed with uninstallation.
- **Files modified:** package-lock.json
- **Commit:** 09223e1

**2. [Rule 1 - Bug] Double quote formatting in eslint.config.js**

- **Found during:** Task 2
- **Issue:** `eslint.config.js` was written with double quotes, violating the new single-quote rule.
- **Fix:** Ran `npm run format` to auto-fix the config file itself.
- **Files modified:** eslint.config.js
- **Commit:** c26b91a

**3. [Rule 2 - Missing Critical] JSONC support for tsconfig.json**

- **Found during:** Task 2
- **Issue:** `tsconfig.json` contains comments, but the initial JSON configuration (recommended-with-json) forbade them.
- **Fix:** Switched to `recommended-with-jsonc` for JSON files to support comments in config files.
- **Files modified:** eslint.config.js
- **Commit:** c26b91a

## Verification Results

- `npm run lint`: PASSED (0 warnings)
- Prettier artifacts: NONE (checked with `ls -la .prettier*` and `npm list prettier`)
- VS Code settings: VALIDATED (manually inspected `settings.json`)

## Next Phase Readiness

- Tooling is now unified.
- Ready for Plan 02: Enable strict assertion rules.
