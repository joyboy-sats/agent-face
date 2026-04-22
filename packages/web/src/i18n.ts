import type { AgentFaceOptionKey, CharacterType } from "@agent-face/core";

export type Locale = "zh-CN" | "en";

export const DEFAULT_LOCALE: Locale = "zh-CN";
export const SUPPORTED_LOCALES: Locale[] = ["zh-CN", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "English",
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

type CharacterTypeCopy = {
  label: string;
  hint: string;
  options: Record<CharacterType, string>;
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
      exportSvg: string;
      exportPng: string;
      exportWebp: string;
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
      characterType: CharacterTypeCopy;
      previewMode: {
        label: string;
        hint: string;
        options: {
          avatar: string;
          skeleton: string;
        };
      };
      fields: Record<AgentFaceOptionKey, FieldCopy>;
      groups: Record<CharacterType, GroupCopy[]>;
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
      description: "AgentFace 是一个把 seed 或钱包地址映射为稳定多角色 SVG 头像的开源工具。",
    },
    header: {
      subtitle: "稳定生成多角色头像的开发者 playground",
      githubCta: "Star ⭐️",
    },
    preview: {
      title: "Live Preview",
      description: "同一 seed 可以切换成机器人、人类、动物、植物、鱼类或几何角色。",
    },
    input: {
      title: "Seed / Address",
      description: "输入即生成，切换角色类型时会保持 seed 不变。",
      placeholder: "0xabc... 或任意字符串",
    },
    actions: {
      share: "复制分享链接",
      shareCopied: "已复制！",
      exportSvg: "导出 SVG",
      exportPng: "导出 PNG",
      exportWebp: "导出 WebP",
      random: "随机生成",
      reset: "重置",
    },
    reactPanel: {
      title: "在 React 中使用",
      description: "支持通过 characterType 切换角色类型，也支持自定义图片 URL 和稳定回退。",
      copy: "复制代码",
      copied: "已复制！",
    },
    vuePanel: {
      title: "在 Vue 中使用",
      description: "Vue 组件同样支持 characterType、自定义图片 URL 和稳定回退逻辑。",
      copy: "复制代码",
      copied: "已复制！",
    },
    configPanel: {
      title: "配置面板",
      description: "先选角色类型，再调整该类型下的专属部件。",
      characterType: {
        label: "角色类型",
        hint: "切换类型时保持 seed 不变，并重新生成该类型的默认部件组合。",
        options: {
          robot: "机器人",
          human: "人类",
          animal: "动物",
          plant: "植物",
          fish: "鱼类",
          geo: "几何图形",
        },
      },
      previewMode: {
        label: "加载占位",
        hint: "切换顶部头像从默认头像占位过渡，或使用纯 loading 骨架。",
        options: {
          avatar: "默认头像",
          skeleton: "Skeleton",
        },
      },
      selectPrefix: "选择",
      fields: {
        shellType: { label: "头壳", hint: "决定机器人头部轮廓和第一印象。" },
        visorType: { label: "面罩", hint: "控制机器人观察窗形式。" },
        eyeType: { label: "眼部", hint: "决定机器人传感器视觉风格。" },
        mouthType: { label: "口部", hint: "决定机器人下半部面板样式。" },
        antennaType: { label: "天线", hint: "顶部信号结构。" },
        sideModuleType: { label: "侧模块", hint: "两侧附加模块。" },
        neckType: { label: "颈部", hint: "头部与底座连接方式。" },
        armorType: { label: "护甲", hint: "颈肩外壳和护甲结构。" },
        accessoryType: { label: "配件", hint: "机器人个体识别小配件。" },
        faceShape: { label: "脸型", hint: "决定人类角色的轮廓。" },
        hairStyle: { label: "发型", hint: "决定头发体量和方向。" },
        eyeStyle: { label: "眼型", hint: "决定角色的目光表达方式。" },
        noseStyle: { label: "鼻型", hint: "决定中部特征造型。" },
        mouthStyle: { label: "嘴型", hint: "决定嘴部和情绪表达。" },
        accessory: { label: "配饰", hint: "决定装饰和附加识别元素。" },
        skinTone: { label: "肤色", hint: "决定人类角色的肤色与气质。" },
        species: { label: "物种", hint: "决定动物角色的基础轮廓。" },
        earStyle: { label: "耳朵", hint: "决定动物耳朵的样式。" },
        markings: { label: "花纹", hint: "决定表面标记和毛色变化。" },
        plantForm: { label: "形态", hint: "决定植物主体是花、树、多肉还是藤蔓。" },
        leafShape: { label: "叶片", hint: "决定叶片或叶针形状。" },
        bloomStyle: { label: "花朵", hint: "决定花朵出现方式。" },
        stemStyle: { label: "茎干", hint: "决定植物骨架走势。" },
        potStyle: { label: "花盆", hint: "决定是否带花盆及其风格。" },
        bodyShape: { label: "鱼身", hint: "决定鱼类主体轮廓。" },
        finStyle: { label: "鱼鳍", hint: "决定鳍部运动感。" },
        tailStyle: { label: "尾鳍", hint: "决定尾部收束方式。" },
        scalePattern: { label: "纹理", hint: "决定鱼鳞或表面花纹。" },
        bubbles: { label: "气泡", hint: "决定水下装饰细节。" },
        primaryShape: { label: "主体形状", hint: "决定几何主体构成。" },
        innerPattern: { label: "内部图案", hint: "决定内部线条和组织方式。" },
        orbits: { label: "环绕元素", hint: "决定主体外部轨道或点阵。" },
        cornerStyle: { label: "角处理", hint: "决定边角是锐利还是圆润。" },
        symmetry: { label: "对称性", hint: "决定构图平衡逻辑。" },
        colorPalette: { label: "配色", hint: "决定主要色彩方向。" },
        backgroundType: { label: "背景", hint: "决定预览氛围和底纹。" },
      },
      groups: {
        robot: [
          {
            id: "appearance",
            title: "外观",
            description: "最直接影响机器人脸部识别感。",
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
            description: "决定点缀、配色和背景。",
            fields: ["accessoryType", "colorPalette", "backgroundType"],
          },
        ],
        human: [
          {
            id: "identity",
            title: "轮廓",
            description: "决定人类角色的基本轮廓。",
            fields: ["faceShape", "hairStyle", "skinTone"],
          },
          {
            id: "expression",
            title: "表情",
            description: "塑造五官与情绪感。",
            fields: ["eyeStyle", "noseStyle", "mouthStyle"],
          },
          {
            id: "style",
            title: "装饰",
            description: "补足配饰和背景氛围。",
            fields: ["accessory", "backgroundType"],
          },
        ],
        animal: [
          {
            id: "identity",
            title: "物种",
            description: "决定整体物种和轮廓特征。",
            fields: ["species", "earStyle", "markings"],
          },
          {
            id: "expression",
            title: "表情",
            description: "塑造动物面部识别度。",
            fields: ["eyeStyle", "noseStyle", "accessory"],
          },
          {
            id: "style",
            title: "风格",
            description: "控制色彩和背景氛围。",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        plant: [
          {
            id: "form",
            title: "形态",
            description: "决定植物主体结构。",
            fields: ["plantForm", "leafShape", "bloomStyle"],
          },
          {
            id: "growth",
            title: "生长",
            description: "控制茎干走势和容器。",
            fields: ["stemStyle", "potStyle"],
          },
          {
            id: "style",
            title: "风格",
            description: "控制色彩和背景氛围。",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        fish: [
          {
            id: "body",
            title: "鱼身",
            description: "决定主体轮廓与鳍尾结构。",
            fields: ["bodyShape", "finStyle", "tailStyle"],
          },
          {
            id: "details",
            title: "细节",
            description: "决定鱼鳞、眼睛与气泡装饰。",
            fields: ["scalePattern", "eyeStyle", "bubbles"],
          },
          {
            id: "style",
            title: "风格",
            description: "控制色彩和背景氛围。",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        geo: [
          {
            id: "composition",
            title: "构成",
            description: "决定主体轮廓与角处理。",
            fields: ["primaryShape", "cornerStyle", "symmetry"],
          },
          {
            id: "pattern",
            title: "图案",
            description: "决定内部纹样与轨道元素。",
            fields: ["innerPattern", "orbits"],
          },
          {
            id: "style",
            title: "风格",
            description: "控制色彩和背景氛围。",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
      },
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
      description: "AgentFace maps a seed or wallet address to deterministic multi-character SVG avatars.",
    },
    header: {
      subtitle: "Developer playground for deterministic multi-character avatars",
      githubCta: "Star ⭐️",
    },
    preview: {
      title: "Live Preview",
      description: "The same seed can be remapped into robots, humans, animals, plants, fish, or abstract geometry.",
    },
    input: {
      title: "Seed / Address",
      description: "Type to regenerate instantly. Switching character type keeps the same seed.",
      placeholder: "0xabc... or any string",
    },
    actions: {
      share: "Copy share link",
      shareCopied: "Copied!",
      exportSvg: "Export SVG",
      exportPng: "Export PNG",
      exportWebp: "Export WebP",
      random: "Randomize",
      reset: "Reset",
    },
    reactPanel: {
      title: "Use in React",
      description: "Switch character families with characterType, or keep using custom image URLs with deterministic fallback behavior.",
      copy: "Copy code",
      copied: "Copied!",
    },
    vuePanel: {
      title: "Use in Vue",
      description: "The Vue component also supports characterType, custom image URLs, and deterministic fallback rendering.",
      copy: "Copy code",
      copied: "Copied!",
    },
    configPanel: {
      title: "Config Panel",
      description: "Pick a character family first, then tune only the fields that belong to it.",
      characterType: {
        label: "Character Type",
        hint: "Switching type keeps the same seed and regenerates the default option set for that family.",
        options: {
          robot: "Robot",
          human: "Human",
          animal: "Animal",
          plant: "Plant",
          fish: "Fish",
          geo: "Geometry",
        },
      },
      previewMode: {
        label: "Loading placeholder",
        hint: "Switch the header avatar preview between a fallback avatar and a pure skeleton.",
        options: {
          avatar: "Default avatar",
          skeleton: "Skeleton",
        },
      },
      selectPrefix: "Select ",
      fields: {
        shellType: { label: "Shell", hint: "Defines the robot head silhouette." },
        visorType: { label: "Visor", hint: "Controls the robot face plate and viewport." },
        eyeType: { label: "Eyes", hint: "Sets the robot sensor expression style." },
        mouthType: { label: "Mouth", hint: "Shapes the robot lower face panel." },
        antennaType: { label: "Antenna", hint: "Controls the top signal structure." },
        sideModuleType: { label: "Side Module", hint: "Adds side attachments and modules." },
        neckType: { label: "Neck", hint: "Connects the robot head to the base." },
        armorType: { label: "Armor", hint: "Defines neck and shoulder plating." },
        accessoryType: { label: "Accessory", hint: "Adds an extra robot identifying detail." },
        faceShape: { label: "Face Shape", hint: "Defines the human face outline." },
        hairStyle: { label: "Hair", hint: "Sets hair volume and silhouette." },
        eyeStyle: { label: "Eye Style", hint: "Shapes the expression for the current character." },
        noseStyle: { label: "Nose", hint: "Defines the central facial feature." },
        mouthStyle: { label: "Mouth Style", hint: "Controls the mouth shape and expression tone." },
        accessory: { label: "Accessory", hint: "Adds decorative or identifying elements." },
        skinTone: { label: "Skin Tone", hint: "Controls the human complexion family." },
        species: { label: "Species", hint: "Sets the core animal silhouette." },
        earStyle: { label: "Ears", hint: "Controls animal ear shape and posture." },
        markings: { label: "Markings", hint: "Adds stripes, spots, or patches." },
        plantForm: { label: "Plant Form", hint: "Defines whether the plant reads as flower, succulent, tree, or vine." },
        leafShape: { label: "Leaf Shape", hint: "Controls leaf or needle geometry." },
        bloomStyle: { label: "Bloom", hint: "Controls how blossoms appear." },
        stemStyle: { label: "Stem", hint: "Sets the plant growth direction." },
        potStyle: { label: "Pot", hint: "Adds or removes a container." },
        bodyShape: { label: "Body Shape", hint: "Defines the fish silhouette." },
        finStyle: { label: "Fin Style", hint: "Controls fin motion and flow." },
        tailStyle: { label: "Tail", hint: "Controls the rear fin profile." },
        scalePattern: { label: "Pattern", hint: "Adds scales or surface markings." },
        bubbles: { label: "Bubbles", hint: "Adds underwater decoration." },
        primaryShape: { label: "Primary Shape", hint: "Defines the core geometric body." },
        innerPattern: { label: "Inner Pattern", hint: "Controls internal line work or rings." },
        orbits: { label: "Orbits", hint: "Adds external orbiting accents." },
        cornerStyle: { label: "Corner Style", hint: "Controls how hard or soft edges feel." },
        symmetry: { label: "Symmetry", hint: "Defines the composition balance system." },
        colorPalette: { label: "Palette", hint: "Sets the main color direction." },
        backgroundType: { label: "Background", hint: "Controls the preview atmosphere." },
      },
      groups: {
        robot: [
          {
            id: "appearance",
            title: "Face / Head",
            description: "The most visible choices for robot identity.",
            fields: ["shellType", "visorType", "eyeType", "mouthType"],
          },
          {
            id: "structure",
            title: "Structure",
            description: "Controls connectors and chassis details.",
            fields: ["antennaType", "sideModuleType", "neckType", "armorType"],
          },
          {
            id: "style",
            title: "Style",
            description: "Adjusts accents, palette, and background mood.",
            fields: ["accessoryType", "colorPalette", "backgroundType"],
          },
        ],
        human: [
          {
            id: "identity",
            title: "Identity",
            description: "Defines the main human silhouette.",
            fields: ["faceShape", "hairStyle", "skinTone"],
          },
          {
            id: "expression",
            title: "Expression",
            description: "Shapes the facial expression system.",
            fields: ["eyeStyle", "noseStyle", "mouthStyle"],
          },
          {
            id: "style",
            title: "Style",
            description: "Adds finishing details and atmosphere.",
            fields: ["accessory", "backgroundType"],
          },
        ],
        animal: [
          {
            id: "identity",
            title: "Identity",
            description: "Defines species and animal silhouette traits.",
            fields: ["species", "earStyle", "markings"],
          },
          {
            id: "expression",
            title: "Expression",
            description: "Shapes animal facial readability.",
            fields: ["eyeStyle", "noseStyle", "accessory"],
          },
          {
            id: "style",
            title: "Style",
            description: "Controls palette and background mood.",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        plant: [
          {
            id: "form",
            title: "Form",
            description: "Defines the plant body and bloom system.",
            fields: ["plantForm", "leafShape", "bloomStyle"],
          },
          {
            id: "growth",
            title: "Growth",
            description: "Controls stem direction and container choices.",
            fields: ["stemStyle", "potStyle"],
          },
          {
            id: "style",
            title: "Style",
            description: "Controls palette and background mood.",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        fish: [
          {
            id: "body",
            title: "Body",
            description: "Defines the body silhouette and fin structure.",
            fields: ["bodyShape", "finStyle", "tailStyle"],
          },
          {
            id: "details",
            title: "Details",
            description: "Controls scales, eyes, and bubbles.",
            fields: ["scalePattern", "eyeStyle", "bubbles"],
          },
          {
            id: "style",
            title: "Style",
            description: "Controls palette and background mood.",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
        geo: [
          {
            id: "composition",
            title: "Composition",
            description: "Defines the main abstract form and edge treatment.",
            fields: ["primaryShape", "cornerStyle", "symmetry"],
          },
          {
            id: "pattern",
            title: "Pattern",
            description: "Controls internal motifs and orbiting accents.",
            fields: ["innerPattern", "orbits"],
          },
          {
            id: "style",
            title: "Style",
            description: "Controls palette and background mood.",
            fields: ["colorPalette", "backgroundType"],
          },
        ],
      },
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
