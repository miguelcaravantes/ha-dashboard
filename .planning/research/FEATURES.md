# Feature Landscape

**Domain:** React Dashboard Upgrade (MUI v6 & TypeScript)
**Researched:** Jan 27, 2026

## Table Stakes

Features users and developers expect. Missing = product feels incomplete or "legacy".

| Feature                      | Why Expected                                                        | Complexity | Notes                                                                     |
| ---------------------------- | ------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| **Strict TypeScript Config** | Core value of "type-safe codebase". Prevents common runtime errors. | Low        | `strict: true` in `tsconfig.json`. Requires TS 4.9+.                      |
| **MUI v6 Core Components**   | Standard modern UI library features.                                | Medium     | Use `Grid2` (stable), `ListItemButton` (replacing interactive ListItems). |
| **CSS Theme Variables**      | Modern theming standard. Resolves SSR flickering for dark mode.     | Low        | Enable `cssVariables: true` in `createTheme`.                             |
| **Native Dark Mode**         | User expectation for modern dashboards.                             | Low        | Enable `colorSchemes: { dark: true }`.                                    |
| **Type-Safe Theming**        | Ensures custom theme values are discoverable and checked.           | Medium     | Requires Module Augmentation (`declare module '@mui/material/styles'`).   |

## Differentiators

Features that set the product apart. Not expected, but valued for performance and DX.

| Feature                   | Value Proposition                                                                   | Complexity | Notes                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| **Pigment CSS (Opt-in)**  | Zero-runtime CSS-in-JS. Unlocks React Server Components (RSC) & better performance. | High       | Requires build-tool integration (Vite/Next.js). Removes Emotion runtime cost. |
| **Container Queries**     | Responsive design based on component size, not viewport. Critical for dashboards.   | Medium     | Use `theme.containerQueries` (new in v6).                                     |
| **`sx` on HTML Elements** | Developer convenience. No need for `Box` wrappers just for styling.                 | Medium     | **Only available with Pigment CSS enabled.**                                  |
| **Standardized Gap**      | `Grid2` uses CSS `gap` property instead of negative margins.                        | Low        | Cleaner CSS, fewer layout bugs.                                               |

## Anti-Features

Features to explicitly NOT build. Common mistakes in this domain.

| Anti-Feature                     | Why Avoid                                                  | What to Do Instead                                   |
| -------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| **`Unstable_Grid2`**             | Deprecated. Was the experimental version.                  | Use stable `Grid2`.                                  |
| **`LoadingButton` (Lab)**        | Moved to core.                                             | Use `Button` with `loading` prop.                    |
| **`ListItem` interactive props** | `button`, `autoFocus`, `disabled` removed from `ListItem`. | Use `ListItemButton`.                                |
| **Typography System Props**      | `color="primary.main"` deprecated on Typography.           | Use `sx={{ color: 'primary.main' }}`.                |
| **`disableEqualOverflow`**       | Removed in v6. Grid now handles overflow correctly.        | Remove prop, rely on default `Grid2` behavior.       |
| **Loose TypeScript (`any`)**     | Defeats the purpose of "Strict" upgrade.                   | Use `unknown` for generic values and type narrowing. |
| **Direct Theme Mode Logic**      | Manual toggling/context for dark mode is brittle.          | Use `colorSchemes` and `useColorScheme` hook.        |

## Feature Dependencies

```
Strict TypeScript
└── Typescript 4.9+

Pigment CSS
├── Vite/Next.js Build Config
└── React 19 (Recommended/Required for full RSC)

MUI v6
└── React 17+ (React 19 ready)
```

## MVP Recommendation

For MVP, prioritize:

1.  **Strict TypeScript Setup:** Establish the safety net first.
2.  **MUI v6 Migration:** Update core components (`Grid2`, `Button`, `ListItemButton`).
3.  **CSS Variables & Color Schemes:** Future-proof the theming engine immediately.

Defer to post-MVP:

- **Pigment CSS:** Unless performance is critical _now_, the complexity of migration might delay the primary "Strict TS" goal. Evaluate if build tooling supports it easily.
- **Container Queries:** Adopt as needed for complex dashboard widgets.

## Sources

- [MUI v6 Upgrade Guide](https://mui.com/material-ui/migration/upgrade-to-v6/)
- [MUI v6 Release Blog](https://mui.com/blog/material-ui-v6-is-out/)
- [MUI TypeScript Guide](https://mui.com/material-ui/guides/typescript/)
