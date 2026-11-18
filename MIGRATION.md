# Migration tracker

Use this file when you migrate an earlier prototype (for example, a static HTML
concept) into this Ember app. It is the repository-visible source of truth for
milestone scope. Delete it if the prototype is not a migration.

Last updated: YYYY-MM-DD

Baseline commit: `0000000`

## How to use this tracker

Every migration session should:

1. Read this file and the source references before choosing work.
2. Select the highest-priority unblocked item that fits the requested scope.
3. Keep implementation in the Ember app; never modify or load reference
   artifacts as application code.
4. Add or update typed fixtures and tests with each behavior.
5. Update the item's status, notes, and dependencies before ending the session.
6. Update the date and baseline commit after the work is committed.

Statuses:

- **Complete**: implemented, tested, and committed.
- **In progress**: implementation has started but is not complete.
- **Blocked**: cannot proceed until the stated dependency or decision is
  resolved.
- **Not started**: no implementation has begun.

## Completed milestones

| Milestone                  | Status   | Commit | Notes                                         |
| -------------------------- | -------- | ------ | --------------------------------------------- |
| Preserve source references | Complete |        | Source files and SHAs are under `reference/`. |

## Remaining work

Items are ordered by recommended execution priority. A dependency marked `None`
means the item can be started independently.

| ID  | Priority | Work item | Status      | Dependencies | Completion criteria |
| --- | -------: | --------- | ----------- | ------------ | ------------------- |
| M01 |        1 |           | Not started | None         |                     |

## Personas

| Persona | Permission | Notes |
| ------- | ---------- | ----- |
|         |            |       |

## Source references

<!-- List the preserved files under reference/ that define expected behavior. -->

## Scope boundaries

<!-- List source explorations that are intentionally excluded. -->

The Ember implementation must use real HDS components where available, semantic
HDS tokens for local patterns, typed fixture data, and behavior-focused tests.
Do not reproduce the source prototype's custom palette, global mutable state,
`innerHTML` rendering, or inline event handlers.
