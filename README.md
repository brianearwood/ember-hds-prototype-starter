# Ember + HDS prototype starter

A copyable Ember app for building interactive product prototypes with real
[Helios Design System](https://helios.hashicorp.design/) components, tokens,
and Flight icons.

The starter intentionally includes a small representative shell rather than a
catalog of every component. Installing the HDS packages makes the full library
available; add components as the product flow requires them.

## Create a prototype from this template

From the repository root:

```sh
cp -R templates/ember-hds-prototype prototypes/<prototype-name>
cd prototypes/<prototype-name>
rm -rf node_modules dist tmp
pnpm install
pnpm start
```

Then update the package name, page title, fixture data, and application
template. Do not copy an existing prototype when this starter is sufficient;
that carries project-specific behavior and CSS into unrelated work.

## Prerequisites

- [Node.js 22](https://nodejs.org/) (`.nvmrc` is included)
- [pnpm](https://pnpm.io/)
- Google Chrome for the default test runner

## Installation

```sh
corepack enable
pnpm install
```

The project-level `.npmrc` deliberately resolves public `@hashicorp` packages
from npm. This prevents a developer's global scope configuration from
redirecting HDS dependencies to another registry.

## Running and validation

```sh
pnpm start
pnpm lint
pnpm test:ember
pnpm build
```

The app runs at [http://localhost:4200](http://localhost:4200).

## Project structure

- `app/templates/application.hbs` — representative HDS application shell
- `app/data/` — typed scenario and fixture data
- `app/styles/app.scss` — HDS import plus local layout styles
- `ember-cli-build.js` — official HDS Sass include paths
- `.npmrc` — consistent registry resolution for HDS packages

## Working conventions

- Prefer an HDS component over recreating it with HTML and CSS.
- Use semantic HDS tokens for custom patterns.
- Keep scenario data separate from rendering and interaction state.
- Add acceptance tests for each scenario and role combination.
- Keep product-specific styles out of global selectors.

Use `pnpm ember help generate` to see available Ember code generators.

## References

- [HDS components](https://helios.hashicorp.design/components)
- [HDS patterns](https://helios.hashicorp.design/patterns)
- [HDS tokens](https://helios.hashicorp.design/foundations/tokens)
- [HDS source](https://github.com/hashicorp/design-system)
- [Ember.js](https://emberjs.com/)
