import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, RotateCcw } from "lucide-react";
import {
  AGENT_FACE_DEFAULT_SEED,
  deserializeAgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  type AgentFaceConfig,
  type AgentFaceOptionKey
} from "@agent-face/core";

import { ActionPanel } from "@/components/playground/ActionPanel";
import { ConfigPanel } from "@/components/playground/ConfigPanel";
import { InputPanel } from "@/components/playground/InputPanel";
import { PreviewPanel } from "@/components/playground/PreviewPanel";
import { Button } from "@/components/ui/button";

const GITHUB_URL = "https://github.com/search?q=agent-face";

function getInitialConfig(): AgentFaceConfig {
  if (typeof window === "undefined") {
    return generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
  }

  return window.location.search
    ? deserializeAgentFaceConfig(window.location.search)
    : generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
}

function getInitialEdited(config: AgentFaceConfig) {
  return JSON.stringify(config) !== JSON.stringify(generateAgentFaceConfig(config.seed));
}

function createRandomSeed() {
  return `agent-${Math.random().toString(36).slice(2, 8)}`;
}

export function App() {
  const initialConfig = getInitialConfig();
  const [config, setConfig] = useState<AgentFaceConfig>(initialConfig);
  const [seedInput, setSeedInput] = useState(initialConfig.seed);
  const [isEdited, setIsEdited] = useState(getInitialEdited(initialConfig));
  const [shareLabel, setShareLabel] = useState("复制分享链接");
  const shareTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const nextQuery = serializeAgentFaceConfig(config);
    window.history.replaceState({}, "", `${window.location.pathname}?${nextQuery}`);
  }, [config]);

  useEffect(() => {
    return () => {
      if (shareTimerRef.current) {
        window.clearTimeout(shareTimerRef.current);
      }
    };
  }, []);

  const queryString = useMemo(() => serializeAgentFaceConfig(config), [config]);
  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config]);

  function applySeed(seed: string, syncInput = true) {
    const nextConfig = generateAgentFaceConfig(seed);
    setConfig(nextConfig);
    setIsEdited(false);
    if (syncInput) {
      setSeedInput(nextConfig.seed);
    }
  }

  function handleSeedChange(value: string) {
    setSeedInput(value);
    setConfig(generateAgentFaceConfig(value));
    setIsEdited(false);
  }

  function handleConfigChange(key: AgentFaceOptionKey, value: string) {
    setConfig((current) => ({ ...current, [key]: value }));
    setIsEdited(true);
  }

  async function copyText(content: string) {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const input = document.createElement("textarea");
      input.value = content;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  }

  function showCopiedLabel() {
    setShareLabel("已复制！");
    if (shareTimerRef.current) {
      window.clearTimeout(shareTimerRef.current);
    }
    shareTimerRef.current = window.setTimeout(() => {
      setShareLabel("复制分享链接");
    }, 1500);
  }

  function handleCopyShareLink() {
    const shareUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
    void copyText(shareUrl).then(showCopiedLabel);
  }

  function handleCopyConfig() {
    void copyText(configJson);
  }

  function handleDownloadSvg() {
    const svg = renderAgentFaceSvg(config);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${config.seed.replace(/[^a-zA-Z0-9_-]+/g, "-") || "agentface"}.svg`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }

  function handleRandomGenerate() {
    applySeed(createRandomSeed());
  }

  function handleReset() {
    applySeed(config.seed);
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1500px] px-4 py-5 md:px-6 lg:px-8">
      <header className="mb-5 flex flex-col gap-4 border-b border-border/70 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-lg font-bold tracking-tight">AgentFace</div>
          <p className="text-sm text-muted-foreground">
            稳定生成机器人头像的开发者 playground
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <ExternalLink className="size-4" />
              GitHub
            </a>
          </Button>
          <Button onClick={handleReset} size="sm" variant="ghost">
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </header>

      <main className="grid gap-5 lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] xl:grid-cols-[520px_minmax(0,1fr)]">
        <section className="order-2 lg:order-1">
          <PreviewPanel config={config} isEdited={isEdited} />
        </section>

        <section className="order-1 space-y-5 lg:order-2">
          <InputPanel
            normalizedSeed={config.seed}
            onChange={handleSeedChange}
            palette={config.colorPalette}
            value={seedInput}
          >
            <ActionPanel
              configJson={configJson}
              onCopyConfig={handleCopyConfig}
              onCopyShare={handleCopyShareLink}
              onDownloadSvg={handleDownloadSvg}
              onRandom={handleRandomGenerate}
              onReset={handleReset}
              queryString={queryString}
              shareLabel={shareLabel}
            />
          </InputPanel>

          <ConfigPanel
            onValueChange={handleConfigChange}
            values={{
              shellType: config.shellType,
              visorType: config.visorType,
              eyeType: config.eyeType,
              mouthType: config.mouthType,
              antennaType: config.antennaType,
              sideModuleType: config.sideModuleType,
              neckType: config.neckType,
              armorType: config.armorType,
              accessoryType: config.accessoryType,
              colorPalette: config.colorPalette,
              backgroundType: config.backgroundType
            }}
          />
        </section>
      </main>
    </div>
  );
}
