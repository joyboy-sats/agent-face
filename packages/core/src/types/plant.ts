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

export const PLANT_FORMS = ["flower", "succulent", "tree", "vine"] as const;
export const LEAF_SHAPES = ["round", "pointed", "lobed", "needle"] as const;
export const BLOOM_STYLES = ["none", "single", "cluster", "bud"] as const;
export const STEM_STYLES = ["straight", "curved", "branched", "trailing"] as const;
export const POT_STYLES = ["none", "round", "square", "terracotta"] as const;

export const PLANT_OPTION_KEYS = [
  "plantForm",
  "leafShape",
  "bloomStyle",
  "stemStyle",
  "potStyle",
  "colorPalette",
  "backgroundType",
] as const;

export type PlantOptionKey = (typeof PLANT_OPTION_KEYS)[number];

export interface PlantTraits {
  plantForm: (typeof PLANT_FORMS)[number];
  leafShape: (typeof LEAF_SHAPES)[number];
  bloomStyle: (typeof BLOOM_STYLES)[number];
  stemStyle: (typeof STEM_STYLES)[number];
  potStyle: (typeof POT_STYLES)[number];
  colorPalette: ColorPalette;
  backgroundType: BackgroundType;
}

export const PLANT_FIELD_OPTIONS = {
  plantForm: PLANT_FORMS,
  leafShape: LEAF_SHAPES,
  bloomStyle: BLOOM_STYLES,
  stemStyle: STEM_STYLES,
  potStyle: POT_STYLES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES,
} as const;

export function generatePlantTraits(seed: string): PlantTraits {
  const digest = createSeedDigest(seed);

  return {
    plantForm: pickOption(digest, 0, PLANT_FORMS),
    leafShape: pickOption(digest, 1, LEAF_SHAPES),
    bloomStyle: pickOption(digest, 2, BLOOM_STYLES),
    stemStyle: pickOption(digest, 3, STEM_STYLES),
    potStyle: pickOption(digest, 4, POT_STYLES),
    colorPalette: pickOption(digest, 5, COLOR_PALETTES),
    backgroundType: pickOption(digest, 6, BACKGROUND_TYPES),
  };
}

export function renderPlantSvg(config: { seed: string } & PlantTraits): string {
  const palette = getColorPaletteTokens(config.colorPalette);
  const bodyMarkup = [
    renderPlantStem(config, palette),
    renderPlantLeaves(config, palette),
    renderPlantForm(config, palette),
    renderPlantBloom(config, palette),
    renderPlantPot(config, palette),
  ].join("");

  return buildSvgDocument({
    seed: config.seed,
    characterType: "plant",
    backgroundMarkup: renderBackground(config.backgroundType, palette),
    contentMarkup: bodyMarkup,
  });
}

function renderPlantStem(config: PlantTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.stemStyle) {
    case "curved":
      return `<path d="M80 128c-10-20-8-38 0-58 8-20 10-32 4-46" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"/>`;
    case "branched":
      return [
        `<path d="M80 128V56" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"/>`,
        `<path d="M80 82 58 62M80 74l22-20" fill="none" stroke="${palette.secondary}" stroke-width="6" stroke-linecap="round"/>`,
      ].join("");
    case "trailing":
      return `<path d="M52 52c18 0 28 16 28 34v42" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"/>`;
    case "straight":
    default:
      return `<path d="M80 128V46" fill="none" stroke="${palette.secondary}" stroke-width="8" stroke-linecap="round"/>`;
  }
}

