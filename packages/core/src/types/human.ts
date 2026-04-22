import {
  BACKGROUND_TYPES,
  buildSvgDocument,
  createSeedDigest,
  pickOption,
  renderBackground,
  type BackgroundPaletteTokens,
  type BackgroundType,
} from "./shared";

export const FACE_SHAPES = ["oval", "round", "square", "heart"] as const;
export const HAIR_STYLES = ["short", "long", "curly", "bald"] as const;
export const HUMAN_EYE_STYLES = ["almond", "round", "narrow", "wide"] as const;
export const NOSE_STYLES = ["button", "straight", "broad", "upturned"] as const;
export const HUMAN_MOUTH_STYLES = ["smile", "neutral", "smirk", "open"] as const;
export const HUMAN_ACCESSORIES = ["none", "glasses", "earring", "hat"] as const;
export const SKIN_TONES = ["light", "medium", "tan", "dark"] as const;

export const HUMAN_OPTION_KEYS = [
  "faceShape",
  "hairStyle",
  "eyeStyle",
  "noseStyle",
  "mouthStyle",
  "accessory",
  "skinTone",
  "backgroundType",
] as const;

export type HumanOptionKey = (typeof HUMAN_OPTION_KEYS)[number];
export type SkinTone = (typeof SKIN_TONES)[number];

export interface HumanTraits {
  faceShape: (typeof FACE_SHAPES)[number];
  hairStyle: (typeof HAIR_STYLES)[number];
  eyeStyle: (typeof HUMAN_EYE_STYLES)[number];
  noseStyle: (typeof NOSE_STYLES)[number];
  mouthStyle: (typeof HUMAN_MOUTH_STYLES)[number];
  accessory: (typeof HUMAN_ACCESSORIES)[number];
  skinTone: SkinTone;
  backgroundType: BackgroundType;
}

export const HUMAN_FIELD_OPTIONS = {
  faceShape: FACE_SHAPES,
  hairStyle: HAIR_STYLES,
  eyeStyle: HUMAN_EYE_STYLES,
  noseStyle: NOSE_STYLES,
  mouthStyle: HUMAN_MOUTH_STYLES,
  accessory: HUMAN_ACCESSORIES,
  skinTone: SKIN_TONES,
  backgroundType: BACKGROUND_TYPES,
} as const;

type HumanPaletteTokens = BackgroundPaletteTokens & {
  skin: string;
  skinShade: string;
  blush: string;
  hair: string;
  hairShade: string;
  feature: string;
  accessory: string;
  highlight: string;
};

const HUMAN_PALETTES: Record<SkinTone, HumanPaletteTokens> = {
  light: {
    skin: "#F6D7C3",
    skinShade: "#E8B89B",
    blush: "#E39A9A",
    hair: "#5B4335",
    hairShade: "#3E2A21",
    feature: "#4F3428",
    accessory: "#6A80D6",
    highlight: "#FFF4EC",
    background: "#FFF7F1",
    backgroundAccent: "#F4D8C9",
    accent: "#C78063",
  },
  medium: {
    skin: "#D7A682",
    skinShade: "#BC7E56",
    blush: "#C97174",
    hair: "#46342A",
    hairShade: "#2E211B",
    feature: "#3D281F",
    accessory: "#4F6DB8",
    highlight: "#FBE7D8",
    background: "#FFF1E5",
    backgroundAccent: "#E7C2A9",
    accent: "#9C6043",
  },
  tan: {
    skin: "#B97D5F",
    skinShade: "#8F573D",
    blush: "#A95D5F",
    hair: "#372720",
    hairShade: "#221813",
    feature: "#291B15",
    accessory: "#3D5B99",
    highlight: "#E8B79E",
    background: "#FBE7DB",
    backgroundAccent: "#D8A98D",
    accent: "#844A34",
  },
  dark: {
    skin: "#7C533F",
    skinShade: "#5C392B",
    blush: "#7B4A4B",
    hair: "#241914",
    hairShade: "#130D0A",
    feature: "#120B08",
    accessory: "#88A2FF",
    highlight: "#9C6D56",
    background: "#F2DED4",
    backgroundAccent: "#C89D87",
    accent: "#5D3427",
  },
};

