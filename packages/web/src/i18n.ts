import type { AgentFaceOptionKey } from "@agent-face/core";

export type Locale = "zh-CN" | "en";

export const DEFAULT_LOCALE: Locale = "zh-CN";

export const SUPPORTED_LOCALES: Locale[] = ["zh-CN", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "EN",
};

type FieldCopy = {
  label: string;
  hint: string;
};

type GroupCopy = {
  id: string;
  title: string;
  description: string;
  fields: AgentFaceOptionKey[];
};

export const WEB_COPY: Record<
  Locale,
  {
    meta: {
      title: string;
      description: string;
    };
    header: {
      subtitle: string;
      githubCta: string;
    };
    preview: {
      title: string;
      description: string;
    };
    input: {
      title: string;
      description: string;
      placeholder: string;
    };
    actions: {
      share: string;
      shareCopied: string;
      download: string;
      random: string;
      reset: string;
    };
    reactPanel: {
      title: string;
      description: string;
      copy: string;
      copied: string;
    };
    vuePanel: {
      title: string;
      description: string;
      copy: string;
      copied: string;
    };
    configPanel: {
      title: string;
      description: string;
      fields: Record<AgentFaceOptionKey, FieldCopy>;
      groups: GroupCopy[];
      selectPrefix: string;
    };
    configDrawer: {
      trigger: string;
      title: string;
      description: string;
      closeAriaLabel: string;
      copyJson: string;
      queryLabel: string;
      jsonLabel: string;
    };
  }
> = {
  "zh-CN": {
    meta: {
      title: "AgentFace Playground",
      description: "AgentFace 是一个把 seed 或钱包地址映射为稳定机器人 SVG 头像的开源工具。",
    },
    header: {
      subtitle: "稳定生成机器人头像的开发者 playground",
      githubCta: "Star ⭐️",
    },
    preview: {
      title: "Live Preview",
      description: "预览始终是主视觉中心，所有交互围绕它展开。",
    },
    input: {
      title: "Seed / Address",
      description: "输入即生成，不需要额外按钮。",
      placeholder: "0xabc... 或任意字符串",
    },
    actions: {
      share: "复制分享链接",
      shareCopied: "已复制！",
      download: "导出 SVG",
      random: "随机生成",
      reset: "重置",
    },
    reactPanel: {
      title: "在 React 中使用",
      description: "直接复制示例即可嵌入项目。",
      copy: "复制代码",
      copied: "已复制！",
    },
    vuePanel: {
      title: "在 Vue 中使用",
      description: "直接复制示例即可嵌入项目。",
      copy: "复制代码",
      copied: "已复制！",
    },
    configPanel: {
      title: "配置面板",
      description: "配置项按语义分组，默认全部展开。",
      selectPrefix: "选择",
      fields: {
        shellType: { label: "头壳", hint: "决定头部轮廓和第一印象。" },
        visorType: { label: "面罩", hint: "控制面罩和观察窗形式。" },
        eyeType: { label: "眼部", hint: "决定传感器视觉风格。" },
        mouthType: { label: "口部", hint: "决定下半部面板样式。" },
        antennaType: { label: "天线", hint: "顶部信号结构。" },
        sideModuleType: { label: "侧模块", hint: "两侧附加模块。" },
        neckType: { label: "颈部", hint: "头部与底座连接方式。" },
        armorType: { label: "护甲", hint: "颈肩外壳和护甲结构。" },
        accessoryType: { label: "配件", hint: "个体识别小配件。" },
        colorPalette: { label: "配色", hint: "主色调方案。" },
        backgroundType: { label: "背景", hint: "预览背景氛围。" },
      },
      groups: [
        {
          id: "appearance",
          title: "外观",
          description: "最直接影响脸部识别感。",
          fields: ["shellType", "visorType", "eyeType", "mouthType"],
        },
        {
          id: "structure",
          title: "结构",
          description: "控制机体连接件和整体骨架。",
          fields: ["antennaType", "sideModuleType", "neckType", "armorType"],
        },
        {
          id: "style",
          title: "风格",
          description: "决定氛围、点缀和背景。",
          fields: ["accessoryType", "colorPalette", "backgroundType"],
        },
      ],
    },
    configDrawer: {
      trigger: "配置详情",
      title: "配置详情",
      description: "查看当前 URL 参数与完整配置。",
      closeAriaLabel: "关闭配置详情",
      copyJson: "复制配置 JSON",
      queryLabel: "URL 参数",
      jsonLabel: "Config JSON",
    },
  },
  en: {
    meta: {
      title: "AgentFace Playground",
      description: "AgentFace maps a seed or wallet address to a deterministic robot SVG avatar.",
    },
    header: {
      subtitle: "Developer playground for deterministic robot avatars",
      githubCta: "Star ⭐️",
    },
    preview: {
      title: "Live Preview",
      description: "The avatar stays central while every change updates immediately.",
    },
    input: {
      title: "Seed / Address",
      description: "Type to regenerate instantly. No extra submit button needed.",
      placeholder: "0xabc... or any string",
    },
    actions: {
      share: "Copy share link",
      shareCopied: "Copied!",
      download: "Export SVG",
      random: "Randomize",
      reset: "Reset",
    },
    reactPanel: {
      title: "Use in React",
      description: "Copy the snippet below and drop it into your project.",
      copy: "Copy code",
      copied: "Copied!",
    },
    vuePanel: {
      title: "Use in Vue",
      description: "Copy the snippet below and drop it into your project.",
      copy: "Copy code",
      copied: "Copied!",
    },
    configPanel: {
      title: "Config Panel",
      description: "Options are grouped by meaning and expanded by default.",
      selectPrefix: "Select ",
      fields: {
        shellType: { label: "Shell", hint: "Defines the head silhouette and first impression." },
        visorType: { label: "Visor", hint: "Controls the face plate and viewport shape." },
        eyeType: { label: "Eyes", hint: "Sets the sensor expression style." },
        mouthType: { label: "Mouth", hint: "Shapes the lower face panel." },
        antennaType: { label: "Antenna", hint: "Top signal structure." },
        sideModuleType: { label: "Side Module", hint: "Side attachments and modules." },
        neckType: { label: "Neck", hint: "Connects the head to the base." },
        armorType: { label: "Armor", hint: "Defines neck and shoulder plating." },
        accessoryType: { label: "Accessory", hint: "Adds an extra identifying detail." },
        colorPalette: { label: "Palette", hint: "Sets the main color direction." },
        backgroundType: { label: "Background", hint: "Controls the preview atmosphere." },
      },
      groups: [
        {
          id: "appearance",
          title: "Face / Head",
          description: "The most visible choices for facial identity.",
          fields: ["shellType", "visorType", "eyeType", "mouthType"],
        },
        {
          id: "structure",
          title: "Structure",
          description: "Controls body connectors and overall chassis shape.",
          fields: ["antennaType", "sideModuleType", "neckType", "armorType"],
        },
        {
          id: "style",
          title: "Style",
          description: "Adjusts accents, palette, and background mood.",
          fields: ["accessoryType", "colorPalette", "backgroundType"],
        },
      ],
    },
    configDrawer: {
      trigger: "Config details",
      title: "Config Details",
      description: "Inspect the current URL query and full config payload.",
      closeAriaLabel: "Close config details",
      copyJson: "Copy config JSON",
      queryLabel: "URL Query",
      jsonLabel: "Config JSON",
    },
  },
};

export function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang")?.trim();

  if (lang === "en") {
    return "en";
  }

  if (lang === "zh-CN" || lang?.toLowerCase() === "zh-cn") {
    return "zh-CN";
  }

  return window.navigator.language.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}
