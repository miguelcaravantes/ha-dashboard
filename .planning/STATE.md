## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-01-27 — Milestone v1.0 started

## Accumulated Context

### Decisions
- **Big Bang Migration**: Small codebase (8 files) allows for immediate full conversion.
- **Standard Hass Types**: Using community/standard libraries avoids maintenance burden of manual types.
- **MUI v6**: Keeping UI library current ensures long-term support and features.

### Blockers/Concerns
- **Implicit Any Trap**: Risk of getting stuck in type errors during migration. Mitigation: `allowJs` initially.
- **Grid2 Upgrade**: MUI v6 breaking changes to Grid props. Mitigation: Codemods.
