# Phase 05: UI Infrastructure - Research

**Researched:** 2026-01-28
**Domain:** UI Infrastructure (Tailwind v4, MUI v7, shadcn/ui)
**Confidence:** HIGH

## Summary

This phase initializes the modern UI foundation for the Home Assistant Dashboard v2.0. The primary goal is to establish a hybrid styling environment where Tailwind CSS v4 and MUI v7 coexist without specificity conflicts. This is achieved using **CSS Cascade Layers**, where MUI styles are relegated to a lower-priority layer (`@layer mui`), ensuring Tailwind utilities always take precedence.

We will also initialize **shadcn/ui** as the future-proof component registry, using its latest support for Tailwind v4. Dark mode will be synchronized directly from the Home Assistant `hass` object to maintain a seamless user experience within the HA ecosystem.

**Primary recommendation:** Use the `@tailwindcss/vite` plugin for integration and implement a custom Stylis plugin for Emotion to wrap all MUI styles in a `@layer mui` block.

## Standard Stack

The established libraries/tools for this domain:

### Core

| Library             | Version | Purpose             | Why Standard                                           |
| ------------------- | ------- | ------------------- | ------------------------------------------------------ |
| `tailwindcss`       | ^4.0.0  | Utility-first CSS   | Latest industry standard, superior performance.        |
| `@tailwindcss/vite` | ^4.0.0  | Vite integration    | Seamless v4 integration with zero-config.              |
| `shadcn/ui`         | latest  | Component registry  | High-quality, accessible, and customizable components. |
| `@mui/material`     | ^7.3.7  | Legacy UI framework | Existing UI framework to be gradually replaced.        |

### Supporting

| Library                   | Version | Purpose          | When to Use                              |
| ------------------------- | ------- | ---------------- | ---------------------------------------- |
| `recharts`                | latest  | Charting library | Required for shadcn/ui Charts.           |
| `mdi-material-ui`         | ^7.9.3  | Icon set         | Standard icons for Home Assistant.       |
| `clsx` / `tailwind-merge` | latest  | Class merging    | Required for shadcn/ui utility patterns. |

### Alternatives Considered

| Instead of     | Could Use         | Tradeoff                                                                     |
| -------------- | ----------------- | ---------------------------------------------------------------------------- |
| `next-themes`  | Custom Hook       | User decision (Locked): Use custom HA sync logic instead of generic library. |
| `lucide-react` | `mdi-material-ui` | User decision (Locked): Maintain semantic consistency with HA via MDI.       |

**Installation:**

```bash
npm install tailwindcss @tailwindcss/vite clsx tailwind-merge
npx shadcn@latest init
```

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── ui/          # Generated shadcn components
│   └── common/      # Shared dashboard components
├── common/
│   └── hooks/
│       └── useDarkMode.ts # HA Dark Mode sync logic
├── styles/
│   └── mui-layer.ts # Emotion Stylis plugin for Layers
└── index.css        # Tailwind v4 & Layer definitions
```

### Pattern 1: Cascade Layering for Coexistence

**What:** Define explicit CSS Cascade Layers to manage priority.
**When to use:** Whenever MUI and Tailwind utilities compete for the same element.
**Example:**

```css
/* src/index.css */
@layer mui, base, components, utilities;

@layer base {
  @import "tailwindcss";
}

/* MUI styles will be injected into @layer mui via Stylis */
```

### Anti-Patterns to Avoid

- **!important Overuse:** Do not use `!important` to override MUI styles. Use Cascade Layers to handle specificity at the engine level.
- **Hardcoded Theme Mode:** Do not hardcode `mode: 'dark'` in the MUI theme; sync it with `hass.themes.darkMode`.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem         | Don't Build          | Use Instead      | Why                                                       |
| --------------- | -------------------- | ---------------- | --------------------------------------------------------- |
| Utility Merging | Custom string concat | `tailwind-merge` | Correctly handles Tailwind v4 utility overrides.          |
| Dark Mode State | Custom LocalStorage  | `hass.themes`    | Dashboard should respect the host (Home Assistant) state. |

**Key insight:** Tailwind v4 uses CSS variables internally, making it highly compatible with modern browser features like Cascade Layers.

## Common Pitfalls

### Pitfall 1: Emotion Style Injection Order

**What goes wrong:** Emotion injects styles into the `<head>` after the main CSS file is loaded, potentially ignoring layer definitions if not configured.
**How to avoid:** Use a custom `@emotion/cache` with `prepend: true` and a Stylis plugin to wrap rules in `@layer mui`.

### Pitfall 2: shadcn/ui Icon Imports

**What goes wrong:** shadcn CLI defaults to `lucide-react`.
**How to avoid:** Manually update icon imports to `mdi-material-ui` after adding components.

## Code Examples

### MUI Cascade Layer Stylis Plugin

```typescript
// src/styles/mui-layer.ts
import { StylisPlugin } from "@emotion/cache";

export const stylisLayerPlugin: StylisPlugin = (element) => {
  if (element.type === "rule" && !element.parent) {
    element.props = element.props.map((prop) => `@layer mui { ${prop} }`);
  }
};
```

### Dark Mode Sync Hook

```typescript
// src/common/hooks/useDarkMode.ts
import { useEffect } from "react";
import { useHass } from "./useHass";

export function useDarkModeSync() {
  const hass = useHass();
  const darkMode = hass?.themes?.darkMode;

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
}
```

## State of the Art

| Old Approach          | Current Approach | When Changed           | Impact                                   |
| --------------------- | ---------------- | ---------------------- | ---------------------------------------- |
| `tailwind.config.js`  | CSS-first Config | Tailwind v4            | Faster builds, better DX.                |
| MUI Specificity Hacks | Cascade Layers   | Modern Browser Support | Clean, engine-level priority management. |

## Open Questions

1. **MUI v7 Stability:**
   - What we know: `package.json` specifies `^7.3.7`, which seems to be a pre-release or Pigment CSS related version.
   - What's unclear: Exact documentation for v7 as v6 is the current stable major.
   - Recommendation: Follow v6 patterns unless v7 specific breaking changes are encountered.

## Sources

### Primary (HIGH confidence)

- [tailwindcss] - Official v4 documentation for Vite integration.
- [shadcn/ui] - Official documentation for Tailwind v4 support.
- [MUI] - Documentation for `StyledEngineProvider` and custom caching.

### Secondary (MEDIUM confidence)

- [Home Assistant Frontend] - Knowledge of `hass` object structure for theme synchronization.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Official docs for v4 are mature.
- Architecture: HIGH - Cascade Layers are well-supported in modern browsers.
- Pitfalls: MEDIUM - Emotion integration with Layers is a known advanced pattern but requires careful implementation.

**Research date:** 2026-01-28
**Valid until:** 2026-02-28
