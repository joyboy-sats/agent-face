export const AGENT_FACE_VERSION = "v1" as const;
export const AGENT_FACE_DEFAULT_SEED = "agentface";

export const SHELL_TYPES = ["dome", "square", "hex", "wide"] as const;
export const VISOR_TYPES = ["slit", "panoramic", "dual", "port"] as const;
export const EYE_TYPES = ["dots", "bars", "scanner", "tri"] as const;
export const MOUTH_TYPES = ["grille", "speaker", "pulse", "vent"] as const;
export const ANTENNA_TYPES = ["beacon", "fork", "dish", "crown"] as const;
export const SIDE_MODULE_TYPES = ["panel", "bolts", "speaker", "thruster"] as const;
export const NECK_TYPES = ["coil", "piston", "ring", "cable"] as const;
export const ARMOR_TYPES = ["bib", "pauldrons", "frame", "plated"] as const;
export const ACCESSORY_TYPES = ["badge", "stripe", "monopatch", "chinGuard"] as const;
export const COLOR_PALETTES = ["cobalt", "ember", "mint", "sand"] as const;
export const BACKGROUND_TYPES = ["grid", "halo", "circuit", "slab"] as const;

export interface AgentFaceConfig {
  seed: string;
  version: typeof AGENT_FACE_VERSION;
  shellType: (typeof SHELL_TYPES)[number];
  visorType: (typeof VISOR_TYPES)[number];
  eyeType: (typeof EYE_TYPES)[number];
  mouthType: (typeof MOUTH_TYPES)[number];
  antennaType: (typeof ANTENNA_TYPES)[number];
  sideModuleType: (typeof SIDE_MODULE_TYPES)[number];
  neckType: (typeof NECK_TYPES)[number];
  armorType: (typeof ARMOR_TYPES)[number];
  accessoryType: (typeof ACCESSORY_TYPES)[number];
  colorPalette: (typeof COLOR_PALETTES)[number];
  backgroundType: (typeof BACKGROUND_TYPES)[number];
}

export const AGENT_FACE_OPTIONS = {
  shellType: SHELL_TYPES,
  visorType: VISOR_TYPES,
  eyeType: EYE_TYPES,
  mouthType: MOUTH_TYPES,
  antennaType: ANTENNA_TYPES,
  sideModuleType: SIDE_MODULE_TYPES,
  neckType: NECK_TYPES,
  armorType: ARMOR_TYPES,
  accessoryType: ACCESSORY_TYPES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES
} as const;

export const AGENT_FACE_OPTION_KEYS = [
  "shellType",
  "visorType",
  "eyeType",
  "mouthType",
  "antennaType",
  "sideModuleType",
  "neckType",
  "armorType",
  "accessoryType",
  "colorPalette",
  "backgroundType"
] as const;

export type AgentFaceOptionKey = (typeof AGENT_FACE_OPTION_KEYS)[number];

type PaletteTokens = {
  shell: string;
  shellShade: string;
  visor: string;
  visorDeep: string;
  accent: string;
  eye: string;
  mouth: string;
  background: string;
  backgroundAccent: string;
};

const PALETTE_TOKENS: Record<AgentFaceConfig["colorPalette"], PaletteTokens> = {
  cobalt: {
    shell: "#8EB8FF",
    shellShade: "#597AD6",
    visor: "#DDF7FF",
    visorDeep: "#79B0FF",
    accent: "#163D8C",
    eye: "#0B1733",
    mouth: "#214379",
    background: "#EDF4FF",
    backgroundAccent: "#BFD4FF"
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
    backgroundAccent: "#FFD2B4"
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
    backgroundAccent: "#BCEFD9"
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
    backgroundAccent: "#EED59D"
  }
};

const OPTION_SET_MAP: Record<AgentFaceOptionKey, readonly string[]> = {
  shellType: SHELL_TYPES,
  visorType: VISOR_TYPES,
  eyeType: EYE_TYPES,
  mouthType: MOUTH_TYPES,
  antennaType: ANTENNA_TYPES,
  sideModuleType: SIDE_MODULE_TYPES,
  neckType: NECK_TYPES,
  armorType: ARMOR_TYPES,
  accessoryType: ACCESSORY_TYPES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES
};

