import type { CSSProperties } from "react";
import {
  type AgentFaceConfig,
  generateAgentFaceConfig,
  renderAgentFaceSvg
} from "@agent-face/core";

export interface AgentFaceProps {
  seed?: string;
  config?: AgentFaceConfig;
  size?: number | string;
  className?: string;
  title?: string;
}

export function AgentFace({
  seed,
  config,
  size = 160,
  className,
  title = "AgentFace avatar"
}: AgentFaceProps) {
  const resolvedConfig = config ?? generateAgentFaceConfig(seed ?? "");
  const svgMarkup = renderAgentFaceSvg(resolvedConfig);
  const dimension = typeof size === "number" ? `${size}px` : size;
  const style: CSSProperties = {
    width: dimension,
    height: dimension,
    display: "inline-block",
    lineHeight: 0
  };

  return (
    <span
      aria-label={title}
      className={className}
      role="img"
      style={style}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
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
