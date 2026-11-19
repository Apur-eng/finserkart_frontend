# Frontend visual audit

Date: 2026-11-19. Status: source audit complete; rendered visual verification pending.
Repository: `Apur-eng/finserkart_frontend`, baseline `e57e633714d16ab0bc115f165f4b8a2f3323ee09`.

## Scope and evidence

This audit follows the latest instruction to use local source files only. No external integrations or Figma references are required. It covers theme wiring, shared components, all seven layout areas, representative dashboards, login and customer application tables. It is not a rendered review of every page. Responsive overflow, computed font selection, contrast, focus behavior and assistive-technology behavior require subsequent browser verification. No application code or business rules changed.

Labels: **Observed** means directly present in source or command output; **Inferred** means a likely consequence requiring runtime confirmation; **Proposed** means a future change, not an approved business requirement.

## Executive summary

Astryx is already integrated and should remain the component foundation. The main problem is inconsistent use: theme tokens coexist with global brand variables and extensive inline styling; six portal shells duplicate header/sidebar patterns. The highest-value next work is to reconcile theme ownership, preview the proposed standards in a component playground, then improve one shared navigation pattern at a time. A wholesale page rewrite would multiply regression risk.

Tests and the production build pass, but Astryx doctor fails on existing theme configuration. A successful build alone is therefore insufficient for design-system readiness.

## Design-system assessment

| Evidence | Assessment |
| --- | --- |
| `src/styles/theme.ts:10` | Observed: custom `defineTheme` extends neutral with accent, surface, text and radius tokens; provides light/dark values. |
| `src/providers/ThemeProvider.tsx:3`, `src/app/App.tsx:10` | Observed: custom theme is used; application explicitly selects light mode. Dark-mode support is not established by token pairs alone. |
| `src/styles/globals.css:6` | Observed: additional root brand colors, shadows and font-family definitions coexist with the theme, conflicting with AGENTS.md theme ownership guidance. |
| `src/astryx-themes.ts` | Observed: generated registry describes neutral as default, while runtime imports the custom theme directly. Doctor flags registry consistency/import/font checks. |
| `index.html:11`, `src/styles/globals.css:4` | Observed: HTML requests Inter/Poppins; neutral font CSS requests Figtree; body declares Inter. Manrope is not configured. Computed component fonts are unverified. |
| `src/components/ServiceCard.tsx:28` | Observed: Astryx Card/Button/Heading/Text coexist with raw layout elements, hex colors and pixel sizes. Similar patterns occur in portal shells. |

## Findings by area

Priority P1 = resolve before broad redesign; P2 = subsequent component migration; P3 = polish. Severity describes frontend impact, not business/security assurance.

| Area | Findings and references | Severity / priority |
| --- | --- | --- |
| Public website | Observed: Navbar has a mobile toggle and drawer, but its local media rule only reveals the toggle (`src/components/Navbar.tsx:248`). Desktop/mobile interaction needs runtime inspection. Home hero uses a 320px minimum grid column plus outer padding (`src/pages/HomePage.tsx:38`); inferred narrow-screen overflow risk. ServiceCard uses 11px supporting text and non-count Badge labels (`src/components/ServiceCard.tsx:50`). | High / P1 navigation; medium / P2 card typography |
| Customer | Observed: fixed 260px sidebar (`src/layouts/CustomerLayout.tsx:193`) and a clickable profile div without native link semantics (`:128`). Dashboard uses a 340px minimum column (`src/pages/customer/CustomerDashboardPage.tsx:179`). Applications already use semantic table elements and a horizontal scrolling wrapper (`src/pages/customer/CustomerApplicationsPage.tsx:150`), worth preserving. | High / P1 keyboard access and shell responsiveness |
| Agent | Observed: 240px sidebar, repeated header styles and portal-label Badge (`src/layouts/AgentLayout.tsx:62`, `:199`). Dashboard contains 240/280px minimum column grids (`src/pages/agent/AgentDashboardPage.tsx:106`, `:169`). Inferred constrained viewport risk when combined with fixed shell padding. | High / P1 shell; medium / P2 consistency |
| CA | Observed: same sidebar/header structure with purple role accents (`src/layouts/CALayout.tsx:63`, `:200`); dashboard repeats metric/action grids (`src/pages/ca/CADashboardPage.tsx:89`, `:150`). Proposed: shared layout presentation while preserving CA-specific navigation and workflow. | Medium / P2 duplication; P1 responsive verification |
| Franchise | Observed: repeated 240px shell (`src/layouts/FranchiseLayout.tsx:155`), card-based agent/application sections, status Badge labels and 360px minimum dashboard columns (`src/pages/franchise/FranchiseDashboardPage.tsx:231`, `:308`). Proposed: rows for dense records, preserving monetary values and calculations exactly. | Medium / P2 density; P1 responsive verification |
| Coordinator | Observed: orange role label and duplicated 240px sidebar (`src/layouts/CoordinatorLayout.tsx:62`, `:193`); dashboard heading overrides (`src/pages/coordinator/CoordinatorDashboardPage.tsx:51`). Proposed: reuse shell and heading hierarchy without altering assignments or transitions. | Medium / P2 consistency; P1 responsive verification |
| Admin | Observed: red role-label Badge and duplicated 240px sidebar (`src/layouts/AdminLayout.tsx:66`, `:167`). Red role identity can compete with error/destructive semantics (inference). Proposed: neutral role identity; preserve administrative navigation and action behavior. | Medium / P2 semantics; P1 responsive verification |