type PartialConfigInput = Partial<Omit<AgentFaceConfig, "version">> & {
  version?: string;
};

export function normalizeAgentFaceSeed(seed: string): string {
  const trimmed = seed.trim();
  if (!trimmed) {
    return AGENT_FACE_DEFAULT_SEED;
  }

  if (/^0x[a-fA-F0-9]+$/.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  return trimmed;
}

export function generateAgentFaceConfig(seed: string): AgentFaceConfig {
  const normalizedSeed = normalizeAgentFaceSeed(seed);
  const digest = createSeedDigest(normalizedSeed);

  return {
    seed: normalizedSeed,
    version: AGENT_FACE_VERSION,
    shellType: pickOption(digest, 0, SHELL_TYPES),
    visorType: pickOption(digest, 1, VISOR_TYPES),
    eyeType: pickOption(digest, 2, EYE_TYPES),
    mouthType: pickOption(digest, 3, MOUTH_TYPES),
    antennaType: pickOption(digest, 4, ANTENNA_TYPES),
    sideModuleType: pickOption(digest, 5, SIDE_MODULE_TYPES),
    neckType: pickOption(digest, 6, NECK_TYPES),
    armorType: pickOption(digest, 7, ARMOR_TYPES),
    accessoryType: pickOption(digest, 8, ACCESSORY_TYPES),
    colorPalette: pickOption(digest, 9, COLOR_PALETTES),
    backgroundType: pickOption(digest, 10, BACKGROUND_TYPES)
  };
}

export function mergeAgentFaceConfig(seed: string, overrides: PartialConfigInput): AgentFaceConfig {
  const normalizedSeed = normalizeAgentFaceSeed(overrides.seed ?? seed);
  const base = generateAgentFaceConfig(normalizedSeed);

  return {
    ...base,
    shellType: coerceOption(overrides.shellType, SHELL_TYPES, base.shellType),
    visorType: coerceOption(overrides.visorType, VISOR_TYPES, base.visorType),
    eyeType: coerceOption(overrides.eyeType, EYE_TYPES, base.eyeType),
    mouthType: coerceOption(overrides.mouthType, MOUTH_TYPES, base.mouthType),
    antennaType: coerceOption(overrides.antennaType, ANTENNA_TYPES, base.antennaType),
    sideModuleType: coerceOption(overrides.sideModuleType, SIDE_MODULE_TYPES, base.sideModuleType),
    neckType: coerceOption(overrides.neckType, NECK_TYPES, base.neckType),
    armorType: coerceOption(overrides.armorType, ARMOR_TYPES, base.armorType),
    accessoryType: coerceOption(overrides.accessoryType, ACCESSORY_TYPES, base.accessoryType),
    colorPalette: coerceOption(overrides.colorPalette, COLOR_PALETTES, base.colorPalette),
    backgroundType: coerceOption(overrides.backgroundType, BACKGROUND_TYPES, base.backgroundType)
  };
}

export function serializeAgentFaceConfig(config: AgentFaceConfig): string {
  const params = new URLSearchParams();
  params.set("seed", config.seed);
  params.set("version", config.version);

  for (const key of AGENT_FACE_OPTION_KEYS) {
    params.set(key, config[key]);
  }

  return params.toString();
}

export function deserializeAgentFaceConfig(input: string | URLSearchParams): AgentFaceConfig {
  const params =
    typeof input === "string"
      ? new URLSearchParams(input.startsWith("?") ? input.slice(1) : input)
      : input;

  const base = generateAgentFaceConfig(params.get("seed") ?? AGENT_FACE_DEFAULT_SEED);
  return mergeAgentFaceConfig(base.seed, {
    seed: params.get("seed") ?? base.seed,
    shellType: readOptionParam(params, "shellType", SHELL_TYPES),
    visorType: readOptionParam(params, "visorType", VISOR_TYPES),
    eyeType: readOptionParam(params, "eyeType", EYE_TYPES),
    mouthType: readOptionParam(params, "mouthType", MOUTH_TYPES),
    antennaType: readOptionParam(params, "antennaType", ANTENNA_TYPES),
    sideModuleType: readOptionParam(params, "sideModuleType", SIDE_MODULE_TYPES),
    neckType: readOptionParam(params, "neckType", NECK_TYPES),
    armorType: readOptionParam(params, "armorType", ARMOR_TYPES),
    accessoryType: readOptionParam(params, "accessoryType", ACCESSORY_TYPES),
    colorPalette: readOptionParam(params, "colorPalette", COLOR_PALETTES),
    backgroundType: readOptionParam(params, "backgroundType", BACKGROUND_TYPES)
  });
}

export function renderAgentFaceSvg(config: AgentFaceConfig): string {
  const palette = PALETTE_TOKENS[config.colorPalette];
  const shellMarkup = renderShell(config, palette);
  const antennaMarkup = renderAntenna(config, palette);
  const sideMarkup = renderSideModules(config, palette);
  const visorMarkup = renderVisor(config, palette);
  const eyeMarkup = renderEyes(config, palette);
  const mouthMarkup = renderMouth(config, palette);
  const neckMarkup = renderNeck(config, palette);
  const armorMarkup = renderArmor(config, palette);
  const accessoryMarkup = renderAccessory(config, palette);
  const backgroundMarkup = renderBackground(config, palette);
  const safeSeed = escapeXml(config.seed);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-labelledby="agent-face-title" shape-rendering="geometricPrecision">`,
    `<title id="agent-face-title">AgentFace ${safeSeed}</title>`,
    backgroundMarkup,
    `<g transform="translate(0 4)">`,
    armorMarkup,
    neckMarkup,
    sideMarkup,
    antennaMarkup,
    shellMarkup,
    visorMarkup,
    eyeMarkup,
    mouthMarkup,
    accessoryMarkup,
    `</g>`,
    `</svg>`
  ].join("");
}

function createSeedDigest(seed: string): string {
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

function pickOption<const T extends readonly string[]>(digest: string, slot: number, options: T): T[number] {
  const chunkSize = 4;
  const maxStart = digest.length - chunkSize;
  const start = Math.min(slot * chunkSize, maxStart);
  const chunk = digest.slice(start, start + chunkSize);
  const numericValue = Number.parseInt(chunk, 16);
  return options[numericValue % options.length];
}

function coerceOption<const T extends readonly string[]>(
  value: string | undefined,
  options: T,
  fallback: T[number]
): T[number] {
  return typeof value === "string" && options.includes(value) ? (value as T[number]) : fallback;
}

function readOptionParam<const T extends readonly string[]>(
  params: URLSearchParams,
  key: string,
  options: T
): T[number] | undefined {
  const value = params.get(key);
  return typeof value === "string" && options.includes(value) ? (value as T[number]) : undefined;
}

function renderBackground(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.backgroundType) {
    case "halo":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<circle cx="80" cy="76" r="50" fill="${palette.backgroundAccent}" opacity="0.65"/>`,
        `<circle cx="80" cy="76" r="34" fill="none" stroke="${palette.accent}" stroke-width="4" opacity="0.18"/>`
      ].join("");
    case "circuit":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M20 30h28v18h24m40-18h28v26h-18m-94 58h18v20h28m38-20h22V86h-22" fill="none" stroke="${palette.backgroundAccent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
        `<circle cx="48" cy="48" r="6" fill="${palette.accent}" opacity="0.28"/>`,
        `<circle cx="112" cy="114" r="6" fill="${palette.accent}" opacity="0.2"/>`
      ].join("");
    case "slab":
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M0 122 64 48h34L34 160H0Z" fill="${palette.backgroundAccent}" opacity="0.75"/>`,
        `<path d="M84 0h44L64 112H20Z" fill="${palette.accent}" opacity="0.08"/>`,
        `<path d="M124 22h26v26h-26z" fill="${palette.backgroundAccent}" opacity="0.48"/>`
      ].join("");
    case "grid":
    default:
      return [
        `<rect width="160" height="160" rx="24" fill="${palette.background}"/>`,
        `<path d="M32 18v124M64 18v124M96 18v124M128 18v124M18 32h124M18 64h124M18 96h124M18 128h124" stroke="${palette.backgroundAccent}" stroke-width="2" opacity="0.72"/>`
      ].join("");
  }
}

