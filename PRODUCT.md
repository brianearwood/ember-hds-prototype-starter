# Product

Describe the product context this prototype explores. Keep this file short and
factual; agents and reviewers read it before changing the prototype.

## Platform

web

## Users

<!-- Who uses this workflow, and what are they trying to accomplish? -->

## Product purpose

<!-- What question should this prototype help answer? -->

## Operating context

<!-- Where does this workflow start and end? What surrounding product context matters? -->

## Capabilities and constraints

- The application is an Ember prototype built with real Helios Design System
  components where available.
- Typed fixtures in `app/data/` are the source of deterministic scenario
  behavior.
- Files under `reference/` are comparison material only and must not be loaded
  or modified as application code.

## Evidence on hand

- `MIGRATION.md` tracks milestone scope, if the prototype is migrated from a
  reference artifact.
- Typed fixtures and acceptance tests describe current behavior.
- The prototype does not provide customer claims or usage metrics; do not
  fabricate them.

## Product principles

- Keep status and blockers legible at a glance.
- Make permissions explicit before a user attempts an action.
- Prefer deterministic, scenario-driven behavior over simulated randomness.
- Use HDS semantics and accessible interaction patterns consistently.

## Accessibility and inclusion

Interactive controls must be keyboard operable, status must not rely on color
alone, and unavailable actions must explain why they are unavailable.
