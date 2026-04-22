# @agent-face/core

Chain-agnostic deterministic SVG avatar core for wallet addresses, public keys, hashes, and any stable string.

## Install

```bash
pnpm add @agent-face/core
```

## API

```ts
import {
  CHARACTER_TYPES,
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  deserializeAgentFaceConfig,
} from "@agent-face/core";

const config = generateAgentFaceConfig("0xabc123", "geo");
const svg = renderAgentFaceSvg(config);
const query = serializeAgentFaceConfig(config);
const restored = deserializeAgentFaceConfig(query);

console.log(CHARACTER_TYPES);
```

## Exports

- `AgentFaceConfig`
- `CharacterType`
- `CHARACTER_TYPES`
- `generateAgentFaceConfig(seed: string, characterType?: CharacterType)`
- `renderAgentFaceSvg(config: AgentFaceConfig)`
- `serializeAgentFaceConfig(config: AgentFaceConfig)`
- `deserializeAgentFaceConfig(input: string | URLSearchParams)`

## Notes

- Same seed always produces the same config.
- Omitting `characterType` defaults to `"robot"` for backward compatibility.
- Works well with wallet addresses, public keys, hashes, ENS-style names, and other stable identifiers.
- SVG output is a complete string and does not depend on the browser DOM.
- Repository: https://github.com/joyboy-sats/agent-face
