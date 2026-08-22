"use client";

import React, { useState, useRef } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Code, 
  Table, 
  Quote, 
  Eye, 
  Edit3, 
  Columns, 
  GitBranch, 
  Sparkles,
  HelpCircle
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your case study in Markdown... Use ```mermaid for diagrams.",
  minHeight = "450px",
}: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");
  const [showMermaidMenu, setShowMermaidMenu] = useState(false);
  const [showCalloutMenu, setShowCalloutMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert markdown syntax at cursor position
  const insertText = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + before + defaultText + after);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = before + selectedText + after;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertMermaid = (templateType: "flowchart" | "sequence" | "architecture" | "git") => {
    let template = "";
    if (templateType === "flowchart") {
      template = `\n\`\`\`mermaid\ngraph TD\n    A[Client Web App] -->|REST / GraphQL| B[API Gateway]\n    B --> C[Microservice Service]\n    C --> D[(PostgreSQL DB)]\n\`\`\`\n`;
    } else if (templateType === "sequence") {
      template = `\n\`\`\`mermaid\nsequenceDiagram\n    autonumber\n    actor User\n    participant Frontend\n    participant Server\n    participant DB\n\n    User->>Frontend: Submit Action\n    Frontend->>Server: POST /api/execute\n    Server->>DB: Query & Transaction\n    DB-->>Server: Result Record\n    Server-->>Frontend: 200 OK Response\n    Frontend-->>User: Update UI State\n\`\`\`\n`;
    } else if (templateType === "architecture") {
      template = `\n\`\`\`mermaid\ngraph LR\n    subgraph Frontend Layer\n        Next[Next.js App Router]\n        Tailwind[Tailwind CSS]\n    end\n    subgraph Data & AI\n        FastAPI[FastAPI Service]\n        PgVector[(pgvector Database)]\n        Embed[OpenAI Embeddings]\n    end\n    Next --> FastAPI\n    FastAPI --> Embed\n    Embed --> PgVector\n\`\`\`\n`;
    } else {
      template = `\n\`\`\`mermaid\ngitGraph\n    commit id: "Initial v1.0"\n    branch feature/ai-engine\n    checkout feature/ai-engine\n    commit id: "Vector Search"\n    commit id: "Benchmark Tune"\n    checkout main\n    merge feature/ai-engine id: "v2.0 Deploy"\n\`\`\`\n`;
    }

    insertText(template);
    setShowMermaidMenu(false);
  };

  const insertCallout = (type: "NOTE" | "TIP" | "WARNING" | "IMPORTANT") => {
    const template = `\n> [!${type}]\n> Write your ${type.toLowerCase()} description here.\n\n`;
    insertText(template);
    setShowCalloutMenu(false);
  };

  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-background overflow-hidden shadow-xs flex flex-col">
      {/* 1. TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 border-b border-outline-variant/20 bg-surface-container-low/50 select-none">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => insertText("**", "**", "bold text")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*", "italic text")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          
          <div className="w-[1px] h-4 bg-outline-variant/30 mx-1" />

          <button
            type="button"
            onClick={() => insertText("\n## ", "\n", "Heading 2")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n### ", "\n", "Heading 3")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-outline-variant/30 mx-1" />

          <button
            type="button"
            onClick={() => insertText("\n- ", "", "Bullet item")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n1. ", "", "Numbered item")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n```typescript\n", "\n```\n", "// Write code here")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertText("\n| Feature | Status | Notes |\n| :--- | :--- | :--- |\n| Vector Search | Ready | <120ms |\n| Auth Flow | Active | Supabase |\n\n")}
            className="p-1.5 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            title="Insert Table"
          >
            <Table className="w-4 h-4" />
          </button>

          {/* Callout Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowCalloutMenu(!showCalloutMenu);
                setShowMermaidMenu(false);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-background text-on-surface-variant hover:text-primary transition-colors text-xs font-label-mono cursor-pointer"
              title="Insert Callout Alert"
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Alert</span>
            </button>

            {showCalloutMenu && (
              <div className="absolute top-full left-0 mt-1 z-30 w-44 rounded-xl border border-outline-variant/30 bg-background shadow-lg p-1 font-label-mono text-xs">
                <button
                  type="button"
                  onClick={() => insertCallout("NOTE")}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-blue-600 dark:text-blue-400 font-medium"
                >
                  ℹ️ Note Alert
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("TIP")}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-accent font-medium"
                >
                  💡 Tip Alert
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("WARNING")}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-amber-600 dark:text-amber-400 font-medium"
                >
                  ⚠️ Warning Alert
                </button>
                <button
                  type="button"
                  onClick={() => insertCallout("IMPORTANT")}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-container-low text-purple-600 dark:text-purple-400 font-medium"
                >
                  🛑 Important Alert
                </button>
              </div>
            )}
          </div>

          <div className="w-[1px] h-4 bg-outline-variant/30 mx-1" />

          {/* Mermaid Insert Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowMermaidMenu(!showMermaidMenu);
                setShowCalloutMenu(false);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/15 border border-accent/30 text-primary font-label-mono text-xs font-bold hover:bg-accent/25 transition-colors cursor-pointer"
              title="Insert Mermaid Diagram"
            >
              <GitBranch className="w-3.5 h-3.5 text-accent" />
              <span>+ Mermaid Diagram</span>
            </button>

            {showMermaidMenu && (
              <div className="absolute top-full left-0 mt-1 z-30 w-52 rounded-xl border border-outline-variant/30 bg-background shadow-lg p-1 font-label-mono text-xs">
                <button
                  type="button"
                  onClick={() => insertMermaid("flowchart")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface"
                >
                  📊 Flowchart (Top-Down)
                </button>
                <button
                  type="button"
                  onClick={() => insertMermaid("architecture")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface"
                >
                  🏗️ Cloud Architecture
                </button>
                <button
                  type="button"
                  onClick={() => insertMermaid("sequence")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface"
                >
                  ⏱️ Sequence Flow
                </button>
                <button
                  type="button"
                  onClick={() => insertMermaid("git")}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface"
                >
                  🌿 Git Timeline
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-background p-0.5 rounded-lg border border-outline-variant/20">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "edit"
                ? "bg-surface-container-low text-primary shadow-2xs font-semibold"
                : "text-on-surface-variant hover:text-primary"
            }`}
            title="Editor Only"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`p-1.5 rounded-md transition-all hidden sm:block ${
              viewMode === "split"
                ? "bg-surface-container-low text-primary shadow-2xs font-semibold"
                : "text-on-surface-variant hover:text-primary"
            }`}
            title="Split Editor & Preview"
          >
            <Columns className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "preview"
                ? "bg-surface-container-low text-primary shadow-2xs font-semibold"
                : "text-on-surface-variant hover:text-primary"
            }`}
            title="Preview Only"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. DUAL-PANE BODY */}
      <div
        className="grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/20"
        style={{
          gridTemplateColumns:
            viewMode === "split"
              ? "1fr 1fr"
              : "1fr",
          minHeight,
        }}
      >
        {/* Editor Pane */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className="flex flex-col h-full bg-background">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-full p-4 bg-transparent resize-y font-label-mono text-sm leading-relaxed text-on-surface focus:outline-none focus:ring-0 placeholder:text-on-surface-variant/40"
              style={{ minHeight }}
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className="flex flex-col h-full p-5 bg-surface-container-lowest dark:bg-card/40 overflow-y-auto"
            style={{ maxHeight: "650px", minHeight }}
          >
            <div className="font-label-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-3 border-b border-outline-variant/15 pb-1 select-none flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Live Case Study Preview</span>
            </div>
            <MarkdownRenderer content={value} />
          </div>
        )}
      </div>

      {/* 3. FOOTER STATS */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-outline-variant/20 bg-surface-container-low/30 font-label-mono text-[11px] text-on-surface-variant select-none">
        <div className="flex items-center gap-3">
          <span>{value.length} characters</span>
          <span>{value.split(/\n+/).filter(Boolean).length} lines</span>
        </div>
        <div className="flex items-center gap-1 text-accent">
          <span>GFM & Mermaid Enabled</span>
        </div>
      </div>
    </div>
  );
}
