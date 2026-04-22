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

export const SPECIES_TYPES = ["cat", "dog", "fox", "bear"] as const;
export const EAR_STYLES = ["pointed", "round", "floppy", "tufted"] as const;
export const ANIMAL_EYE_STYLES = ["round", "slit", "sleepy", "wide"] as const;
export const ANIMAL_NOSE_STYLES = ["dot", "triangle", "snout", "button"] as const;
export const MARKING_TYPES = ["none", "stripes", "spots", "patch"] as const;
export const ANIMAL_ACCESSORIES = ["none", "collar", "bow", "hat"] as const;

export const ANIMAL_OPTION_KEYS = [
  "species",
  "earStyle",
  "eyeStyle",
  "noseStyle",
  "markings",
  "accessory",
  "colorPalette",
  "backgroundType",
] as const;

export type AnimalOptionKey = (typeof ANIMAL_OPTION_KEYS)[number];

export interface AnimalTraits {
  species: (typeof SPECIES_TYPES)[number];
  earStyle: (typeof EAR_STYLES)[number];
  eyeStyle: (typeof ANIMAL_EYE_STYLES)[number];
  noseStyle: (typeof ANIMAL_NOSE_STYLES)[number];
  markings: (typeof MARKING_TYPES)[number];
  accessory: (typeof ANIMAL_ACCESSORIES)[number];
  colorPalette: ColorPalette;
  backgroundType: BackgroundType;
}

export const ANIMAL_FIELD_OPTIONS = {
  species: SPECIES_TYPES,
  earStyle: EAR_STYLES,
  eyeStyle: ANIMAL_EYE_STYLES,
  noseStyle: ANIMAL_NOSE_STYLES,
  markings: MARKING_TYPES,
  accessory: ANIMAL_ACCESSORIES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES,
} as const;

export function generateAnimalTraits(seed: string): AnimalTraits {
  const digest = createSeedDigest(seed);

  return {
    species: pickOption(digest, 0, SPECIES_TYPES),
    earStyle: pickOption(digest, 1, EAR_STYLES),
    eyeStyle: pickOption(digest, 2, ANIMAL_EYE_STYLES),
    noseStyle: pickOption(digest, 3, ANIMAL_NOSE_STYLES),
    markings: pickOption(digest, 4, MARKING_TYPES),
    accessory: pickOption(digest, 5, ANIMAL_ACCESSORIES),
    colorPalette: pickOption(digest, 6, COLOR_PALETTES),
    backgroundType: pickOption(digest, 7, BACKGROUND_TYPES),
  };
}

export function renderAnimalSvg(config: { seed: string } & AnimalTraits): string {
  const palette = getColorPaletteTokens(config.colorPalette);
  const bodyMarkup = [
    renderAnimalEars(config, palette),
    renderAnimalHead(config, palette),
    renderAnimalEyes(config, palette),
    renderAnimalNose(config, palette),
    renderAnimalMarkings(config, palette),
    renderAnimalAccessory(config, palette),
  ].join("");

  return buildSvgDocument({
    seed: config.seed,
    characterType: "animal",
    backgroundMarkup: renderBackground(config.backgroundType, palette),
    contentMarkup: bodyMarkup,
  });
}

function renderAnimalHead(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.species) {
    case "dog":
      return [
        `<path d="M46 86c0-28 15-44 34-44s34 16 34 44c0 18-14 30-34 30S46 104 46 86Z" fill="${palette.secondary}"/>`,
        `<path d="M50 82c0-24 12-36 30-36s30 12 30 36c0 17-12 28-30 28S50 99 50 82Z" fill="${palette.primary}"/>`,
      ].join("");
    case "fox":
      return [
        `<path d="M80 38 116 66 106 112H54L44 66Z" fill="${palette.secondary}"/>`,
        `<path d="M80 44 108 68 100 108H60L52 68Z" fill="${palette.primary}"/>`,
      ].join("");
    case "bear":
      return [
        `<circle cx="80" cy="78" r="36" fill="${palette.secondary}"/>`,
        `<circle cx="80" cy="78" r="30" fill="${palette.primary}"/>`,
        `<circle cx="64" cy="92" r="10" fill="${palette.highlight}" opacity="0.8"/>`,
        `<circle cx="96" cy="92" r="10" fill="${palette.highlight}" opacity="0.8"/>`,
      ].join("");
    case "cat":
    default:
      return [
        `<path d="M50 60c7-14 18-22 30-22s23 8 30 22v26c0 20-12 32-30 32S50 106 50 86Z" fill="${palette.secondary}"/>`,
        `<path d="M54 64c6-12 15-18 26-18s20 6 26 18v22c0 17-10 28-26 28S54 103 54 86Z" fill="${palette.primary}"/>`,
      ].join("");
  }
}

