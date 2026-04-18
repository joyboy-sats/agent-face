import { describe, expect, it } from "vitest";
import {
  deserializeAgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvg,
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

  it("round-trips config serialization for url sync", () => {
    const config = generateAgentFaceConfig("joyboy-agent");
    const serialized = serializeAgentFaceConfig(config);
    const deserialized = deserializeAgentFaceConfig(serialized);

    expect(deserialized).toEqual(config);
  });
});
