## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Roadmap

-[x] Add markdown text editor for task note
-[x] Add task steps timeline
-[x] Add task by name
-[x] Add two panels: task list panel and task view panel
-[] Add daskboard to show metric for self-reflection
-[] Export task for knowledge sharing
-[] Add task estimation 
-[] Add remote storage

## Component-Based Architecture

### Key Principles of Component-Based Architecture (CBA):

- Modularity – Each component encapsulates specific functionality (e.g., rendering, movement).
- Reusability – Components can be reused across different game objects.
- Separation of Concerns – Logic is divided into focused components (e.g., physics vs. input).
- Composability – Complex behaviors arise from combining simple components.
- :q
Encapsulation – Components hide internal state/logic and expose a simple interface.

## Vulnerabilities

### npm audit report

```
dompurify  <3.2.4
Severity: moderate
DOMPurify allows Cross-site Scripting (XSS) - https://github.com/advisories/GHSA-vhxf-7vqr-mrjg
fix available via `npm audit fix --force`
Will install @toast-ui/react-editor@3.1.0, which is a breaking change
node_modules/@toast-ui/editor/node_modules/dompurify
  @toast-ui/editor  >=3.1.1
  Depends on vulnerable versions of dompurify
  node_modules/@toast-ui/editor
    @toast-ui/react-editor  >=3.1.1
    Depends on vulnerable versions of @toast-ui/editor
    node_modules/@toast-ui/react-editor

3 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force
```
fixed at 06-08-2025
