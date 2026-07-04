"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to highlight active section, track progress, and toggle scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
      setScrolled(scrollY > 80);

      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll(); // initialize on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 glass-nav border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/90 border-outline-variant/30 shadow-md"
          : "bg-background/60 border-outline-variant/10 shadow-none"
      }`}
    >
      {/* Scroll progress bar (lime) */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-opacity duration-300"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrolled ? 1 : 0,
          boxShadow: "0 0 8px rgba(163, 230, 53, 0.6)",
        }}
        aria-hidden="true"
      />

      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-gutter h-16">
        <Link
          href="/"
          className="font-headline-md font-bold text-primary tracking-tight flex items-center gap-1.5"
        >
          <span className="text-base md:text-lg">Mohammad Irfan</span>
          <span className="hidden sm:inline text-xs md:text-sm text-on-surface-variant/60 font-medium font-label-mono select-none">
            | Full Stack Developer
          </span>
        </Link>

        {/* Right Nav Container */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`font-label-mono text-label-mono transition-colors pb-1 flex items-center gap-1.5 ${
                    isActive
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <span
                      className="text-accent caret-blink select-none"
                      aria-hidden="true"
                    >
                      ▌
                    </span>
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/20 px-margin-mobile py-4 flex flex-col gap-4 shadow-md animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors py-2 border-b border-outline-variant/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}