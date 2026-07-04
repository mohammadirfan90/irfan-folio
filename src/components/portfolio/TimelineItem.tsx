import React from "react";

interface TimelineItemProps {
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
  /** Optional row type tag rendered in the top-right. */
  kind?: "experience" | "education";
}

/**
 * Splits a description string into individual bullet lines.
 * - Honors explicit newlines.
 * - Falls back to splitting long sentences if there's only one paragraph.
 * - Strips leading bullet markers like -, *, •, 1., 2. etc.
 */
function getBulletLines(text: string): string[] {
  if (!text) return [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^([-*•\d+.]\s*)+/, ""));

  if (lines.length >= 1) return lines;

  return [];
}

export function TimelineItem({
  duration,
  title,
  subtitle,
  description,
  isLast = false,
  kind,
}: TimelineItemProps) {
  const bullets = getBulletLines(description);
  const kindLabel = kind === "experience" ? "EXP" : kind === "education" ? "EDU" : null;

  return (
    <div className={`flex flex-col md:flex-row gap-4 md:gap-12 pb-12 ${!isLast ? "border-b border-outline-variant/20" : ""}`}>
      <div className="md:w-32 flex-shrink-0">
        <span className="font-label-mono text-label-mono text-on-surface-variant">
          {duration}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-headline-md text-headline-md text-primary">
            {title}
          </h4>
          {kindLabel && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md border border-outline-variant/25 bg-white font-label-mono text-[10px] uppercase tracking-widest text-accent shrink-0 mt-1">
              [{kindLabel}]
            </span>
          )}
        </div>
        <p className="font-label-mono text-label-mono text-secondary mt-1">
          {subtitle}
        </p>
        {bullets.length > 0 ? (
          <ul className="mt-4 space-y-1.5">
            {bullets.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-on-surface-variant leading-relaxed font-body-md text-body-md"
              >
                <span className="text-accent select-none font-label-mono shrink-0 mt-0.5" aria-hidden="true">
                  →
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
