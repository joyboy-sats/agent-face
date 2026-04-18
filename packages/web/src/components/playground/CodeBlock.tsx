import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeLanguage = "tsx" | "json" | "query" | "text";

type CodeBlockProps = {
  code: string;
  language?: CodeLanguage;
  onCopy?: () => void;
  copyLabel?: string;
  copied?: boolean;
  showLineNumbers?: boolean;
  className?: string;
};

function renderPlain(line: string) {
  return line || "\u00A0";
}

function renderTsx(line: string) {
  const parts: Array<{ text: string; className?: string }> = [];
  const pattern =
    /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|\b(?:import|from|export|default|const|let|var|return|type|interface|extends|setup|template|script)\b|<\/?[A-Za-z][\w.-]*|[A-Za-z_$][\w$]*|[{}()[\],.:;<>/=]/g;

  let lastIndex = 0;
  let match = pattern.exec(line);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ text: line.slice(lastIndex, match.index) });
    }

    const token = match[0];
    let className = "text-slate-800";

    if (/^["'`]/.test(token)) {
      className = "text-blue-800";
    } else if (
      /^(import|from|export|default|const|let|var|return|type|interface|extends|setup|template|script)$/.test(
        token
      )
    ) {
      className = "text-red-500";
    } else if (/^<\/?[A-Za-z]/.test(token)) {
      className = "text-sky-700";
    } else if (/^[{}()[\],.:;<>/=]$/.test(token)) {
      className = "text-slate-500";
    }

    parts.push({ text: token, className });
    lastIndex = pattern.lastIndex;
    match = pattern.exec(line);
  }

  if (lastIndex < line.length) {
    parts.push({ text: line.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return renderPlain(line);
  }

  return parts.map((part, index) => (
    <span className={part.className} key={`${part.text}-${index}`}>
      {part.text}
    </span>
  ));
}

function renderJson(line: string) {
  const parts: Array<{ text: string; className?: string }> = [];
  const pattern =
    /"(?:\\.|[^"])*"(?=\s*:)|"(?:\\.|[^"])*"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[{}\[\],:]/g;

  let lastIndex = 0;
  let match = pattern.exec(line);

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ text: line.slice(lastIndex, match.index) });
    }

    const token = match[0];
    let className = "text-slate-800";

    if (/^"(?:\\.|[^"])*"$/.test(token) && /:\s*$/.test(line.slice(pattern.lastIndex))) {
      className = "text-red-500";
    } else if (/^"/.test(token)) {
      className = "text-blue-800";
    } else if (/^(true|false|null)$/.test(token)) {
      className = "text-violet-600";
    } else if (/^-?\d/.test(token)) {
      className = "text-amber-700";
    } else if (/^[{}\[\],:]$/.test(token)) {
      className = "text-slate-500";
    }

    parts.push({ text: token, className });
    lastIndex = pattern.lastIndex;
    match = pattern.exec(line);
  }

  if (lastIndex < line.length) {
    parts.push({ text: line.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return renderPlain(line);
  }

  return parts.map((part, index) => (
    <span className={part.className} key={`${part.text}-${index}`}>
      {part.text}
    </span>
  ));
}

function renderQuery(line: string) {
  if (!line) {
    return renderPlain(line);
  }

  const segments = line.split(/([?&])/g).filter(Boolean);

  return segments.map((segment, index) => {
    if (segment === "?" || segment === "&") {
      return (
        <span className="text-slate-400" key={`${segment}-${index}`}>
          {segment}
        </span>
      );
    }

    const equalIndex = segment.indexOf("=");
    if (equalIndex === -1) {
      return (
        <span className="text-sky-700" key={`${segment}-${index}`}>
          {segment}
        </span>
      );
    }

    const key = segment.slice(0, equalIndex);
    const value = segment.slice(equalIndex + 1);

    return (
      <span key={`${segment}-${index}`}>
        <span className="text-red-500">{key}</span>
        <span className="text-slate-400">=</span>
        <span className="text-blue-800">{value}</span>
      </span>
    );
  });
}

function renderLine(line: string, language: CodeLanguage) {
  switch (language) {
    case "tsx":
      return renderTsx(line);
    case "json":
      return renderJson(line);
    case "query":
      return renderQuery(line);
    default:
      return renderPlain(line);
  }
}

export function CodeBlock({
  code,
  language = "text",
  onCopy,
  copyLabel,
  copied = false,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-[#f4f5f7] shadow-[0_12px_30px_rgba(15,23,42,0.05)]",
        className
      )}
    >
      {onCopy ? (
        <Button
          aria-label={copyLabel ?? "Copy code"}
          className="absolute top-4 right-4 z-10 size-10 rounded-xl border border-black/8 bg-white/80 text-slate-700 shadow-none hover:bg-white"
          onClick={onCopy}
          size="icon"
          title={copyLabel}
          type="button"
          variant="ghost"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      ) : null}

      <div className="overflow-x-auto px-5 py-5">
        <div className="min-w-full space-y-0.5 font-mono text-[13px] leading-7 text-slate-800 md:text-[14px]">
          {lines.map((line, index) => (
            <div
              className={cn(
                "grid items-start gap-4",
                showLineNumbers ? "grid-cols-[2rem_minmax(0,1fr)] md:grid-cols-[2.5rem_minmax(0,1fr)]" : "grid-cols-1"
              )}
              key={`${index + 1}-${line}`}
            >
              {showLineNumbers ? (
                <span className="select-none text-right text-slate-400">{index + 1}</span>
              ) : null}
              <code className="block whitespace-pre-wrap break-all">{renderLine(line, language)}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
