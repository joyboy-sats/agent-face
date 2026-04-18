# AgentFace

[中文](./README.zh-CN.md) 

AgentFace generates deterministic SVG robot avatars from wallet addresses, public keys, hashes, and any stable string.

Built for wallet UIs, onchain profiles, social cards, dashboards, and crypto apps.

## Live Playground

- Website: https://agent-face.ch4.app

## Packages

```text
packages/
  core/   deterministic config generation, URL serialization, SVG rendering
  react/  React wrapper
  vue/    Vue wrapper
  web/    playground app
```

## Why AgentFace

- Chain-agnostic: works with EVM, Solana, Bitcoin, and any other ecosystem as long as you have a stable string.
- SVG-first: deterministic output you can render, export, cache, and theme without a backend.
- Frontend-friendly: use the same config model in core, React, Vue, and the playground.
- Identity-ready: good fit for wallet connection states, profile chips, member lists, and portfolio views.

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
pnpm add @agent-face/vue
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
  return <AgentFace seed="demo-agent" size={120} className="rounded-3xl shadow-sm" />;
}
```

## Vue Example

```vue
<script setup lang="ts">
import { AgentFace } from "@agent-face/vue";
</script>

<template>
  <AgentFace seed="demo-agent" :size="120" class="rounded-3xl shadow-sm" />
</template>
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
- English / Chinese language switching
- grouped config editing
- shareable URL sync
- config JSON copy
- SVG export
- package-level custom image URL with a sketch loading placeholder and AgentFace fallback
