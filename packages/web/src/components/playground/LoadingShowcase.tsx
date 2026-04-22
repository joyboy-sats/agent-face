import { useEffect, useState } from "react";
import { AGENT_FACE_DEFAULT_SEED, type AgentFaceConfig } from "@agent-face/core";

import { AgentFace } from "@agent-face/react";

export type LoadingShowcaseMode = "avatar" | "skeleton";

export function LoadingShowcase({
  config,
  mode,
}: {
  config: AgentFaceConfig;
  mode: LoadingShowcaseMode;
}) {
  const [phase, setPhase] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    const cycle = () => {
      setPhase("loading");
      const loadedTimer = window.setTimeout(() => {
        setPhase("loaded");
      }, 1300);

      return loadedTimer;
    };

    let loadedTimer = cycle();
    const interval = window.setInterval(() => {
      window.clearTimeout(loadedTimer);
      loadedTimer = cycle();
    }, 3400);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(loadedTimer);
    };
  }, [config]);

  return (
    <div
      aria-label="Avatar loading preview"
      className="relative size-12 overflow-hidden rounded-full border border-border/70 bg-background shadow-sm"
      role="img"
      title="Avatar loading preview"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${phase === "loading" ? "opacity-100" : "opacity-0"}`}
      >
        {mode === "avatar" ? (
          <div className="grid h-full w-full place-items-center">
            <AgentFace
              characterType={config.characterType}
              seed={AGENT_FACE_DEFAULT_SEED}
              size={48}
            />
          </div>
        ) : (
          <div className="agentface-skeleton-pulse h-full w-full rounded-full bg-muted" />
        )}
      </div>
      <div
        className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${phase === "loaded" ? "opacity-100" : "opacity-0"}`}
      >
        <AgentFace config={config} size={48} />
      </div>
    </div>
  );
}
