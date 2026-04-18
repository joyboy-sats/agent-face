# AgentFace

[English](./README.md)

AgentFace 用于把钱包地址、公钥、哈希或任意稳定字符串映射为稳定、可复现的 SVG 机器人头像。

适合用于钱包 UI、链上身份页、社交卡片、数据面板和各类加密应用。

## 在线 Playground

- 网站地址：https://agent-face.ch4.app

## 仓库结构

```text
packages/
  core/   稳定配置生成、URL 序列化、SVG 渲染
  react/  React 组件封装
  vue/    Vue 组件封装
  web/    playground 网站
```

## 为什么用 AgentFace

- 链无关：不局限于 Ethereum，也适用于 EVM、Solana、Bitcoin 以及任何能提供稳定字符串的系统。
- SVG 优先：输出稳定、可导出、可缓存、可主题化，不依赖后端服务。
- 前端友好：`core`、React、Vue 和 playground 共享同一套配置模型。
- 适合身份场景：可直接用于钱包连接态、地址徽章、成员列表、个人资料卡和资产面板。

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
pnpm add @agent-face/vue
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
  return <AgentFace seed="demo-agent" size={120} className="rounded-3xl shadow-sm" />;
}
```

## Vue 示例

```vue
<script setup lang="ts">
import { AgentFace } from "@agent-face/vue";
</script>

<template>
  <AgentFace seed="demo-agent" :size="120" class="rounded-3xl shadow-sm" />
</template>
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
- 中英文切换
- 分组配置编辑
- URL 状态同步
- 配置 JSON 复制
- SVG 导出
- 组件支持自定义图片链接，加载时显示轻量 sketch 占位图，失败时自动回退到 AgentFace 头像
