import { spawnSync } from "node:child_process";

const prettier =
    process.platform === "win32"
        ? "node_modules/.bin/prettier.cmd"
        : "node_modules/.bin/prettier";
const result = spawnSync(prettier, ["--check", "."], { stdio: "inherit" });

if (result.error) {
    process.stderr.write(`Unable to run Prettier: ${result.error.message}\n`);
    process.exit(1);
}
process.exit(result.status ?? 1);
