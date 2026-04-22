import type { AgentFaceOptionKey, CharacterType } from "@agent-face/core";

export const FIELD_LABELS: Partial<Record<AgentFaceOptionKey, string>> = {
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
  backgroundType: "背景",
  faceShape: "脸型",
  hairStyle: "发型",
  noseStyle: "鼻型",
  mouthStyle: "嘴型",
  accessory: "配饰",
  skinTone: "肤色",
  species: "物种",
  earStyle: "耳朵",
  markings: "花纹",
  plantForm: "形态",
  leafShape: "叶片",
  bloomStyle: "花朵",
  stemStyle: "茎干",
  potStyle: "花盆",
  bodyShape: "鱼身",
  finStyle: "鱼鳍",
  tailStyle: "尾鳍",
  scalePattern: "纹理",
  bubbles: "气泡",
  primaryShape: "主体形状",
  innerPattern: "内部图案",
  orbits: "环绕元素",
  cornerStyle: "角处理",
  symmetry: "对称性"
};

export const FIELD_HINTS: Partial<Record<AgentFaceOptionKey, string>> = {
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
  backgroundType: "预览背景氛围。",
  faceShape: "决定人类角色轮廓。",
  hairStyle: "决定头发体量。",
  noseStyle: "决定中部特征。",
  mouthStyle: "决定嘴部表达。",
  accessory: "决定装饰细节。",
  skinTone: "决定肤色方向。",
  species: "决定动物物种。",
  earStyle: "决定耳朵形态。",
  markings: "决定表面花纹。",
  plantForm: "决定植物主体形态。",
  leafShape: "决定叶片形状。",
  bloomStyle: "决定开花方式。",
  stemStyle: "决定生长走势。",
  potStyle: "决定容器风格。",
  bodyShape: "决定鱼身轮廓。",
  finStyle: "决定鱼鳍动态。",
  tailStyle: "决定尾部收束方式。",
  scalePattern: "决定表面纹理。",
  bubbles: "决定水下装饰。",
  primaryShape: "决定几何主体。",
  innerPattern: "决定内部构成。",
  orbits: "决定环绕元素。",
  cornerStyle: "决定边角感受。",
  symmetry: "决定对称类型。"
};

export const CONFIG_GROUPS: Record<CharacterType, Array<{
  id: string;
  title: string;
  description: string;
  fields: AgentFaceOptionKey[];
}>> = {
  robot: [
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
  ],
  human: [],
  animal: [],
  plant: [],
  fish: [],
  geo: []
};
