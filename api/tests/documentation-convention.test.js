import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const TEMPLATE = resolve(ROOT, ".github/DOCUMENTATION_TEMPLATE.en.md");
const LANGUAGES = ["de", "en", "id", "ja"];

function markdownFiles(directory) {
    return readdirSync(directory).flatMap((name) => {
        const path = resolve(directory, name);
        if (statSync(path).isDirectory()) return markdownFiles(path);
        return name.endsWith(".md") ? [path] : [];
    });
}

function headingLevels(path) {
    return readFileSync(path, "utf8")
        .split("\n")
        .filter((line) => /^#{1,6} /.test(line))
        .map((line) => line.match(/^#+/)[0].length);
}

function changelogFiles() {
    const directory = resolve(ROOT, "docs/changelog");
    return markdownFiles(directory);
}

test("documentation follows the hidden heading convention", () => {
    const expected = headingLevels(TEMPLATE).slice(0, 3);
    const violations = markdownFiles(resolve(ROOT, "docs")).flatMap((path) => {
        const actual = headingLevels(path).slice(0, expected.length);
        return actual.length === expected.length &&
            actual.every((level, index) => level === expected[index])
            ? []
            : [relative(ROOT, path)];
    });
    assert.deepEqual(violations, []);
});

test("documentation templates exist for every supported language", () => {
    const expected = headingLevels(TEMPLATE);
    for (const language of LANGUAGES) {
        const template = resolve(
            ROOT,
            `.github/DOCUMENTATION_TEMPLATE.${language}.md`,
        );
        assert.ok(statSync(template).isFile());
        assert.deepEqual(headingLevels(template), expected);
    }
});

test("every documentation topic has one variant per supported language", () => {
    const documents = markdownFiles(resolve(ROOT, "docs"));
    const families = new Map();
    for (const path of documents) {
        const relativePath = relative(resolve(ROOT, "docs"), path);
        const match = /^(.*)\.(de|en|id|ja)\.md$/.exec(relativePath);
        assert.ok(
            match,
            `${relative(ROOT, path)} must include a language suffix`,
        );
        const [, topic, language] = match;
        const variants = families.get(topic) ?? new Set();
        variants.add(language);
        families.set(topic, variants);
    }
    for (const [topic, variants] of families) {
        assert.deepEqual([...variants].sort(), [...LANGUAGES].sort(), topic);
    }
});

test("changelogs identify their feature branch and commits", () => {
    const violations = changelogFiles().flatMap((path) => {
        const markdown = readFileSync(path, "utf8");
        const branchMatches = [
            ...markdown.matchAll(
                /^\*\*(?:Feature Branch|Feature-Zweig|Cabang Fitur|機能ブランチ):\*\*\s+(.+)$/gm,
            ),
        ];
        const hasCommitSection =
            /^## .*?(?:commits?|änderungen|komit|コミット).*$/im.test(markdown);
        const commitUrls = [
            ...markdown.matchAll(
                /https:\/\/github\.com\/Cognis-Labs-HQ\/cognis-module-template\/commit\/[0-9a-f]{40}/gi,
            ),
        ];
        return branchMatches.length === 1 &&
            branchMatches[0][1].trim() &&
            hasCommitSection &&
            commitUrls.length > 0
            ? []
            : [relative(ROOT, path)];
    });
    assert.deepEqual(violations, []);
});

test("changelog digests stay outside the module manifest", () => {
    const manifest = JSON.parse(
        readFileSync(resolve(ROOT, "manifest.json"), "utf8"),
    );
    const changelogEntries = manifest.files.filter(({ path }) =>
        path.startsWith("docs/changelog/"),
    );
    assert.deepEqual(changelogEntries, []);
});
