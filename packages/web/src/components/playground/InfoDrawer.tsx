import { Code2, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type InfoDrawerProps = {
  copyLabel: string;
  onCopyCode: () => void;
};

const REACT_EXAMPLE = `import { AgentFace } from '@agent-face/react'
<AgentFace seed="your-seed" size={120} />`;

export function InfoDrawer({ copyLabel, onCopyCode }: InfoDrawerProps) {
  return (
    <section className="rounded-[calc(var(--radius)+0.1rem)] border border-border/70 bg-slate-50/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Code2 className="size-4" />
            在 React 中使用
          </div>
          <p className="text-sm text-muted-foreground">
            直接复制示例即可嵌入项目。
          </p>
        </div>

        <Button onClick={onCopyCode} size="sm" type="button" variant="outline">
          <Copy className="size-4" />
          {copyLabel}
        </Button>
      </div>

      <div className="space-y-5 px-5 py-5">
        <pre className="overflow-auto rounded-3xl border border-border/70 bg-white p-5 text-sm leading-7 text-slate-700">
          <code>{REACT_EXAMPLE}</code>
        </pre>
      </div>
    </section>
  );
}
