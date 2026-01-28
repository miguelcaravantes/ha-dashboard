# Stack Research

**Domain:** React Home Assistant Dashboard
**Researched:** 2026-01-27
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology     | Version | Purpose       | Why Recommended                                                                                                               |
| -------------- | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **React**      | ^19.2.0 | UI Framework  | The standard for this project. v19 (Standard 2025) brings Actions and compiler improvements.                                  |
| **TypeScript** | ^5.9.0  | Language      | Explicit requirement. Configured for `strict: true` to ensure robust type safety matching HA standards.                       |
| **MUI Core**   | ^6.5.0  | UI Components | Explicit requirement. v6 is the mature "Standard 2025" release (pre-v7) offering stability and broad ecosystem compatibility. |
| **Vite**       | ^7.0.0  | Build Tool    | The de facto standard for React. Replaces CRA. Provides instant dev server and optimized production builds.                   |

### Supporting Libraries

| Library                         | Version | Purpose          | When to Use                                                                                                                    |
| ------------------------------- | ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **home-assistant-js-websocket** | ^9.6.0  | HA Connection    | **Mandatory.** The official library for Auth and WebSocket connection to Home Assistant. Provides standard `HassEntity` types. |
| **@mui/icons-material**         | ^6.5.0  | Icons            | Use for all UI icons to maintain consistency with MUI design system.                                                           |
| **zustand**                     | ^5.0.0  | State Management | Use for global client state (theme, connection status). Simpler than Redux, less boilerplate than Context.                     |
| **@tanstack/react-query**       | ^6.0.0  | Async State      | Use for fetching history/logbook data not covered by websocket subscriptions. Handles caching and loading states.              |
| **react-router-dom**            | ^7.0.0  | Routing          | Use if the dashboard requires multiple views/pages.                                                                            |

### Development Tools

| Tool         | Purpose    | Notes                                                                         |
| ------------ | ---------- | ----------------------------------------------------------------------------- |
| **ESLint**   | Linting    | Use Flat Config (`eslint.config.js`). Standardize on `typescript-eslint` v8+. |
| **Vitest**   | Testing    | Fast unit testing compatible with Vite. Replaces Jest.                        |
| **Prettier** | Formatting | Enforce consistent code style.                                                |

## Installation

```bash
# Core
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material

# Supporting
npm install home-assistant-js-websocket zustand @tanstack/react-query react-router-dom

# Dev dependencies
npm install -D typescript @types/react @types/react-dom vite @vitejs/plugin-react eslint prettier vitest
```

## Alternatives Considered

| Recommended | Alternative   | When to Use Alternative                                                                                                                          |
| ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **MUI v6**  | MUI v7        | If "latest bleeding edge" is preferred over the specific "MUI v6" requirement. v7 (released Mar 2025) is the current major, but v6 is requested. |
| **React**   | Lit           | If building a _custom card_ inside Lovelace rather than a standalone dashboard. Lit is the native framework of Home Assistant Frontend.          |
| **Zustand** | Redux Toolkit | If complex state transactions are required (rare for dashboards which mostly reflect remote state).                                              |
| **Vite**    | Next.js       | If SEO or Server Side Rendering is critical. Not recommended for an auth-gated dashboard app.                                                    |

## What NOT to Use

| Avoid                      | Why                                                              | Use Instead                   |
| -------------------------- | ---------------------------------------------------------------- | ----------------------------- |
| **Create React App (CRA)** | Deprecated and slow.                                             | Vite                          |
| **MUI v5**                 | Outdated (EOL). Missing modern slot props and performance fixes. | MUI v6                        |
| **axios / fetch**          | Manual socket handling is error-prone.                           | `home-assistant-js-websocket` |
| **Redux (Vanilla)**        | Too much boilerplate for this use case.                          | Zustand or React Context      |

## Stack Patterns by Variant

**If building a Custom Panel (iframe/module):**

- Use `vite-plugin-singlefile` or similar to bundle into one JS/CSS artifact.
- Ensure `publicPath` (base) is configured correctly for HA ingress.

**If utilizing Strict Mode:**

- Ensure `tsconfig.json` includes:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "exactOptionalPropertyTypes": true,
      "verbatimModuleSyntax": true
    }
  }
  ```

## Version Compatibility

| Package A           | Compatible With   | Notes                                          |
| ------------------- | ----------------- | ---------------------------------------------- |
| **MUI v6**          | **React 18 & 19** | Fully supports React 19.                       |
| **MUI v6**          | **Emotion 11**    | Requires Emotion 11 (installed via peer deps). |
| **ha-js-websocket** | **TypeScript 5+** | Native types included.                         |

## Sources

- **MUI Releases** — Verified v6.5.0 (July 2025) and v7.3.7 (Current). v6 is the mature stable choice.
- **Home Assistant Frontend** — Verified `home-assistant-js-websocket` v9.6.0 as the standard connection lib.
- **npm registry** — Verified React 19 and Vite 7 current status.

---

_Stack research for: React Home Assistant Dashboard_
_Researched: 2026-01-27_
