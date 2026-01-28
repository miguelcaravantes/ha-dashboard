# Codebase Structure

**Analysis Date:** 2026-01-27

## Directory Layout

```
/
├── src/
│   ├── common/         # Shared utilities, hooks, and contexts
│   ├── features/       # Feature-specific components and logic
│   ├── App.jsx         # Application shell and theme setup
│   ├── index.jsx       # Entry point and Custom Element definition
│   └── constants.js    # Global constants (domains, support flags)
├── public/             # Static assets
└── vite.config.ts      # Build configuration
```

## Directory Purposes

**src/common:**

- Purpose: Logic shared across multiple features.
- Contains: Hooks (`useEntity`, `useHass`), Contexts (`HassContext`), Domain definitions.
- Key files: `src/common/hooks/useEntity.js`, `src/common/domains.js`.

**src/features:**

- Purpose: UI components and sub-features.
- Contains: React components, styled components, dialogs.
- Key files: `src/features/CardDashboard.jsx` (Main view), `src/features/EntityCard/EntityCard.jsx` (Core component).

## Key File Locations

**Entry Points:**

- `src/index.jsx`: Web Component definition and React mount point.
- `src/App.jsx`: Main component structure.

**Configuration:**

- `src/constants.js`: Home Assistant specific constants (Color modes, feature flags).
- `vite.config.ts`: Build settings.

**Core Logic:**

- `src/features/CardDashboard.jsx`: Defines which entities appear in which room.
- `src/common/hooks/useEntity.js`: Logic to extract and format entity data.

**Testing:**

- Not detected in current exploration (no `*.test.js` or `__tests__` visible in top levels).

## Naming Conventions

**Files:**

- Components: PascalCase (e.g., `EntityCard.jsx`, `Panel.jsx`).
- Hooks/Utilities: camelCase (e.g., `useEntity.js`, `domains.js`).

**Directories:**

- Components with children: PascalCase (e.g., `src/features/EntityCard/`).
- Logic groupings: camelCase (e.g., `src/common/hooks/`).

## Where to Add New Code

**New Dashboard Card:**

- Add `EntityCard` usage in `src/features/CardDashboard.jsx`.

**New UI Component:**

- Create in `src/features/[ComponentName].jsx` or `src/features/[ComponentName]/`.

**New Logic/Helper:**

- Add to `src/common/` (e.g., `src/common/utils.js`).

**New Entity Logic:**

- If domain-specific logic is needed, update `src/features/EntityCard/EntityCard.jsx` `actions` map or `src/common/hooks/useEntity.js`.

## Special Directories

**src/features/EntityCard/:**

- Purpose: Encapsulates the core display unit of the dashboard. Contains sub-components specific to cards.

---

_Structure analysis: 2026-01-27_
