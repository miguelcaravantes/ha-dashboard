# Requirements: React Home Assistant Dashboard - v2.0 Shadcn Migration

**Defined:** 2026-01-28
**Core Value:** Provide a modern, type-safe, and performant interface for controlling Home Assistant entities.

## v2.0 Requirements

Requirements for the UI pivot and standards enforcement.

### Tooling & Standards

- [x] **TOOL-01**: Remove Prettier dependencies, config files, and IDE integrations
- [x] **TOOL-02**: Implement ESLint Stylistic (@stylistic/eslint-plugin) for all code formatting
- [x] **TOOL-03**: Enforce strict `@typescript-eslint/consistent-type-assertions` with `assertionStyle: 'never'`
- [x] **DATA-04**: Refactor all existing type assertions (`as` and `<Type>`) to safe alternatives (type guards, unknown casting, or logic changes)

### UI Infrastructure

- [x] **UI-06**: Integrate Tailwind CSS v4 using the `@tailwindcss/vite` plugin
- [x] **UI-07**: Initialize shadcn/ui and configure the component registry
- [x] **UI-08**: Implement unified Dark Theme mapped to Home Assistant CSS variables
- [x] **UI-09**: Configure CSS Cascade Layers to manage MUI v7 and Tailwind v4 coexistence

### Component Migration

- [x] **UI-10**: Migrate Dashboard layout and Panel shell to shadcn/ui
- [x] **UI-11**: Migrate Entity Cards (PowerSwitch, SensorDisplay) to shadcn/ui
- [ ] **UI-12**: Migrate Entity Dialogs, Light/Fan details, and Sliders to shadcn/ui

## Future Requirements

- **OPT-01**: Complete removal of MUI v7 and Emotion runtime
- **OPT-02**: Zero-bundle-size styles for all components

## Out of Scope

| Feature                 | Reason                                    |
| ----------------------- | ----------------------------------------- |
| New HA Integrations     | Focus is strictly on UI/Standards pivot   |
| Multi-dashboard support | Out of scope for this migration milestone |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| TOOL-01     | Phase 4 | Complete |
| TOOL-02     | Phase 4 | Complete |
| TOOL-03     | Phase 4 | Complete |
| UI-06       | Phase 5 | Complete |
| UI-07       | Phase 5 | Complete |
| UI-08       | Phase 5 | Complete |
| UI-09       | Phase 5 | Complete |
| DATA-04     | Phase 4 | Complete |
| UI-10       | Phase 7 | Complete |
| UI-11       | Phase 7 | Complete |
| UI-12       | Phase 8 | Pending |

**Coverage:**

- v2 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---

_Requirements defined: 2026-01-28_
_Last updated: 2026-01-28 after initial definition_
