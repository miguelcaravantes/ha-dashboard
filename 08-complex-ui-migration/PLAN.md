---
wave: 1
depends_on: [phase_7]
files_modified:
  - package.json
  - src/components/ui/slider.tsx
  - src/components/ui/drawer.tsx
  - src/components/ui/tabs.tsx
  - src/components/ui/toggle-group.tsx
  - src/components/ui/adaptive-dialog.tsx
  - src/components/entities/details/*
  - src/features/EntityDialog.tsx
autonomous: true
---

# Phase 8: Complex UI Migration Plan

This phase migrates the remaining complex interactive components (Dialogs, Sliders, Fan/Climate controls) from Material UI to shadcn/ui + Radix primitives.

## 1. Infrastructure & Primitives

<task>
<description>Install new dependencies for complex UI components</description>
<command>npm install vaul @radix-ui/react-slider @radix-ui/react-tabs @radix-ui/react-toggle-group</command>
<verification>Check package.json for new dependencies</verification>
</task>

<task>
<description>Create Slider primitive (Thick Touch Target)</description>
<file>src/components/ui/slider.tsx</file>
<instructions>
  Implement a Radix Slider wrapper.
  Use a "thick" track design (h-8) for better touch targets on mobile.
  Ensure it accepts standard Radix props.
</instructions>
<verification>File exists and uses Radix Primitive</verification>
</task>

<task>
<description>Create Drawer primitive (Vaul)</description>
<file>src/components/ui/drawer.tsx</file>
<instructions>
  Implement a Vaul Drawer wrapper.
  Follow standard shadcn/ui pattern for Drawer (Drawer, DrawerContent, DrawerHeader, etc.).
</instructions>
<verification>File exists and exports standard components</verification>
</task>

<task>
<description>Create Tabs primitive</description>
<file>src/components/ui/tabs.tsx</file>
<instructions>
  Implement Radix Tabs wrapper (Tabs, TabsList, TabsTrigger, TabsContent).
  Style to match project theme.
</instructions>
<verification>File exists and exports standard components</verification>
</task>

<task>
<description>Create ToggleGroup primitive</description>
<file>src/components/ui/toggle-group.tsx</file>
<instructions>
  Implement Radix ToggleGroup wrapper.
  Support single and multiple selection modes.
</instructions>
<verification>File exists and exports standard components</verification>
</task>

<task>
<description>Create AdaptiveDialog component</description>
<file>src/components/ui/adaptive-dialog.tsx</file>
<instructions>
  Create a component that renders a Dialog on desktop (>= 768px) and a Drawer on mobile.
  Use `use-media-query` hook (create if missing).
  Props: `open`, `onOpenChange`, `title`, `description`, `children`.
</instructions>
<verification>File exists and switches based on media query</verification>
</task>

## 2. Entity Detail Migration

<task>
<description>Create Light Detail components</description>
<file>src/components/entities/details/light/light-detail.tsx</file>
<instructions>
  Create `BrightnessSlider` using the new `Slider`.
  Create `ColorPresets` using a grid of colored buttons.
  Compose them into `LightDetail` using `Tabs` for White/Color modes (if supported).
  Use `lucide-react` for icons.
</instructions>
<verification>Files exist in src/components/entities/details/light/</verification>
</task>

<task>
<description>Create Fan Detail components</description>
<file>src/components/entities/details/fan/fan-detail.tsx</file>
<instructions>
  Create `FanDetail` component.
  Use `ToggleGroup` for speed selection.
  Implement a spinning icon animation using standard Tailwind `animate-spin` when active.
</instructions>
<verification>File exists</verification>
</task>

<task>
<description>Create Climate Detail components</description>
<file>src/components/entities/details/climate/climate-detail.tsx</file>
<instructions>
  Create `ClimateDetail` component.
  Use large numeric display for temperature.
  Use buttons/stepper for target temperature adjustment.
  Use `ToggleGroup` for HVAC modes (Heat, Cool, Off).
</instructions>
<verification>File exists</verification>
</task>

## 3. Integration & Cleanup

<task>
<description>Integrate AdaptiveDialog into EntityDialog</description>
<file>src/features/EntityDialog.tsx</file>
<instructions>
  Replace the MUI Dialog implementation with `AdaptiveDialog`.
  Route to the correct new detail component (`LightDetail`, `FanDetail`, `ClimateDetail`) based on entity domain.
  Pass necessary props (entity, service call function).
</instructions>
<verification>EntityDialog imports new components and removes MUI Dialog</verification>
</task>

<task>
<description>Remove legacy feature directories</description>
<command>rm -rf src/features/LightDetail src/features/FanDetail.tsx</command>
<verification>Files are removed</verification>
</task>

<task>
<description>Verify Type Safety</description>
<command>npm run lint</command>
<instructions>
  Run the linter and fix any issues arising from the migration.
  Ensure no `any` types are used.
</instructions>
<verification>Lint passes cleanly</verification>
</task>

## Must Haves

- [ ] `AdaptiveDialog` correctly chooses between Drawer (Mobile) and Dialog (Desktop).
- [ ] Sliders have large touch targets (h-8 or similar).
- [ ] Fan icons animate when on.
- [ ] No Material UI components remain in the dialog path.
