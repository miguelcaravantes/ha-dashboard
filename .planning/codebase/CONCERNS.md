# Codebase Concerns

**Analysis Date:** 2026-01-27

## Tech Debt

**Hardcoded Dashboard Configuration:**

- Issue: `CardDashboard.jsx` contains hardcoded entity IDs and layout structure.
- Files: `src/features/CardDashboard.jsx`
- Impact: Modifying the dashboard requires code changes rather than configuration updates. Tightly couples the frontend to specific Home Assistant entity IDs.
- Fix approach: Move configuration to a JSON/config file or fetch from an API/Home Assistant.

**Manual Icon Mapping:**

- Issue: `Icon.jsx` maintains a large manual mapping of string keys to icon components.
- Files: `src/features/Icon.jsx`
- Impact: Adding new icons requires code changes. Large file size due to imports.
- Fix approach: Use dynamic imports or a library that supports string-based icon lookup (e.g., `@mdi/js` with a generic component).

**Lack of TypeScript:**

- Issue: Project uses plain JavaScript/JSX.
- Files: All source files (`src/**/*.jsx`, `src/**/*.js`)
- Impact: Missing type safety, poorer developer experience (no intellisense for props), higher risk of runtime errors.
- Fix approach: Incrementally migrate to TypeScript (`.tsx`/`.ts`).

**Missing Prop Validation:**

- Issue: Many components lack `PropTypes` or manual prop validation.
- Files: `src/features/BinarySensor.jsx`, `src/features/CardDashboard.jsx`, etc.
- Impact: Runtime errors when incorrect props are passed; difficult to understand component interface.
- Fix approach: Add `prop-types` or migrate to TypeScript.

## Known Bugs

**Leftover Console Logs:**

- Symptoms: Console noise in production.
- Files: `src/features/Icon.jsx`
- Trigger: Rendering icons.
- Workaround: Remove `console.log` statements.

**Potential Null Reference in ProfileImg:**

- Symptoms: Returns null (renders nothing) silently if userId is missing.
- Files: `src/features/ProfileImg.jsx`
- Trigger: Component usage without `userId` prop.
- Workaround: Ensure `userId` is passed, or provide a fallback/placeholder image.

## Security Considerations

**Dependency Vulnerabilities:**

- Risk: Using older versions of libraries (`react-scripts` or old `vite` plugins might be present implicitly, though `vite` itself is v6).
- Files: `package.json`
- Current mitigation: None explicit.
- Recommendations: Run `npm audit` or `yarn audit` regularily.

## Fragile Areas

**Home Assistant Integration:**

- Files: `src/features/CardDashboard.jsx`, `src/common/hooks/useEntity.js`
- Why fragile: Relies on exact entity ID matches. If an entity is renamed in HA, the dashboard breaks without warning.
- Safe modification: Verify entity IDs against a live HA instance or schema.
- Test coverage: Zero.

## Test Coverage Gaps

**Total Lack of Tests:**

- What's not tested: The entire application.
- Files: All.
- Risk: High risk of regression when refactoring or adding features. No verification of logic (e.g., `useEntity` hook).
- Priority: High. Need to setup Vitest or Jest.

## Missing Critical Features

**Dynamic Configuration:**

- Problem: Dashboard is static code.
- Blocks: User customization without redeployment.

**Error Boundary:**

- Problem: While `ErrorBoundary.jsx` exists (`src/features/EntityCard/ErrorBoundary.jsx`), it seems localized. A global error boundary might be needed.
- Blocks: App crashing completely on unhandled errors in other parts.

---

_Concerns audit: 2026-01-27_
