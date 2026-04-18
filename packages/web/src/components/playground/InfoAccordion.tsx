import { Code2, FileJson2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeBlock } from "@/components/playground/CodeBlock";
import type { Locale } from "@/i18n";
import { WEB_COPY } from "@/i18n";

type InfoAccordionProps = {
  configJson: string;
  locale: Locale;
  onCopyConfig: () => void;
  onCopyReactCode: () => void;
  onCopyVueCode: () => void;
  queryString: string;
  reactCopyLabel: string;
  vueCopyLabel: string;
};

const REACT_EXAMPLE = `import { AgentFace } from '@agent-face/react'
<AgentFace seed="your-seed" size={120} />`;

const VUE_EXAMPLE = `<script setup lang="ts">
import { AgentFace } from '@agent-face/vue'
</script>

<template>
  <AgentFace seed="your-seed" :size="120" />
</template>`;

export function InfoAccordion({
  configJson,
  locale,
  onCopyConfig,
  onCopyReactCode,
  onCopyVueCode,
  queryString,
  reactCopyLabel,
  vueCopyLabel,
}: InfoAccordionProps) {
  const copy = WEB_COPY[locale];
  const isReactCopied = reactCopyLabel === copy.reactPanel.copied;
  const isVueCopied = vueCopyLabel === copy.vuePanel.copied;

  return (
    <Accordion className="space-y-3" collapsible defaultValue="react" type="single">
      <AccordionItem value="react">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-primary" />
            <span>{copy.reactPanel.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{copy.reactPanel.description}</p>
          <CodeBlock
            code={REACT_EXAMPLE}
            copied={isReactCopied}
            copyLabel={reactCopyLabel}
            language="tsx"
            onCopy={onCopyReactCode}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="vue">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-primary" />
            <span>{copy.vuePanel.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{copy.vuePanel.description}</p>
          <CodeBlock
            code={VUE_EXAMPLE}
            copied={isVueCopied}
            copyLabel={vueCopyLabel}
            language="tsx"
            onCopy={onCopyVueCode}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="config">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <FileJson2 className="size-4 text-primary" />
            <span>{copy.configDrawer.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{copy.configDrawer.description}</p>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {copy.configDrawer.queryLabel}
            </p>
            <CodeBlock code={queryString} language="query" showLineNumbers={false} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {copy.configDrawer.jsonLabel}
            </p>
            <CodeBlock
              code={configJson}
              copyLabel={copy.configDrawer.copyJson}
              language="json"
              onCopy={onCopyConfig}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
