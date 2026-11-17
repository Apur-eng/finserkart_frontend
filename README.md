# finserkart_frontend

Modern React 19 + TypeScript frontend for the **Finservkart Enterprise Platform**, built with Meta's **Astryx Design System** (v0.7.16) and Vite.

## Overview
Comprehensive 68-page enterprise web platform across 7 distinct portals:
- **Module 01: Public Website (10 Pages)** — Lead generation, transparent service catalog, authentication, and customer onboarding.
- **Module 02: Customer Portal (12 Pages)** — Application submission wizard, milestone tracker, document upload desk, CA live chat, and invoicing.
- **Module 03: Agent Portal (9 Pages)** — Sourced customer directory, client onboarding wizard, commission ledger, and bank payouts.
- **Module 04: CA Portal (10 Pages)** — Chartered Accountant regulatory workflow controller, document verification desk, deliverable handover, and archive.
- **Module 05: Franchise Portal (8 Pages)** — Territory management, agent network oversight, customer directory, override commission statements, and reports.
- **Module 06: Operations Coordinator Portal (8 Pages)** — Application queue, load-balanced CA assignment desk, CA caseload matrix, and document monitoring.
- **Module 07: Central Admin Portal (11 Pages)** — Executive platform analytics, universal user manager, treasury ledger, service catalog editor, multi-tier commission rules, and immutable audit logs.

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite 8
- **Design System:** `@astryxdesign/core` (Meta Astryx v0.7.16)
- **Styling:** StyleX tokens + CSS resets
- **State & Data:** `@tanstack/react-query`, React Context, decoupled API contracts
- **Routing:** `react-router-dom` v7
- **Icons:** `lucide-react`
- **Testing:** `vitest` (87 automated test cases across 10 test suites)

## Getting Started

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Serves the application locally at `http://localhost:5173`.

### Production Build
```bash
npm run build
```

### Run Tests
```bash
npm run test
```
