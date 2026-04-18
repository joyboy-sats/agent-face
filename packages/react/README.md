# @agent-face/react

React wrapper for deterministic AgentFace robot avatars.

## Install

```bash
pnpm add @agent-face/react
```

Peer dependency:

```bash
pnpm add react react-dom
```

## Usage

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return <AgentFace seed="demo-agent" size={120} />;
}
```

## Props

- `seed?: string`
- `config?: AgentFaceConfig`
- `size?: number | string`
- `className?: string`

## Notes

- `seed` and `config` are both supported.
- When `config` is provided, it takes precedence over generated config.
- Repository: https://github.com/joyboy-sats/agent-face
