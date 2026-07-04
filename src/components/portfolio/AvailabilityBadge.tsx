import React from "react";

interface AvailabilityBadgeProps {
  isAvailable?: boolean;
  message?: string;
}

export function AvailabilityBadge({
  isAvailable = true,
  message = "Available for new opportunities",
}: AvailabilityBadgeProps) {
  if (!isAvailable) return null;

  return (
    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span className="font-label-mono text-label-mono text-on-surface-variant">
        {message}
      </span>
    </div>
  );
}
