"use client";

import React, { useRef, useState } from "react";
import { submitContactFormAction } from "@/actions/contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { TypedText } from "@/components/ui/typed-text";

interface SocialLink {
  label: string;
  href: string;
}

interface ContactSectionProps {
  subtitle?: string;
  title?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  socials?: SocialLink[];
}

type LogLine = { kind: "info" | "ok" | "err"; text: string };

export function ContactSection({
  subtitle = "Ready for the next challenge",
  title = "Let's build something remarkable together.",
  email = "hello@devportfolio.com",
  phone = "+1 (555) 019-2834",
  whatsapp = "+15550192834",
  socials = [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "X (Twitter)", href: "#" },
  ],
}: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const pushLog = (line: LogLine) => setLogs((prev) => [...prev, line]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLogs([]);
    pushLog({ kind: "info", text: "$ send --confirm" });
    pushLog({ kind: "info", text: "> validating payload..." });

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    try {
      const res = await submitContactFormAction(formData);
      if (res.error) {
        pushLog({ kind: "err", text: `> ✗ ${res.error}` });
        pushLog({ kind: "err", text: "> abort. nothing sent." });
      } else {
        pushLog({ kind: "ok", text: "> ✓ message sent. i'll respond within 24h." });
        pushLog({ kind: "info", text: "> session closed." });
        formElement.reset();
      }
    } catch (err: any) {
      pushLog({ kind: "err", text: `> ✗ ${err.message || "unknown error"}` });
      pushLog({ kind: "err", text: "> abort. nothing sent." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  // Field config — each renders as `> label: [input]_` in the terminal
  const fields: Array<{
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    multiline?: boolean;
    colSpan?: "half" | "full";
  }> = [
    { name: "name", label: "name", placeholder: "John Doe", colSpan: "half" },
    {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "john@example.com",
      colSpan: "half",
    },
    {
      name: "subject",
      label: "subject",
      placeholder: "Project inquiry / collaboration",
      colSpan: "full",
    },
    {
      name: "message",
      label: "message",
      placeholder: "Hi, i'd like to build...",
      multiline: true,
      colSpan: "full",
    },
  ];

  return (
    <section
      className="dark relative py-20 md:py-24 bg-black text-on-primary overflow-hidden"
      id="contact"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        color="#ffffff"
        size={0.6}
        staticity={40}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60 z-10" />

      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Compact header row — title + status + instant-tap chips */}
        <div className="mb-8 lg:mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex-1 min-w-0">
            <BlurFade delay={0.05} direction="up" inView>
              <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest font-semibold">
                <span className="text-accent mr-1.5 select-none">//</span>
                {subtitle}
              </span>
            </BlurFade>
            <BlurFade delay={0.12} direction="up" inView>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-3 leading-[1.1]">
                <TypedText text={title} speed={45} />
              </h2>
            </BlurFade>
            <BlurFade delay={0.22} direction="up" inView>
              <div className="mt-4 inline-flex items-center gap-2 font-label-mono text-label-mono text-white/55">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span className="text-white/75">inbox open</span>
                <span className="text-white/25">·</span>
                <span>avg reply ~24h</span>
              </div>
            </BlurFade>
          </div>

          {/* Right: instant-tap chips — escape hatch for non-tech visitors */}
          <BlurFade delay={0.18} direction="left" inView>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:border-accent/60 hover:bg-accent/5 font-label-mono text-label-mono text-white/70 hover:text-accent transition-colors"
              >
                <span className="text-white/40 group-hover:text-accent">↗</span>
                <span>email</span>
              </a>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:border-accent/60 hover:bg-accent/5 font-label-mono text-label-mono text-white/70 hover:text-accent transition-colors"
                >
                  <span className="text-white/40 group-hover:text-accent">↗</span>
                  <span>phone</span>
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${formattedWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:border-accent/60 hover:bg-accent/5 font-label-mono text-label-mono text-white/70 hover:text-accent transition-colors"
                >
                  <span className="text-white/40 group-hover:text-accent">↗</span>
                  <span>whatsapp</span>
                </a>
              )}
            </div>
          </BlurFade>
        </div>

        {/* Terminal form — single column, centered, max-w-3xl = centerpiece */}
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1} direction="up" inView>
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
              {/* Terminal chrome bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="flex-1 text-center font-label-mono text-[11px] uppercase tracking-widest text-white/40">
                  ~/contact/send.sh
                </span>
                <span className="font-label-mono text-[11px] uppercase tracking-widest text-accent select-none" aria-hidden="true">
                  ●
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 md:p-6 font-label-mono text-sm">
                {/* Opening transcript lines */}
                <div className="space-y-1 text-white/50 mb-5 select-none">
                  <p>
                    <span className="text-accent">$</span> contact --init
                  </p>
                  <p>
                    <span className="text-accent">&gt;</span> awaiting input. fill the lines below:
                  </p>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-3 text-left"
                >
                  {/* Field rows — terminal-style `> label: [input]_` */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fields
                      .filter((f) => f.colSpan === "half")
                      .map((field) => (
                        <TerminalField
                          key={field.name}
                          field={field}
                          focused={focusedField === field.name}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                        />
                      ))}
                  </div>

                  {fields
                    .filter((f) => f.colSpan === "full")
                    .map((field) => (
                      <TerminalField
                        key={field.name}
                        field={field}
                        focused={focusedField === field.name}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                      />
                    ))}

                  {/* Submit command */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground font-label-mono text-sm font-bold uppercase tracking-widest hover:bg-accent/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span aria-hidden="true">$</span>
                      <span>{isSubmitting ? "sending..." : "send --confirm"}</span>
                    </button>
                    <span className="font-label-mono text-[11px] uppercase tracking-widest text-white/35 select-none">
                      // tab to next · ⏎ to send
                    </span>
                  </div>

                  {/* Live transcript log — appears after submit */}
                  {logs.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/10 space-y-1">
                      {logs.map((line, i) => (
                        <p
                          key={i}
                          className={`leading-relaxed ${
                            line.kind === "ok"
                              ? "text-accent"
                              : line.kind === "err"
                                ? "text-red-400"
                                : "text-white/50"
                          }`}
                        >
                          {line.text}
                        </p>
                      ))}
                      {!isSubmitting && (
                        <p className="text-white/40 flex items-center gap-1 mt-1">
                          <span className="text-accent">$</span>
                          <span className="caret-blink text-accent select-none">_</span>
                        </p>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </BlurFade>

          {/* Footer strip — channels + socials + sign-off */}
          <BlurFade delay={0.2} direction="up" inView>
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 font-label-mono text-label-mono text-white/50">
              <span className="text-accent select-none">//</span>
              <span className="text-white/40 uppercase tracking-widest mr-2">else</span>
              <a
                href={`mailto:${email}`}
                className="hover:text-accent transition-colors"
              >
                ↗ email
              </a>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-accent transition-colors"
                >
                  ↗ phone
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${formattedWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  ↗ whatsapp
                </a>
              )}
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  ↗ {s.label.toLowerCase()}
                </a>
              ))}
              <span className="ml-auto text-white/30 select-none">
                cd ~/portfolio · exit 0
              </span>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

/**
 * Single terminal-styled form field. Renders as:
 *   > label: [ value _caret ]
 */
function TerminalField({
  field,
  focused,
  onFocus,
  onBlur,
}: {
  field: {
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    multiline?: boolean;
  };
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const InputTag = field.multiline ? "textarea" : "input";
  const inputProps = field.multiline
    ? { rows: 4 }
    : { type: field.type || "text" };

  return (
    <label
      htmlFor={field.name}
      className={`group flex items-start gap-2 px-3 py-2 rounded-md border bg-black/40 transition-colors ${
        focused
          ? "border-accent/60"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <span
        className={`shrink-0 font-label-mono select-none transition-colors ${
          focused ? "text-accent" : "text-white/40"
        }`}
        aria-hidden="true"
      >
        &gt;
      </span>
      <span className="font-label-mono text-white/60 shrink-0 select-none">
        {field.label}:
      </span>
      <div className="relative flex-1 min-w-0">
        <InputTag
          {...inputProps}
          id={field.name}
          name={field.name}
          required
          placeholder={field.placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full bg-transparent border-0 outline-none font-label-mono text-sm text-white placeholder:text-white/25 focus:ring-0 focus:outline-none p-0 resize-none caret-accent"
        />
      </div>
      <span
        className={`font-label-mono select-none transition-opacity duration-150 ${
          focused ? "text-accent opacity-100 caret-blink" : "text-accent opacity-0"
        }`}
        aria-hidden="true"
      >
        _
      </span>
    </label>
  );
}
