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

## Prototype

-[x] Add markdown text editor for task note
-[x] Add task steps timeline
-[x] Add task by name
-[x] Add two panels: task list panel and task view panel
-[] Add global searching
-[] Add undo
-[] Add daskboard to show metric for self-reflection
-[] Export task for knowledge sharing
-[] Add task estimation 
-[] Add offline storage
-[] Add Text to Task diagramming language

## Roadmap

-[] Choose a appropriate UI Style that give good first impression
-[] Add remote storage 
-[] Annotation layer to explain task in details
-[] Sharable Task

## Tech Stack

- [Milkdown](https://milkdown.dev/docs/recipes/react): Markdown editor
- [shadcn/ui](https://ui.shadcn.com/docs): build-your-component library
- [Next.js](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- [Biome](https://biomejs.dev/guides/getting-started/): Linter and Formatter
- [TypeScript Language Server](https://github.com/typescript-language-server/typescript-language-server)
-[] Add Authentication and Authorization (Review OAuth 2.0, OIDC, and JWT. Also explore other ways
of Authenticaiton and Authorization)

## Ideas

- Centralize state management to decouple it from the UI
- Define a repository interface for task CRUD operations
- Define an exporter interface for flexible export formats, e.g, cards,
step-by-step guides
- Apply Pyramid Principles to UI Design
- Use Spaced repetition algorithm to collect feedback
    - prompt user to review past tasks or app features
- Add a feedback loop system

Collect feedback
Gather user opinions, behavior data, bug reports, usage metrics, surveys, or interviews.

Analyze feedback
Identify patterns, pain points, feature requests, and prioritize based on impact.

Act on feedback
Implement changes: fix bugs, add features, improve UX/UI.

Release updates
Deliver the improved product version to users.

Measure impact
Monitor how changes affect user satisfaction, engagement, or retention.

Repeat
Continuously cycle through these steps for ongoing product improvement.

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
