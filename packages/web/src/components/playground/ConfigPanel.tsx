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
import { CONFIG_GROUPS, FIELD_HINTS, FIELD_LABELS } from "@/components/playground/config";

type ConfigPanelProps = {
  values: Record<AgentFaceOptionKey, string>;
  onValueChange: (key: AgentFaceOptionKey, value: string) => void;
};

function ConfigField({
  field,
  value,
  onValueChange
}: {
  field: AgentFaceOptionKey;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-[calc(var(--radius)-0.15rem)] border border-border/70 bg-background/80 p-4">
      <div>
        <p className="text-sm font-semibold">{FIELD_LABELS[field]}</p>
        <p className="mt-1 text-xs text-muted-foreground">{FIELD_HINTS[field]}</p>
      </div>

      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={`选择${FIELD_LABELS[field]}`} />
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

export function ConfigPanel({ values, onValueChange }: ConfigPanelProps) {
  return (
    <Card className="border-border/70 bg-card/90 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle>配置面板</CardTitle>
        <CardDescription>配置项按语义分组，默认全部展开。</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion className="space-y-3" defaultValue={CONFIG_GROUPS.map((group) => group.id)} type="multiple">
          {CONFIG_GROUPS.map((group) => (
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