function renderPlantLeaves(config: PlantTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.leafShape) {
    case "pointed":
      return [
        `<path d="M80 78c-20-8-30-2-36 14 18 4 30-1 36-14Z" fill="${palette.primary}"/>`,
        `<path d="M80 70c20-8 30-2 36 14-18 4-30-1-36-14Z" fill="${palette.primary}"/>`,
      ].join("");
    case "lobed":
      return [
        `<path d="M54 88c4-14 14-22 26-22-2 14-8 24-26 22Z" fill="${palette.primary}"/>`,
        `<path d="M106 80c-4-14-14-22-26-22 2 14 8 24 26 22Z" fill="${palette.primary}"/>`,
        `<circle cx="66" cy="78" r="8" fill="${palette.detail}" opacity="0.35"/>`,
      ].join("");
    case "needle":
      return [
        `<path d="M80 68 60 94" fill="none" stroke="${palette.primary}" stroke-width="5" stroke-linecap="round"/>`,
        `<path d="M80 72 72 100" fill="none" stroke="${palette.primary}" stroke-width="5" stroke-linecap="round"/>`,
        `<path d="M80 68 100 94" fill="none" stroke="${palette.primary}" stroke-width="5" stroke-linecap="round"/>`,
        `<path d="M80 72 88 100" fill="none" stroke="${palette.primary}" stroke-width="5" stroke-linecap="round"/>`,
      ].join("");
    case "round":
    default:
      return [
        `<ellipse cx="62" cy="82" rx="18" ry="10" transform="rotate(-32 62 82)" fill="${palette.primary}"/>`,
        `<ellipse cx="98" cy="82" rx="18" ry="10" transform="rotate(32 98 82)" fill="${palette.primary}"/>`,
      ].join("");
  }
}

function renderPlantForm(config: PlantTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.plantForm) {
    case "succulent":
      return [
        `<ellipse cx="80" cy="86" rx="16" ry="26" fill="${palette.primary}"/>`,
        `<ellipse cx="66" cy="90" rx="10" ry="18" transform="rotate(-32 66 90)" fill="${palette.detail}"/>`,
        `<ellipse cx="94" cy="90" rx="10" ry="18" transform="rotate(32 94 90)" fill="${palette.detail}"/>`,
      ].join("");
    case "tree":
      return [
        `<rect x="74" y="72" width="12" height="34" rx="6" fill="${palette.line}" opacity="0.72"/>`,
        `<circle cx="80" cy="62" r="22" fill="${palette.primary}"/>`,
        `<circle cx="64" cy="70" r="14" fill="${palette.detail}" opacity="0.7"/>`,
        `<circle cx="96" cy="70" r="14" fill="${palette.detail}" opacity="0.7"/>`,
      ].join("");
    case "vine":
      return [
        `<path d="M80 104c18-8 28-20 28-34s-10-26-28-34c-18 8-28 20-28 34s10 26 28 34Z" fill="${palette.primary}" opacity="0.88"/>`,
        `<path d="M80 42c10 10 14 18 14 28s-4 18-14 28c-10-10-14-18-14-28s4-18 14-28Z" fill="${palette.highlight}" opacity="0.48"/>`,
      ].join("");
    case "flower":
    default:
      return [
        `<circle cx="80" cy="64" r="10" fill="${palette.detail}"/>`,
        `<circle cx="62" cy="64" r="12" fill="${palette.primary}"/>`,
        `<circle cx="98" cy="64" r="12" fill="${palette.primary}"/>`,
        `<circle cx="80" cy="46" r="12" fill="${palette.primary}"/>`,
        `<circle cx="80" cy="82" r="12" fill="${palette.primary}"/>`,
      ].join("");
  }
}

function renderPlantBloom(config: PlantTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.bloomStyle) {
    case "single":
      return `<circle cx="80" cy="64" r="6" fill="${palette.highlight}"/>`;
    case "cluster":
      return [
        `<circle cx="70" cy="56" r="5" fill="${palette.highlight}"/>`,
        `<circle cx="90" cy="56" r="5" fill="${palette.highlight}"/>`,
        `<circle cx="80" cy="72" r="5" fill="${palette.highlight}"/>`,
      ].join("");
    case "bud":
      return `<path d="M80 46c7 8 7 18 0 24-7-6-7-16 0-24Z" fill="${palette.highlight}"/>`;
    case "none":
    default:
      return "";
  }
}

function renderPlantPot(config: PlantTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.potStyle) {
    case "round":
      return [
        `<path d="M58 114h44l-4 18c-1 5-5 8-10 8H72c-5 0-9-3-10-8Z" fill="${palette.line}" opacity="0.78"/>`,
      ].join("");
    case "square":
      return `<rect x="58" y="116" width="44" height="24" rx="4" fill="${palette.line}" opacity="0.78"/>`;
    case "terracotta":
      return [
        `<path d="M56 114h48l-4 22c-1 4-4 6-8 6H68c-4 0-7-2-8-6Z" fill="#C76F3E"/>`,
        `<path d="M54 112h52" fill="none" stroke="#E29A67" stroke-width="6" stroke-linecap="round"/>`,
      ].join("");
    case "none":
    default:
      return "";
  }
}
