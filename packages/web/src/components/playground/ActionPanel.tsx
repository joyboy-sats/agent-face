import { Download, Link2, RefreshCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionPanelProps = {
  shareLabel: string;
  exportSvgLabel: string;
  exportPngLabel: string;
  exportWebpLabel: string;
  randomLabel: string;
  resetLabel: string;
  onCopyShare: () => void;
  onExportSvg: () => void;
  onExportPng: () => void;
  onExportWebp: () => void;
  onRandom: () => void;
  onReset: () => void;
};

export function ActionPanel({
  shareLabel,
  exportSvgLabel,
  exportPngLabel,
  exportWebpLabel,
  randomLabel,
  resetLabel,
  onCopyShare,
  onExportSvg,
  onExportPng,
  onExportWebp,
  onRandom,
  onReset,
}: ActionPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button className="justify-center shadow-sm" onClick={onCopyShare}>
        <Link2 className="size-4" />
        {shareLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onExportSvg} variant="secondary">
        <Download className="size-4" />
        {exportSvgLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onExportPng} variant="secondary">
        <Download className="size-4" />
        {exportPngLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onExportWebp} variant="secondary">
        <Download className="size-4" />
        {exportWebpLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onRandom} variant="secondary">
        <Shuffle className="size-4" />
        {randomLabel}
      </Button>
      <Button className="justify-center shadow-sm" onClick={onReset} variant="secondary">
        <RefreshCcw className="size-4" />
        {resetLabel}
      </Button>
    </div>
  );
}
