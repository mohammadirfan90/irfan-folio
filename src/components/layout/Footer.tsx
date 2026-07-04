import React from "react";

interface SocialLink {
  label: string;
  href: string;
}

interface FooterProps {
  socials?: SocialLink[];
  copyrightText?: string;
}

export function Footer({
  socials = [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Read.cv", href: "#" },
    { label: "Email", href: "#" },
  ],
  copyrightText = `© ${new Date().getFullYear()} Engineering Portfolio. build: stable.`,
}: FooterProps) {
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
        <div className="flex flex-wrap justify-center gap-8">
          {socials.map((social) => (
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
      </div>
    </footer>
  );
}
