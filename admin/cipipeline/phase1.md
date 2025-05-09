# CI/CD Pipeline Overview

![Pipeline Diagram](./phase1.png)
<!---
TODO: Make pipeline diagram
-->
#### Overview: We made a cookie-cutter CI/CD pipeline that runs unit tests, lint checks, and HTML validation. The unit testing framework is very scalable and we plan to add full testing coverage of the core functionalities once those components are more fleshed out.

## 1. What’s Working Today 

| Stage | Job ID | Purpose | Triggers | Outcome when **passing** |
|-------|--------|---------|----------|--------------------------|
| **Unit Tests** | `tests` | Runs Jest against `./__tests__/dummy-test.js` (and any other tests we add). | `push`, `pull_request` | Green check‑mark; fails workflow for failed Jest tests. |
| **Linting** | `lint` | Executes `npx eslint ./` after installing dependencies. | `push`, `pull_request` | Annotations on PRs for every lint error or warning + fails the workflow on errors. |
| **Markup & CSS Validation** | `validate-html` | Uses **Nu HTML Checker** (via `Cyb3r‑Jak3/html5validator-action@v7.2.0`) to scan all `*.html` (and `.r.html`) files. | `push`, `pull_request` | Fails the workflow on invalid HTML/CSS. |

---

## 2. Planned Next 

| Idea | Target Release | Rationale |
|------|----------------|-----------|
| **Require merge / code‑owner reviewers** | Phase 2 | Enforce peer review before merging to `master`. |
| **Comprehensive JavaScript unit test suite** | Phase 2 | Replace placeholder `dummy-test.js` with full Jest coverage for core code functionalities. |

---

## 3. YAML at-a-glance

```yaml
name: CI
on: [push, pull_request]

jobs:

  tests: #unit tests; add full testing suite to /__tests__/ directory using the jest framework.
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test ./__tests__/dummy-test.js

  lint: # lint check, implemented via ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npx eslint ./

  validate-html: # HTML validator via W3
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Cyb3r-Jak3/html5validator-action@v7.2.0
        with:
          root: .
          format: gnu
          css: true
          blacklist: "node_modules"
