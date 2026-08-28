# AI instructions for Cognis external modules

Follow the repository-wide instructions in `AGENTS.md` for every contribution. In particular, run `npm install` before exploration, use `ctx` as the complete cross-component bus, preserve the external-module manifest contract, localize every user-facing string into German, English, Indonesian, and Japanese, and run every required quality check before committing.

## Changelog entries

Store one changelog entry per pull request and language under `docs/changelog/`. Use `<branch-name-without-copilot-prefix>.<lang>.md` filenames for `de`, `en`, `id`, and `ja`; never create a root `CHANGELOG.md`.

The required structure is a localized level-one title, a localized bold feature-branch label, one level-two heading and explanatory body per change point, and a localized level-two commit section. Cognis displays the level-two change headings as release-popup summaries, while the body is shown on the full changelog page.

Commit provenance must use Markdown links to full `https://github.com/Cognis-Labs-HQ/cognis-module-template/commit/<full-sha>` URLs. Ensure the localized entries record the immediately preceding implementation commit. A final provenance bookkeeping commit may change only the four localized changelog files and the `manifest.json` digest inventory required after those file changes. Do not rewrite historical entries except to make factual corrections, and translate prose and provenance labels for each language.
