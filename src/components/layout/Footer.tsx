import React from "react";

export interface FooterSocial {
  label: string;
  href: string;
}

interface FooterProps {
  socials?: FooterSocial[];
  copyrightText?: string;
}

// The owner can default the GitHub link to this when no DB value exists.
const DEFAULT_GITHUB_URL = "https://github.com/mohammadirfan90";

export function Footer({
  socials,
  copyrightText = `© ${new Date().getFullYear()} Engineering Portfolio. build: stable.`,
}: FooterProps) {
  // Build the list we actually render: every link must be a real, non-empty
  // URL. We add a GitHub default if the DB has no GitHub row at all so the
  // site is never missing a way to reach the owner on the most common
  // platform.
  const hasGithub = (socials ?? []).some(
    (s) => s.label?.toLowerCase() === "github" && s.href && s.href !== "#"
  );
  const rendered: FooterSocial[] = (socials ?? [])
    .filter((s) => s.label && s.href && s.href !== "#")
    .map((s) => ({ label: s.label, href: s.href }));

  if (!hasGithub) {
    rendered.push({ label: "GitHub", href: DEFAULT_GITHUB_URL });
  }

  return (
    <footer className="w-full py-section-gap-mobile md:py-16 bg-surface border-t border-outline-variant/30">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-gutter gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline-md font-bold text-on-surface tracking-tight flex items-center gap-1.5">
            <span className="text-base md:text-lg">Mohammad Irfan</span>
            <span className="hidden sm:inline text-xs md:text-sm text-on-surface-variant/60 font-medium font-label-mono select-none">
              | Full Stack Developer
            </span>
          </span>
          <p className="font-label-mono text-label-mono text-on-surface-variant text-center md:text-left flex items-center gap-1.5">
            {copyrightText}
            <span className="text-accent caret-blink select-none" aria-hidden="true">
              ▌
            </span>
          </p>
        </div>
        {rendered.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {rendered.map((social) => (
              <a
                key={social.label}
                className="font-label-mono text-label-mono text-on-surface-variant hover:text-secondary transition-colors focus:ring-1 focus:ring-secondary ring-offset-2"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
