import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateAgentFaceConfig, renderAgentFaceSvg } from "../packages/core/dist/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outputDir = resolve(repoRoot, "docs/images");
const outputFile = resolve(outputDir, "avatar-grid.svg");

const cardWidth = 248;
const cardHeight = 248;
const cardRadius = 28;
const gap = 24;
const padding = 48;
const avatarSize = 168;
const cols = 4;
const rows = 3;
const width = padding * 2 + cardWidth * cols + gap * (cols - 1);
const height = padding * 2 + cardHeight * rows + gap * (rows - 1);

const seeds = [
  "agentface",
  "0x8f3a12c0b9ef44ad57",
  "solana-alpha-vault",
  "btc-ordinal-2049",
  "research-agent-7",
  "treasury-bot",
  "governance-node",
  "member-42",
  "0xabc123def4567890",
  "relay-signer",
  "community-host",
  "anon-lab"
];

await mkdir(outputDir, { recursive: true });

const cards = seeds
  .map((seed, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = padding + col * (cardWidth + gap);
    const y = padding + row * (cardHeight + gap);
    const config = generateAgentFaceConfig(seed);
    const href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderAgentFaceSvg(config))}`;

    return [
      `<g transform="translate(${x} ${y})">`,
      `<rect width="${cardWidth}" height="${cardHeight}" rx="${cardRadius}" fill="#ffffff" stroke="#dbe3f0" stroke-width="1.5"/>`,
      `<rect x="24" y="20" width="${cardWidth - 48}" height="${cardWidth - 48}" rx="24" fill="#f6f9fe" stroke="#e5edf8" stroke-width="1.5"/>`,
      `<image href="${href}" x="${(cardWidth - avatarSize) / 2}" y="34" width="${avatarSize}" height="${avatarSize}" preserveAspectRatio="xMidYMid meet"/>`,
      `<text x="${cardWidth / 2}" y="213" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace" font-size="13" fill="#47617f">${escapeXml(
        formatSeed(seed)
      )}</text>`,
      `</g>`
    ].join("");
  })
  .join("");

const svg = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
  `<title id="title">AgentFace avatar gallery</title>`,
  `<desc id="desc">Twelve deterministic robot avatars generated from different stable seeds.</desc>`,
  `<defs>`,
  `<linearGradient id="page-bg" x1="0" y1="0" x2="1" y2="1">`,
  `<stop offset="0%" stop-color="#f8fbff"/>`,
  `<stop offset="100%" stop-color="#eef4fb"/>`,
  `</linearGradient>`,
  `<filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">`,
  `<feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#87a0c21a"/>`,
  `</filter>`,
  `</defs>`,
  `<rect width="${width}" height="${height}" rx="40" fill="url(#page-bg)"/>`,
  `<g filter="url(#card-shadow)">`,
  cards,
  `</g>`,
  `</svg>`
].join("");

await writeFile(outputFile, svg, "utf8");

function formatSeed(seed) {
  if (seed.length <= 18) {
    return seed;
  }

  return `${seed.slice(0, 8)}...${seed.slice(-6)}`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
