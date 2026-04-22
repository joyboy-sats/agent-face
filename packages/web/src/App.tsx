import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Globe } from "lucide-react";
import {
  AGENT_FACE_DEFAULT_SEED,
  CHARACTER_TYPE_OPTION_KEYS,
  deserializeAgentFaceConfig,
  generateAgentFaceConfig,
  mergeAgentFaceConfig,
  renderAgentFaceSvg,
  serializeAgentFaceConfig,
  type AgentFaceConfig,
  type AgentFaceOptionKey,
  type CharacterType
} from "@agent-face/core";

import { ActionPanel } from "@/components/playground/ActionPanel";
import { ConfigPanel } from "@/components/playground/ConfigPanel";
import { InfoAccordion } from "@/components/playground/InfoAccordion";
import { InputPanel } from "@/components/playground/InputPanel";
import {
  LoadingShowcase,
  type LoadingShowcaseMode,
} from "@/components/playground/LoadingShowcase";
import { PreviewPanel } from "@/components/playground/PreviewPanel";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  resolveInitialLocale,
  SUPPORTED_LOCALES,
  WEB_COPY,
  type Locale,
} from "@/i18n";

const GITHUB_URL = "https://github.com/joyboy-sats/agent-face";
const RASTER_EXPORT_SIZE = 640;

function getInitialConfig(): AgentFaceConfig {
  if (typeof window === "undefined") {
    return generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
  }

  return window.location.search
    ? deserializeAgentFaceConfig(window.location.search)
    : generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
}

function getInitialLoadingShowcaseMode(): LoadingShowcaseMode {
  if (typeof window === "undefined") {
    return "skeleton";
  }

  const value = new URLSearchParams(window.location.search).get("previewLoading");
  return value === "avatar" ? "avatar" : "skeleton";
}

function buildPlaygroundQuery(
  config: AgentFaceConfig,
  locale: Locale,
  loadingShowcaseMode: LoadingShowcaseMode
) {
  const params = new URLSearchParams(serializeAgentFaceConfig(config));
  if (locale !== DEFAULT_LOCALE) {
    params.set("lang", locale);
  }
  if (loadingShowcaseMode !== "skeleton") {
    params.set("previewLoading", loadingShowcaseMode);
  }
  return params.toString();
}

function createRandomSeed() {
  return `agent-${Math.random().toString(36).slice(2, 8)}`;
}

