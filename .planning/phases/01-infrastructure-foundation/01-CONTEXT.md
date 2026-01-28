# Phase 1: Infrastructure Foundation - Context

**Gathered:** 2026-01-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Developer environment and build pipeline support modern stack. Replaces legacy build system with Vite 7 and aligns Node.js environment.

</domain>

<decisions>
## Implementation Decisions

### Package Manager

- Standardize on `npm`.
- Delete `yarn.lock` to resolve split-brain state.

### Node Version Enforcement

- Strict enforcement.
- Add `.nvmrc` for developer convenience.
- Add `engines` field to `package.json` to enforce version constraints at install time.
- Target LTS (22.x/24.x).

### Vite 7 Upgrade

- Perform a simple package version bump.
- Current configuration is close enough to not require major refactoring.

### Legacy Cleanup

- Immediate action: Remove `yarn.lock`.
- `dev.js`: Flagged for investigation. It appears to be a manual script injection helper hardcoded to localhost:8080. Evaluate if this is still needed with the modern Vite 7 HMR setup.

</decisions>

<specifics>
## Specific Ideas
- The project currently contains both `package-lock.json` and `yarn.lock`. `package-lock.json` is the source of truth.
- `package.json` scripts (`start`, `build`, `lint`) are relatively standard but `lint` targets JS files specifically (`src/**/*.js`), while the project has a `tsconfig.json`. This should be updated to include TS files or use a modern linting setup.
</specifics>

<deferred>
## Deferred Ideas
- None explicitly deferred yet.
</deferred>
