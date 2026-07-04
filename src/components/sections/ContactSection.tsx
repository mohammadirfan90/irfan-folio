"use client";

import React, { useState } from "react";
import { submitContactFormAction } from "@/actions/contact";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

export function ContactSection({
  subtitle = "Ready for the next challenge",
  title = "Let’s build something remarkable together.",
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
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg("");
    setStatusType("");

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    try {
      const res = await submitContactFormAction(formData);
      if (res.error) {
        setStatusMsg(res.error);
        setStatusType("error");
      } else {
        setStatusMsg("Thank you! Your message has been sent successfully.");
        setStatusType("success");
        formElement.reset();
      }
    } catch (err: any) {
      setStatusMsg(err.message || "Something went wrong.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <section
      className="dark relative py-section-gap-mobile md:py-section-gap-desktop bg-black text-on-primary overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Info & Channels */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <BlurFade delay={0.1} direction="up" inView>
              <div>
                <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block font-semibold">
                  {subtitle}
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                  {title}
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} direction="up" inView>
              <div className="space-y-6 pt-6 border-t border-white/10">
                {/* Email Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>mail</span>
                  </div>
                  <div>
                    <h4 className="font-label-mono text-label-mono text-white/40 uppercase mb-1">Email Address</h4>
                    <a href={`mailto:${email}`} className="text-white hover:text-secondary transition-colors font-body-md">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Phone Channel */}
                {phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>call</span>
                    </div>
                    <div>
                      <h4 className="font-label-mono text-label-mono text-white/40 uppercase mb-1">Phone Number</h4>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-white hover:text-secondary transition-colors font-body-md">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {whatsapp && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>chat</span>
                    </div>
                    <div>
                      <h4 className="font-label-mono text-label-mono text-white/40 uppercase mb-1">WhatsApp Chat</h4>
                      <a
                        href={`https://wa.me/${formattedWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-secondary transition-colors font-body-md"
                      >
                        Chat Directly
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </BlurFade>

            {/* Social Links */}
            <BlurFade delay={0.3} direction="up" inView>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-white/10 w-full max-w-sm">
                {socials.map((link) => (
                  <a
                    key={link.label}
                    className="font-label-mono text-label-mono text-white/50 hover:text-white transition-colors"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.2} direction="up" inView>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
                <h3 className="font-headline-md text-headline-md text-white font-semibold">
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/60 text-xs font-label-mono uppercase tracking-wider">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus-visible:border-secondary focus-visible:ring-secondary/20 h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/60 text-xs font-label-mono uppercase tracking-wider">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus-visible:border-secondary focus-visible:ring-secondary/20 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white/60 text-xs font-label-mono uppercase tracking-wider">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Project Inquiries / Collaboration"
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus-visible:border-secondary focus-visible:ring-secondary/20 h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/60 text-xs font-label-mono uppercase tracking-wider">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Hi, I would like to build..."
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/20 focus-visible:border-secondary focus-visible:ring-secondary/20 min-h-28"
                    />
                  </div>

                  {statusMsg && (
                    <p className={`font-body-md text-sm p-3 rounded-lg ${
                      statusType === "success" 
                        ? "bg-secondary/10 border border-secondary/25 text-secondary" 
                        : "bg-destructive/10 border border-destructive/25 text-destructive"
                    }`}>
                      {statusMsg}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 bg-white text-black hover:bg-white/90 border-transparent font-semibold cursor-pointer active:scale-95 duration-150 transition-all font-label-mono text-label-mono dark:bg-white dark:text-black"
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                </form>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