function renderAntenna(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.antennaType) {
    case "fork":
      return [
        `<path d="M80 24v16" stroke="${palette.accent}" stroke-width="6" stroke-linecap="round"/>`,
        `<path d="M72 24V12M88 24V12" stroke="${palette.accent}" stroke-width="5" stroke-linecap="round"/>`,
        `<circle cx="72" cy="10" r="4" fill="${palette.visorDeep}"/>`,
        `<circle cx="88" cy="10" r="4" fill="${palette.visorDeep}"/>`
      ].join("");
    case "dish":
      return [
        `<path d="M80 24v12" stroke="${palette.accent}" stroke-width="6" stroke-linecap="round"/>`,
        `<path d="M64 16c10-8 22-8 32 0" fill="none" stroke="${palette.accent}" stroke-width="5" stroke-linecap="round"/>`,
        `<circle cx="80" cy="14" r="4" fill="${palette.visorDeep}"/>`
      ].join("");
    case "crown":
      return [
        `<path d="M58 24h44l-6-12-12 8-10-10-10 10-12-8Z" fill="${palette.shellShade}"/>`,
        `<rect x="58" y="24" width="44" height="6" rx="3" fill="${palette.accent}"/>`
      ].join("");
    case "beacon":
    default:
      return [
        `<path d="M80 28V10" stroke="${palette.accent}" stroke-width="6" stroke-linecap="round"/>`,
        `<circle cx="80" cy="8" r="6" fill="${palette.visorDeep}"/>`,
        `<circle cx="80" cy="8" r="11" fill="${palette.visorDeep}" opacity="0.18"/>`
      ].join("");
  }
}

