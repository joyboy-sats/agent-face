import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

type InputPanelProps = {
  value: string;
  onChange: (value: string) => void;
  actions?: ReactNode;
};

export function InputPanel({ value, onChange, actions }: InputPanelProps) {
  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="space-y-1.5">
          <CardTitle>Seed / Address</CardTitle>
          <CardDescription>输入即生成，不需要额外按钮。</CardDescription>
        </div>

        {actions ? <div className="hidden items-center gap-3 md:flex">{actions}</div> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            aria-label="Seed / Address"
            onChange={(event) => onChange(event.target.value)}
            placeholder="0xabc... 或任意字符串"
            value={value}
          />
        </div>

        {actions ? <div className="flex gap-3 md:hidden">{actions}</div> : null}
      </CardContent>
    </Card>
  );
}
