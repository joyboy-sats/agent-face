import type { AgentFaceConfig } from "@agent-face/core";
import { AgentFace } from "@agent-face/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PreviewPanelProps = {
  config: AgentFaceConfig;
  isEdited: boolean;
};

function truncateSeed(seed: string, size = 18) {
  if (seed.length <= size) return seed;
  const head = seed.slice(0, Math.max(6, Math.floor(size / 2)));
  const tail = seed.slice(-Math.max(4, Math.floor(size / 3)));
  return `${head}…${tail}`;
}

export function PreviewPanel({ config, isEdited }: PreviewPanelProps) {
  return (
    <Card className="border-border/70 bg-card/92 shadow-sm backdrop-blur lg:sticky lg:top-6">
      <CardHeader className="pb-4">
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>预览始终是主视觉中心，所有交互围绕它展开。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid min-h-[420px] place-items-center overflow-hidden rounded-[calc(var(--radius)+0.35rem)] border border-border/60 bg-[radial-gradient(circle_at_top,rgba(64,156,255,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(234,242,252,0.92))] p-6">
          <div className="grid place-items-center rounded-[calc(var(--radius)+0.1rem)] border border-border/50 bg-background/60 p-5 shadow-sm backdrop-blur">
            <AgentFace config={config} size={300} />
          </div>
        </div>

        <div className="grid gap-3 rounded-[calc(var(--radius)-0.1rem)] border border-border/70 bg-background/65 p-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Seed</p>
            <p className="truncate text-sm font-semibold" title={config.seed}>
              {truncateSeed(config.seed)}
            </p>
          </div>

          <Badge className="justify-center px-3 py-1.5" variant="outline">
            {config.version}
          </Badge>

          <Badge className="justify-center px-3 py-1.5" variant={isEdited ? "default" : "secondary"}>
            {isEdited ? "Edited" : "Auto"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