function renderShell(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.shellType) {
    case "square":
      return [
        `<rect x="34" y="34" width="92" height="82" rx="18" fill="${palette.shellShade}"/>`,
        `<rect x="40" y="40" width="80" height="70" rx="14" fill="${palette.shell}"/>`,
        `<rect x="50" y="48" width="60" height="10" rx="5" fill="#FFFFFF" opacity="0.2"/>`
      ].join("");
    case "hex":
      return [
        `<path d="M48 40 64 30h32l16 10 10 20v34l-10 18-16 10H64l-16-10-10-18V60Z" fill="${palette.shellShade}"/>`,
        `<path d="M54 44 66 36h28l12 8 8 18v28l-8 16-12 8H66l-12-8-8-16V62Z" fill="${palette.shell}"/>`,
        `<path d="M58 48h44l6 10H52Z" fill="#FFFFFF" opacity="0.14"/>`
      ].join("");
    case "wide":
      return [
        `<rect x="26" y="42" width="108" height="72" rx="28" fill="${palette.shellShade}"/>`,
        `<rect x="34" y="46" width="92" height="64" rx="24" fill="${palette.shell}"/>`,
        `<rect x="42" y="52" width="76" height="10" rx="5" fill="#FFFFFF" opacity="0.18"/>`
      ].join("");
    case "dome":
    default:
      return [
        `<path d="M42 108V64c0-22 17-38 38-38s38 16 38 38v44Z" fill="${palette.shellShade}"/>`,
        `<path d="M48 104V66c0-18 14-32 32-32s32 14 32 32v38Z" fill="${palette.shell}"/>`,
        `<path d="M58 44c8-7 15-10 22-10 9 0 17 4 24 10" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.18" stroke-linecap="round"/>`
      ].join("");
  }
}

