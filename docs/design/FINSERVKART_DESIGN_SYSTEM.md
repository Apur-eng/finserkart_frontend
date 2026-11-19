# Proposed Finservkart design standards

Implementation update: the project owner authorized the complete redesign on 2026-11-19. The direction below is now applied through the local Astryx theme; see [coverage and verification limits](REDESIGN_COVERAGE.md). Earlier pending-approval language below records the original proposal.

Date: 2026-11-19. Original proposal status: **PROPOSED — not applied to runtime**. Approval owner: project owner; approval/date not yet recorded. Basis: [local source audit](FRONTEND_VISUAL_AUDIT.md), existing Astryx foundation and frontend-only scope. No Figma dependency.

## Direction and implementation boundary

Retain Astryx and the existing navy/blue identity. Use white surfaces, restrained neutral backgrounds and predictable typography to improve readability across public and operational screens. Adopt Manrope headings with Inter body text as a proposal, not an already configured brand requirement.

The existing alternative is Inter/Poppins HTML loading plus neutral Figtree font import and component-specific overrides. A single Inter family is a lower-cost alternative if adding Manrope is not approved. Do not replace libraries or rebuild all routes to implement these standards.

Raw values below are theme specifications, not permission to paste hex/px into components. Use component props first, then validated theme tokens. Extend the imported theme; do not add more `:root` overrides. Preserve generated registry ownership and verify actual token keys against installed Astryx documentation before implementation. New semantic names below are conceptual until mapped to supported tokens.

## Color foundation

| Semantic purpose | Proposed light value | Existing evidence / use |
| --- | --- | --- |
| Brand/navy | `#0f172a` | Existing primary text token; proposed restrained brand emphasis. |
| Primary/action | `#0066cc` | Existing `--color-accent`; primary CTA and links. |
| Action hover | `#0052a3` | Existing global brand-dark; migrate through theme. |
| Action subtle | `#e6f0fa` | Existing global brand-light; selected/background treatment. |
| Canvas | `#f8fafc` | Existing `--color-background-body`. |
| Surface | `#ffffff` | Existing `--color-background-surface`. |
| Muted surface | `#f1f5f9` | Existing `--color-background-muted`. |
| Primary text | `#0f172a` | Existing `--color-text-primary`. |
| Secondary text | `#475569` | Existing `--color-text-secondary`. |
| Decorative border | `#e2e8f0` | Repeated inline value; not sufficient by itself for every interactive boundary. |
| Control boundary | `#64748b` | Proposed higher-contrast control outline, verified in context before use. |
| Success foreground / background | `#166534` / `#f0fdf4` | Proposed unified semantic pair. |
| Warning foreground / background | `#92400e` / `#fffbeb` | Proposed unified semantic pair. |
| Error foreground / background | `#b91c1c` / `#fef2f2` | Proposed unified semantic pair. |
| Information foreground / background | `#1e40af` / `#eff6ff` | Proposed unified semantic pair. |

Use text and/or icons alongside semantic color. Do not infer new workflow statuses or map ambiguous business statuses without existing authoritative definitions. Badge remains counts-only under repository guidance. Red is for error/destructive emphasis, not the entire Admin identity. These pairs are candidates, not a completed contrast certification. Verify normal text >=4.5:1, large text >=3:1 and essential control/focus boundaries >=3:1 against adjacent colors. Dark values in the current theme are retained but dark-mode redesign is outside this proposal's initial implementation.

## Typography

Proposed headings: Manrope 600/700. Body, labels and data: Inter 400/500/600. Fallback: system-ui, Segoe UI, sans-serif. Load only used weights, use swap behavior and validate fallback layout. Remove redundant font loading only after actual usage review; do not silently remove a used font.

| Role | Desktop size / line height | Compact size / line height | Weight |
| --- | --- | --- | --- |
| Public display | 48 / 56 | 32 / 40 | 700 |
| Page title | 32 / 40 | 28 / 36 | 700 |
| Section heading | 24 / 32 | 22 / 30 | 700 |
| Card/subsection heading | 18 / 26 | 18 / 26 | 600 |
| Body and form input | 16 / 24 | 16 / 24 | 400 |
| Table, label, supporting text | 14 / 20 | 14 / 20 | 400–600 |
| Nonessential caption | 12 / 18 | 12 / 18 | 400 |

Sizes above are design-reference pixels; implement scalable rem tokens with a normal browser default, not fixed root sizing. Essential fees, instructions and validation must not use 11–12px captions. Use semantic heading levels independently of appearance. Apply tabular numerals to aligned financial data; preserve currency formatting and precision from existing utilities.

