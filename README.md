# AgentFace

AgentFace 是一个开源机器人头像系统，用于把 `seed`、wallet address 或其他稳定标识映射为可复现、可配置、可嵌入的 SVG 头像。仓库采用 Monorepo 结构，包含核心生成库、React 组件封装和一个面向开发者的 Web playground。

## 项目简介

这个项目解决的不是“一次性随机出图”，而是为开发者提供一套稳定的视觉身份协议：

- 同一 `seed` 输出完全一致的配置和 SVG
- 配置对象可序列化、可 URL 化、可复制到业务代码
- 网站、核心库和 React 组件共享同一套参数语义
- Web playground 围绕 `输入 seed -> 预览 -> 微调 -> 导出 / 分享` 组织

## 核心特性

- `generateAgentFaceConfig(seed)` 生成稳定配置
- `renderAgentFaceSvg(config)` 输出完整可保存的 SVG 字符串
- 支持 seed / address 标准化
- 支持配置序列化与 URL 参数闭环
- 提供 `<AgentFace />` React 组件
- 提供 React + Vite + TypeScript 的 Web 配置站
- 支持实时预览、配置面板、复制配置和导出 SVG

## Monorepo 结构

```text
packages/
  core/   核心配置生成、URL 序列化、SVG 渲染
  react/  React 组件封装
  web/    基于 Vite 的静态配置网站
```

## 安装方式

推荐环境：

- Node.js `20+`
- pnpm `10+`

```bash
pnpm install
```

仓库已经配置为 `pnpm workspace`，内部包依赖通过 `workspace:*` 关联。

## 本地开发方式

启动主 playground：

```bash
pnpm dev
```

当前根目录 `dev` 脚本会直接启动 `packages/web` 的 Vite 开发服务器。

单独启动 web：

```bash
pnpm --filter @agent-face/web dev
```

构建整个仓库：

```bash
pnpm build
```

类型检查：

```bash
pnpm typecheck
```

运行测试：

```bash
pnpm test
```

## 当前已实现能力

- 可维护的 npm workspace monorepo
- `packages/core` 的稳定配置生成、SVG 渲染、配置合并与 URL 序列化
- `packages/react` 的 `<AgentFace />` 组件和最小示例组件
- `packages/web` 的 playground 布局，包含输入、主预览、分组配置和高频操作
- 页面状态 URL 同步与刷新恢复
- 分享链接复制
- 配置 JSON 复制
- SVG 导出下载
- `core` 基础测试、类型检查与构建链路

## 后续计划

- 扩展更多机器人部件和配色主题
- 增加更丰富的嵌入示例与设计展示
- 完善视觉资源、快照测试和发布流程

## 开发命令

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm test
```

## 最小 API 示例

### core

```ts
import {
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  deserializeAgentFaceConfig
} from "@agent-face/core";

const config = generateAgentFaceConfig("0xabc123");
const svg = renderAgentFaceSvg(config);
const query = serializeAgentFaceConfig(config);
const restored = deserializeAgentFaceConfig(query);
```

### react

```tsx
import { AgentFace } from "@agent-face/react";

export function Example() {
  return <AgentFace seed="demo-agent" size={120} />;
}
```

## Web Playground

`packages/web` 是一个面向开发者的静态 playground，用来快速理解 AgentFace 的配置模型，而不是单纯展示原始配置数据。

用途：

- 输入 `seed/address` 并实时看到头像变化
- 按 `Face / Head`、`Structure`、`Style` 分组微调配置
- 重新生成当前 seed 或随机生成新 seed
- 复制分享链接
- 导出 SVG
- 在折叠区查看 URL 参数和配置 JSON

本地访问：

```bash
pnpm dev
```

默认地址通常为：

- `http://localhost:5173`

静态构建产物位于：

- `packages/web/dist`

## Cloudflare Pages 部署说明

AgentFace Web 站点是标准 Vite 静态站点，适用于 Cloudflare Pages 的纯静态部署。

部署时使用：

- Framework preset: `Vite`
- Build command: `pnpm build`
- Build output directory: `packages/web/dist`
- Root project directory: 仓库根目录
- Node version: 建议使用 Node `20+`

说明：

- 部署对象是 `packages/web` 的 Vite 构建产物
- 当前版本不依赖数据库、账号系统或服务端 API
- 只需要在仓库根目录执行构建，然后发布 `packages/web/dist`

## npm 发布

当前仓库已经为 `@agent-face/core` 和 `@agent-face/react` 补齐了基础发布元数据，并提供了 GitHub Actions 发布工作流。

发布前请先确认两件事：

- 你拥有 npm scope `@agent-face` 的发布权限
- 包版本号已经更新，避免重复发布同一版本

### 推荐方式：GitHub Actions Trusted Publishing

仓库内已提供 `.github/workflows/publish-packages.yml`。推荐做法：

1. 在 npm 后台分别为 `@agent-face/core` 和 `@agent-face/react` 配置 Trusted Publisher
2. 绑定 GitHub 仓库 `joyboy-sats/agent-face`
3. 工作流文件名填写 `publish-packages.yml`
4. 推送版本 tag，或手动触发 workflow

这种方式不需要长期有效的 npm access token。

### 推荐发版流程

后续版本建议统一从仓库根目录执行：

```bash
pnpm release:version 1.0.1
pnpm build
pnpm typecheck
pnpm test
git add packages/core/package.json packages/react/package.json
git commit -m "chore: release 1.0.1"
git tag v1.0.1
git push origin main --tags
```

之后可以：

- 直接依赖 tag 触发 `.github/workflows/publish-packages.yml`
- 或手动触发 workflow，并传入同样的版本号

工作流会校验：

- `packages/core` 和 `packages/react` 的版本是否一致
- tag 版本是否与包版本一致

### 手动发布

如果你打算在本地直接发布，需要先登录 npm：

```bash
npm login
pnpm --filter @agent-face/core publish --access public
pnpm --filter @agent-face/react publish --access public
```

如果不用 `npm login`，也可以在本地配置 npm access token。

### 关于 npm Token

- 使用 GitHub Actions Trusted Publishing：通常不需要创建长期 npm access token
- 使用 GitHub Actions 但不用 Trusted Publishing：需要创建 npm token，并存成 GitHub Secret，例如 `NPM_TOKEN`
- 在本地手动发布：需要先 `npm login`，或本地配置可发布的 npm token