function renderAnimalEars(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.earStyle) {
    case "round":
      return [
        `<circle cx="58" cy="50" r="12" fill="${palette.secondary}"/>`,
        `<circle cx="102" cy="50" r="12" fill="${palette.secondary}"/>`,
        `<circle cx="58" cy="50" r="6" fill="${palette.highlight}" opacity="0.8"/>`,
        `<circle cx="102" cy="50" r="6" fill="${palette.highlight}" opacity="0.8"/>`,
      ].join("");
    case "floppy":
      return [
        `<path d="M46 54c-8 12-8 28 4 38" fill="none" stroke="${palette.secondary}" stroke-width="12" stroke-linecap="round"/>`,
        `<path d="M114 54c8 12 8 28-4 38" fill="none" stroke="${palette.secondary}" stroke-width="12" stroke-linecap="round"/>`,
      ].join("");
    case "tufted":
      return [
        `<path d="M52 58 60 34 70 60Z" fill="${palette.secondary}"/>`,
        `<path d="M108 58 100 34 90 60Z" fill="${palette.secondary}"/>`,
        `<path d="M58 52 63 40 68 54" fill="none" stroke="${palette.highlight}" stroke-width="3" stroke-linecap="round"/>`,
        `<path d="M102 52 97 40 92 54" fill="none" stroke="${palette.highlight}" stroke-width="3" stroke-linecap="round"/>`,
      ].join("");
    case "pointed":
    default:
      return [
        `<path d="M50 60 62 32 74 60Z" fill="${palette.secondary}"/>`,
        `<path d="M110 60 98 32 86 60Z" fill="${palette.secondary}"/>`,
        `<path d="M58 56 62 42 68 56Z" fill="${palette.highlight}" opacity="0.8"/>`,
        `<path d="M102 56 98 42 92 56Z" fill="${palette.highlight}" opacity="0.8"/>`,
      ].join("");
  }
}

function renderAnimalEyes(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.eyeStyle) {
    case "slit":
      return [
        `<ellipse cx="66" cy="74" rx="4" ry="7" fill="${palette.line}"/>`,
        `<ellipse cx="94" cy="74" rx="4" ry="7" fill="${palette.line}"/>`,
      ].join("");
    case "sleepy":
      return [
        `<path d="M58 76c5-3 11-3 16 0" fill="none" stroke="${palette.line}" stroke-width="4" stroke-linecap="round"/>`,
        `<path d="M86 76c5-3 11-3 16 0" fill="none" stroke="${palette.line}" stroke-width="4" stroke-linecap="round"/>`,
      ].join("");
    case "wide":
      return [
        `<circle cx="66" cy="74" r="7" fill="${palette.highlight}" stroke="${palette.line}" stroke-width="2"/>`,
        `<circle cx="94" cy="74" r="7" fill="${palette.highlight}" stroke="${palette.line}" stroke-width="2"/>`,
        `<circle cx="66" cy="74" r="3" fill="${palette.line}"/>`,
        `<circle cx="94" cy="74" r="3" fill="${palette.line}"/>`,
      ].join("");
    case "round":
    default:
      return [
        `<circle cx="66" cy="74" r="5" fill="${palette.line}"/>`,
        `<circle cx="94" cy="74" r="5" fill="${palette.line}"/>`,
      ].join("");
  }
}

function renderAnimalNose(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.noseStyle) {
    case "triangle":
      return `<path d="M80 84 74 92h12Z" fill="${palette.line}"/>`;
    case "snout":
      return [
        `<ellipse cx="80" cy="92" rx="16" ry="12" fill="${palette.highlight}" opacity="0.9"/>`,
        `<ellipse cx="80" cy="90" rx="8" ry="5" fill="${palette.line}"/>`,
      ].join("");
    case "button":
      return `<circle cx="80" cy="90" r="6" fill="${palette.line}"/>`;
    case "dot":
    default:
      return `<circle cx="80" cy="90" r="4" fill="${palette.line}"/>`;
  }
}

function renderAnimalMarkings(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.markings) {
    case "stripes":
      return [
        `<path d="M64 56 60 76M80 52v28M96 56l4 20" stroke="${palette.detail}" stroke-width="5" stroke-linecap="round" opacity="0.7"/>`,
      ].join("");
    case "spots":
      return [
        `<circle cx="62" cy="62" r="5" fill="${palette.detail}" opacity="0.72"/>`,
        `<circle cx="98" cy="68" r="4" fill="${palette.detail}" opacity="0.72"/>`,
        `<circle cx="72" cy="94" r="4" fill="${palette.detail}" opacity="0.72"/>`,
      ].join("");
    case "patch":
      return `<path d="M52 62c8-10 18-10 24 0-2 10-12 14-22 8Z" fill="${palette.detail}" opacity="0.72"/>`;
    case "none":
    default:
      return "";
  }
}

function renderAnimalAccessory(config: AnimalTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.accessory) {
    case "collar":
      return `<path d="M58 108h44" fill="none" stroke="${palette.line}" stroke-width="8" stroke-linecap="round"/>`;
    case "bow":
      return [
        `<path d="M74 104c-8-6-16-4-16 2s8 8 16 2Z" fill="${palette.detail}"/>`,
        `<path d="M86 104c8-6 16-4 16 2s-8 8-16 2Z" fill="${palette.detail}"/>`,
        `<circle cx="80" cy="106" r="4" fill="${palette.line}"/>`,
      ].join("");
    case "hat":
      return [
        `<path d="M56 52c7-10 15-14 24-14 10 0 18 4 24 14" fill="${palette.line}"/>`,
        `<path d="M48 58h64" fill="none" stroke="${palette.line}" stroke-width="6" stroke-linecap="round"/>`,
      ].join("");
    case "none":
    default:
      return "";
  }
}
