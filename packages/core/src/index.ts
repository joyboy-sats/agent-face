import {
  ACCESSORY_TYPES,
  ANTENNA_TYPES,
  ARMOR_TYPES,
  EYE_TYPES,
  MOUTH_TYPES,
  NECK_TYPES,
  ROBOT_FIELD_OPTIONS,
  ROBOT_OPTION_KEYS,
  SHELL_TYPES,
  SIDE_MODULE_TYPES,
  VISOR_TYPES,
  generateRobotTraits,
  renderRobotSvg,
  type RobotOptionKey,
  type RobotTraits,
} from "./types/robot";
import {
  ANIMAL_FIELD_OPTIONS,
  ANIMAL_OPTION_KEYS,
  generateAnimalTraits,
  renderAnimalSvg,
  type AnimalOptionKey,
  type AnimalTraits,
} from "./types/animal";
import {
  COLOR_PALETTES,
  BACKGROUND_TYPES,
  coerceOption,
  readOptionParam,
  type BackgroundType,
  type ColorPalette,
} from "./types/shared";
import {
  FISH_FIELD_OPTIONS,
  FISH_OPTION_KEYS,
  generateFishTraits,
  renderFishSvg,
  type FishOptionKey,
  type FishTraits,
} from "./types/fish";
import {
  GEO_FIELD_OPTIONS,
  GEO_OPTION_KEYS,
  generateGeoTraits,
  renderGeoSvg,
  type GeoOptionKey,
  type GeoTraits,
} from "./types/geo";
import {
  FACE_SHAPES,
  HAIR_STYLES,
  HUMAN_ACCESSORIES,
  HUMAN_EYE_STYLES,
  HUMAN_FIELD_OPTIONS,
  HUMAN_MOUTH_STYLES,
  HUMAN_OPTION_KEYS,
  NOSE_STYLES,
  SKIN_TONES,
  generateHumanTraits,
  renderHumanSvg,
  type HumanOptionKey,
  type HumanTraits,
} from "./types/human";
import {
  BLOOM_STYLES,
  LEAF_SHAPES,
  PLANT_FIELD_OPTIONS,
  PLANT_FORMS,
  PLANT_OPTION_KEYS,
  POT_STYLES,
  STEM_STYLES,
  generatePlantTraits,
  renderPlantSvg,
  type PlantOptionKey,
  type PlantTraits,
} from "./types/plant";

export const AGENT_FACE_VERSION = "v1" as const;
export const AGENT_FACE_DEFAULT_SEED = "agentface";
export const CHARACTER_TYPES = ["robot", "human", "animal", "plant", "fish", "geo"] as const;

export type CharacterType = (typeof CHARACTER_TYPES)[number];

export interface BaseAgentFaceConfig {
  seed: string;
  version: typeof AGENT_FACE_VERSION;
  characterType: CharacterType;
  backgroundType: BackgroundType;
}

export interface RobotAgentFaceConfig extends BaseAgentFaceConfig, RobotTraits {
  characterType: "robot";
}

export interface HumanAgentFaceConfig extends BaseAgentFaceConfig, HumanTraits {
  characterType: "human";
}

export interface AnimalAgentFaceConfig extends BaseAgentFaceConfig, AnimalTraits {
  characterType: "animal";
}

export interface PlantAgentFaceConfig extends BaseAgentFaceConfig, PlantTraits {
  characterType: "plant";
}

export interface FishAgentFaceConfig extends BaseAgentFaceConfig, FishTraits {
  characterType: "fish";
}

export interface GeoAgentFaceConfig extends BaseAgentFaceConfig, GeoTraits {
  characterType: "geo";
}

export type AgentFaceConfig =
  | RobotAgentFaceConfig
  | HumanAgentFaceConfig
  | AnimalAgentFaceConfig
  | PlantAgentFaceConfig
  | FishAgentFaceConfig
  | GeoAgentFaceConfig;

export type AgentFaceOptionKey =
  | RobotOptionKey
  | HumanOptionKey
  | AnimalOptionKey
  | PlantOptionKey
  | FishOptionKey
  | GeoOptionKey;

export const AGENT_FACE_OPTIONS = ROBOT_FIELD_OPTIONS;

export const CHARACTER_TYPE_OPTION_KEYS = {
  robot: ROBOT_OPTION_KEYS,
  human: HUMAN_OPTION_KEYS,
  animal: ANIMAL_OPTION_KEYS,
  plant: PLANT_OPTION_KEYS,
  fish: FISH_OPTION_KEYS,
  geo: GEO_OPTION_KEYS,
} as const satisfies Record<CharacterType, readonly AgentFaceOptionKey[]>;

export const CHARACTER_TYPE_OPTIONS = {
  robot: ROBOT_FIELD_OPTIONS,
  human: HUMAN_FIELD_OPTIONS,
  animal: ANIMAL_FIELD_OPTIONS,
  plant: PLANT_FIELD_OPTIONS,
  fish: FISH_FIELD_OPTIONS,
  geo: GEO_FIELD_OPTIONS,
} as const;

type PartialConfigInput = {
  seed?: string;
  version?: string;
  characterType?: string;
} & Partial<Record<AgentFaceOptionKey, string>>;

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

