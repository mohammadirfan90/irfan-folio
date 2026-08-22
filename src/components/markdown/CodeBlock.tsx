"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  value: string;
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy code:", e);
    }
  };

  const displayLang = (language || "code").toLowerCase();

  return (
    <div className="my-5 rounded-xl border border-outline-variant/20 bg-[#1e1e24] text-[#f4f4f5] dark:bg-[#121216] overflow-hidden shadow-xs">
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
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-label-mono leading-relaxed selection:bg-accent/30 selection:text-white">
        <pre className="m-0 font-inherit">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  );
}
