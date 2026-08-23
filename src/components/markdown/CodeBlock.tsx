"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  value: string;
}

// Map common fence aliases to Prism grammar names
const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  mjs: "javascript",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  yml: "yaml",
  html: "markup",
  xml: "markup",
  svg: "markup",
  md: "markdown",
};

// Minimal structural type for the Prism singleton we interact with
interface PrismGlobal {
  manual: boolean;
  languages: Record<string, unknown>;
  highlight: (code: string, grammar: unknown, language: string) => string;
}

let prismPromise: Promise<PrismGlobal> | null = null;

// Sequential imports matter: Prism language components register against
// their peer grammars at import time (e.g. tsx needs jsx + typescript first).
async function loadPrism(): Promise<PrismGlobal> {
  if (!prismPromise) {
    prismPromise = (async () => {
      const Prism = (await import("prismjs")).default as unknown as PrismGlobal;
      Prism.manual = true;
      await import("prismjs/components/prism-typescript");
      await import("prismjs/components/prism-jsx");
      await import("prismjs/components/prism-tsx");
      await import("prismjs/components/prism-python");
      await import("prismjs/components/prism-bash");
      await import("prismjs/components/prism-json");
      await import("prismjs/components/prism-yaml");
      await import("prismjs/components/prism-sql");
      await import("prismjs/components/prism-go");
      return Prism;
    })();
  }
  return prismPromise;
}

const TOKEN_CSS = `
.code-highlight .token.comment,.code-highlight .token.prolog,.code-highlight .token.cdata{color:#7c8598;font-style:italic}
.code-highlight .token.punctuation{color:#9ca3af}
.code-highlight .token.doctype,.code-highlight .token.keyword,.code-highlight .token.rule{color:#c792ea}
.code-highlight .token.string,.code-highlight .token.char,.code-highlight .token.attr-value,.code-highlight .token.regex{color:#9ece6a}
.code-highlight .token.number,.code-highlight .token.boolean,.code-highlight .token.constant,.code-highlight .token.symbol{color:#ff9e64}
.code-highlight .token.function,.code-highlight .token.class-name,.code-highlight .token.tag{color:#7aa2f7}
.code-highlight .token.property,.code-highlight .token.variable,.code-highlight .token.parameter,.code-highlight .token.attr-name{color:#e0af68}
.code-highlight .token.operator,.code-highlight .token.entity,.code-highlight .token.url{color:#7dcfff}
.code-highlight .token.builtin,.code-highlight .token.type,.code-highlight .token.annotation,.code-highlight .token.selector{color:#4dd0e1}
`;

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string>(() => escapeHtml(value));

  const requestedLang = (language || "").toLowerCase();
  const normalizedLang = LANGUAGE_ALIASES[requestedLang] || requestedLang;

  useEffect(() => {
    let isActive = true;

    async function highlight() {
      try {
        const Prism = normalizedLang ? await loadPrism() : null;

        if (!isActive) return;
        const grammar = Prism?.languages?.[normalizedLang];
        setHighlighted(
          grammar
            ? Prism.highlight(value, grammar, normalizedLang)
            : escapeHtml(value)
        );
      } catch {
        if (isActive) setHighlighted(escapeHtml(value));
      }
    }

    highlight();
    return () => {
      isActive = false;
    };
  }, [value, normalizedLang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy code:", e);
    }
  };

  const displayLang = language || "code";

  return (
    <div className="my-5 rounded-xl border border-outline-variant/20 bg-[#1e1e24] text-[#f4f4f5] dark:bg-[#121216] overflow-hidden shadow-xs">
      <style>{TOKEN_CSS}</style>

      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/20 select-none">
        <div className="flex items-center gap-2 font-label-mono text-[11px] text-white/60">
          <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <span className="uppercase font-semibold tracking-wider text-accent">
            {displayLang}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-label-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-label-mono leading-relaxed selection:bg-accent/30 selection:text-white code-highlight">
        <pre className="m-0 font-inherit">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
}