export function generateHumanTraits(seed: string): HumanTraits {
  const digest = createSeedDigest(seed);

  return {
    faceShape: pickOption(digest, 0, FACE_SHAPES),
    hairStyle: pickOption(digest, 1, HAIR_STYLES),
    eyeStyle: pickOption(digest, 2, HUMAN_EYE_STYLES),
    noseStyle: pickOption(digest, 3, NOSE_STYLES),
    mouthStyle: pickOption(digest, 4, HUMAN_MOUTH_STYLES),
    accessory: pickOption(digest, 5, HUMAN_ACCESSORIES),
    skinTone: pickOption(digest, 6, SKIN_TONES),
    backgroundType: pickOption(digest, 7, BACKGROUND_TYPES),
  };
}

export function renderHumanSvg(config: { seed: string } & HumanTraits): string {
  const palette = HUMAN_PALETTES[config.skinTone];
  const bodyMarkup = [
    renderShoulders(palette),
    renderHumanFace(config, palette),
    renderHair(config, palette),
    renderHumanEyes(config, palette),
    renderHumanNose(config, palette),
    renderHumanMouth(config, palette),
    renderHumanAccessory(config, palette),
  ].join("");

  return buildSvgDocument({
    seed: config.seed,
    characterType: "human",
    backgroundMarkup: renderBackground(config.backgroundType, palette),
    contentMarkup: bodyMarkup,
  });
}

function renderShoulders(palette: HumanPaletteTokens): string {
  return [
    `<path d="M38 136c8-16 24-24 42-24s34 8 42 24" fill="none" stroke="${palette.accent}" stroke-width="18" stroke-linecap="round"/>`,
    `<path d="M48 136c8-10 20-16 32-16s24 6 32 16" fill="none" stroke="${palette.highlight}" stroke-width="10" stroke-linecap="round" opacity="0.55"/>`,
  ].join("");
}

function renderHumanFace(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.faceShape) {
    case "round":
      return [
        `<circle cx="80" cy="76" r="34" fill="${palette.skinShade}"/>`,
        `<circle cx="80" cy="72" r="30" fill="${palette.skin}"/>`,
      ].join("");
    case "square":
      return [
        `<rect x="46" y="40" width="68" height="74" rx="18" fill="${palette.skinShade}"/>`,
        `<rect x="50" y="44" width="60" height="66" rx="16" fill="${palette.skin}"/>`,
      ].join("");
    case "heart":
      return [
        `<path d="M80 38c18 0 30 12 30 29 0 22-15 39-30 47-15-8-30-25-30-47 0-17 12-29 30-29Z" fill="${palette.skinShade}"/>`,
        `<path d="M80 42c15 0 26 10 26 25 0 20-14 34-26 41-12-7-26-21-26-41 0-15 11-25 26-25Z" fill="${palette.skin}"/>`,
      ].join("");
    case "oval":
    default:
      return [
        `<ellipse cx="80" cy="76" rx="32" ry="38" fill="${palette.skinShade}"/>`,
        `<ellipse cx="80" cy="72" rx="28" ry="34" fill="${palette.skin}"/>`,
      ].join("");
  }
}

function renderHair(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.hairStyle) {
    case "long":
      return [
        `<path d="M46 78c0-31 16-48 34-48s34 17 34 48v12h-14V62c0-12-8-20-20-20s-20 8-20 20v28H46Z" fill="${palette.hair}"/>`,
        `<path d="M52 72c0-22 12-36 28-36s28 14 28 36" fill="none" stroke="${palette.hairShade}" stroke-width="10" stroke-linecap="round"/>`,
      ].join("");
    case "curly":
      return [
        `<circle cx="56" cy="48" r="10" fill="${palette.hair}"/>`,
        `<circle cx="72" cy="40" r="11" fill="${palette.hair}"/>`,
        `<circle cx="88" cy="40" r="11" fill="${palette.hair}"/>`,
        `<circle cx="104" cy="48" r="10" fill="${palette.hair}"/>`,
        `<path d="M50 56c6-14 18-20 30-20s24 6 30 20" fill="${palette.hair}"/>`,
      ].join("");
    case "bald":
      return `<path d="M58 42c7-7 14-10 22-10 9 0 16 3 24 10" fill="none" stroke="${palette.highlight}" stroke-width="5" opacity="0.5" stroke-linecap="round"/>`;
    case "short":
    default:
      return [
        `<path d="M50 60c0-20 12-32 30-32s30 12 30 32v8H50Z" fill="${palette.hair}"/>`,
        `<path d="M56 54c6-9 14-14 24-14s18 5 24 14" fill="none" stroke="${palette.hairShade}" stroke-width="8" stroke-linecap="round"/>`,
      ].join("");
  }
}

