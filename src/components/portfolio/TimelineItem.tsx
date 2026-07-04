import React from "react";

interface TimelineItemProps {
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
}

export function TimelineItem({
  duration,
  title,
  subtitle,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-4 md:gap-12 pb-12 ${!isLast ? "border-b border-outline-variant/20" : ""}`}>
      <div className="md:w-32 flex-shrink-0">
        <span className="font-label-mono text-label-mono text-on-surface-variant">
          {duration}
        </span>
      </div>
      <div>
        <h4 className="font-headline-md text-headline-md text-primary">
          {title}
        </h4>
        <p className="font-label-mono text-label-mono text-secondary mt-1">
          {subtitle}
        </p>
        <p className="text-on-surface-variant mt-4 leading-relaxed font-body-md text-body-md">
          {description}
        </p>
      </div>
    </div>
  );
}
