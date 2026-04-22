export const BACKGROUND_TYPES = ["grid", "halo", "circuit", "slab"] as const;
export const COLOR_PALETTES = ["cobalt", "ember", "mint", "sand"] as const;

export type BackgroundType = (typeof BACKGROUND_TYPES)[number];
export type ColorPalette = (typeof COLOR_PALETTES)[number];

export type BackgroundPaletteTokens = {
  background: string;
  backgroundAccent: string;
  accent: string;
};

export type ColorPaletteTokens = BackgroundPaletteTokens & {
  shell: string;
  shellShade: string;
  visor: string;
  visorDeep: string;
  eye: string;
  mouth: string;
  primary: string;
  secondary: string;
  detail: string;
  line: string;
  highlight: string;
};

const COLOR_PALETTE_TOKENS: Record<ColorPalette, ColorPaletteTokens> = {
  cobalt: {
    shell: "#8EB8FF",
    shellShade: "#597AD6",
    visor: "#DDF7FF",
    visorDeep: "#79B0FF",
    accent: "#163D8C",
    eye: "#0B1733",
    mouth: "#214379",
    background: "#EDF4FF",
    backgroundAccent: "#BFD4FF",
    primary: "#8EB8FF",
    secondary: "#597AD6",
    detail: "#79B0FF",
    line: "#163D8C",
    highlight: "#DDF7FF",
  },
  ember: {
    shell: "#FFB27A",
    shellShade: "#E06D2C",
    visor: "#FFF1E7",
    visorDeep: "#FFC38F",
    accent: "#7D2E12",
    eye: "#3B1305",
    mouth: "#9A3D1A",
    background: "#FFF3EB",
    backgroundAccent: "#FFD2B4",
    primary: "#FFB27A",
    secondary: "#E06D2C",
    detail: "#FFC38F",
    line: "#7D2E12",
    highlight: "#FFF1E7",
  },
  mint: {
    shell: "#7EE2C3",
    shellShade: "#2AA684",
    visor: "#E6FFF6",
    visorDeep: "#9AF0D2",
    accent: "#0F5A47",
    eye: "#08362A",
    mouth: "#16705A",
    background: "#EEFFF9",
    backgroundAccent: "#BCEFD9",
    primary: "#7EE2C3",
    secondary: "#2AA684",
    detail: "#9AF0D2",
    line: "#0F5A47",
    highlight: "#E6FFF6",
  },
  sand: {
    shell: "#E3C68B",
    shellShade: "#B28638",
    visor: "#FFF7E7",
    visorDeep: "#F0D58F",
    accent: "#5F451D",
    eye: "#30220D",
    mouth: "#755323",
    background: "#FFFAF0",
    backgroundAccent: "#EED59D",
    primary: "#E3C68B",
    secondary: "#B28638",
    detail: "#F0D58F",
    line: "#5F451D",
    highlight: "#FFF7E7",
  },
};

export function getColorPaletteTokens(palette: ColorPalette): ColorPaletteTokens {
  return COLOR_PALETTE_TOKENS[palette];
}

export function createSeedDigest(seed: string): string {
  const source = `${seed}|agent-face|${seed.length}`;
  const reverseSource = `${source.split("").reverse().join("")}|v1`;
  return `${cyrb128(source)}${cyrb128(reverseSource)}`;
}

function cyrb128(value: string): string {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;

  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    h1 = h2 ^ Math.imul(h1 ^ code, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ code, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ code, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ code, 2716044179);
  }

  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

  return [h1 ^ h2 ^ h3 ^ h4, h2 ^ h1, h3 ^ h1, h4 ^ h1]
    .map((part) => (part >>> 0).toString(16).padStart(8, "0"))
    .join("");
}

export function pickOption<const T extends readonly string[]>(digest: string, slot: number, options: T): T[number] {
  const chunkSize = 4;
  const maxStart = digest.length - chunkSize;
  const start = Math.min(slot * chunkSize, maxStart);
  const chunk = digest.slice(start, start + chunkSize);
  const numericValue = Number.parseInt(chunk, 16);
  return options[numericValue % options.length];
}

export function coerceOption<const T extends readonly string[]>(
  value: string | undefined,
  options: T,
  fallback: T[number]
): T[number] {
  return typeof value === "string" && options.includes(value) ? (value as T[number]) : fallback;
}

export function readOptionParam<const T extends readonly string[]>(
  params: URLSearchParams,
  key: string,
  options: T
): T[number] | undefined {
  const value = params.get(key);
  return typeof value === "string" && options.includes(value) ? (value as T[number]) : undefined;
}

export function renderBackground(backgroundType: BackgroundType, palette: BackgroundPaletteTokens): string {
  switch (backgroundType) {
    case "halo":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<circle cx="80" cy="76" r="50" fill="${palette.backgroundAccent}" opacity="0.65"/>`,
        `<circle cx="80" cy="76" r="34" fill="none" stroke="${palette.accent}" stroke-width="4" opacity="0.18"/>`,
      ].join("");
    case "circuit":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M20 30h28v18h24m40-18h28v26h-18m-94 58h18v20h28m38-20h22V86h-22" fill="none" stroke="${palette.backgroundAccent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<circle cx="48" cy="48" r="6" fill="${palette.accent}" opacity="0.28"/>`,
        `<circle cx="112" cy="114" r="6" fill="${palette.accent}" opacity="0.2"/>`,
      ].join("");
    case "slab":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M0 122 64 48h34L34 160H0Z" fill="${palette.backgroundAccent}" opacity="0.75"/>`,
        `<path d="M84 0h44L64 112H20Z" fill="${palette.accent}" opacity="0.08"/>`,
        `<path d="M124 22h26v26h-26z" fill="${palette.backgroundAccent}" opacity="0.48"/>`,
      ].join("");
    case "grid":
    default:
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M32 18v124M64 18v124M96 18v124M128 18v124M18 32h124M18 64h124M18 96h124M18 128h124" stroke="${palette.backgroundAccent}" stroke-width="2" opacity="0.72"/>`,
      ].join("");
  }
}

export function buildSvgDocument(params: {
  seed: string;
  characterType: string;
  backgroundMarkup: string;
  contentMarkup: string;
}): string {
  const safeSeed = escapeXml(params.seed);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-labelledby="agent-face-title" shape-rendering="geometricPrecision" data-character-type="${params.characterType}">`,
    `<title id="agent-face-title">AgentFace ${safeSeed}</title>`,
    params.backgroundMarkup,
    `<g transform="translate(0 4)">`,
    params.contentMarkup,
    `</g>`,
    `</svg>`,
  ].join("");
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
