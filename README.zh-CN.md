# AgentFace

[English](./README.md)

AgentFace 是一个开源机器人头像系统，用于把 `seed`、wallet address 或其他稳定标识映射为稳定、可配置、可复现的 SVG 头像。

## 在线 Playground

- 网站地址：https://agent-face.ch4.app

## 仓库结构

```text
packages/
  core/   稳定配置生成、URL 序列化、SVG 渲染
  react/  React 组件封装
  web/    playground 网站
```

## 安装

推荐环境：

- Node.js `20+`
- pnpm `10+`

```bash
pnpm install
```

安装已发布包：

```bash
pnpm add @agent-face/core
pnpm add @agent-face/react
```

## 本地使用

本地启动 playground：

```bash
pnpm dev
```

默认访问地址：

- `http://localhost:5173`

常用命令：

```bash
pnpm build
pnpm typecheck
pnpm test
```

## Core 示例

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

## React 示例

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return <AgentFace seed="demo-agent" size={120} />;
}
```

## Playground 用法

网站核心路径：

1. 输入 `seed` 或地址
2. 查看生成头像
3. 调整分组配置项
4. 复制分享链接或导出 SVG

当前支持：

- 基于 `seed/address` 的稳定生成
- 实时预览
- 分组配置编辑
- URL 状态同步
- 配置 JSON 复制
- SVG 导出
