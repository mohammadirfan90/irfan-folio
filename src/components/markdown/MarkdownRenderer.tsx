"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { MermaidDiagram } from "./MermaidDiagram";
import { CodeBlock } from "./CodeBlock";
import { 
  Info, 
  Lightbulb, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldAlert 
} from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Helper to extract plain text from arbitrary React children
function getInnerText(node: unknown): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getInnerText).join("");
  if (React.isValidElement(node)) {
    const children = (node.props as { children?: unknown })?.children;
    return children !== undefined ? getInnerText(children) : "";
  }
  return "";
}

const ALERT_TYPE_REGEX = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i;

// Matches the full [!TYPE] marker plus trailing spaces / one soft line break
const MARKER_PREFIX_REGEX = /[ \t]*\[!(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*(?:\r?\n)?/i;

// Recursively removes the [!TYPE] marker text from the first matching string leaf
function stripMarkerDeep(node: unknown): unknown {
  if (typeof node === "string") {
    return node.replace(MARKER_PREFIX_REGEX, "");
  }
  if (Array.isArray(node)) {
    return node.map(stripMarkerDeep);
  }
  if (React.isValidElement(node)) {
    const cleanedChildren = React.Children.toArray(
      (node.props as { children?: React.ReactNode })?.children
    )
      .map((child) => stripMarkerDeep(child) as React.ReactNode)
      .filter((c) => c !== "");

    // Drop leading <br /> left behind by soft line breaks
    let trimmed = cleanedChildren;
    while (
      trimmed.length > 0 &&
      typeof trimmed[0] !== "string" &&
      React.isValidElement(trimmed[0]) &&
      (trimmed[0].type === "br" ||
        (trimmed[0].props as { node?: { tagName?: string } })?.node?.tagName === "br")
    ) {
      trimmed = trimmed.slice(1);
    }

    return React.cloneElement(node, node.props as Partial<unknown>, ...trimmed);
  }
  return node;
}

// Helper to parse GitHub alert syntax in blockquotes
function parseAlert(children: React.ReactNode) {
  const text = getInnerText(children);
  const match = text.match(ALERT_TYPE_REGEX);
  if (!match) return null;

  const type = match[1].toUpperCase();

  let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
  let title = "Note";
  let borderClass = "border-blue-500/30 bg-blue-500/5 text-blue-900 dark:text-blue-200";

  if (type === "TIP") {
    icon = <Lightbulb className="w-5 h-5 text-accent shrink-0" />;
    title = "Tip";
    borderClass = "border-accent/40 bg-accent/5 text-emerald-950 dark:text-emerald-200";
  } else if (type === "WARNING") {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
    title = "Warning";
    borderClass = "border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-amber-200";
  } else if (type === "IMPORTANT") {
    icon = <AlertOctagon className="w-5 h-5 text-purple-500 shrink-0" />;
    title = "Important";
    borderClass = "border-purple-500/30 bg-purple-500/5 text-purple-950 dark:text-purple-200";
  } else if (type === "CAUTION") {
    icon = <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />;
    title = "Caution";
    borderClass = "border-rose-500/30 bg-rose-500/5 text-rose-950 dark:text-rose-200";
  }

  // Strip the [!TYPE] marker but keep ALL remaining content.
  // Handles both cases: marker alone on its own line AND soft-break content
  // sharing the same paragraph ("[!NOTE]\nActual text...").
  const body = React.Children.toArray(children)
    .map((child) => {
      if (!ALERT_TYPE_REGEX.test(getInnerText(child))) return child;
      const cleaned = stripMarkerDeep(child);
      // Drop nodes left empty after stripping the marker
      return getInnerText(cleaned).trim() ? cleaned : null;
    })
    .filter(Boolean) as React.ReactNode[];

  return {
    type,
    title,
    icon,
    borderClass,
    body,
  };
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content || !content.trim()) {
    return (
      <div className="py-8 text-on-surface-variant italic text-sm">
        No case study content provided.
      </div>
    );
  }

  return (
    <div className={`prose-case-study text-on-surface leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // Headings with anchor targets for TOC
          h1: ({ node, ...props }) => (
            <h1
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-primary mt-8 mb-4 border-b border-outline-variant/20 pb-2.5 flex items-center gap-2 group scroll-mt-24"
              {...props}
            />
          ),
          h2: ({ node, id, children, ...props }) => (
            <h2
              id={id}
              className="font-display text-xl md:text-2xl font-bold text-primary mt-10 mb-4 flex items-center gap-2 group scroll-mt-24"
              {...props}
            >
              <span className="text-accent font-label-mono text-base font-normal select-none opacity-60 group-hover:opacity-100 transition-opacity">
                #
              </span>
              <span>{children}</span>
            </h2>
          ),
          h3: ({ node, id, children, ...props }) => (
            <h3
              id={id}
              className="font-display text-lg md:text-xl font-semibold text-primary mt-7 mb-3 flex items-center gap-2 group scroll-mt-24"
              {...props}
            >
              <span className="text-accent/60 font-label-mono text-sm font-normal select-none">
                ##
              </span>
              <span>{children}</span>
            </h3>
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="font-display text-base font-semibold text-primary mt-5 mb-2 scroll-mt-24"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed mb-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 space-y-2 mb-5 font-body-md text-sm md:text-base text-on-surface-variant marker:text-accent" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-5 font-body-md text-sm md:text-base text-on-surface-variant marker:text-accent marker:font-label-mono" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed pl-1" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-primary" {...props} />
          ),
          a: ({ node, href, children, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-secondary dark:text-blue-400 font-medium underline underline-offset-4 decoration-secondary/30 hover:decoration-secondary transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-outline-variant/20" {...props} />
          ),
          blockquote: ({ node, children, ...props }) => {
            const alert = parseAlert(children);

            if (alert) {
              return (
                <div
                  className={`my-6 rounded-2xl border p-4 sm:p-5 ${alert.borderClass} shadow-2xs`}
                >
                  <div className="flex items-center gap-2 font-label-mono text-xs font-bold uppercase tracking-wider mb-2">
                    {alert.icon}
                    <span>{alert.title}</span>
                  </div>
                  <div className="font-body-md text-sm md:text-base leading-relaxed text-on-surface space-y-3 [&>*:last-child]:mb-0">
                    {alert.body.length > 0 ? alert.body : children}
                  </div>
                </div>
              );
            }

            return (
              <blockquote
                className="my-6 pl-4 sm:pl-5 border-l-2 border-accent bg-surface-container-low/40 rounded-r-xl py-3 pr-4 italic font-body-md text-sm md:text-base text-on-surface-variant"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          table: ({ node, ...props }) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs">
              <table className="w-full text-left text-sm border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-surface-container-low border-b border-outline-variant/30 font-label-mono text-xs uppercase tracking-wider text-primary font-bold" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="p-3 sm:p-3.5 font-semibold text-primary" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="p-3 sm:p-3.5 border-b border-outline-variant/15 text-on-surface-variant text-sm font-body-md" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-surface-container-low/30 transition-colors last:border-0" {...props} />
          ),
          img: ({ node, src, alt, ...props }) => (
            <figure className="my-6">
              <img
                src={src}
                alt={alt || "Case Study Illustration"}
                className="w-full rounded-2xl border border-outline-variant/20 shadow-xs object-cover max-h-[500px]"
                loading="lazy"
                {...props}
              />
              {alt && (
                <figcaption className="text-center font-label-mono text-xs text-on-surface-variant/70 mt-2">
                  {"//"} {alt}
                </figcaption>
              )}
            </figure>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            // 1. Mermaid diagram renderer (explicit language OR heuristic on unlabeled blocks)
            const MERMAID_KEYWORDS = ["graph", "flowchart", "sequenceDiagram", "classDiagram", "erDiagram", "stateDiagram", "gitGraph"];
            const looksLikeMermaid = MERMAID_KEYWORDS.some((k) => codeString.startsWith(k));
            if (language === "mermaid" || (!language && looksLikeMermaid)) {
              return <MermaidDiagram chart={codeString} />;
            }

            // 2. Multiline code block or explicit language
            const isInline = !match && !codeString.includes("\n");
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-surface-container-low text-primary font-label-mono text-[13px] border border-outline-variant/20 font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // 3. Fenced code block with copy button
            return <CodeBlock language={language || "txt"} value={codeString} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
