"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";
import {
  type AgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvgDataUri
} from "@agent-face/core";

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function normalizeImageUrl(imageUrl?: string) {
  const normalized = imageUrl?.trim();
  return normalized ? normalized : undefined;
}

const SKETCH_PLACEHOLDER_STYLE = `
@keyframes agentface-skeleton-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.92; }
}
`;

function createSketchPlaceholder() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
        backgroundColor: "#f8fafc",
      }}
    >
      <style>{SKETCH_PLACEHOLDER_STYLE}</style>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background: "rgba(241, 245, 249, 0.95)",
          animation: "agentface-skeleton-pulse 1.5s ease-in-out infinite",
        }}
      />
    </span>
  );
}

export interface AgentFaceProps {
  seed?: string;
  config?: AgentFaceConfig;
  size?: number | string;
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>["referrerPolicy"];
  title?: string;
}

export function AgentFace({
  seed,
  config,
  size = 160,
  className,
  imageUrl,
  imageAlt,
  imageClassName,
  loading = "lazy",
  decoding = "async",
  referrerPolicy = "no-referrer",
  title = "AgentFace avatar"
}: AgentFaceProps) {
  const resolvedConfig = useMemo(
    () => config ?? generateAgentFaceConfig(seed ?? ""),
    [config, seed]
  );
  const fallbackSrc = useMemo(
    () => renderAgentFaceSvgDataUri(resolvedConfig),
    [resolvedConfig]
  );
  const normalizedImageUrl = normalizeImageUrl(imageUrl);
  const [currentSrc, setCurrentSrc] = useState(normalizedImageUrl ?? fallbackSrc);
  const [isImageLoading, setIsImageLoading] = useState(Boolean(normalizedImageUrl));

  useEffect(() => {
    setCurrentSrc(normalizedImageUrl ?? fallbackSrc);
    setIsImageLoading(Boolean(normalizedImageUrl));
  }, [fallbackSrc, normalizedImageUrl]);

  const dimension = typeof size === "number" ? `${size}px` : size;
  const style: CSSProperties = {
    width: dimension,
    height: dimension,
    display: "inline-block",
    lineHeight: 0,
    position: "relative",
    overflow: "hidden",
    background: "#f4f7fb"
  };
  const showPlaceholder = Boolean(normalizedImageUrl) && currentSrc !== fallbackSrc && isImageLoading;
  const imageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
    borderRadius: "inherit",
    opacity: showPlaceholder ? 0 : 1,
    transition: "opacity 180ms ease"
  };

  function handleImageLoad() {
    setIsImageLoading(false);
  }

  function handleImageError() {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    setIsImageLoading(false);
  }

  return (
    <span aria-label={title} className={className} role="img" style={style} title={title}>
      {showPlaceholder ? createSketchPlaceholder() : null}
      <img
        alt={imageAlt ?? title}
        className={joinClasses("block h-full w-full object-cover", imageClassName)}
        decoding={decoding}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad}
        referrerPolicy={referrerPolicy}
        src={currentSrc}
        style={imageStyle}
      />
    </span>
  );
}

export function AgentFaceDemoCard() {
  return (
    <div
      style={{
        display: "grid",
        gap: "12px",
        width: "220px",
        padding: "16px",
        borderRadius: "16px",
        background: "#f4f7fb",
        border: "1px solid #d8e0ec"
      }}
    >
      <AgentFace seed="demo-agent-face" size={120} />
      <div>
        <strong>demo-agent-face</strong>
        <p style={{ margin: "8px 0 0", color: "#46556a" }}>
          Minimal example using the shared core config and SVG renderer.
        </p>
      </div>
    </div>
  );
}

export type { AgentFaceConfig } from "@agent-face/core";
