import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

type InputPanelProps = {
  description: string;
  placeholder: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  actions?: ReactNode;
  children?: ReactNode;
};

export function InputPanel({
  description,
  placeholder,
  title,
  value,
  onChange,
  actions,
  children,
}: InputPanelProps) {
  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        {actions ? <div className="hidden items-center gap-3 md:flex">{actions}</div> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            aria-label={title}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
          />
        </div>

        {actions ? <div className="flex gap-3 md:hidden">{actions}</div> : null}
        {children ? <div>{children}</div> : null}
      </CardContent>
    </Card>
  );
}
