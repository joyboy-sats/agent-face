import { createSSRApp, h } from "vue";
import { describe, expect, it } from "vitest";
import { generateAgentFaceConfig, renderAgentFaceSvgDataUri } from "@agent-face/core";

import { AgentFace } from "./index";

async function renderAppToString(app: ReturnType<typeof createSSRApp>) {
  const { renderToString } = await import("@vue/server-renderer");
  return renderToString(app);
}

describe("@agent-face/vue", () => {
  it("renders a deterministic fallback avatar from seed", async () => {
    const config = generateAgentFaceConfig("vue-seed");
    const expectedSrc = renderAgentFaceSvgDataUri(config);
    const app = createSSRApp({
      render() {
        return h(AgentFace, {
          seed: "vue-seed",
          size: 112,
          className: "rounded-xl shadow-sm",
        });
      },
    });

    const markup = await renderAppToString(app);

    expect(markup).toContain('class="rounded-xl shadow-sm"');
    expect(markup).toContain('role="img"');
    expect(markup).toContain('width:112px');
    expect(markup).toContain(`src="${expectedSrc}"`);
  });

  it("renders custom image props and loading placeholder markup", async () => {
    const app = createSSRApp({
      render() {
        return h(AgentFace, {
          seed: "vue-image",
          imageUrl: "https://example.com/avatar.png",
          imageAlt: "Vue custom avatar",
          imageClassName: "object-contain",
        });
      },
    });

    const markup = await renderAppToString(app);

    expect(markup).toContain('src="https://example.com/avatar.png"');
    expect(markup).toContain('alt="Vue custom avatar"');
    expect(markup).toContain('class="block h-full w-full object-cover object-contain"');
    expect(markup).toContain('aria-hidden="true"');
  });

  it("prefers explicit config over seed generation", async () => {
    const config = generateAgentFaceConfig("vue-config-wins");
    const app = createSSRApp({
      render() {
        return h(AgentFace, {
          config,
          seed: "different-seed",
        });
      },
    });

    const markup = await renderAppToString(app);

    expect(markup).toContain(`src="${renderAgentFaceSvgDataUri(config)}"`);
  });
});
