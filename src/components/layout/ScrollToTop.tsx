"use client";

import { useEffect, useState } from "react";

/**
 * Floating "return to top" button. Appears after 60% of the page is scrolled.
 * On hover, shows a small `cd ~` tooltip (Terminal Noir wink: change directory home).
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setVisible(progress > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Return to top"
      title=""
      className={`group fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-md hover:shadow-lg hover:border-accent/50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Tooltip — slides in on hover from the left */}
      <span className="hidden sm:inline-block max-w-0 overflow-hidden font-label-mono text-[11px] uppercase tracking-widest text-accent whitespace-nowrap group-hover:max-w-[6rem] group-hover:ml-1 transition-all duration-300">
        cd ~
      </span>
      <span className="font-label-mono text-sm font-bold text-primary group-hover:text-accent transition-colors duration-200 select-none">
        ↑
      </span>
    </button>
  );
}