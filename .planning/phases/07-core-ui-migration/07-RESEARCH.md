# Research: Phase 07 - Core UI Migration

## Goal

Transition primary layout and high-volume entity components (`PowerSwitch`, `SensorDisplay`) to shadcn/ui.

---

## 1. Existing Components Analysis

### PowerSwitch

- **Location:** `src/features/EntityCard/PowerSwitch.tsx`
- **Current Tech:**
  - MUI `Switch` component.
  - `styled` from `@mui/material/styles` for custom coloring.
  - `useActionState` for handling toggle mutations.
- **Migration Strategy:**
  - Replace MUI `Switch` with `src/components/ui/switch.tsx`.
  - Use Tailwind classes for coloring instead of MUI `styled`.
  - Preserve `useActionState` logic.

### SensorDisplay

- **Location:** `src/features/EntityCard/SensorDisplay.tsx`
- **Current Tech:**
  - MUI `Box` for layout.
- **Migration Strategy:**
  - Replace `Box` with standard `div` or `span` with Tailwind classes.
  - Implement the "Stacked Layout" (Label top, Value bottom) as per requirements.

### EntityCard (Container)

- **Location:** `src/features/EntityCard/EntityCard.tsx`
- **Current Tech:**
  - MUI `Card`, `CardContent`.
- **Migration Strategy:**
  - Replace with `src/components/ui/card.tsx`.
  - Standardize dimensions and spacing using Tailwind.

---

## 2. shadcn/ui Inventory

The following components are already available in `src/components/ui`:

- `card.tsx`: Base container for entities.
- `switch.tsx`: Core control for `PowerSwitch`.
- `button.tsx`: For interactive elements.
- `dialog.tsx`: For detail views (to be used later).

---

## 3. Layout Shell Transition

### Current Implementation (`src/features/Panel.tsx`)

- Uses MUI `AppBar`, `Toolbar`, and `Tabs`.
- Logic for Home Assistant menu integration (shadow DOM traversal).
- Responsive `Tabs` (centered on desktop, full-width on mobile).

### Proposed shadcn Layout

- **Top Header:** Clean Tailwind-based header with Title and Profile image.
- **Navigation:**
  - **Desktop:** Tab-style navigation in the header or sidebar.
  - **Mobile:** Bottom navigation bar (standard for touch-first dashboards).
- **Components Needed:**
  - `Tabs` (shadcn) or custom Tailwind navigation.
  - `Separator` (shadcn).

---

## 4. CSS Cascade Layers (@layer mui)

### Implementation Status

- **Success:** `@layer mui, base, components, utilities;` is already defined in `src/index.css`.
- **Provider:** `src/common/MuiLayerProvider.tsx` is active, wrapping all MUI/Emotion styles in the `mui` layer.
- **Priority:** Tailwind's `base`, `components`, and `utilities` layers will correctly override MUI's defaults when classes conflict, allowing for incremental replacement of MUI styles with Tailwind/shadcn.

---

## 5. Next Steps

1. Migrate `PowerSwitch` and `SensorDisplay` to shadcn/Tailwind.
2. Refactor `EntityCard` to use shadcn `Card`.
3. Create a new `Layout` feature using shadcn/Tailwind to replace `Panel.tsx`.
