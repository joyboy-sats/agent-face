import { FileJson2, X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ConfigDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  queryString: string;
  configJson: string;
  onCopyConfig: () => void;
};

export function ConfigDrawer({
  isOpen,
  onClose,
  queryString,
  configJson,
  onCopyConfig,
}: ConfigDrawerProps) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="关闭配置详情"
        className="absolute inset-0 bg-slate-950/18 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col border-l border-border/70 bg-white shadow-[-28px_0_80px_rgba(15,23,42,0.16)] animate-in slide-in-from-right duration-300">
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <FileJson2 className="size-4" />
              配置详情
            </div>
            <p className="text-sm text-muted-foreground">
              查看当前 URL 参数与完整配置。
            </p>
          </div>

          <Button onClick={onClose} size="icon" type="button" variant="outline">
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div className="space-y-3">
            <Button onClick={onCopyConfig} type="button" variant="secondary">
              复制配置 JSON
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              URL 参数
            </p>
            <code className="block overflow-auto rounded-3xl border border-border/70 bg-slate-50 p-5 text-xs leading-6 text-slate-600">
              {queryString}
            </code>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Config JSON
            </p>
            <pre className="overflow-auto rounded-3xl border border-border/70 bg-slate-50 p-5 text-xs leading-6 text-slate-600">
              {configJson}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
