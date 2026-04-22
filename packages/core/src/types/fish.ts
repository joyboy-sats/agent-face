import {
  BACKGROUND_TYPES,
  COLOR_PALETTES,
  buildSvgDocument,
  createSeedDigest,
  getColorPaletteTokens,
  pickOption,
  renderBackground,
  type BackgroundType,
  type ColorPalette,
} from "./shared";

export const BODY_SHAPES = ["oval", "round", "elongated", "flat"] as const;
export const FIN_STYLES = ["simple", "flowing", "spiky", "fan"] as const;
export const TAIL_STYLES = ["forked", "round", "fan", "pointed"] as const;
export const SCALE_PATTERNS = ["none", "scales", "stripes", "spots"] as const;
export const FISH_EYE_STYLES = ["round", "large", "small", "goggle"] as const;
export const BUBBLE_STYLES = ["none", "few", "many"] as const;

export const FISH_OPTION_KEYS = [
  "bodyShape",
  "finStyle",
  "tailStyle",
  "scalePattern",
  "eyeStyle",
  "bubbles",
  "colorPalette",
  "backgroundType",
] as const;

export type FishOptionKey = (typeof FISH_OPTION_KEYS)[number];

export interface FishTraits {
  bodyShape: (typeof BODY_SHAPES)[number];
  finStyle: (typeof FIN_STYLES)[number];
  tailStyle: (typeof TAIL_STYLES)[number];
  scalePattern: (typeof SCALE_PATTERNS)[number];
  eyeStyle: (typeof FISH_EYE_STYLES)[number];
  bubbles: (typeof BUBBLE_STYLES)[number];
  colorPalette: ColorPalette;
  backgroundType: BackgroundType;
}

export const FISH_FIELD_OPTIONS = {
  bodyShape: BODY_SHAPES,
  finStyle: FIN_STYLES,
  tailStyle: TAIL_STYLES,
  scalePattern: SCALE_PATTERNS,
  eyeStyle: FISH_EYE_STYLES,
  bubbles: BUBBLE_STYLES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES,
} as const;

export function generateFishTraits(seed: string): FishTraits {
  const digest = createSeedDigest(seed);

  return {
    bodyShape: pickOption(digest, 0, BODY_SHAPES),
    finStyle: pickOption(digest, 1, FIN_STYLES),
    tailStyle: pickOption(digest, 2, TAIL_STYLES),
    scalePattern: pickOption(digest, 3, SCALE_PATTERNS),
    eyeStyle: pickOption(digest, 4, FISH_EYE_STYLES),
    bubbles: pickOption(digest, 5, BUBBLE_STYLES),
    colorPalette: pickOption(digest, 6, COLOR_PALETTES),
    backgroundType: pickOption(digest, 7, BACKGROUND_TYPES),
  };
}

export function renderFishSvg(config: { seed: string } & FishTraits): string {
  const palette = getColorPaletteTokens(config.colorPalette);
  const bodyMarkup = [
    renderFishTail(config, palette),
    renderFishBody(config, palette),
    renderFishFin(config, palette),
    renderFishPattern(config, palette),
    renderFishEye(config, palette),
    renderFishBubbles(config, palette),
  ].join("");

  return buildSvgDocument({
    seed: config.seed,
    characterType: "fish",
    backgroundMarkup: renderBackground(config.backgroundType, palette),
    contentMarkup: bodyMarkup,
  });
}

function renderFishBody(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.bodyShape) {
    case "round":
      return `<circle cx="78" cy="82" r="28" fill="${palette.primary}" stroke="${palette.line}" stroke-width="4"/>`;
    case "elongated":
      return `<ellipse cx="78" cy="82" rx="40" ry="24" fill="${palette.primary}" stroke="${palette.line}" stroke-width="4"/>`;
    case "flat":
      return `<path d="M40 82c14-18 34-28 56-28 10 0 18 8 18 28s-8 28-18 28c-22 0-42-10-56-28Z" fill="${palette.primary}" stroke="${palette.line}" stroke-width="4"/>`;
    case "oval":
    default:
      return `<ellipse cx="78" cy="82" rx="34" ry="26" fill="${palette.primary}" stroke="${palette.line}" stroke-width="4"/>`;
  }
}

