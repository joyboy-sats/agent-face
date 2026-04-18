# AgentFace

[中文](./README.zh-CN.md)

AgentFace is an open-source robot avatar system that maps a `seed`, wallet address, or any stable identifier to a deterministic, configurable SVG avatar.

## Live Playground

- Website: https://agent-face.ch4.app

## Packages

```text
packages/
  core/   deterministic config generation, URL serialization, SVG rendering
  react/  React wrapper
  web/    playground app
```

## Install

Recommended environment:

- Node.js `20+`
- pnpm `10+`

```bash
pnpm install
```

Install the published packages:

```bash
pnpm add @agent-face/core
pnpm add @agent-face/react
```

## Local Usage

Start the playground locally:

```bash
pnpm dev
```

Default local URL:

- `http://localhost:5173`

Useful commands:

```bash
pnpm build
pnpm typecheck
pnpm test
```

## Core Example

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

## React Example

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return <AgentFace seed="demo-agent" size={120} />;
}
```

## Playground Usage

The web playground is designed around a simple flow:

1. Enter a `seed` or address
2. Preview the generated avatar
3. Adjust grouped options
4. Copy a share link or export SVG

Current playground capabilities:

- deterministic generation from `seed/address`
- live preview
- grouped config editing
- shareable URL sync
- config JSON copy
- SVG export
