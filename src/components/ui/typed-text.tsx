"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypedTextProps {
  /** The text to type out. */
  text: string;
  /** Prefix rendered in lime before the text. Default: "> " */
  prefix?: string;
  /** Milliseconds between each character. Default: 70 */
  speed?: number;
  /** Optional className applied to the outer wrapper. */
  className?: string;
}

/**
 * Types out a string character-by-character with a blinking lime cursor.
 * Used in the hero to render the developer's role like a terminal prompt.
 */
export function TypedText({
  text,
  prefix = "> ",
  speed = 70,
  className,
}: TypedTextProps) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= text.length) return;
    const timer = setTimeout(() => setShown((s) => s + 1), speed);
    return () => clearTimeout(timer);
  }, [shown, text.length, speed]);

  return (
    <span
      className={cn("inline-flex items-baseline font-label-mono", className)}
      aria-label={text}
    >
      {prefix && (
        <span className="text-accent select-none mr-1">{prefix}</span>
      )}
      <span aria-hidden="true">{text.slice(0, shown)}</span>
      <span className="text-accent caret-blink ml-0.5" aria-hidden="true">
        _
      </span>
    </span>
  );
}