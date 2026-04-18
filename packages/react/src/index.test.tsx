import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { generateAgentFaceConfig, renderAgentFaceSvgDataUri } from "@agent-face/core";

import { AgentFace } from "./index";

describe("@agent-face/react", () => {
  it("marks the package entry as a client component", () => {
    const source = readFileSync(new URL("./index.tsx", import.meta.url), "utf8");

    expect(source.startsWith('"use client";')).toBe(true);
  });

  it("renders a deterministic fallback avatar from seed", () => {
    const config = generateAgentFaceConfig("react-seed");
    const expectedSrc = renderAgentFaceSvgDataUri(config);
    const markup = renderToStaticMarkup(
      <AgentFace className="rounded-xl shadow-sm" seed="react-seed" size={120} />
    );

    expect(markup).toContain('class="rounded-xl shadow-sm"');
    expect(markup).toContain('role="img"');
    expect(markup).toContain('width:120px');
    expect(markup).toContain(`src="${expectedSrc}"`);
  });

  it("renders custom image props and loading placeholder markup", () => {
    const markup = renderToStaticMarkup(
      <AgentFace
        imageAlt="Custom avatar"
        imageClassName="object-contain"
        imageUrl="https://example.com/avatar.png"
        seed="react-image"
      />
    );

    expect(markup).toContain('src="https://example.com/avatar.png"');
    expect(markup).toContain('alt="Custom avatar"');
    expect(markup).toContain('class="block h-full w-full object-cover object-contain"');
    expect(markup).toContain('aria-hidden="true"');
  });

  it("supports avatar loading placeholder mode", () => {
    const config = generateAgentFaceConfig("react-avatar-loading");
    const fallbackSrc = renderAgentFaceSvgDataUri(config);
    const markup = renderToStaticMarkup(
      <AgentFace
        imageUrl="https://example.com/avatar.png"
        loadingShowcaseMode="avatar"
        seed="react-avatar-loading"
      />
    );

    expect(markup).toContain('src="https://example.com/avatar.png"');
    expect(markup).toContain(`src="${fallbackSrc}"`);
    expect(markup).not.toContain("agentface-skeleton-pulse");
  });

  it("prefers explicit config over seed generation", () => {
    const config = generateAgentFaceConfig("config-wins");
    const markup = renderToStaticMarkup(
      <AgentFace config={config} seed="different-seed" />
    );

    expect(markup).toContain(`src="${renderAgentFaceSvgDataUri(config)}"`);
  });
});
