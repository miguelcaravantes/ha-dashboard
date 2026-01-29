# Phase 08: Complex UI Migration - Research

**Researched:** 2026-01-29
**Domain:** React Component Migration (MUI to Headless/Tailwind)
**Confidence:** HIGH

## Summary

This phase completes the UI migration by replacing complex interactive MUI components (Dialogs, Sliders) with headless Radix primitives and Tailwind styling. The core challenge is implementing the "Adaptive Dialog" pattern (Sheet on mobile, Modal on desktop) and ensuring touch-optimized slider interactions that match or exceed the current MUI experience.

We will leverage `@radix-ui` primitives for accessibility and logic, and `vaul` for the mobile drawer experience, which offers a native-like drag-to-dismiss gesture that standard Radix Dialogs lack.

**Primary recommendation:** Adopt `vaul` for the mobile sheet and wrap it alongside Radix Dialog in a unified `AdaptiveDialog` component.

## Standard Stack

### Core

| Library                  | Version | Purpose        | Why Standard                                          |
| ------------------------ | ------- | -------------- | ----------------------------------------------------- |
| `@radix-ui/react-dialog` | ^1.1.x  | Desktop Modals | Accessible, unstyled, composable.                     |
| `@radix-ui/react-slider` | Latest  | Sliders        | Headless, supports multi-thumb, keyboard accessible.  |
| `@radix-ui/react-tabs`   | Latest  | Mode Switching | Accessible tab interfaces.                            |
| `vaul`                   | Latest  | Mobile Drawer  | Best-in-class React drawer with native-like gestures. |

### Supporting

| Library                   | Version  | Purpose           | When to Use                      |
| ------------------------- | -------- | ----------------- | -------------------------------- |
| `clsx` / `tailwind-merge` | Existing | Class composition | Merging Tailwind classes safely. |
| `lucide-react`            | Existing | Icons             | Unified icon set.                |

### Alternatives Considered

| Instead of         | Could Use                      | Tradeoff                                                                                          |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `vaul`             | `Radix Dialog` (bottom styled) | Radix Dialog lacks the physics-based drag-to-dismiss gesture standard on mobile.                  |
| `Radix Slider`     | `MUI Slider` (styled)          | Keeping MUI retains the dependency and styling conflict risk.                                     |
| `Tailwind Animate` | `Framer Motion`                | Framer is heavy; standard Tailwind animations (`spin`, `pulse`) suffice for Phase 8 requirements. |

**Installation:**

```bash
npm install @radix-ui/react-slider @radix-ui/react-tabs vaul
```

## Architecture Patterns

### Pattern 1: Adaptive Dialog

**What:** A wrapper component that renders a `Drawer` (Vaul) on mobile and a `Dialog` (Radix) on desktop.
**When to use:** All entity detail views (Light, Fan, Climate).
**Example:**

```tsx
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer"; // wrapper around vaul

export function AdaptiveDialog({ children, ...props }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <Dialog {...props}>{children}</Dialog>;
  }

  return <Drawer {...props}>{children}</Drawer>;
}
```

### Pattern 2: Thick Touch Slider

**What:** A slider with a visually distinct "fill" track and an invisible, expanded touch target thumb.
**When to use:** Light brightness, Fan speed.
**Implementation Detail:**

- Track height: `h-8` or `h-10` (large visual).
- Thumb: Invisible (`opacity-0`) but large (`w-10 h-10`) to capture touch events easily.
- Fill: Uses standard `Range` primitive styled with current color.

### Pattern 3: Live Update Throttling

**What:** Use the existing `awesome-debounce-promise` or a `useDebounce` hook to prevent flooding Home Assistant with service calls while dragging.
**Context:** The current implementation already uses `awesome-debounce-promise`. This pattern should be preserved or simplified into a reusable hook `useThrottledServiceCall`.

## Don't Hand-Roll

| Problem       | Don't Build                | Use Instead              | Why                                                                                                             |
| ------------- | -------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Mobile Drawer | Custom CSS/Transform logic | `vaul`                   | Physics, scroll-locking, and gesture handling are notoriously hard to get right on mobile.                      |
| Sliders       | `<input type="range">`     | `@radix-ui/react-slider` | Native range inputs are hard to style consistently across browsers and lack dual-thumb support if needed later. |
| Tabs          | Button state logic         | `@radix-ui/react-tabs`   | Handles keyboard navigation (arrows) and ARIA roles automatically.                                              |

## Common Pitfalls

### Pitfall 1: Z-Index Wars

**What goes wrong:** The Dialog/Drawer overlay appears behind other elements or the Navbar.
**Why it happens:** CSS Stacking contexts or incorrect layer ordering.
**How to avoid:** Ensure the `Portal` components (Radix/Vaul) mount to `body` and have a high Z-index layer defined in Tailwind config or global CSS.

### Pitfall 2: Mobile Viewport Height

**What goes wrong:** The drawer gets cut off by the mobile address bar.
**How to avoid:** Use `100dvh` (dynamic viewport height) instead of `100vh` for full-height styling on mobile.

### Pitfall 3: Touch Event Conflicts

**What goes wrong:** Dragging the slider accidentally closes the drawer or scrolls the page.
**How to avoid:** `vaul` handles this well, but ensure the slider stops propagation of touch events if necessary.

## Code Examples

### Thick Slider (Radix + Tailwind)

```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-10 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-10 w-10 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 opacity-0" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
```

### Tabbed Color Control

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// In LightDetail.tsx
<Tabs defaultValue="color" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="color">Color</TabsTrigger>
    <TabsTrigger value="white">White</TabsTrigger>
  </TabsList>
  <TabsContent value="color">
    <ColorPresets />
  </TabsContent>
  <TabsContent value="white">
    <TemperatureSlider />
  </TabsContent>
</Tabs>;
```

## State of the Art

| Old Approach      | Current Approach        | When Changed | Impact                                 |
| ----------------- | ----------------------- | ------------ | -------------------------------------- |
| `MUI Dialog`      | `Radix Dialog` / `Vaul` | Phase 8      | Reduced bundle size, better mobile UX. |
| `MUI Slider`      | `Radix Slider`          | Phase 8      | Full styling control via Tailwind.     |
| Custom Color Grid | `Radix Tabs` + Grid     | Phase 8      | Accessible mode switching.             |

## Open Questions

1.  **Icon Animations**
    - What we know: Requirements state "spin/pulse".
    - Recommendation: Use `lucide-react` icons with `className="animate-spin"` (for Fan) or `className="animate-pulse"` (for active states). No extra library needed.

2.  **Existing "More Info" logic**
    - What we know: `useEntity` provides `openMoreInfo`.
    - Recommendation: The new AdaptiveDialog _replaces_ the need for `openMoreInfo` for common controls, but `openMoreInfo` (the native HA dialog) might still be kept as a fallback or "Advanced Settings" link.

## Sources

### Primary (HIGH confidence)

- Existing Codebase (`src/features/EntityDialog.tsx`) - Verified current implementation.
- `vaul` Documentation - Standard for React Drawers.
- Radix UI Documentation - Standard for Headless Primitives.

### Secondary (MEDIUM confidence)

- Shadcn/ui Component Patterns (inferred from `components/ui` existence).

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Shadcn/Radix is the established pattern for this project.
- Architecture: HIGH - Adaptive pattern is well-documented in modern React.
- Pitfalls: MEDIUM - Mobile touch handling is always tricky but `vaul` mitigates most risks.

**Research date:** 2026-01-29
