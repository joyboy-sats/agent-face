import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

type InputPanelProps = {
  value: string;
  normalizedSeed: string;
  palette: string;
  onChange: (value: string) => void;
  children?: ReactNode;
};

export function InputPanel({ value, normalizedSeed, palette, onChange, children }: InputPanelProps) {
  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle>Seed / Address</CardTitle>
        <CardDescription>输入即生成，不需要额外按钮。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            aria-label="Seed / Address"
            onChange={(event) => onChange(event.target.value)}
            placeholder="0xabc... 或任意字符串"
            value={value}
          />
          <p className="text-sm text-muted-foreground">同一 seed 始终生成相同头像</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Seed: {normalizedSeed}</Badge>
          <Badge variant="secondary">配色: {palette}</Badge>
        </div>

        {children ? <div className="pt-2">{children}</div> : null}
      </CardContent>
    </Card>
  );
}