function renderSideModules(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.sideModuleType) {
    case "bolts":
      return [
        `<circle cx="30" cy="72" r="6" fill="${palette.accent}"/>`,
        `<circle cx="130" cy="72" r="6" fill="${palette.accent}"/>`,
        `<circle cx="30" cy="94" r="6" fill="${palette.accent}"/>`,
        `<circle cx="130" cy="94" r="6" fill="${palette.accent}"/>`
      ].join("");
    case "speaker":
      return [
        `<rect x="20" y="64" width="16" height="36" rx="8" fill="${palette.shellShade}"/>`,
        `<rect x="124" y="64" width="16" height="36" rx="8" fill="${palette.shellShade}"/>`,
        `<path d="M28 72v20M132 72v20" stroke="${palette.background}" stroke-width="2"/>`,
        `<path d="M24 76h8M24 84h8M24 92h8M128 76h8M128 84h8M128 92h8" stroke="${palette.background}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
    case "thruster":
      return [
        `<path d="M22 70h14l8 10-8 10H22Z" fill="${palette.shellShade}"/>`,
        `<path d="M138 70h-14l-8 10 8 10h14Z" fill="${palette.shellShade}"/>`,
        `<path d="M24 80h12M124 80h12" stroke="${palette.backgroundAccent}" stroke-width="3" stroke-linecap="round"/>`
      ].join("");
    case "panel":
    default:
      return [
        `<rect x="18" y="66" width="20" height="32" rx="8" fill="${palette.shellShade}"/>`,
        `<rect x="122" y="66" width="20" height="32" rx="8" fill="${palette.shellShade}"/>`,
        `<rect x="22" y="72" width="12" height="8" rx="3" fill="${palette.visorDeep}" opacity="0.55"/>`,
        `<rect x="126" y="84" width="12" height="8" rx="3" fill="${palette.visorDeep}" opacity="0.55"/>`
      ].join("");
  }
}

function renderVisor(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.visorType) {
    case "panoramic":
      return `<rect x="44" y="58" width="72" height="24" rx="12" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`;
    case "dual":
      return [
        `<rect x="48" y="58" width="24" height="24" rx="10" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`,
        `<rect x="88" y="58" width="24" height="24" rx="10" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`
      ].join("");
    case "port":
      return [
        `<circle cx="62" cy="70" r="14" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`,
        `<circle cx="98" cy="70" r="14" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`
      ].join("");
    case "slit":
    default:
      return `<rect x="40" y="60" width="80" height="20" rx="10" fill="${palette.visorDeep}" stroke="${palette.visor}" stroke-width="4"/>`;
  }
}

function renderEyes(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.eyeType) {
    case "bars":
      return [
        `<rect x="54" y="66" width="20" height="6" rx="3" fill="${palette.eye}"/>`,
        `<rect x="86" y="66" width="20" height="6" rx="3" fill="${palette.eye}"/>`
      ].join("");
    case "scanner":
      return [
        `<rect x="50" y="66" width="56" height="6" rx="3" fill="${palette.eye}" opacity="0.45"/>`,
        `<rect x="68" y="63" width="24" height="12" rx="6" fill="${palette.eye}"/>`
      ].join("");
    case "tri":
      return [
        `<path d="M56 75 62 63l6 12Z" fill="${palette.eye}"/>`,
        `<path d="M92 75 98 63l6 12Z" fill="${palette.eye}"/>`
      ].join("");
    case "dots":
    default:
      return [
        `<circle cx="62" cy="70" r="5" fill="${palette.eye}"/>`,
        `<circle cx="98" cy="70" r="5" fill="${palette.eye}"/>`
      ].join("");
  }
}

function renderMouth(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.mouthType) {
    case "speaker":
      return [
        `<rect x="56" y="90" width="48" height="16" rx="8" fill="${palette.mouth}"/>`,
        `<path d="M64 96h32M64 100h32" stroke="${palette.background}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
    case "pulse":
      return [
        `<rect x="52" y="92" width="56" height="12" rx="6" fill="${palette.mouth}" opacity="0.28"/>`,
        `<path d="M56 98h10l4-6 6 12 6-12 4 6h12" fill="none" stroke="${palette.mouth}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
      ].join("");
    case "vent":
      return [
        `<rect x="54" y="90" width="52" height="16" rx="8" fill="${palette.mouth}" opacity="0.18"/>`,
        `<path d="M62 94v8M72 94v8M82 94v8M92 94v8" stroke="${palette.mouth}" stroke-width="4" stroke-linecap="round"/>`
      ].join("");
    case "grille":
    default:
      return [
        `<rect x="54" y="92" width="52" height="12" rx="6" fill="${palette.mouth}"/>`,
        `<path d="M62 95v6M70 95v6M78 95v6M86 95v6M94 95v6" stroke="${palette.background}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
  }
}

function renderNeck(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.neckType) {
    case "piston":
      return [
        `<rect x="64" y="112" width="12" height="22" rx="6" fill="${palette.shellShade}"/>`,
        `<rect x="84" y="112" width="12" height="22" rx="6" fill="${palette.shellShade}"/>`,
        `<rect x="66" y="114" width="8" height="18" rx="4" fill="${palette.backgroundAccent}"/>`,
        `<rect x="86" y="114" width="8" height="18" rx="4" fill="${palette.backgroundAccent}"/>`
      ].join("");
    case "ring":
      return [
        `<rect x="56" y="112" width="48" height="22" rx="11" fill="${palette.shellShade}"/>`,
        `<rect x="62" y="118" width="36" height="10" rx="5" fill="${palette.backgroundAccent}"/>`
      ].join("");
    case "cable":
      return [
        `<path d="M62 114c10 0 6 18 18 18s8-18 18-18" fill="none" stroke="${palette.shellShade}" stroke-width="7" stroke-linecap="round"/>`,
        `<path d="M62 120c10 0 6 12 18 12s8-12 18-12" fill="none" stroke="${palette.backgroundAccent}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
    case "coil":
    default:
      return `<path d="M60 116h40M60 122h40M60 128h40" stroke="${palette.shellShade}" stroke-width="6" stroke-linecap="round"/>`;
  }
}

function renderArmor(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.armorType) {
    case "pauldrons":
      return [
        `<path d="M34 132h28l10 12H28Z" fill="${palette.shellShade}"/>`,
        `<path d="M126 132H98l-10 12h44Z" fill="${palette.shellShade}"/>`,
        `<rect x="58" y="130" width="44" height="18" rx="9" fill="${palette.accent}" opacity="0.88"/>`
      ].join("");
    case "frame":
      return [
        `<path d="M36 132h88v16H36Z" fill="${palette.shellShade}"/>`,
        `<path d="M42 136h76" stroke="${palette.backgroundAccent}" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M48 132v16M112 132v16" stroke="${palette.accent}" stroke-width="4" opacity="0.35"/>`
      ].join("");
    case "plated":
      return [
        `<path d="M44 130h72l12 18H32Z" fill="${palette.shellShade}"/>`,
        `<path d="M54 136h18M88 136h18M70 142h20" stroke="${palette.backgroundAccent}" stroke-width="4" stroke-linecap="round"/>`
      ].join("");
    case "bib":
    default:
      return [
        `<path d="M52 130h56l10 18H42Z" fill="${palette.shellShade}"/>`,
        `<rect x="64" y="136" width="32" height="8" rx="4" fill="${palette.backgroundAccent}"/>`
      ].join("");
  }
}

function renderAccessory(config: AgentFaceConfig, palette: PaletteTokens): string {
  switch (config.accessoryType) {
    case "stripe":
      return `<path d="M106 46 74 110" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.58"/>`;
    case "monopatch":
      return `<path d="M56 58h22v22H56Z" fill="${palette.accent}" opacity="0.82"/>`;
    case "chinGuard":
      return [
        `<path d="M58 102h44l-6 12H64Z" fill="${palette.accent}" opacity="0.86"/>`,
        `<path d="M68 108h24" stroke="${palette.background}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
    case "badge":
    default:
      return [
        `<circle cx="112" cy="98" r="8" fill="${palette.accent}"/>`,
        `<path d="M112 92v12M106 98h12" stroke="${palette.background}" stroke-width="2" stroke-linecap="round"/>`
      ].join("");
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