export function generateAgentFaceConfig(seed: string, characterType: CharacterType = "robot"): AgentFaceConfig {
  const normalizedSeed = normalizeAgentFaceSeed(seed);

  switch (characterType) {
    case "human":
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType,
        ...generateHumanTraits(normalizedSeed),
      };
    case "animal":
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType,
        ...generateAnimalTraits(normalizedSeed),
      };
    case "plant":
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType,
        ...generatePlantTraits(normalizedSeed),
      };
    case "fish":
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType,
        ...generateFishTraits(normalizedSeed),
      };
    case "geo":
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType,
        ...generateGeoTraits(normalizedSeed),
      };
    case "robot":
    default:
      return {
        seed: normalizedSeed,
        version: AGENT_FACE_VERSION,
        characterType: "robot",
        ...generateRobotTraits(normalizedSeed),
      };
  }
}

export function mergeAgentFaceConfig(seed: string, overrides: PartialConfigInput): AgentFaceConfig {
  const normalizedSeed = normalizeAgentFaceSeed(overrides.seed ?? seed);
  const characterType = coerceCharacterType(overrides.characterType);
  const base = generateAgentFaceConfig(normalizedSeed, characterType);
  const nextConfig: Record<string, string> = { ...base };
  const fieldKeys = CHARACTER_TYPE_OPTION_KEYS[characterType];
  const fieldOptions = CHARACTER_TYPE_OPTIONS[characterType];

  for (const key of fieldKeys) {
    const options = fieldOptions[key as keyof typeof fieldOptions] as readonly string[];
    const fallback = String(base[key as keyof AgentFaceConfig]);
    nextConfig[key] = coerceOption(overrides[key], options, fallback);
  }

  return {
    ...base,
    ...nextConfig,
  } as AgentFaceConfig;
}

export function serializeAgentFaceConfig(config: AgentFaceConfig): string {
  const params = new URLSearchParams();
  params.set("seed", config.seed);
  params.set("version", config.version);
  params.set("characterType", config.characterType);

  for (const key of CHARACTER_TYPE_OPTION_KEYS[config.characterType]) {
    params.set(key, String(config[key as keyof AgentFaceConfig]));
  }

  return params.toString();
}

export function deserializeAgentFaceConfig(input: string | URLSearchParams): AgentFaceConfig {
  const params =
    typeof input === "string"
      ? new URLSearchParams(input.startsWith("?") ? input.slice(1) : input)
      : input;

  const seed = normalizeAgentFaceSeed(params.get("seed") ?? AGENT_FACE_DEFAULT_SEED);
  const characterType = coerceCharacterType(params.get("characterType"));
  const overrides: PartialConfigInput = {
    seed,
    characterType,
  };
  const optionKeys = CHARACTER_TYPE_OPTION_KEYS[characterType];
  const optionMap = CHARACTER_TYPE_OPTIONS[characterType];

  for (const key of optionKeys) {
    const options = optionMap[key as keyof typeof optionMap] as readonly string[];
    const nextValue = readOptionParam(params, key, options);
    if (nextValue) {
      overrides[key] = nextValue;
    }
  }

  return mergeAgentFaceConfig(seed, overrides);
}

export function renderAgentFaceSvg(config: AgentFaceConfig): string {
  switch (config.characterType) {
    case "human":
      return renderHumanSvg(config);
    case "animal":
      return renderAnimalSvg(config);
    case "plant":
      return renderPlantSvg(config);
    case "fish":
      return renderFishSvg(config);
    case "geo":
      return renderGeoSvg(config);
    case "robot":
    default:
      return renderRobotSvg(config);
  }
}

export function renderAgentFaceSvgDataUri(config: AgentFaceConfig): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderAgentFaceSvg(config))}`;
}

function coerceCharacterType(value: string | null | undefined): CharacterType {
  return typeof value === "string" && CHARACTER_TYPES.includes(value as CharacterType)
    ? (value as CharacterType)
    : "robot";
}

export { BACKGROUND_TYPES, COLOR_PALETTES } from "./types/shared";
export {
  ACCESSORY_TYPES,
  ANTENNA_TYPES,
  ARMOR_TYPES,
  EYE_TYPES,
  MOUTH_TYPES,
  NECK_TYPES,
  SHELL_TYPES,
  SIDE_MODULE_TYPES,
  VISOR_TYPES,
} from "./types/robot";
export {
  FACE_SHAPES,
  HAIR_STYLES,
  HUMAN_ACCESSORIES,
  HUMAN_EYE_STYLES,
  HUMAN_MOUTH_STYLES,
  NOSE_STYLES,
  SKIN_TONES,
} from "./types/human";
export {
  EAR_STYLES,
  MARKING_TYPES,
  SPECIES_TYPES,
} from "./types/animal";
export {
  BLOOM_STYLES,
  LEAF_SHAPES,
  PLANT_FORMS,
  POT_STYLES,
  STEM_STYLES,
} from "./types/plant";
export {
  BODY_SHAPES,
  BUBBLE_STYLES,
  FIN_STYLES,
  FISH_EYE_STYLES,
  SCALE_PATTERNS,
  TAIL_STYLES,
} from "./types/fish";
export {
  CORNER_STYLES,
  INNER_PATTERNS,
  ORBIT_STYLES,
  PRIMARY_SHAPES,
  SYMMETRY_TYPES,
} from "./types/geo";
