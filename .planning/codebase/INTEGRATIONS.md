# External Integrations

**Analysis Date:** 2026-01-27

## APIs & External Services

**Home Assistant (Host Environment):**

- **Type:** Host Application (Custom Panel)
- **Mechanism:** The application runs as a Custom Element (`react-panel`) inside the Home Assistant frontend.
- **Connection:** The `hass` object is injected directly into the `react-panel` element via a property setter.
- **State Management:**
  - `src/index.jsx`: Creates a local store that subscribes to the `hass` object.
  - `src/common/hooks/useHass.js`: Exposes the `hass` object to components via `useSyncExternalStore`.
  - `src/common/hooks/useEntity.js`: Helper to access specific entity states from `hass.states`.
- **Interactions:**
  - Reads state from `hass.states`.
  - Calls services (presumed) via `hass.callService` (standard HA pattern).

## Data Storage

**Databases:**

- None. The application is stateless and relies entirely on Home Assistant for state.

**File Storage:**

- Local filesystem only (static assets served by Home Assistant or local dev server).

**Caching:**

- None explicit, relies on browser cache and React state.

## Authentication & Identity

**Auth Provider:**

- **Home Assistant:**
  - The dashboard inherits the authentication session of the parent Home Assistant window.
  - No separate login or token management is required within the dashboard code.

## Monitoring & Observability

**Error Tracking:**

- None detected.
- `src/features/EntityCard/ErrorBoundary.jsx`: Implements a React Error Boundary for UI resilience.

**Logs:**

- Console logs (browser dev tools).

## CI/CD & Deployment

**Hosting:**

- **Home Assistant:** The built assets (`[name].js`) are intended to be loaded by Home Assistant as a Lovelace resource or Custom Panel.

**CI Pipeline:**

- None detected.

## Environment Configuration

**Required env vars:**

- None.

**Secrets location:**

- No secrets management detected (likely not needed as it runs client-side within an authenticated context).

## Webhooks & Callbacks

**Incoming:**

- None.

**Outgoing:**

- None (interactions are via the `hass` object methods).

---

_Integration audit: 2026-01-27_
