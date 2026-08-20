import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const LANGUAGES = ["de", "en", "id", "ja"];

function headingLevels(path) {
    return readFileSync(path, "utf8")
        .split("\n")
        .filter((line) => /^#{1,6} /.test(line))
        .map((line) => line.match(/^#+/)[0].length);
}

test("documentation templates exist for every supported language", () => {
    const englishTemplate = resolve(
        ROOT,
        ".github/DOCUMENTATION_TEMPLATE.en.md",
    );
    const expected = headingLevels(englishTemplate);
    assert.deepEqual(expected, [1, 2, 2]);

    for (const language of LANGUAGES) {
        const template = resolve(
            ROOT,
            `.github/DOCUMENTATION_TEMPLATE.${language}.md`,
        );
        assert.ok(statSync(template).isFile());
        assert.deepEqual(headingLevels(template), expected);
    }
});