function renderFishTail(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.tailStyle) {
    case "round":
      return `<path d="M108 82c14-16 24-18 32 0-8 18-18 16-32 0Z" fill="${palette.secondary}"/>`;
    case "fan":
      return `<path d="M108 82c18-26 28-24 34 0-6 24-16 26-34 0Z" fill="${palette.secondary}"/>`;
    case "pointed":
      return `<path d="M108 82 142 62 130 82l12 20Z" fill="${palette.secondary}"/>`;
    case "forked":
    default:
      return `<path d="M108 82 138 58 128 82l10 24Z" fill="${palette.secondary}"/>`;
  }
}

function renderFishFin(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.finStyle) {
    case "flowing":
      return [
        `<path d="M72 56c12-22 30-20 40 0-12-4-28-4-40 0Z" fill="${palette.detail}" opacity="0.82"/>`,
        `<path d="M70 108c10 20 28 18 40 0-14 4-28 4-40 0Z" fill="${palette.detail}" opacity="0.72"/>`,
      ].join("");
    case "spiky":
      return `<path d="M56 62 68 44 80 60 92 40 104 58" fill="none" stroke="${palette.detail}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "fan":
      return `<path d="M68 56c4-18 16-26 26-26 8 0 14 6 16 18-14-2-28 0-42 8Z" fill="${palette.detail}" opacity="0.82"/>`;
    case "simple":
    default:
      return `<path d="M68 56c6-14 18-20 28-18 6 1 10 6 12 14-14 0-26 2-40 4Z" fill="${palette.detail}" opacity="0.82"/>`;
  }
}

function renderFishPattern(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.scalePattern) {
    case "scales":
      return [
        `<path d="M56 74h38M54 84h42M56 94h38" stroke="${palette.highlight}" stroke-width="4" opacity="0.55" stroke-linecap="round"/>`,
      ].join("");
    case "stripes":
      return `<path d="M62 62 54 102M78 58 72 106M94 62 92 102" stroke="${palette.highlight}" stroke-width="4" opacity="0.55" stroke-linecap="round"/>`;
    case "spots":
      return [
        `<circle cx="62" cy="74" r="4" fill="${palette.highlight}" opacity="0.7"/>`,
        `<circle cx="80" cy="92" r="4" fill="${palette.highlight}" opacity="0.7"/>`,
        `<circle cx="92" cy="72" r="3" fill="${palette.highlight}" opacity="0.7"/>`,
      ].join("");
    case "none":
    default:
      return "";
  }
}

function renderFishEye(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.eyeStyle) {
    case "large":
      return `<circle cx="58" cy="78" r="8" fill="${palette.highlight}" stroke="${palette.line}" stroke-width="3"/><circle cx="58" cy="78" r="3" fill="${palette.line}"/>`;
    case "small":
      return `<circle cx="58" cy="78" r="4" fill="${palette.line}"/>`;
    case "goggle":
      return `<circle cx="58" cy="78" r="8" fill="none" stroke="${palette.highlight}" stroke-width="3"/><circle cx="58" cy="78" r="3" fill="${palette.line}"/>`;
    case "round":
    default:
      return `<circle cx="58" cy="78" r="6" fill="${palette.highlight}" stroke="${palette.line}" stroke-width="2"/><circle cx="58" cy="78" r="2.5" fill="${palette.line}"/>`;
  }
}

function renderFishBubbles(config: FishTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.bubbles) {
    case "few":
      return `<circle cx="116" cy="48" r="6" fill="none" stroke="${palette.highlight}" stroke-width="3" opacity="0.75"/><circle cx="126" cy="34" r="4" fill="none" stroke="${palette.highlight}" stroke-width="2" opacity="0.75"/>`;
    case "many":
      return [
        `<circle cx="110" cy="56" r="6" fill="none" stroke="${palette.highlight}" stroke-width="3" opacity="0.75"/>`,
        `<circle cx="122" cy="42" r="5" fill="none" stroke="${palette.highlight}" stroke-width="2" opacity="0.75"/>`,
        `<circle cx="132" cy="28" r="4" fill="none" stroke="${palette.highlight}" stroke-width="2" opacity="0.75"/>`,
      ].join("");
    case "none":
    default:
      return "";
  }
}