## Shared component inventory

| Existing asset | Reuse / proposed improvement |
| --- | --- |
| `src/layouts/PublicLayout.tsx` | Retain public frame, Outlet, Navbar and Footer composition. |
| Six role layouts in `src/layouts/` | Extract common presentation incrementally; preserve role-specific menus, routes, state and data. Do not derive authorization from shared UI. |
| `src/components/Navbar.tsx` | Retain destinations; standardize responsive navigation and disclosure state. Toggle has an accessible name, but no `aria-expanded`/`aria-controls` in source. |
| `src/components/Footer.tsx` | Preserve content/destinations; consolidate spacing, brand mark and typography. |
| `src/components/ServiceCard.tsx` | Preserve ServiceRecord contract, formatting and CTA destination; tokenize layout and replace non-count Badge use with a supported semantic alternative. |
| `src/features/services/ServiceList.tsx` | Existing service listing abstraction referenced by HomePage; retain API boundary rather than adding a second listing implementation. |
| Astryx AppShell, TopNav, Card, Button, Heading, Text, HStack, VStack | Existing primitives; prefer their supported props over inline CSS wrappers. |
| Login TextInput and Banner (`src/pages/LoginPage.tsx:145`) | Existing labeled inputs, feedback and loading button are reusable patterns. Preserve validation/submission behavior. |
| Customer application table | Preserve semantic rows and local overflow handling; investigate Astryx Table props before migration. |
| Playground | No playground-named file or design-system route found in targeted local searches. Propose a contained preview before touching production layouts. |

## Cross-cutting priorities

1. **P1, observed:** reconcile theme module/runtime wiring and resolve doctor failures; do not regenerate files blindly or discard the custom theme.
2. **P1, observed/inferred:** replace clickable noninteractive profile control with native navigation semantics; check mobile menu disclosure and keyboard behavior. Verify 320/375/768px widths before claiming responsive correctness.
3. **P2, observed:** centralize type, spacing, surface and radius choices. Role colors should not redefine semantic status meanings. AGENTS.md reserves Badge for counts.
4. **P2, proposed:** standardize loading, error, empty and filtered-empty presentation through reusable patterns; preserve existing query/error handling. This audit does not claim those states are absent everywhere.
5. **P2, observed:** production JS is 1,353.02 kB minified (337.72 kB gzip); Vite reports a >500 kB chunk. Assess route splitting separately, without changing loading behavior during styling work.
6. **P3, proposed:** refine elevation and motion after structure/accessibility. Respect reduced motion and do not rely on hover alone.

## Verification

Commands run locally on 2026-11-19 with installed dependencies:

| Command | Outcome |
| --- | --- |
| `npm run test` | PASS: 10 files, 87 tests. Existing tests do not establish visual/mobile or end-to-end backend correctness. |
| `npm run build` | PASS: TypeScript and Vite; large-chunk warning as above. |
| `npm run lint` | Exit 0; two warnings: unsafe optional chaining in `src/api/__tests__/api_contracts.test.ts:55`; render-time Date in `src/components/Footer.tsx:98`. |
| `npx --no-install astryx doctor --built dist` | FAIL (exit 1): 17 pass, 3 warn, 2 fail. Failed aggregate `themes` and `theme-module`; aggregate identifies module, module-import and fonts. CLI-path warning also reported. Source purity was NOT inspected because target was built output. |

No baseline issues were silently fixed in this documentation task. Browser screenshots, keyboard tests, zoom/reflow, measured contrast, real backend states and dark mode remain unverified. The build is not presented as Astryx-ready while doctor fails.

## Implementation order

1. Use [proposed design standards](FINSERVKART_DESIGN_SYSTEM.md) as the reviewable foundation; record approval before applying the new visual direction.
2. Repair theme registration and add a small component playground showing current/proposed tokens, type, controls and state variants. Follow AGENTS.md theme preview workflow.
3. Verify desktop/mobile and keyboard behavior in the playground; resolve doctor and contrast findings.
4. Improve public navigation, then one portal shell; regression-test destinations and behavior before adopting across the other roles.
5. Progress through public pages, customer, agent/CA, franchise/coordinator/admin in small slices. Keep backend, financial rules, permissions and API contracts unchanged.
