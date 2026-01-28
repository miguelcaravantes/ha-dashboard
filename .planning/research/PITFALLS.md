# Domain Pitfalls

**Domain:** React Home Assistant Dashboard Modernization (Vite 7, React 19, MUI v6, Strict TS)
**Researched:** Jan 27, 2026

## Critical Pitfalls

Mistakes that cause rewrites, major regressions, or stalled migrations.

### Pitfall 1: The "Implicit Any" Avalanche (TypeScript)

**What goes wrong:** Enabling `noImplicitAny: true` (standard in Strict TS) on a codebase with hundreds of existing `.js`/`.jsx` files causes thousands of build errors, paralyzing the team.
**Why it happens:** Legacy JavaScript relies on implicit types. Renaming files to `.ts`/`.tsx` exposes every missing type definition simultaneously.
**Consequences:** Migration stalls; team turns off strict mode "temporarily" (forever); development velocity drops to zero.
**Prevention:**

- **Strategy:** "Leaf-up" incremental migration. Start with shared components (atoms), then molecules, then pages.
- **Config:** Use `allowJs: true` and `checkJs: false` in `tsconfig.json` initially. Migrate file-by-file.
- **Tooling:** Use `tsc --noEmit` in CI to prevent regression on _new_ TS files while ignoring legacy JS.

### Pitfall 2: React 19 Ref Callback Type Rejections

**What goes wrong:** React 19 + TypeScript rejects implicit returns in `ref` callbacks.
**Why it happens:** Old pattern `<div ref={c => instance = c} />` implicitly returns the instance. React 19 cleanup functions feature means TS now expects `void` or a cleanup function. Returning an instance is a type error.
**Consequences:** Build fails across many components using refs.
**Prevention:**

- **Fix:** Change to block body: `<div ref={c => { instance = c }} />`.
- **Codemod:** Run `npx react-codemod no-implicit-ref-callback-return` (or equivalent) before Strict TS enforcement.

### Pitfall 3: Vite 7 Node.js Version Lockout

**What goes wrong:** CI/CD pipelines fail immediately upon Vite 7 upgrade.
**Why it happens:** Vite 7 drops support for Node 18 (EOL). Requires Node 20.19+ or 22.12+.
**Consequences:** Blocked deployment.
**Prevention:** Upgrade Node.js in Dockerfiles, GitHub Actions, and developer machines _before_ touching `package.json`.

### Pitfall 4: The "Grid v2" & Pigment CSS Mismatch

**What goes wrong:** Upgrading to `@mui/material` v6 but keeping v5 `Grid` props (`xs`, `sm`) or mixing legacy Emotion styled components with new Pigment CSS patterns.
**Why it happens:** MUI v6 stabilized `Grid2` (uses `size={{ xs: 12 }}`) and moves toward zero-runtime CSS.
**Consequences:** Layouts break silently; `spacing` prop logic changes; potential double-loading of CSS engines (Emotion + Pigment).
**Prevention:**

- **Audit:** Grep for `<Grid` usage. Use MUI codemods.
- **CSS Engine:** Stick to Emotion adapter for MUI v6 initially. Don't migrate to Pigment CSS in the same phase as the v6 upgrade.

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 5: The Context "Empty Object" Trap

**What goes wrong:** Using `createContext({})` with an empty default object (seen in `src/common/HassContext.js`).
**Why it happens:** In Strict TS, accessing properties on `{}` is a compile error (`Property 'user' does not exist on type '{}'`).
**Prevention:**

- **Define Type:** `createContext<HassContextType | null>(null)`.
- **Guard:** Create a custom hook `useHass()` that throws if context is null.

### Pitfall 6: Theme Object Mutation

**What goes wrong:** Modifying the theme object after creation (e.g., `theme.palette.background.default = 'black'` in `App.jsx`).
**Why it happens:** Legacy JS pattern. TS treats theme as Readonly or infers immutable types.
**Prevention:** Move logic _inside_ `createTheme()` using conditional spread or variables.

### Pitfall 7: `forwardRef` Zombie Code

**What goes wrong:** Continuing to use `forwardRef` wrapper when React 19 supports `ref` as a prop.
**Prevention:** It's technical debt. Use a codemod to strip `forwardRef` from functional components to simplify the strict TS typing.

### Pitfall 8: Custom Element Typing (`react-panel`)

**What goes wrong:** TypeScript complains `Property 'react-panel' does not exist on type 'JSX.IntrinsicElements'`.
**Why it happens:** `src/App.jsx` styles a custom element `react-panel`.
**Prevention:** Add a `global.d.ts` extending `JSX.IntrinsicElements`.

## Phase-Specific Warnings

| Phase Topic                 | Likely Pitfall           | Mitigation                                                       |
| --------------------------- | ------------------------ | ---------------------------------------------------------------- |
| **Infrastructure (Vite 7)** | CI Node version mismatch | Upgrade Node to v22+ first.                                      |
| **Strict TS**               | "The Big Bang" migration | Migrate `src/common` first, then leaf components. Use `allowJs`. |
| **React 19**                | Ref callback types       | Fix implicit returns in refs _before_ turning on Strict TS.      |
| **UI Framework (MUI v6)**   | Grid2 & CSS Conflict     | Use codemods for Grid; delay Pigment CSS adoption.               |
| **Core**                    | `HassContext` typing     | Define shape of Hass object early; avoid `any`.                  |

## Sources

- React 19 Release Notes (React Blog)
- Vite Migration Guide (v6 -> v7)
- MUI v6 Migration Guide & Grid2 docs
- Project Codebase Analysis (`App.jsx`, `HassContext.js`)
