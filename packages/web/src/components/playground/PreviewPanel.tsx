import type { AgentFaceConfig } from "@agent-face/core";
import { AgentFace } from "@agent-face/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PreviewPanelProps = {
  config: AgentFaceConfig;
  description: string;
  title: string;
  children?: React.ReactNode;
};

export function PreviewPanel({ config, description, title, children }: PreviewPanelProps) {
  return (
    <Card className="border-border/70 bg-card/92 shadow-sm backdrop-blur lg:sticky lg:top-6">
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid min-h-[340px] place-items-center overflow-hidden rounded-[calc(var(--radius)+0.35rem)] border border-border/60 bg-[radial-gradient(circle_at_top,rgba(64,156,255,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(234,242,252,0.92))] p-4">
          <div className="grid place-items-center rounded-[calc(var(--radius)+0.1rem)] border border-border/50 bg-background/60 p-5 shadow-sm backdrop-blur">
            <AgentFace config={config} size={224} />
          </div>
        </div>

        {children ? <div className="border-t border-border/60 pt-5">{children}</div> : null}
      </CardContent>
    </Card>
  );
}
