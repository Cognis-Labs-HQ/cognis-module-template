# Cognis External Module Template

The Cognis external module template is an installable reference implementation for API, UI, CLI, persistence, capability, flow, localization, testing, and packaging contracts.

## Usage Examples

- Open `/showcase` after enabling the module to use its localized browser interface.
- Run `cognisctl module-template:list` to consume the same authenticated API through the CLI.
- Resolve `showcase:listItems` through `ctx` to list items without importing module internals.
- Extend the `showcase-items` flow to enrich results through a named, removable integration stage.

## Technical Specification

The template demonstrates the boundaries that every standalone Cognis external module must preserve.

### Integration Contract

- `bootstrap.js` is the sole platform integration entrypoint.
- `ctx` supplies routes, UI registration, capabilities, flows, authentication, logging, and persistence access.
- Runtime imports remain repository-relative and never access Cognis or sibling-component internals.
- Scoped registrations must be removable when the module is disabled or uninstalled.
- `uninstallModule(ctx, { deleteContent })` must preserve saved content unless the administrator requests its deletion.

### Security

- API routes authenticate and authorize before invoking business logic.
- Request data is bounded, validated, and normalized at the HTTP boundary.
- Public errors do not expose internal implementation details.
- Failures use safe structured logging metadata.

### Release Process

- Keep `manifest.json`, `package.json`, and `package-lock.json` versions synchronized and preserve the module UUID.
- Run `npm install`, `npm test`, `npm run lint`, `npm run manifest:hashes`, `npm run check:manifest`, and `git diff --check` before committing a release.
- Regenerate `manifest.files` after the final shipped-file change so every repository-relative path and SHA-256 digest remains verifiable.
