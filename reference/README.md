# Reference artifacts

Preserve earlier prototypes, static HTML concepts, assumptions, and scenario
notes here when the Ember app is built from them.

## Rules

- Reference files are immutable comparison material. Do not edit them,
  mechanically convert them, load them at runtime, or continue feature work in
  them.
- Put each source in its own folder, for example `reference/<source-name>/`.
- Record where each file came from and the exact source commit SHA so
  differences can be traced later.
- Do not commit confidential material to a public repository. Remove internal
  URLs, customer names, credentials, and unreleased product details before
  preserving a file here.

## Source index template

Add a `README.md` like the following to each source folder:

```markdown
# <Source name>

These files are preserved from <source repository or location> for behavioral
and visual comparison.

| File                | Source SHA |
| ------------------- | ---------- |
| `path/to/file.html` | `<sha>`    |
```
