"use client";

import React, { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { AlertCircle, Copy, Check } from "lucide-react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      if (!chart || !chart.trim()) return;

      try {
        const mermaid = (await import("mermaid")).default;
        
        const isDark = resolvedTheme === "dark";
        
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#18181b",
                primaryColor: "#27272a",
                primaryTextColor: "#f4f4f5",
                primaryBorderColor: "#3f3f46",
                lineColor: "#a1a1aa",
                secondaryColor: "#1e293b",
                tertiaryColor: "#09090b",
                noteBkgColor: "#27272a",
                noteTextColor: "#e4e4e7",
              }
            : {
                darkMode: false,
                background: "#f9fafb",
                primaryColor: "#f3f4f6",
                primaryTextColor: "#111827",
                primaryBorderColor: "#e5e7eb",
                lineColor: "#4b5563",
                secondaryColor: "#eff6ff",
                tertiaryColor: "#ffffff",
                noteBkgColor: "#f3f4f6",
                noteTextColor: "#1f2937",
              },
        });

        // Clean chart definition
        const cleanedChart = chart.trim();
        const { svg: renderedSvg } = await mermaid.render(diagramId, cleanedChart);

        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Mermaid rendering failed:", err);
          setError(err?.message || "Failed to render Mermaid diagram");
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme, diagramId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-xs font-label-mono">
        <div className="flex items-center gap-2 text-destructive mb-2 font-semibold">
          <AlertCircle className="w-4 h-4" />
          <span>Mermaid Diagram Syntax Error</span>
        </div>
        <p className="text-on-surface-variant mb-3">{error}</p>
        <pre className="p-3 bg-surface-container-low rounded-lg overflow-x-auto text-[11px] text-on-surface">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="my-6 relative group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card/70 p-4 sm:p-6 shadow-xs transition-all overflow-hidden">
      {/* Diagram header bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/15 pb-2 mb-4 font-label-mono text-[11px] text-on-surface-variant select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="uppercase tracking-widest font-semibold">System Diagram</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors text-[10px] uppercase font-bold tracking-wider cursor-pointer"
          title="Copy Diagram Definition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div
        className="w-full overflow-x-auto flex justify-center items-center py-2 [&>svg]:max-w-full [&>svg]:h-auto select-none"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
