import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const packageFiles = [
  path.join(rootDir, "packages/core/package.json"),
  path.join(rootDir, "packages/react/package.json"),
  path.join(rootDir, "packages/vue/package.json"),
];

const rawVersion = process.argv[2]?.trim();
const expectedVersion = rawVersion ? rawVersion.replace(/^v/, "") : null;

const manifests = await Promise.all(
  packageFiles.map(async (file) => {
    const raw = await readFile(file, "utf8");
    const manifest = JSON.parse(raw);
    return {
      file: path.relative(rootDir, file),
      name: manifest.name,
      version: manifest.version,
    };
  }),
);

const versions = new Set(manifests.map((item) => item.version));

if (versions.size !== 1) {
  console.error("Package versions are out of sync:");
  for (const item of manifests) {
    console.error(`- ${item.file}: ${item.version}`);
  }
  process.exit(1);
}

const actualVersion = manifests[0].version;

if (expectedVersion && actualVersion !== expectedVersion) {
  console.error(
    `Release tag version mismatch: expected ${expectedVersion}, found ${actualVersion}`,
  );
  process.exit(1);
}

console.log(`Release versions are aligned at ${actualVersion}`);
