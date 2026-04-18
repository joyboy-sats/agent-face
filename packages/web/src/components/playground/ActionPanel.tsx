import { Code2, Download, Link2, RefreshCcw, Shuffle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type ActionPanelProps = {
  shareLabel: string;
  queryString: string;
  configJson: string;
  onCopyShare: () => void;
  onDownloadSvg: () => void;
  onRandom: () => void;
  onReset: () => void;
  onCopyConfig: () => void;
};

export function ActionPanel({
  shareLabel,
  queryString,
  configJson,
  onCopyShare,
  onDownloadSvg,
  onRandom,
  onReset,
  onCopyConfig
}: ActionPanelProps) {
  return (
    <div className="space-y-6 border-t border-border/60 pt-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Button className="justify-center" onClick={onCopyShare}>
          <Link2 className="size-4" />
          {shareLabel}
        </Button>
        <Button className="justify-center" onClick={onDownloadSvg} variant="secondary">
          <Download className="size-4" />
          导出 SVG
        </Button>
        <Button className="justify-center" onClick={onRandom} variant="secondary">
          <Shuffle className="size-4" />
          随机生成
        </Button>
        <Button className="justify-center" onClick={onReset} variant="secondary">
          <RefreshCcw className="size-4" />
          重置
        </Button>
      </div>

      <Accordion className="space-y-3" collapsible type="single">
        <AccordionItem value="react-example">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Code2 className="size-4 text-primary" />
              <span>在 React 中使用</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <pre className="overflow-auto rounded-2xl border border-border/70 bg-background/80 p-4 text-xs leading-6 text-muted-foreground">
              <code>{`import { AgentFace } from '@agent-face/react'\n<AgentFace seed="your-seed" size={120} />`}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="config-details">
          <AccordionTrigger>配置详情</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Button onClick={onCopyConfig} size="sm" variant="secondary">
              复制配置 JSON
            </Button>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                URL 参数
              </p>
              <code className="block overflow-auto rounded-2xl border border-border/70 bg-background/80 p-4 text-xs leading-6 text-muted-foreground">
                {queryString}
              </code>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Config JSON
              </p>
              <pre className="overflow-auto rounded-2xl border border-border/70 bg-background/80 p-4 text-xs leading-6 text-muted-foreground">
                {configJson}
              </pre>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
