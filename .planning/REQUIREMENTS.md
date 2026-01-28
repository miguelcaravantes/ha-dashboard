# Requirements: React Home Assistant Dashboard - Modernization

**Defined:** 2026-01-27
**Core Value:** Provide a modern, type-safe, and performant interface for controlling Home Assistant entities.

## v1.0 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [ ] **INFRA-01**: Build system uses Vite 7 with instant HMR
- [ ] **INFRA-02**: Node.js environment configured for latest LTS (22.x/24.x)
- [ ] **INFRA-03**: Production build produces optimized assets without legacy polyfills

### Core Framework

- [ ] **CORE-01**: Application runs on React 19
- [ ] **CORE-02**: TypeScript configured with `strict: true` and `noUncheckedIndexedAccess`
- [ ] **CORE-03**: React Compiler enabled for automatic memoization
- [ ] **CORE-04**: State mutations use React Actions (`useActionState`)

### UI System

- [ ] **UI-01**: Component library upgraded to MUI v6/v7
- [ ] **UI-02**: Theming uses CSS variables for instant mode switching
- [ ] **UI-03**: Layouts use standardized Grid v2 component
- [ ] **UI-04**: Zero-runtime styles implemented via Pigment CSS
- [ ] **UI-05**: Components use Container Queries for responsive behavior

### Data Integration

- [ ] **DATA-01**: `useEntity` hook provides strict typing and autocomplete for entity IDs
- [ ] **DATA-02**: `hass` object injection typed with `home-assistant-js-websocket` types
- [ ] **DATA-03**: Data layer isolates React components from raw custom element events

## Out of Scope

| Feature           | Reason                                   |
| ----------------- | ---------------------------------------- |
| New Feature Cards | Focus is on modernization/refactor first |
| HA Core Changes   | Client-side only scope                   |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| INFRA-01    | Phase 1 | Pending |
| INFRA-02    | Phase 1 | Pending |
| INFRA-03    | Phase 1 | Pending |
| CORE-01     | Phase 2 | Pending |
| CORE-02     | Phase 3 | Pending |
| CORE-03     | Phase 4 | Pending |
| CORE-04     | Phase 3 | Pending |
| UI-01       | Phase 2 | Pending |
| UI-02       | Phase 2 | Pending |
| UI-03       | Phase 3 | Pending |
| UI-04       | Phase 4 | Pending |
| UI-05       | Phase 3 | Pending |
| DATA-01     | Phase 3 | Pending |
| DATA-02     | Phase 2 | Pending |
| DATA-03     | Phase 2 | Pending |

**Coverage:**

- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---

_Requirements defined: 2026-01-27_
_Last updated: 2026-01-27_
