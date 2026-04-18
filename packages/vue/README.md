# @agent-face/vue

Vue wrapper for deterministic AgentFace robot avatars.

## Install

```bash
pnpm add @agent-face/vue
pnpm add vue
```

## Usage

```vue
<script setup lang="ts">
import { AgentFace } from "@agent-face/vue";
</script>

<template>
  <AgentFace seed="demo-agent" :size="120" class="rounded-3xl shadow-sm" />
</template>
```

## Props

- `seed?: string`
- `config?: AgentFaceConfig`
- `size?: number | string`
- `className?: string`
- `imageUrl?: string`
- `imageAlt?: string`
- `imageClassName?: string`

If `imageUrl` is provided, the component shows a lightweight sketch placeholder while the image is loading.
If `imageUrl` fails to load, the component falls back to the generated AgentFace avatar.
