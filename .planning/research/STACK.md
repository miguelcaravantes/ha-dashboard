# Technology Stack

**Project:** React Home Assistant Dashboard - Modernization
**Researched:** Jan 27, 2026
**Confidence:** HIGH

## Recommended Stack Additions & Changes

### Core Framework (Modernization)

| Technology     | Version   | Purpose     | Action                                                             |
| -------------- | --------- | ----------- | ------------------------------------------------------------------ |
| **Vite**       | `^7.0.0`  | Build Tool  | **Upgrade** from v6. Required for React 19 support and faster HMR. |
| **React**      | `^19.0.0` | UI Library  | **Upgrade** from v18. Enables Actions and `useOptimistic`.         |
| **React DOM**  | `^19.0.0` | UI Renderer | **Upgrade** to match React core.                                   |
| **TypeScript** | `^5.7.0`  | Language    | **Add**. Critical for "Strict TS" requirement.                     |

### UI & Styling

| Technology              | Version    | Purpose    | Action                                                                      |
| ----------------------- | ---------- | ---------- | --------------------------------------------------------------------------- |
| **@mui/material**       | `^6.0.0`   | Components | **Upgrade** from v5.10. Modern styling engine, better performance.          |
| **@mui/icons-material** | `^6.0.0`   | Icons      | **Add**. Replaces `mdi-material-ui`. Official support, better tree-shaking. |
| **@emotion/react**      | `^11.14.0` | Styling    | **Upgrade**. Peer dependency for MUI v6.                                    |
| **@emotion/styled**     | `^11.14.0` | Styling    | **Upgrade**. Peer dependency for MUI v6.                                    |

### Legacy Cleanup (Removals)

| Library                    | Replacement                         | Rationale                                                                                                              |
| -------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `mdi-material-ui`          | `@mui/icons-material`               | Package is effectively unmaintained (latest tag v4, irregular v7 updates). Switch to official MUI icons for stability. |
| `awesome-debounce-promise` | `use-debounce` or `lodash.debounce` | Unmaintained (7+ years). React 19 concurrency safe alternatives required.                                              |

### Development Tooling (New)

| Tool                    | Version   | Purpose                                               |
| ----------------------- | --------- | ----------------------------------------------------- |
| **typescript-eslint**   | `^8.0.0`  | **Add**. Required for strict TS linting.              |
| **vite-plugin-checker** | `^0.8.0`  | **Add**. Runs TS checks in Vite overlay.              |
| **@types/node**         | `^22.0.0` | **Add**. Type definitions for Node.js (config files). |
| **@types/react**        | `^19.0.0` | **Add**. React 19 type definitions.                   |
| **@types/react-dom**    | `^19.0.0` | **Add**. React DOM 19 type definitions.               |

## Configuration Requirements

### 1. TypeScript Strict Mode (`tsconfig.json`)

Must be created with `strict: true`.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2. Vite 7 Config (`vite.config.ts`)

Update `vite.config.js` to `vite.config.ts` and ensure React plugin is configured.

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

## Migration Notes

1.  **MUI v6 Migration**:
    - Run codemods if available, but v5 -> v6 is mostly additive.
    - Check `ThemeProvider` usage for deprecated theme variables.
2.  **Icon Migration**:
    - `import { Icon } from 'mdi-material-ui'` -> `import Icon from '@mui/icons-material/Icon'`.
    - Verify icon names; most standard Material icons match, but community ones might be missing. If a specific MDI icon is missing in MUI, import it from `@mdi/js` and use `<SvgIcon>`.

## Sources

- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [MUI Installation](https://mui.com/material-ui/getting-started/installation/)
- [Vite Releases](https://github.com/vitejs/vite/releases)
