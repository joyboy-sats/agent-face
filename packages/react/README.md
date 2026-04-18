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
  return (
    <AgentFace
      seed="demo-agent"
      size={120}
      className="rounded-3xl shadow-sm"
      imageUrl="https://example.com/avatar.png"
    />
  );
}
```

## Props

- `seed?: string`
- `config?: AgentFaceConfig`
- `size?: number | string`
- `className?: string`
- `imageUrl?: string`
- `imageAlt?: string`
- `imageClassName?: string`

## Notes

- `seed` and `config` are both supported.
- When `config` is provided, it takes precedence over generated config.
- When `imageUrl` is provided, the component shows a lightweight sketch placeholder while the image is loading.
- When `imageUrl` fails to load, the component automatically falls back to the generated AgentFace avatar.
- Custom `className` works for utility-first styling such as Tailwind CSS.
- Repository: https://github.com/joyboy-sats/agent-face