export function App() {
  const initialConfig = getInitialConfig();
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale());
  const [config, setConfig] = useState<AgentFaceConfig>(initialConfig);
  const [loadingShowcaseMode, setLoadingShowcaseMode] = useState<LoadingShowcaseMode>(
    getInitialLoadingShowcaseMode()
  );
  const [seedInput, setSeedInput] = useState(initialConfig.seed);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [isReactCopied, setIsReactCopied] = useState(false);
  const [isVueCopied, setIsVueCopied] = useState(false);
  const shareTimerRef = useRef<number | null>(null);
  const reactCopyTimerRef = useRef<number | null>(null);
  const vueCopyTimerRef = useRef<number | null>(null);
  const copy = WEB_COPY[locale];

  useEffect(() => {
    const nextQuery = buildPlaygroundQuery(config, locale, loadingShowcaseMode);
    window.history.replaceState({}, "", `${window.location.pathname}?${nextQuery}`);
  }, [config, locale, loadingShowcaseMode]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", copy.meta.description);
  }, [copy.meta.description, copy.meta.title, locale]);

  useEffect(() => {
    return () => {
      if (shareTimerRef.current) {
        window.clearTimeout(shareTimerRef.current);
      }
      if (reactCopyTimerRef.current) {
        window.clearTimeout(reactCopyTimerRef.current);
      }
      if (vueCopyTimerRef.current) {
        window.clearTimeout(vueCopyTimerRef.current);
      }
    };
  }, []);

  const queryString = useMemo(
    () => buildPlaygroundQuery(config, locale, loadingShowcaseMode),
    [config, locale, loadingShowcaseMode]
  );
  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config]);
  const reactExample = useMemo(() => buildReactExample(configJson), [configJson]);
  const vueExample = useMemo(() => buildVueExample(configJson), [configJson]);
  const shareLabel = isShareCopied ? copy.actions.shareCopied : copy.actions.share;
  const reactCopyLabel = isReactCopied ? copy.reactPanel.copied : copy.reactPanel.copy;
  const vueCopyLabel = isVueCopied ? copy.vuePanel.copied : copy.vuePanel.copy;

  function applySeed(seed: string, syncInput = true) {
    const nextConfig = generateAgentFaceConfig(seed, config.characterType);
    setConfig(nextConfig);
    if (syncInput) {
      setSeedInput(nextConfig.seed);
    }
  }

  function handleSeedChange(value: string) {
    setSeedInput(value);
    setConfig(generateAgentFaceConfig(value, config.characterType));
  }

  function handleCharacterTypeChange(value: CharacterType) {
    setConfig((current) => generateAgentFaceConfig(current.seed, value));
  }

  function handleConfigChange(key: AgentFaceOptionKey, value: string) {
    setConfig((current) =>
      mergeAgentFaceConfig(current.seed, {
        ...buildConfigOverrides(current),
        [key]: value,
      })
    );
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
    setIsShareCopied(true);
    if (shareTimerRef.current) {
      window.clearTimeout(shareTimerRef.current);
    }
    shareTimerRef.current = window.setTimeout(() => {
      setIsShareCopied(false);
    }, 1500);
  }

  function handleCopyShareLink() {
    const shareUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
    void copyText(shareUrl).then(showCopiedLabel);
  }

  function handleCopyReactExample() {
    void copyText(reactExample).then(() => {
      setIsReactCopied(true);
      if (reactCopyTimerRef.current) {
        window.clearTimeout(reactCopyTimerRef.current);
      }
      reactCopyTimerRef.current = window.setTimeout(() => {
        setIsReactCopied(false);
      }, 1500);
    });
  }

  function handleCopyVueExample() {
    void copyText(vueExample).then(() => {
      setIsVueCopied(true);
      if (vueCopyTimerRef.current) {
        window.clearTimeout(vueCopyTimerRef.current);
      }
      vueCopyTimerRef.current = window.setTimeout(() => {
        setIsVueCopied(false);
      }, 1500);
    });
  }

  function handleCopyConfig() {
    void copyText(configJson);
  }

  function downloadBlob(blob: Blob, extension: string) {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${config.seed.replace(/[^a-zA-Z0-9_-]+/g, "-") || "agentface"}.${extension}`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }

  function handleExportSvg() {
    const svg = renderAgentFaceSvg(config);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, "svg");
  }

  async function exportRasterImage(type: "png" | "webp") {
    const svg = renderAgentFaceSvg(config);
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const image = await loadImage(svgUrl);
      const canvas = document.createElement("canvas");
      canvas.width = RASTER_EXPORT_SIZE;
      canvas.height = RASTER_EXPORT_SIZE;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas 2D context is not available.");
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const mimeType = type === "png" ? "image/png" : "image/webp";
      const blob = await canvasToBlob(canvas, mimeType);
      downloadBlob(blob, type);
    } finally {
      URL.revokeObjectURL(svgUrl);
    }
  }

  function handleExportPng() {
    void exportRasterImage("png");
  }

  function handleExportWebp() {
    void exportRasterImage("webp");
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
            {copy.header.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Select onValueChange={(value) => setLocale(value as Locale)} value={locale}>
            <SelectTrigger
              aria-label="Select language"
              className="size-10 justify-center rounded-full border border-border/70 bg-background/70 px-0 py-0 shadow-none focus:ring-2 focus:ring-ring/20"
              hideIcon
            >
              <Globe className="size-4 opacity-70" />
            </SelectTrigger>
            <SelectContent align="end">
              {SUPPORTED_LOCALES.map((nextLocale) => (
                <SelectItem key={nextLocale} value={nextLocale}>
                  {LOCALE_LABELS[nextLocale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild className="h-10" size="sm">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <ExternalLink className="size-4" />
              {copy.header.githubCta}
            </a>
          </Button>
          <LoadingShowcase config={config} mode={loadingShowcaseMode} />
        </div>
      </header>

      <main className="grid gap-5 lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] xl:grid-cols-[520px_minmax(0,1fr)]">
        <section>
          <PreviewPanel config={config} description={copy.preview.description} title={copy.preview.title}>
            <ActionPanel
              exportPngLabel={copy.actions.exportPng}
              exportSvgLabel={copy.actions.exportSvg}
              exportWebpLabel={copy.actions.exportWebp}
              onCopyShare={handleCopyShareLink}
              onExportPng={handleExportPng}
              onExportSvg={handleExportSvg}
              onExportWebp={handleExportWebp}
              onRandom={handleRandomGenerate}
              onReset={handleReset}
              randomLabel={copy.actions.random}
              resetLabel={copy.actions.reset}
              shareLabel={shareLabel}
            />
          </PreviewPanel>
        </section>

        <section className="space-y-5">
          <InfoAccordion
            configJson={configJson}
            locale={locale}
            onCopyConfig={handleCopyConfig}
            onCopyReactCode={handleCopyReactExample}
            onCopyVueCode={handleCopyVueExample}
            queryString={queryString}
            reactExample={reactExample}
            reactCopyLabel={reactCopyLabel}
            vueExample={vueExample}
            vueCopyLabel={vueCopyLabel}
          />

          <InputPanel
            description={copy.input.description}
            onChange={handleSeedChange}
            placeholder={copy.input.placeholder}
            title={copy.input.title}
            value={seedInput}
          />

          <ConfigPanel
            characterType={config.characterType}
            locale={locale}
            loadingShowcaseMode={loadingShowcaseMode}
            onCharacterTypeChange={handleCharacterTypeChange}
            onLoadingShowcaseModeChange={setLoadingShowcaseMode}
            onValueChange={handleConfigChange}
            values={buildConfigValues(config)}
          />
        </section>
      </main>
    </div>
  );
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load SVG for export."));
    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error(`Failed to export ${type}.`));
        return;
      }

      resolve(blob);
    }, type);
  });
}

function buildConfigValues(config: AgentFaceConfig): Partial<Record<AgentFaceOptionKey, string>> {
  const values: Partial<Record<AgentFaceOptionKey, string>> = {};

  for (const key of CHARACTER_TYPE_OPTION_KEYS[config.characterType]) {
    values[key] = String(config[key as keyof AgentFaceConfig]);
  }

  return values;
}

function buildConfigOverrides(config: AgentFaceConfig) {
  const overrides: { seed: string; characterType: CharacterType } & Partial<Record<AgentFaceOptionKey, string>> = {
    seed: config.seed,
    characterType: config.characterType,
  };

  for (const key of CHARACTER_TYPE_OPTION_KEYS[config.characterType]) {
    overrides[key] = String(config[key as keyof AgentFaceConfig]);
  }

  return overrides;
}

function buildReactExample(configJson: string) {
  return `import { AgentFace } from '@agent-face/react'
import type { AgentFaceConfig } from '@agent-face/core'

const config: AgentFaceConfig = ${configJson}

export function Example() {
  return <AgentFace config={config} size={120} />
}`;
}

function buildVueExample(configJson: string) {
  return `<script setup lang="ts">
import { AgentFace } from '@agent-face/vue'
import type { AgentFaceConfig } from '@agent-face/core'

const config: AgentFaceConfig = ${configJson}
</script>

<template>
  <AgentFace :config="config" :size="120" />
</template>`;
}
