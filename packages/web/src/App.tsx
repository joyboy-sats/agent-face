import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
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
import { InfoAccordion } from "@/components/playground/InfoAccordion";
import { InputPanel } from "@/components/playground/InputPanel";
import { PreviewPanel } from "@/components/playground/PreviewPanel";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  resolveInitialLocale,
  SUPPORTED_LOCALES,
  WEB_COPY,
  type Locale,
} from "@/i18n";

const GITHUB_URL = "https://github.com/joyboy-sats/agent-face";

function getInitialConfig(): AgentFaceConfig {
  if (typeof window === "undefined") {
    return generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
  }

  return window.location.search
    ? deserializeAgentFaceConfig(window.location.search)
    : generateAgentFaceConfig(AGENT_FACE_DEFAULT_SEED);
}

function buildPlaygroundQuery(config: AgentFaceConfig, locale: Locale) {
  const params = new URLSearchParams(serializeAgentFaceConfig(config));
  if (locale !== DEFAULT_LOCALE) {
    params.set("lang", locale);
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
  const [seedInput, setSeedInput] = useState(initialConfig.seed);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [isReactCopied, setIsReactCopied] = useState(false);
  const [isVueCopied, setIsVueCopied] = useState(false);
  const shareTimerRef = useRef<number | null>(null);
  const reactCopyTimerRef = useRef<number | null>(null);
  const vueCopyTimerRef = useRef<number | null>(null);
  const copy = WEB_COPY[locale];

  useEffect(() => {
    const nextQuery = buildPlaygroundQuery(config, locale);
    window.history.replaceState({}, "", `${window.location.pathname}?${nextQuery}`);
  }, [config, locale]);

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

  const queryString = useMemo(() => buildPlaygroundQuery(config, locale), [config, locale]);
  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config]);
  const shareLabel = isShareCopied ? copy.actions.shareCopied : copy.actions.share;
  const reactCopyLabel = isReactCopied ? copy.reactPanel.copied : copy.reactPanel.copy;
  const vueCopyLabel = isVueCopied ? copy.vuePanel.copied : copy.vuePanel.copy;

  function applySeed(seed: string, syncInput = true) {
    const nextConfig = generateAgentFaceConfig(seed);
    setConfig(nextConfig);
    if (syncInput) {
      setSeedInput(nextConfig.seed);
    }
  }

  function handleSeedChange(value: string) {
    setSeedInput(value);
    setConfig(generateAgentFaceConfig(value));
  }

  function handleConfigChange(key: AgentFaceOptionKey, value: string) {
    setConfig((current) => ({ ...current, [key]: value }));
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
    const reactExample = `import { AgentFace } from '@agent-face/react'\n<AgentFace seed="your-seed" size={120} />`;
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
    const vueExample = `<script setup lang="ts">\nimport { AgentFace } from '@agent-face/vue'\n</script>\n\n<template>\n  <AgentFace seed="your-seed" :size="120" />\n</template>`;
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
            {copy.header.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-10 items-center gap-1 rounded-full border border-border/70 bg-background/70 p-1">
            {SUPPORTED_LOCALES.map((nextLocale) => (
              <Button
                className={locale === nextLocale ? "shadow-sm" : undefined}
                key={nextLocale}
                onClick={() => setLocale(nextLocale)}
                size="sm"
                type="button"
                variant={locale === nextLocale ? "secondary" : "ghost"}
              >
                {LOCALE_LABELS[nextLocale]}
              </Button>
            ))}
          </div>
          <Button asChild className="h-10" size="sm">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <ExternalLink className="size-4" />
              {copy.header.githubCta}
            </a>
          </Button>
        </div>
      </header>

      <main className="grid gap-5 lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] xl:grid-cols-[520px_minmax(0,1fr)]">
        <section className="order-2 lg:order-1">
          <PreviewPanel config={config} description={copy.preview.description} title={copy.preview.title}>
            <ActionPanel
              downloadLabel={copy.actions.download}
              onCopyShare={handleCopyShareLink}
              onDownloadSvg={handleDownloadSvg}
              onRandom={handleRandomGenerate}
              onReset={handleReset}
              randomLabel={copy.actions.random}
              resetLabel={copy.actions.reset}
              shareLabel={shareLabel}
            />
          </PreviewPanel>
        </section>

        <section className="order-1 space-y-5 lg:order-2">
          <InfoAccordion
            configJson={configJson}
            locale={locale}
            onCopyConfig={handleCopyConfig}
            onCopyReactCode={handleCopyReactExample}
            onCopyVueCode={handleCopyVueExample}
            queryString={queryString}
            reactCopyLabel={reactCopyLabel}
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
            locale={locale}
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
