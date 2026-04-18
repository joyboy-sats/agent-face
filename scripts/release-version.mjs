import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const packageFiles = [
  path.join(rootDir, "packages/core/package.json"),
  path.join(rootDir, "packages/react/package.json"),
];

const nextVersion = process.argv[2];

if (!nextVersion) {
  console.error("Usage: pnpm release:version <version>");
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(nextVersion)) {
  console.error(`Invalid semver version: ${nextVersion}`);
  process.exit(1);
}

for (const file of packageFiles) {
  const raw = await readFile(file, "utf8");
  const manifest = JSON.parse(raw);
  manifest.version = nextVersion;
  await writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Updated ${path.relative(rootDir, file)} -> ${nextVersion}`);
}
