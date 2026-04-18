# @agent-face/core

Deterministic seed-to-SVG robot avatar core for AgentFace.

## Install

```bash
pnpm add @agent-face/core
```

## API

```ts
import {
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  deserializeAgentFaceConfig,
} from "@agent-face/core";

const config = generateAgentFaceConfig("0xabc123");
const svg = renderAgentFaceSvg(config);
const query = serializeAgentFaceConfig(config);
const restored = deserializeAgentFaceConfig(query);
```

## Exports

- `AgentFaceConfig`
- `generateAgentFaceConfig(seed: string)`
- `renderAgentFaceSvg(config: AgentFaceConfig)`
- `serializeAgentFaceConfig(config: AgentFaceConfig)`
- `deserializeAgentFaceConfig(input: string | URLSearchParams)`

## Notes

- Same seed always produces the same config.
- SVG output is a complete string and does not depend on the browser DOM.
- Repository: https://github.com/joyboy-sats/agent-face
