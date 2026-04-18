import { useEffect, useMemo, useState } from "react";
import { generateAgentFaceConfig, renderAgentFaceSvgDataUri } from "@agent-face/core";

import { AgentFace } from "@agent-face/react";
import type { Locale } from "@/i18n";

const SHOWCASE_SEED = "agentface-loading-demo";
const LOADING_STYLE = `
@keyframes web-agentface-skeleton-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.92; }
}
`;

function SketchBubble() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        backgroundColor: "#f8fafc",
      }}
    >
      <style>{LOADING_STYLE}</style>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(241, 245, 249, 0.95)",
          animation: "web-agentface-skeleton-pulse 1.5s ease-in-out infinite",
        }}
      />
    </span>
  );
}

export function LoadingShowcase({ locale }: { locale: Locale }) {
  const [phase, setPhase] = useState<"loading" | "loaded">("loading");
  const title =
    locale === "zh-CN" ? "头像加载占位效果演示" : "Avatar loading placeholder demo";
  const config = useMemo(() => generateAgentFaceConfig(SHOWCASE_SEED), []);
  const dataUri = useMemo(() => renderAgentFaceSvgDataUri(config), [config]);

  useEffect(() => {
    const cycle = () => {
      setPhase("loading");
      const loadedTimer = window.setTimeout(() => {
        setPhase("loaded");
      }, 1400);

      return loadedTimer;
    };

    let loadedTimer = cycle();
    const interval = window.setInterval(() => {
      window.clearTimeout(loadedTimer);
      loadedTimer = cycle();
    }, 3600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(loadedTimer);
    };
  }, []);

  return (
    <div
      aria-label={title}
      className="hidden items-center gap-2 lg:flex"
      role="img"
      title={title}
    >
      <div className="relative size-12 overflow-hidden rounded-full border border-border/70 bg-white shadow-sm">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${phase === "loading" ? "opacity-100" : "opacity-0"}`}
        >
          <SketchBubble />
        </div>
        <div
          className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${phase === "loaded" ? "opacity-100" : "opacity-0"}`}
        >
          <AgentFace imageUrl={dataUri} seed={SHOWCASE_SEED} size={48} />
        </div>
      </div>
      <div className="leading-none">
        <p className="text-[11px] font-semibold text-foreground">
          {locale === "zh-CN" ? "Loading Demo" : "Loading Demo"}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          {locale === "zh-CN" ? "占位 -> 头像" : "Sketch -> avatar"}
        </p>
      </div>
    </div>
  );
}
