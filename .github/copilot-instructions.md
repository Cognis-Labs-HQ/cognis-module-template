# AI instructions for Cognis external modules

These instructions apply to this entire repository and define the safe defaults that forks of this template should retain.

## Session startup

Run `npm install` before development. Use `rg` rather than recursive `grep` for searches.

## External module contract

Keep `manifest.json`, `package.json`, `routes.json`, and `bootstrap.js` at the repository root. Preserve the module UUID permanently. Synchronize the versions in the manifest, package, and lockfile, retain `"type": "module"`, and keep `routes.json` as an array.

Always set `ui.stringsBaseUrl` in `manifest.json` to the module-owned locale bundle base URL; this is essential so Cognis can resolve localized manifest metadata before the module UI loads. Every entrypoint, asset, and `manifest.files` item must be a regular repository-relative file with exact filename casing. After the final file change, run `npm run manifest:hashes`; never list `manifest.json` or files under `docs/changelog/` in the digest inventory. Changelog SHA-256 sums must never be added to `manifest.json`. Review dependencies and requested capabilities, and never commit generated secrets or personal data.

## Component isolation and structure

Treat `ctx` as the complete cross-component bus. Obtain behavior through capabilities, contribute public behavior through capabilities and named flow stages, and detect optional components by capability. Never import Cognis internals, sibling components, database drivers, auth implementations, or private package implementations.

Keep bootstrap as orchestration. Server code belongs in `api/`, browser code in `ui/`, CLI code in `cli/`, documentation in `docs/`, tooling in `scripts/` or `tooling/`, and artwork in `assets/`. Put genuinely reusable layer-local code in `reuse/`; do not create `shared`, `utils`, `helpers`, or `common` directories. Keep source files at or below 1000 lines and avoid ambiguous one- or two-letter names except conventional coordinates, counters, `_`, and `id`.

## UI, API, and security

Use host page composition, router, toast, timestamp, theme, and font contracts. Never navigate with `window.location.href`, `window.location.replace`, or `window.location.reload`, and do not use `alert`, `confirm`, or `prompt`. Put every user-facing string in the German, English, Indonesian, and Japanese XML locale files with matching keys.

Validate and sanitize at API boundaries, authenticate and authorize before business logic, and use least privilege. Return stable public errors without internal details. Log caught failures at error level with safe structured metadata and state changes at info level. Do not leave silent catches or use `Math.random()` for generated identifiers, tokens, or keys.

## Tests and quality

Run all of the following before committing:

```sh
npm install
npm run lint
npm test
npm run check:manifest
git diff --check
```

Use the repository Prettier configuration: four-space indentation, double quotes in JavaScript, and trailing commas in multiline structures. Never wrap imports in `try`/`catch`. Every behavior change requires tests, safe logging, and synchronized documentation. Do not add AI reasoning, session notes, or process commentary to product-facing files.

## Changelog entries

Store changelog entries in the shared `docs/changelog/` directory; do not create a root `CHANGELOG.md` or component-local changelog directories. Every pull request must add one entry in each supported language (`de`, `en`, `id`, and `ja`) using `<branch-name-without-copilot-prefix>.<lang>.md` filenames.

Each localized entry must contain, in this order, a level-one localized title, a localized bold feature-branch label, one or more level-two change headings with explanatory body text, and a localized level-two commit section. Use one change point per level-two heading because Cognis uses those headings as release-popup summaries. Translate the prose and provenance labels rather than copying English into other languages.

List implementation provenance as Markdown links whose targets use the full `https://github.com/Cognis-Labs-HQ/cognis-module-template/commit/<full-sha>` URL; the visible label may use the seven-character short reference. Before finishing, ensure the commit list records the immediately preceding implementation commit. If this requires a final bookkeeping commit, restrict it to the localized changelog files; because changelogs are excluded from the digest inventory, this bookkeeping step must not modify `manifest.json`. Existing changelog entries are immutable except for factual corrections.
