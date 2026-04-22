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

export const PRIMARY_SHAPES = ["circle", "square", "triangle", "hexagon"] as const;
export const INNER_PATTERNS = ["none", "grid", "radial", "concentric"] as const;
export const ORBIT_STYLES = ["none", "single", "double", "scattered"] as const;
export const CORNER_STYLES = ["sharp", "rounded", "cut", "none"] as const;
export const SYMMETRY_TYPES = ["radial", "bilateral", "asymmetric", "rotational"] as const;

export const GEO_OPTION_KEYS = [
  "primaryShape",
  "innerPattern",
  "orbits",
  "cornerStyle",
  "symmetry",
  "colorPalette",
  "backgroundType",
] as const;

export type GeoOptionKey = (typeof GEO_OPTION_KEYS)[number];

export interface GeoTraits {
  primaryShape: (typeof PRIMARY_SHAPES)[number];
  innerPattern: (typeof INNER_PATTERNS)[number];
  orbits: (typeof ORBIT_STYLES)[number];
  cornerStyle: (typeof CORNER_STYLES)[number];
  symmetry: (typeof SYMMETRY_TYPES)[number];
  colorPalette: ColorPalette;
  backgroundType: BackgroundType;
}

export const GEO_FIELD_OPTIONS = {
  primaryShape: PRIMARY_SHAPES,
  innerPattern: INNER_PATTERNS,
  orbits: ORBIT_STYLES,
  cornerStyle: CORNER_STYLES,
  symmetry: SYMMETRY_TYPES,
  colorPalette: COLOR_PALETTES,
  backgroundType: BACKGROUND_TYPES,
} as const;

export function generateGeoTraits(seed: string): GeoTraits {
  const digest = createSeedDigest(seed);

  return {
    primaryShape: pickOption(digest, 0, PRIMARY_SHAPES),
    innerPattern: pickOption(digest, 1, INNER_PATTERNS),
    orbits: pickOption(digest, 2, ORBIT_STYLES),
    cornerStyle: pickOption(digest, 3, CORNER_STYLES),
    symmetry: pickOption(digest, 4, SYMMETRY_TYPES),
    colorPalette: pickOption(digest, 5, COLOR_PALETTES),
    backgroundType: pickOption(digest, 6, BACKGROUND_TYPES),
  };
}

export function renderGeoSvg(config: { seed: string } & GeoTraits): string {
  const palette = getColorPaletteTokens(config.colorPalette);
  const bodyMarkup = [
    renderGeoOrbits(config, palette),
    renderGeoPrimaryShape(config, palette),
    renderGeoPattern(config, palette),
    renderGeoSymmetry(config, palette),
  ].join("");

  return buildSvgDocument({
    seed: config.seed,
    characterType: "geo",
    backgroundMarkup: renderBackground(config.backgroundType, palette),
    contentMarkup: bodyMarkup,
  });
}

function renderGeoPrimaryShape(config: GeoTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  const rounded = config.cornerStyle === "rounded" ? 18 : config.cornerStyle === "none" ? 0 : 6;

  switch (config.primaryShape) {
    case "square":
      return `<rect x="44" y="44" width="72" height="72" rx="${rounded}" fill="${palette.primary}" stroke="${palette.line}" stroke-width="5"/>`;
    case "triangle":
      return `<path d="M80 38 118 112H42Z" fill="${palette.primary}" stroke="${palette.line}" stroke-width="5" stroke-linejoin="${config.cornerStyle === "sharp" ? "miter" : "round"}"/>`;
    case "hexagon":
      return `<path d="M58 48h44l20 32-20 32H58L38 80Z" fill="${palette.primary}" stroke="${palette.line}" stroke-width="5" stroke-linejoin="${config.cornerStyle === "sharp" ? "miter" : "round"}"/>`;
    case "circle":
    default:
      return `<circle cx="80" cy="80" r="34" fill="${palette.primary}" stroke="${palette.line}" stroke-width="5"/>`;
  }
}

function renderGeoPattern(config: GeoTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.innerPattern) {
    case "grid":
      return `<path d="M62 58v44M80 50v60M98 58v44M56 68h48M54 80h52M56 92h48" stroke="${palette.highlight}" stroke-width="3" opacity="0.7"/>`;
    case "radial":
      return `<path d="M80 50v60M50 80h60M60 60l40 40M100 60 60 100" stroke="${palette.highlight}" stroke-width="3" opacity="0.7" stroke-linecap="round"/>`;
    case "concentric":
      return `<circle cx="80" cy="80" r="18" fill="none" stroke="${palette.highlight}" stroke-width="4" opacity="0.7"/><circle cx="80" cy="80" r="8" fill="${palette.detail}" opacity="0.8"/>`;
    case "none":
    default:
      return `<circle cx="80" cy="80" r="6" fill="${palette.detail}" opacity="0.75"/>`;
  }
}

function renderGeoOrbits(config: GeoTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.orbits) {
    case "single":
      return `<circle cx="80" cy="80" r="50" fill="none" stroke="${palette.detail}" stroke-width="3" opacity="0.5"/>`;
    case "double":
      return `<circle cx="80" cy="80" r="46" fill="none" stroke="${palette.detail}" stroke-width="3" opacity="0.5"/><circle cx="80" cy="80" r="56" fill="none" stroke="${palette.highlight}" stroke-width="2" opacity="0.55"/>`;
    case "scattered":
      return [
        `<circle cx="32" cy="52" r="6" fill="${palette.detail}" opacity="0.65"/>`,
        `<circle cx="126" cy="42" r="5" fill="${palette.detail}" opacity="0.65"/>`,
        `<circle cx="122" cy="118" r="7" fill="${palette.highlight}" opacity="0.65"/>`,
      ].join("");
    case "none":
    default:
      return "";
  }
}

function renderGeoSymmetry(config: GeoTraits, palette: ReturnType<typeof getColorPaletteTokens>): string {
  switch (config.symmetry) {
    case "bilateral":
      return `<path d="M80 42v76" fill="none" stroke="${palette.line}" stroke-width="2" opacity="0.28"/>`;
    case "asymmetric":
      return `<rect x="94" y="64" width="12" height="12" rx="3" fill="${palette.line}" opacity="0.45"/>`;
    case "rotational":
      return `<path d="M80 48a32 32 0 0 1 22 10" fill="none" stroke="${palette.line}" stroke-width="4" opacity="0.35" stroke-linecap="round"/>`;
    case "radial":
    default:
      return `<circle cx="80" cy="80" r="26" fill="none" stroke="${palette.line}" stroke-width="2" opacity="0.22"/>`;
  }
}
