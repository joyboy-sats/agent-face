import type { LoadingShowcaseMode } from "@/components/playground/LoadingShowcase";
import type { AgentFaceOptionKey } from "@agent-face/core";
import { AGENT_FACE_OPTIONS } from "@agent-face/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { Locale } from "@/i18n";
import { WEB_COPY } from "@/i18n";

type ConfigPanelProps = {
  locale: Locale;
  values: Record<AgentFaceOptionKey, string>;
  onValueChange: (key: AgentFaceOptionKey, value: string) => void;
  loadingShowcaseMode: LoadingShowcaseMode;
  onLoadingShowcaseModeChange: (value: LoadingShowcaseMode) => void;
};

function ConfigField({
  locale,
  field,
  value,
  onValueChange
}: {
  locale: Locale;
  field: AgentFaceOptionKey;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const fieldCopy = WEB_COPY[locale].configPanel.fields[field];
  const selectPrefix = WEB_COPY[locale].configPanel.selectPrefix;

  return (
    <div className="space-y-3 rounded-[calc(var(--radius)-0.15rem)] border border-border/70 bg-background/80 p-4">
      <div>
        <p className="text-sm font-semibold">{fieldCopy.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{fieldCopy.hint}</p>
      </div>

      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={`${selectPrefix}${fieldCopy.label}`} />
        </SelectTrigger>
        <SelectContent>
          {AGENT_FACE_OPTIONS[field].map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ConfigPanel({
  locale,
  values,
  onValueChange,
  loadingShowcaseMode,
  onLoadingShowcaseModeChange,
}: ConfigPanelProps) {
  const copy = WEB_COPY[locale].configPanel;

  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-3 rounded-[calc(var(--radius)-0.15rem)] border border-border/70 bg-background/80 p-4">
          <div>
            <p className="text-sm font-semibold">{copy.previewMode.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{copy.previewMode.hint}</p>
          </div>

          <Select onValueChange={(value) => onLoadingShowcaseModeChange(value as LoadingShowcaseMode)} value={loadingShowcaseMode}>
            <SelectTrigger>
              <SelectValue placeholder={copy.previewMode.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skeleton">{copy.previewMode.options.skeleton}</SelectItem>
              <SelectItem value="avatar">{copy.previewMode.options.avatar}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Accordion className="space-y-3" defaultValue={copy.groups.map((group) => group.id)} type="multiple">
          {copy.groups.map((group) => (
            <AccordionItem key={group.id} value={group.id}>
              <AccordionTrigger>
                <div>
                  <div>{group.title}</div>
                  <p className="mt-1 text-xs font-normal text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 xl:grid-cols-2">
                  {group.fields.map((field) => (
                    <ConfigField
                      field={field}
                      key={field}
                      locale={locale}
                      onValueChange={(value) => onValueChange(field, value)}
                      value={values[field]}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
