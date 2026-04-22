# AgentFace

[中文](./README.zh-CN.md) 

Deterministic SVG character avatars for agents, wallet addresses, and pseudonymous identities.

![AgentFace avatar gallery](./docs/images/avatar-grid.svg)

AgentFace maps wallet addresses, public keys, hashes, and any stable string to a reproducible character avatar that fits directly into product UI.

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
- switch between `robot`, `human`, `animal`, `plant`, `fish`, and `geo`
- preview the generated avatar in real time
- tweak grouped options with URL sync
- export SVG, PNG, or WebP
- copy the config JSON

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
  CHARACTER_TYPES,
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  deserializeAgentFaceConfig,
} from "@agent-face/core";

const config = generateAgentFaceConfig("0xabc123", "fish");
const svg = renderAgentFaceSvg(config);
const query = serializeAgentFaceConfig(config);
const restored = deserializeAgentFaceConfig(query);

console.log(CHARACTER_TYPES);
```

### React Example

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return (
    <AgentFace
      seed="demo-agent"
      characterType="fish"
      size={120}
      imageUrl="https://example.com/avatar.png" // Optional
      imageAlt="Custom avatar"
      loadingShowcaseMode="skeleton" // skeleton/avatar (Optional)
      className="rounded-3xl shadow-sm"
    />
  );
}
```

### Vue Example

```vue
<script setup lang="ts">
import { AgentFace } from "@agent-face/vue";
</script>

<template>
  <AgentFace
    seed="demo-agent"
    character-type="fish"
    :size="120"
    <!-- Optional: show your own image first -->
    image-url="https://example.com/avatar.png"
    image-alt="Custom avatar"
    <!-- Optional: skeleton/avatar -->
    loading-showcase-mode="skeleton"
    class="rounded-3xl shadow-sm"
  />
</template>
```

If `imageUrl` is provided, the component shows a lightweight placeholder while loading and automatically falls back to AgentFace if the image fails to load. Omitting `characterType` keeps full backward compatibility with the original robot renderer.

## Packages

```text
packages/
  core/   deterministic config generation, URL serialization, SVG rendering
  react/  React wrapper
  vue/    Vue wrapper
  web/    playground app
```
