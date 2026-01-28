# Testing Patterns

**Analysis Date:** 2026-01-27

## Status: No Testing Framework

**Observation:**

- No testing framework (Jest, Vitest, Mocha) is currently installed in `package.json`.
- No configuration files (`jest.config.js`, `vitest.config.ts`) exist.
- No test files (`*.test.js`, `*.spec.js`) were found in the `src` directory.

## Recommendations

Since the project uses **Vite**, **React**, and **JavaScript**, the following setup is recommended for future implementation:

**Framework:**

- **Vitest:** Native integration with Vite, fast execution.
- **React Testing Library:** Standard for React component testing.

**Recommended Structure:**

- **Co-location:** Place test files next to source files.
  - `src/features/EntityCard/EntityCard.test.jsx`
  - `src/common/hooks/useEntity.test.js`

**Recommended Run Commands:**

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

## Current Test File Organization

**Location:**

- Not applicable.

**Naming:**

- Recommended: `[Filename].test.jsx` or `[Filename].spec.js`.

## Mocking

**Framework:**

- Not applicable.

**What to Mock (Future):**

- **Service Calls:** `callService` from `useHass`.
- **WebSocket:** Home Assistant connection.
- **Time/Timers:** Debounced functions (`awesome-debounce-promise`).

## Fixtures and Factories

**Test Data:**

- Not applicable.

## Coverage

**Requirements:**

- None enforced.

## Test Types

**Unit Tests:**

- None.

**Integration Tests:**

- None.

**E2E Tests:**

- None.

---

_Testing analysis: 2026-01-27_