## Spacing, shape and elevation

Proposed spacing scale in design-reference pixels: **4, 8, 12, 16, 24, 32, 48, 64**. Map to supported spacing tokens; do not assume Astryx numeric props equal pixels. Typical use: 8 label/control gap, 16 related elements, 24 card sections, 32 page sections, 48–64 public sections.

Retain existing `--radius-element` 8px and `--radius-container` 12px. Reserve pill shapes for compact count/avatar treatment. Use no shadow for routine dense data, Astryx low elevation for cards and an appropriate built-in elevation for overlays. Avoid bespoke shadow declarations per page.

## Layout and responsive behavior

Proposed breakpoints: compact <768px; medium 768–1023px; wide >=1024px. These are design decisions to validate, not claims about existing Astryx breakpoints. Reuse supported responsive mechanisms after checking installed layout docs.

- Public content: maximum 1240px, centered, 16px compact / 24px medium / 32px wide gutters.
- Portal content: fluid main area with shrinkable children; 16/24/32px gutters. Proposed wide sidebar 240px; collapse to an accessible drawer below 1024px. Preserve all destinations and selected-route state.
- Forms: single column on compact widths; readable form width around 640px where content permits.
- Cards: 1/2/3 columns as available space permits; no minimum grid track wider than its container.
- Tables: retain semantic rows and headers, allow local horizontal scrolling when necessary; avoid whole-page overflow or dropping essential columns.
- Verify at 320, 375, 768, 1024 and 1440px, at 200% zoom, with long labels and validation messages. Do not claim reflow compliance until rendered.

## Component standards

| Pattern | Proposed standard |
| --- | --- |
| Buttons | Astryx primary for the main action, secondary for alternatives, supported destructive style for destructive actions. Visible labels; named icon controls; loading prevents duplicate submissions while preserving feedback. Target 44px hit areas for primary touch controls. |
| Inputs/forms | Existing Astryx labeled inputs; persistent labels, associated help/error text, visible focus, required indicators and current validation rules. Error summaries link/focus appropriately; do not replace real API behavior. |
| Cards | Use for standalone service/summary content; avoid a card per dense record. Consistent padding, heading and action placement. |
| Tables/lists | Astryx Table/List where compatible; semantic headers, readable numeric alignment, keyboard-operable actions, loading/empty/error states. Preserve existing sorting/filtering behavior. |
| Navigation | Native links for destinations, buttons for disclosures. Current location exposed semantically. Drawer toggle reports expanded state, has a named target, supports Escape and restores focus. |
| Modals | Supported Astryx dialog with accessible name, focus containment/return, Escape where appropriate and clear actions. Never add confirmation flows solely for cosmetic changes. |
| Status | Text plus appropriate semantic styling; counts use Badge. Preserve existing status labels and transitions. |
| Loading | Stable layout, named progress indication and appropriate busy state; skeletons only where they reflect the expected structure. |
| Empty | Distinguish no data from no filter results; show a relevant existing action where permitted. |
| Error | Clear readable message, preserve user input, retry only when safe; never expose raw sensitive API responses. |

## Accessibility and validation

Require keyboard navigation, visible focus, meaningful link/control names, labeled inputs, logical headings and text alternatives. Never use color alone. Respect reduced-motion preferences. Verify overlays and dynamically reported errors with assistive technology. Reuse supported component behavior rather than rebuilding interaction primitives.

Before a visual slice is complete: inspect the rendered desktop/mobile result, exercise keyboard and state variants, run relevant tests, run `npm run lint`, `npm run build` and `npx --no-install astryx doctor --built dist`. Record existing versus new failures. A passing bundle does not substitute for browser review or Astryx readiness. Follow AGENTS.md's theme-editor PNG preview requirement when changing the theme.

## Adoption and decision record

Decision proposed: retain Astryx; centralize theme ownership; retain blue/navy; introduce Manrope headings and Inter body; consolidate spacing and shared layouts incrementally. Rationale: reuse installed components and preserve functional contracts while reducing styling divergence. Alternatives: retain Inter throughout, or leave current per-page styling (lower immediate work, continued inconsistency).

Owner/approval: project owner, pending. Initial proposed next task: resolve theme-registration diagnostics and build an isolated playground of typography, colors, buttons, fields, cards, table rows and loading/empty/error states. Apply new visual tokens only after the direction is approved. No application-wide migration, remote updates, deployment or merging is authorized by this document.
