import type { AgentFaceOptionKey } from "@agent-face/core";

export const FIELD_LABELS: Record<AgentFaceOptionKey, string> = {
  shellType: "头壳",
  visorType: "面罩",
  eyeType: "眼部",
  mouthType: "口部",
  antennaType: "天线",
  sideModuleType: "侧模块",
  neckType: "颈部",
  armorType: "护甲",
  accessoryType: "配件",
  colorPalette: "配色",
  backgroundType: "背景"
};

export const FIELD_HINTS: Record<AgentFaceOptionKey, string> = {
  shellType: "决定头部轮廓和第一印象。",
  visorType: "控制面罩和观察窗形式。",
  eyeType: "决定传感器视觉风格。",
  mouthType: "决定下半部面板样式。",
  antennaType: "顶部信号结构。",
  sideModuleType: "两侧附加模块。",
  neckType: "头部与底座连接方式。",
  armorType: "颈肩外壳和护甲结构。",
  accessoryType: "个体识别小配件。",
  colorPalette: "主色调方案。",
  backgroundType: "预览背景氛围。"
};

export const CONFIG_GROUPS: Array<{
  id: string;
  title: string;
  description: string;
  fields: AgentFaceOptionKey[];
}> = [
  {
    id: "appearance",
    title: "外观",
    description: "最直接影响脸部识别感。",
    fields: ["shellType", "visorType", "eyeType", "mouthType"]
  },
  {
    id: "structure",
    title: "结构",
    description: "控制机体连接件和整体骨架。",
    fields: ["antennaType", "sideModuleType", "neckType", "armorType"]
  },
  {
    id: "style",
    title: "风格",
    description: "决定氛围、点缀和背景。",
    fields: ["accessoryType", "colorPalette", "backgroundType"]
  }
];
