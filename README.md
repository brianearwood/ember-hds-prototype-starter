# Ember + Helios Prototype Starter

A reusable Ember starter for building interactive product prototypes with the [Helios Design System](https://helios.hashicorp.design/).

Use this GitHub template repository to explore product flows with real HDS components, design tokens, accessibility behavior, and typed fixture data—without recreating the production application.

## Create a prototype

1. Select **Use this template** on GitHub.
2. Choose **Create a new repository**.
3. Give the repository a name for the overall product prototype or research initiative.
4. Clone the new repository.
5. Install the dependencies and start the app:

```sh
corepack enable
pnpm install
pnpm start
```

Open [http://localhost:5173](http://localhost:5173).

Create one repository per substantial product prototype or research initiative. Use routes for related flows and branches for short-lived design experiments rather than creating a repository for every screen.

## What is included

- Ember with TypeScript, built with Vite and Embroider
- Helios Design System components
- HDS product design tokens
- Flight icons
- A responsive HDS application shell
- A prototype toolbar for switching scenarios and personas, synced to the URL
- Inspect Mode from [`ember-prototype-inspector`](https://www.npmjs.com/package/ember-prototype-inspector) for reviewing components, source locations, and tokens
- Example navigation, page header, alert, table, badges, and actions
- Typed scenario fixture conventions
- ESLint, Stylelint, Prettier, and Ember Template Lint
- Browser acceptance tests
- GitHub Actions CI
- Social preview metadata and release channels
- Product, design specification, and migration document templates
- A `reference/` folder convention for preserved source artifacts
- Copilot instructions

The starter contains a representative HDS screen rather than an exhaustive component catalog. Add components as the prototype requires them.

## Prototype workflow

1. Define the scenarios, roles, and product behaviors the prototype must demonstrate.
2. Put reusable fixture data in `app/data/`.
3. Build navigable product surfaces as Ember routes.
4. Compose screens from existing HDS components.
5. Use semantic HDS tokens for custom layouts and product-specific patterns.
6. Add acceptance tests for important scenarios.
7. Keep simulated or illustrative behavior explicit and easy to replace.

## Project structure

```text
.github/
└── copilot-instructions.md
app/
├── components/
│   └── prototype-toolbar.gts
├── controllers/
│   └── application.ts
├── data/
│   ├── prototype-personas.ts
│   └── prototype-scenarios.ts
├── routes/
├── services/
│   └── prototype-state.ts
├── styles/
│   └── app.scss
├── templates/
│   └── application.gts
└── deprecation-workflow.ts

config/
├── prototype.mjs
└── social-metadata.mjs

reference/
└── README.md

tests/
├── acceptance/
│   └── application-test.ts
├── integration/
├── node/
└── unit/

PRODUCT.md
DESIGN-SPEC.md
MIGRATION.md
```

As the prototype grows:

- Use routes for major navigable product surfaces.
- Author route templates and components as `.gts` files. Ember CLI generators produce this format by default.
- Use components for reusable or stateful sections within a surface.
- Keep scenarios, roles, permissions, and example records in typed data modules.
- Keep custom styles scoped to the component or product pattern that owns them.

## Commands

```sh
pnpm start       # Start the Vite development server
pnpm lint        # Run JavaScript, TypeScript, template, CSS, and formatting checks
pnpm lint:fix    # Fix lint issues and format files
pnpm test:ember  # Build in development mode and run browser tests
pnpm test:node   # Run Node tests for build configuration
pnpm test        # Run lint, browser tests, and Node tests
pnpm build       # Create a production build in dist/
```

## Scenarios and personas

The toolbar in the application header switches between the scenarios in `app/data/prototype-scenarios.ts` and the personas in `app/data/prototype-personas.ts`. The selection is stored in the `scenario` and `persona` query params, so any state can be shared with a link. Unknown ids in a link fall back to `defaultScenarioId` and `defaultPersonaId`.

`PrototypeStateService` holds the selection. Use `prototypeState.can('edit')` to check a persona's capabilities, and explain unavailable actions instead of hiding them. Add capabilities to `PrototypeCapability` as the prototype needs them, and reset scenario-specific state in `selectScenario`.

## Inspect Mode

Turn on **Inspect** in the toolbar, or add `?inspect=true` to a URL, to review the prototype with [`ember-prototype-inspector`](https://github.com/brianearwood/ember-prototype-kit/tree/main/packages/ember-prototype-inspector). Click an element to see its component, source file and line, invocation, typography, spacing, and design tokens. Alt-click to use a control while inspecting, and press Escape to exit.

A template transform in `babel.config.mjs` stamps this metadata onto elements at build time, including production builds, so reviewers can inspect deployed previews. Set `INSPECT_METADATA=false` to build without it.

Custom components must forward `...attributes` to their root element so they can be selected. Add `data-inspect-note="..."` to explain intent to reviewers, or `data-inspect-skip` to exclude an element. Get fixes with a dependency update:

```sh
pnpm update ember-prototype-inspector
```

## Prototype documents

Fill in these files when you create a prototype from the starter. Copilot reads them through `.github/copilot-instructions.md`.

| File                                                                 | Purpose                                                                                   |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`PRODUCT.md`](PRODUCT.md)                                           | Users, purpose, constraints, and principles for the product area.                         |
| [`DESIGN-SPEC.md`](DESIGN-SPEC.md)                                   | Handoff specification for engineers implementing the behavior in production.              |
| [`MIGRATION.md`](MIGRATION.md)                                       | Milestone tracker for migrating an earlier prototype. Delete it if you are not migrating. |
| [`reference/`](reference/README.md)                                  | Read-only source artifacts, such as an earlier HTML concept, with their source SHAs.      |
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Conventions for Copilot and other coding agents.                                          |

## Social previews and release channels

`config/prototype.mjs` defines the prototype name, description, and release channels. A Vite plugin in `config/social-metadata.mjs` uses them to set the page title, description, Open Graph, and Twitter card metadata in `index.html` at build time.

Each deployment is assigned one release channel. By default, `main` is **Stable** and every other branch is **Preview**, so you can share a stable link and a preview link for the same prototype. The channel is resolved in this order:

1. `PROTOTYPE_RELEASE_CHANNEL`, if set. An unknown value fails the build.
2. The first channel whose `branches` include `PROTOTYPE_BRANCH` or Vercel's `VERCEL_GIT_COMMIT_REF`.
3. The channel marked `isProduction`, when `VERCEL_ENV` is `production`.
4. `defaultChannel`.

Social cards are optional. Add a 1200×630 PNG at `public/social-card-<channel>.png` (for example `public/social-card-preview.png`) or a shared `public/social-card.png`. Set `PROTOTYPE_PUBLIC_URL` to the deployment's origin so the image URL is absolute; on Vercel, `VERCEL_URL` is used automatically.

## Working conventions

### Prefer HDS components

Use an HDS component whenever one exists instead of recreating its appearance with custom HTML and CSS.

HDS components provide supported:

- Accessibility behavior
- Keyboard interaction
- Focus management
- Loading and disabled states
- Responsive behavior
- Visual consistency

Consult the [HDS component documentation](https://helios.hashicorp.design/components) before creating a local component.

Import HDS components by name in `.gts` files so templates are type-checked against their arguments:

```gts
import { HdsBadge } from '@hashicorp/design-system-components/components';

<template><HdsBadge @text="Ready" @color="success" /></template>
```

### Use semantic design tokens

Use semantic HDS tokens for product-specific layouts and patterns:

```scss
.prototype-surface {
  color: var(--hds-foreground-color-primary);
  background: var(--hds-surface-color-primary);
  border: 1px solid var(--hds-border-color-primary);
}

.prototype-secondary-text {
  color: var(--hds-foreground-color-faint);
}
```

Avoid copying raw colors from screenshots or creating a parallel token system.

### Separate fixtures from presentation

Keep scenarios, roles, permissions, and example records in typed data modules. Components should render and manipulate that data rather than construct markup through strings or `innerHTML`.

For example:

```ts
export interface PrototypeScenario {
  id: string;
  name: string;
  description: string;
  status: 'success' | 'neutral';
}

export const prototypeScenarios: PrototypeScenario[] = [
  {
    id: 'baseline',
    name: 'Baseline',
    description: 'The default state for the prototype.',
    status: 'success',
  },
];
```

### Keep custom patterns local

Some product concepts will not have a direct HDS component. Compose those patterns from HDS primitives and keep their styles scoped to the owning component.

Before creating a local pattern:

1. Search the HDS components and patterns documentation.
2. Identify the closest HDS primitives.
3. Use semantic HDS tokens for remaining custom styling.
4. Document behavior that differs from production.
5. Add tests for important interactions and states.

### Preserve prototype intent

Prototype interactions can be simulated, but reviewers should be able to distinguish illustrative behavior from production-backed behavior.

Do not add success-shaped fallbacks, silently ignore invalid states, or represent unsupported behavior as complete.

## Validation

Before sharing a prototype or handing it to engineering, run:

```sh
pnpm lint
pnpm test:ember
pnpm build
```

Add acceptance tests for the scenario and role combinations that are important to the product decision.

## Compatibility

| Dependency     |  Version |
| -------------- | -------: |
| Node.js        |       22 |
| Ember          | 6.12 LTS |
| HDS components |      7.1 |
| HDS tokens     |      6.0 |
| Flight icons   |      5.3 |

The starter uses the Vite and Embroider build pipeline from the Ember CLI 6.12 app blueprint. Build configuration lives in `vite.config.mjs`, `babel.config.mjs`, and `ember-cli-build.mjs`, and the app entry point is `index.html` at the repository root.

Styles are compiled by Vite's built-in Sass support. `app/app.ts` imports `app/styles/app.scss`, and `vite.config.mjs` adds the HDS tokens and components style directories to the Sass load paths so `@use "@hashicorp/design-system-components";` resolves.

## Updating HDS

Update the HDS packages together:

```sh
pnpm update \
  @hashicorp/design-system-components \
  @hashicorp/design-system-tokens \
  @hashicorp/flight-icons
```

Then run:

```sh
pnpm lint
pnpm test:ember
pnpm build
```

Review the [HDS release notes](https://helios.hashicorp.design/release-notes) before accepting component API or visual changes.

## Registry configuration

The included `.npmrc` resolves public `@hashicorp` packages from npm:

```ini
@hashicorp:registry=https://registry.npmjs.org/
```

This prevents a developer’s global scope configuration from redirecting HDS dependencies to a different package registry.

## References

- [HDS components](https://helios.hashicorp.design/components)
- [HDS patterns](https://helios.hashicorp.design/patterns)
- [HDS design tokens](https://helios.hashicorp.design/foundations/tokens)
- [HDS release notes](https://helios.hashicorp.design/release-notes)
- [HDS source repository](https://github.com/hashicorp/design-system)
- [Ember guides](https://guides.emberjs.com/)
