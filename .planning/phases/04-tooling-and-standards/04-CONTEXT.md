# Phase 4: Tooling & Standards - Context

**Gathered:** 2026-01-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish a unified stylistic and strict typing foundation by consolidating tools and enforcing assertion rules. This involves the complete removal of Prettier, the adoption of ESLint Stylistic, and a codebase-wide refactor of unsafe type assertions.

</domain>

<decisions>
## Implementation Decisions

### Formatting Style (ESLint Stylistic)

- **Semicolons**: Always enforce semicolons at the end of statements.
- **Quotes**: Use single quotes for all strings (unless escaping).
- **Trailing Commas**: Enforce trailing commas in all multi-line objects, arrays, and imports.
- **Indentation**: Standardize on 2 spaces for indentation.

### Remediation Patterns (Strict Typing)

- **Status**: Set `@typescript-eslint/consistent-type-assertions` to `error` immediately.
- **Scope**: Fix all existing violations within this phase (merged from Phase 6 hardening).
- **Preferred Pattern**: Use **Type Guards** (functions returning `val is Type`) to narrow types safely.
- **Exceptions**: Allow `as const` for literal narrowing.
- **Failure Behavior**: When narrowing fails (e.g. missing Home Assistant state), perform a **Silent Fail / Early Return**.

### Cleanup Strategy (Prettier Purge)

- **Dependencies**: Perform a full uninstall of `prettier`, `eslint-config-prettier`, and `eslint-plugin-prettier`.
- **Configs**: Delete `.prettierrc`, `.prettierignore`, and any other Prettier-specific files.
- **Scripts**: Update `package.json` to alias `npm run format` to `eslint --fix`.
- **IDE Enforcement**: Create `.vscode/settings.json` to force ESLint as the default formatter and disable Prettier for the workspace.

### Claude's Discretion

- Specific linting rules for complex cases (e.g. object property ordering, member-delimiter-style).
- Implementation of the `isEntity` and `isHass` type guard utilities.
- Exact structure of the ESLint Flat Config reorganization.

</decisions>

<specifics>
## Specific Ideas

- "Fix Everything Now" — The user wants the codebase clean of assertions before starting any shadcn migration.
- "Silent Fail" — Prefers the app not crashing if a type isn't narrowed, just gracefully not rendering the specific part.

</specifics>

<deferred>
## Deferred Ideas

- Full migration to shadcn components — Phase 7.
- CSS Cascade Layers setup — Phase 5.

</deferred>

---

_Phase: 04-tooling-and-standards_
_Context gathered: 2026-01-28_
