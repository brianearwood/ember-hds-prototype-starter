# Copilot instructions

This repository is an Ember and Helios Design System (HDS) prototype. It
demonstrates product behavior with typed fixture data; it is not a production
application.

## Before changing code

- Read `PRODUCT.md` for product context and principles.
- Read `DESIGN-SPEC.md` for intended behavior when it has been filled in.
- If `MIGRATION.md` is in use, pick the highest-priority unblocked item and
  update its status, notes, date, and baseline commit when the work is done.
- Treat everything under `reference/` as read-only comparison material. Never
  load it at runtime or continue feature work inside it.

## Implementation conventions

- Author routes and components as `.gts` files and import HDS components by
  name from `@hashicorp/design-system-components/components`.
- Use an HDS component whenever one exists. Check the
  [HDS documentation](https://helios.hashicorp.design/components) before
  creating a local pattern.
- Use semantic HDS tokens (`--hds-*`) for custom styles. Do not copy raw colors
  or override HDS component internals.
- Keep scenarios, personas, permissions, and example records in typed modules
  under `app/data/`. Do not build markup with strings or `innerHTML`.
- Keep simulated behavior explicit. Do not add success-shaped fallbacks or
  represent unsupported behavior as complete.
- Prototype identity, release channels, and social previews are configured in
  `config/prototype.mjs`.

## Validation

Run these before committing:

```sh
pnpm lint
pnpm test
pnpm build
```

Add acceptance tests for scenario and persona combinations that matter to the
product decision.

## Public repositories

Do not commit credentials, internal URLs, customer data, or unreleased
confidential product details.