function renderHumanEyes(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.eyeStyle) {
    case "round":
      return [
        `<circle cx="66" cy="72" r="5" fill="${palette.feature}"/>`,
        `<circle cx="94" cy="72" r="5" fill="${palette.feature}"/>`,
      ].join("");
    case "narrow":
      return [
        `<path d="M58 74c4-4 12-4 16 0" fill="none" stroke="${palette.feature}" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M86 74c4-4 12-4 16 0" fill="none" stroke="${palette.feature}" stroke-width="4" stroke-linecap="round"/>`,
      ].join("");
    case "wide":
      return [
        `<ellipse cx="66" cy="72" rx="7" ry="5" fill="${palette.highlight}" stroke="${palette.feature}" stroke-width="2"/>`,
        `<ellipse cx="94" cy="72" rx="7" ry="5" fill="${palette.highlight}" stroke="${palette.feature}" stroke-width="2"/>`,
        `<circle cx="66" cy="72" r="2.5" fill="${palette.feature}"/>`,
        `<circle cx="94" cy="72" r="2.5" fill="${palette.feature}"/>`,
      ].join("");
    case "almond":
    default:
      return [
        `<path d="M58 72c4-6 12-6 16 0-4 6-12 6-16 0Z" fill="${palette.highlight}" stroke="${palette.feature}" stroke-width="2"/>`,
        `<path d="M86 72c4-6 12-6 16 0-4 6-12 6-16 0Z" fill="${palette.highlight}" stroke="${palette.feature}" stroke-width="2"/>`,
        `<circle cx="66" cy="72" r="2" fill="${palette.feature}"/>`,
        `<circle cx="94" cy="72" r="2" fill="${palette.feature}"/>`,
      ].join("");
  }
}

function renderHumanNose(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.noseStyle) {
    case "straight":
      return `<path d="M80 76v14" fill="none" stroke="${palette.skinShade}" stroke-width="3" stroke-linecap="round"/>`;
    case "broad":
      return [
        `<path d="M80 76v13" fill="none" stroke="${palette.skinShade}" stroke-width="3" stroke-linecap="round"/>`,
        `<path d="M74 90c3 3 9 3 12 0" fill="none" stroke="${palette.skinShade}" stroke-width="3" stroke-linecap="round"/>`,
      ].join("");
    case "upturned":
      return `<path d="M80 76c0 8 0 10-4 14 4 3 8 3 12 0" fill="none" stroke="${palette.skinShade}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "button":
    default:
      return `<circle cx="80" cy="86" r="4" fill="${palette.skinShade}"/>`;
  }
}

function renderHumanMouth(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.mouthStyle) {
    case "neutral":
      return `<path d="M68 100h24" fill="none" stroke="${palette.feature}" stroke-width="3" stroke-linecap="round"/>`;
    case "smirk":
      return `<path d="M68 100c8 5 18 5 28 1" fill="none" stroke="${palette.feature}" stroke-width="3" stroke-linecap="round"/>`;
    case "open":
      return `<ellipse cx="80" cy="102" rx="8" ry="6" fill="${palette.feature}" opacity="0.8"/>`;
    case "smile":
    default:
      return `<path d="M68 98c5 8 19 8 24 0" fill="none" stroke="${palette.feature}" stroke-width="3.5" stroke-linecap="round"/>`;
  }
}

function renderHumanAccessory(config: HumanTraits, palette: HumanPaletteTokens): string {
  switch (config.accessory) {
    case "glasses":
      return [
        `<rect x="54" y="64" width="20" height="14" rx="6" fill="none" stroke="${palette.accessory}" stroke-width="3"/>`,
        `<rect x="86" y="64" width="20" height="14" rx="6" fill="none" stroke="${palette.accessory}" stroke-width="3"/>`,
        `<path d="M74 70h12" fill="none" stroke="${palette.accessory}" stroke-width="3" stroke-linecap="round"/>`,
      ].join("");
    case "earring":
      return `<path d="M105 84c0 4 2 7 6 7 2 0 4-2 4-4s-2-4-4-4" fill="none" stroke="${palette.accessory}" stroke-width="3" stroke-linecap="round"/>`;
    case "hat":
      return [
        `<path d="M48 54c5-16 18-24 32-24s27 8 32 24" fill="${palette.accessory}"/>`,
        `<path d="M42 58h76" fill="none" stroke="${palette.accessory}" stroke-width="8" stroke-linecap="round"/>`,
      ].join("");
    case "none":
    default:
      return `<circle cx="66" cy="88" r="4" fill="${palette.blush}" opacity="0.45"/><circle cx="94" cy="88" r="4" fill="${palette.blush}" opacity="0.45"/>`;
  }
}
