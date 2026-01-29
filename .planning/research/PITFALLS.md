# Domain Pitfalls: Migration to Shadcn & ESLint Stylistic

**Domain:** v2.0 Shadcn Migration & Linting Pivot (MUI -> Shadcn, Prettier -> ESLint Stylistic)
**Researched:** 2026-01-28

## Critical Pitfalls

Mistakes that cause rewrites, major regressions, or stalled migrations.

### Pitfall 1: CSS Specificity Wars (MUI vs. Tailwind)

**What goes wrong:** MUI (via Emotion) injects styles at the bottom of the `<head>` by default. Since CSS specificity for MUI's component selectors is higher than Tailwind's utility classes, Tailwind classes applied to MUI components (during the bridge phase) may be ignored.
**Why it happens:** Emotion's dynamic injection order and MUI's nested selectors (e.g., `.MuiSlider-thumb`).
**Consequences:** Developers use `!important` everywhere, leading to a maintenance nightmare.
**Prevention:**

- Use `StyledEngineProvider` with `injectFirst` in the root of the app.
- Configure Tailwind's `important` selector (e.g., `important: '#root'`) to boost utility specificity.
  **Detection:** Styles not applying in dev tools despite classes being present on the element.
  **Phase:** Phase 1 (Infrastructure Setup).

### Pitfall 2: Formatting "Flapping" (Prettier vs. ESLint Stylistic)

**What goes wrong:** If Prettier remains in the environment (e.g., in VSCode settings or husky hooks) while ESLint Stylistic is introduced, the code will constantly "flap" between two formatting styles.
**Why it happens:** IDEs often have "Format on Save" bound to Prettier by default.
**Consequences:** Massive, noisy diffs in every PR; CI failures that are hard to debug.
**Prevention:**

- Explicitly uninstall `prettier` and remove `.prettierrc`.
- Use a `.vscode/settings.json` file in the repo to force `editor.defaultFormatter` to `dbaeumer.vscode-eslint`.
- Add a pre-commit hook that only runs `eslint --fix`.
  **Detection:** Files changing formatting back and forth upon save.
  **Phase:** Phase 1 (Infrastructure Setup).

### Pitfall 3: Runtime Crashes from Removing Non-Null Assertions (`!`)

**What goes wrong:** Blindly removing `!` assertions to satisfy a new lint rule without adding proper runtime checks.
**Why it happens:** Developers treat the lint error as a "syntax fix" rather than a logic requirement.
**Consequences:** `undefined is not an object` errors in production for things that were previously "guaranteed" only by the developer's knowledge.
**Prevention:**

- Use "Search and Replace" with caution.
- Replace `!` with `?? throw new Error(...)` or early returns/type guards.
- Prioritize refactoring `useContext` and `useRef` to use custom hooks that handle the `null` state internally.
  **Detection:** New Sentry/logging errors after the linting rollout.
  **Phase:** Phase 2 (Type Safety Hardening).

---

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 1: The "Composition Explosion"

**What goes wrong:** Migrating from MUI (high-level components) to Shadcn (low-level primitives) leads to a massive increase in boilerplate in the application code.
**Why it happens:** MUI's `<Select>` includes the trigger, list, and item logic. Shadcn's requires composing 5+ Radix components.
**Prevention:** Create a "Bridge Library" or a local `components/ui/` wrapper that mimics the high-level API of the old MUI components during migration. Don't expose Radix primitives directly to feature folders yet.
**Detection:** PRs for simple forms becoming 300+ lines long.

### Pitfall 2: ESLint Performance Degradation

**What goes wrong:** Moving formatting logic into ESLint makes the linting process significantly slower, especially in large files.
**Why it happens:** ESLint is a full AST parser and rule engine; Prettier is a specialized, fast formatter.
**Prevention:** Use `eslint-plugin-unused-imports` and `@stylistic` rules selectively. Avoid running the full formatter on every file in the dev server; keep it to the IDE and CI.
**Detection:** "Save" taking >500ms in the IDE.

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable.

### Pitfall 1: Inconsistent Shadow DOM / Portal behavior

**What goes wrong:** Shadcn (Radix) portals components to the `body` by default. If MUI was configured to portal to a specific container (for theme scoping), styles might break for Modals/Selects.
**Prevention:** Ensure the `ThemeProvider` (for MUI) and the CSS Variable root (for Shadcn) both cover the entire `document.body` or use a shared portal container.

### Pitfall 2: Type Assertion Bypass via `any`

**What goes wrong:** Developers forbidden from using `as` might revert to `any` to "shut up" the compiler.
**Prevention:** Enable `no-explicit-any` alongside the forbidden type assertion rule.

---

## Phase-Specific Warnings

| Phase Topic        | Likely Pitfall           | Mitigation                                                                |
| ------------------ | ------------------------ | ------------------------------------------------------------------------- |
| **Infrastructure** | Prettier/ESLint Flapping | Force VSCode settings via `.vscode/settings.json`.                        |
| **Styles/UI**      | Specificity Wars         | Use `StyledEngineProvider injectFirst`.                                   |
| **Type Safety**    | Runtime crashes          | Mandatory code review for assertion removals; use Zod for API boundaries. |

## Sources

- [MUI Documentation: Tailwind CSS Integration](https://mui.com/material-ui/guides/interoperability/#tailwind-css)
- [ESLint Stylistic Migration Guide](https://eslint.style/guide/migration)
- [Shadcn UI Docs](https://ui.shadcn.com/)
- [TypeScript Handbook: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
