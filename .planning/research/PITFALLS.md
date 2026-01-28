# Domain Pitfalls

**Domain:** MUI Upgrade & TS Migration (React/Vite)
**Researched:** Tue Jan 27 2026

## Critical Pitfalls

Mistakes that cause rewrites, major broken features, or stalled progress.

### Pitfall 1: The "Implicit Any" Tsunami

**What goes wrong:** trying to rename all `.js` files to `.ts/.tsx` at once and setting `noImplicitAny: true` immediately.
**Why it happens:** Enthusiasm to "get to TypeScript" quickly without respecting the effort of typing legacy props.
**Consequences:** A codebase full of red squiggles, thousands of errors, and a paralyzed team that resorts to `any` everywhere just to compile, defeating the purpose of TS.
**Prevention:**

- **Strategy:** "Leaf-up" incremental migration. Start with shared components (atoms), then molecules, then pages.
- **Config:** Use `allowJs: true` in `tsconfig.json` initially. Migrate file-by-file.
- **Phase:** Phase 1 (Infra) sets up TS side-by-side. Phase 2 & 3 migrate specific domains.

### Pitfall 2: The Context "Empty Object" Trap

**What goes wrong:** Using `createContext({})` with an empty default object (seen in `src/common/HassContext.js`).
**Why it happens:** In JS, accessing `context.user` on an empty object just returns `undefined`. In Strict TS, it's a compile error: `Property 'user' does not exist on type '{}'`.
**Consequences:** Developers force-cast `as any` or defined loose types. Runtime errors occur when consumers access context before provider initialization.
**Prevention:**

- **Define Type:** `createContext<HassContextType | null>(null)`.
- **Guard:** Create a custom hook `useHass()` that throws if context is null.
- **Phase:** Phase 2 (Core Patterns).

### Pitfall 3: The "Grid v2" Prop Mismatch

**What goes wrong:** Upgrading to `@mui/material` v6 but keeping v5 `Grid` props (`xs`, `sm`) while importing `Grid2` (or assuming `Grid` works identical).
**Why it happens:** MUI v6 stabilized `Grid2`. It uses `size={{ xs: 12 }}` instead of `xs={12}` and `offset` instead of `xsOffset`.
**Consequences:** Layouts break silently or props are ignored. The `spacing` prop logic also changed (uses `gap` CSS now).
**Prevention:**

- **Audit:** Grep for `<Grid` usage.
- **Codemod:** Use MUI's official codemods _before_ manual refactoring.
- **Phase:** Phase 3 (UI Components).

### Pitfall 4: Theme Object Mutation

**What goes wrong:** Modifying the theme object after creation (e.g., `theme.palette.background.default = 'black'`) instead of declarative config.
**Why it happens:** Legacy JS pattern seen in `App.jsx`.
**Consequences:** TypeScript treats `theme` as Readonly or infers types based on the initial `createTheme` call. Mutations violate the type contract and may be ignored by internal MUI logic that expects an immutable theme config.
**Prevention:**

- **Pattern:** Move logic _inside_ `createTheme()` using conditional spread or variables.
- **Phase:** Phase 3 (UI Components - Theme).

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 1: `sx` Prop Type Inference Failures

**What goes wrong:** Passing complex dynamic objects or invalid CSS values to `sx` prop.
**Why it happens:** JS allows any string. TS validates against `SxProps<Theme>`.
**Consequences:** Obscure TS errors deep in MUI type definitions.
**Prevention:**

- **Typing:** Extract styles to variables typed as `SxProps<Theme>`.
- **Avoid:** Don't put heavy logic inside JSX `sx` prop.

### Pitfall 2: `react-is` Version Mismatch

**What goes wrong:** Runtime errors in strict mode due to conflicting React versions between MUI v6 and the app.
**Why it happens:** MUI v6 depends on `react-is` v19 logic but React 18 apps might resolve old versions.
**Prevention:**

- **Action:** Add `overrides` (npm/pnpm) or `resolutions` (yarn) for `react-is` in `package.json` if staying on React 18.

### Pitfall 3: Custom Element Typing (`react-panel`)

**What goes wrong:** TypeScript complains `Property 'react-panel' does not exist on type 'JSX.IntrinsicElements'`.
**Why it happens:** `src/App.jsx` styles a custom element `react-panel`.
**Prevention:**

- **Fix:** Add a `global.d.ts` extending `JSX.IntrinsicElements`.

## Phase-Specific Warnings

| Phase Topic      | Likely Pitfall       | Mitigation                                                  |
| ---------------- | -------------------- | ----------------------------------------------------------- |
| **Setup**        | `tsconfig` too loose | Set `strict: true` from day 1, but use `allowJs: true`.     |
| **Core**         | `HassContext` typing | Don't use `any`. Define the Shape of the Hass object early. |
| **UI Migration** | Grid2 Layout Breaks  | Don't migrate all Grids at once. Do it per-page.            |
| **Cleanup**      | `any` accumulation   | Set a "Zero New Any" policy in CI/CD (eslint).              |

## Sources

- [MUI v6 Migration Guide](https://mui.com/material-ui/migration/upgrade-to-v6/) (HIGH Confidence)
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) (HIGH Confidence)
- Project Codebase Analysis (`App.jsx`, `HassContext.js`) (HIGH Confidence)
