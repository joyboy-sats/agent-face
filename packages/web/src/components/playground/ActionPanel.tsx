import { Download, Link2, RefreshCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionPanelProps = {
  shareLabel: string;
  onCopyShare: () => void;
  onDownloadSvg: () => void;
  onRandom: () => void;
  onReset: () => void;
};

export function ActionPanel({
  shareLabel,
  onCopyShare,
  onDownloadSvg,
  onRandom,
  onReset,
}: ActionPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button className="justify-center shadow-sm" onClick={onCopyShare}>
        <Link2 className="size-4" />
        {shareLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onDownloadSvg} variant="secondary">
        <Download className="size-4" />
        导出 SVG
      </Button>
      <Button className="justify-center shadow-sm" onClick={onRandom} variant="secondary">
        <Shuffle className="size-4" />
        随机生成
      </Button>
      <Button className="justify-center shadow-sm" onClick={onReset} variant="secondary">
        <RefreshCcw className="size-4" />
        重置
      </Button>
    </div>
  );
}
