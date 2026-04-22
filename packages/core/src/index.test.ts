import { describe, expect, it } from "vitest";
import {
  CHARACTER_TYPES,
  deserializeAgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  renderAgentFaceSvgDataUri,
  serializeAgentFaceConfig
} from "./index";

describe("@agent-face/core", () => {
  it("generates the same config for the same seed", () => {
    const first = generateAgentFaceConfig("0xABCD1234");
    const second = generateAgentFaceConfig("0xabcd1234");

    expect(first).toEqual(second);
  });

  it("renders a complete svg string", () => {
    const svg = renderAgentFaceSvg(generateAgentFaceConfig("agent-face-test"));

    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg.includes("</svg>")).toBe(true);
    expect(svg.includes("viewBox=\"0 0 160 160\"")).toBe(true);
  });

  it("supports deterministic config generation for every character type", () => {
    for (const characterType of CHARACTER_TYPES) {
      const first = generateAgentFaceConfig("multi-character-seed", characterType);
      const second = generateAgentFaceConfig("multi-character-seed", characterType);

      expect(first).toEqual(second);
      expect(first.characterType).toBe(characterType);
    }
  });

  it("renders a data uri for svg fallback usage", () => {
    const dataUri = renderAgentFaceSvgDataUri(generateAgentFaceConfig("agent-face-test"));

    expect(dataUri.startsWith("data:image/svg+xml;charset=utf-8,")).toBe(true);
    expect(dataUri.includes("%3Csvg")).toBe(true);
  });

  it("round-trips config serialization for url sync", () => {
    const config = generateAgentFaceConfig("joyboy-agent");
    const serialized = serializeAgentFaceConfig(config);
    const deserialized = deserializeAgentFaceConfig(serialized);

    expect(deserialized).toEqual(config);
  });

  it("round-trips non-robot character types through url serialization", () => {
    const config = generateAgentFaceConfig("joyboy-fish", "fish");
    const serialized = serializeAgentFaceConfig(config);
    const deserialized = deserializeAgentFaceConfig(serialized);

    expect(serialized).toContain("characterType=fish");
    expect(deserialized).toEqual(config);
  });

  it("falls back to robot when characterType is invalid", () => {
    const deserialized = deserializeAgentFaceConfig(
      "seed=invalid-character&characterType=unknown&primaryShape=hexagon"
    );

    expect(deserialized.characterType).toBe("robot");
    expect(deserialized).toEqual(generateAgentFaceConfig("invalid-character"));
  });

  it("renders all character types with a consistent 160x160 viewBox", () => {
    for (const characterType of CHARACTER_TYPES) {
      const svg = renderAgentFaceSvg(generateAgentFaceConfig("all-character-types", characterType));

      expect(svg.includes("viewBox=\"0 0 160 160\"")).toBe(true);
      expect(svg).toContain(`data-character-type="${characterType}"`);
    }
  });
});
