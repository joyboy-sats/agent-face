# AgentFace

[中文](./README.zh-CN.md) 

Deterministic SVG robot avatars for agents, wallet addresses, and pseudonymous identities.

![AgentFace avatar gallery](./docs/images/avatar-grid.svg)

AgentFace maps wallet addresses, public keys, hashes, and any stable string to a reproducible robot avatar that fits directly into product UI.

Built for:

- agent profiles
- wallet and address UIs
- onchain identity pages
- member lists and dashboards
- social cards and community products

## Live Playground

- Try it now: https://agent-face.ch4.app

![AgentFace playground preview](./docs/images/playground-preview.png)

In the playground you can:

- enter a `seed`, address, or any stable identifier
- preview the generated avatar in real time
- tweak grouped options with URL sync
- export SVG or copy the config JSON

## Why AgentFace

- Deterministic by default: the same input always produces the same avatar, which makes it useful for identity surfaces and caching.
- SVG-first: render, export, cache, theme, and embed without relying on a backend image pipeline.
- Chain-agnostic: works with EVM, Solana, Bitcoin, and any other system with a stable identifier.
- Frontend-friendly: use the same config model across `core`, React, Vue, and the playground.
- Identity-ready: fits wallet connection states, avatar badges, address lists, member directories, and profile cards.

## Quick Start

Recommended environment:

- Node.js `20+`
- pnpm `10+`

Install dependencies:

```bash
pnpm install
```

Install the published packages:

```bash
pnpm add @agent-face/core
pnpm add @agent-face/react
pnpm add @agent-face/vue
```

### Core Example

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

### React Example

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return <AgentFace seed="demo-agent" size={120} className="rounded-3xl shadow-sm" />;
}
```

### Vue Example

```vue
<script setup lang="ts">
import { AgentFace } from "@agent-face/vue";
</script>

<template>
  <AgentFace seed="demo-agent" :size="120" class="rounded-3xl shadow-sm" />
</template>
```

## Packages

```text
packages/
  core/   deterministic config generation, URL serialization, SVG rendering
  react/  React wrapper
  vue/    Vue wrapper
  web/    playground app
```

## Local Development

Run the playground locally:

```bash
pnpm dev
```

Default URL:

- `http://localhost:5173`

Common commands:

```bash
pnpm build
pnpm typecheck
pnpm test
```
