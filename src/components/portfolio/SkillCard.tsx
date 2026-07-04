import React, { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";

interface SkillCardProps {
  name: string;
  customLogoUrl?: string;
}

// Generate correct slug for Simple Icons CDN
function getIconSlug(name: string): string {
  const norm = name.toLowerCase().trim();
  if (norm === "react") return "react";
  if (norm === "next.js" || norm === "nextjs") return "nextdotjs";
  if (norm === "node.js" || norm === "nodejs") return "nodedotjs";
  if (norm === "tailwind css" || norm === "tailwind") return "tailwindcss";
  if (norm === "aws") return "amazonwebservices";
  if (norm === "postgresql" || norm === "postgres") return "postgresql";
  if (norm === "html" || norm === "html5") return "html5";
  if (norm === "css" || norm === "css3") return "css3";
  if (norm === "javascript" || norm === "js") return "javascript";
  if (norm === "c++") return "cplusplus";
  if (norm === "c#") return "csharp";
  if (norm === "python") return "python";
  if (norm === "django") return "django";
  if (norm === "rust") return "rust";
  if (norm === "git") return "git";
  if (norm === "github") return "github";
  if (norm === "docker") return "docker";
  if (norm === "kubernetes") return "kubernetes";
  if (norm === "figma") return "figma";
  
  // Clean special characters to match typical Simple Icons slugs
  return norm
    .replace(/\./g, "dot")
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

// Tech logo dictionary using high-quality local SVGs for core stack
function TechLogoLarge({ name }: { name: string }) {
  const norm = name.toLowerCase().trim();

  if (norm.includes("react") || norm.includes("next")) {
    return (
      <svg className="w-10 h-10 text-[#61DAFB] animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (norm.includes("html") || norm.includes("css")) {
    return (
      <svg className="w-8 h-8 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.613 11.233-.002.23-2.613H5.823l.69 7.828h8.544l-.276 3.125-2.781.75-2.781-.75-.17-1.921H6.38l.327 3.735 5.293 1.44 5.293-1.44.697-7.828H8.531z"/>
      </svg>
    );
  }
  if (norm.includes("javascript") || norm.includes("js")) {
    return (
      <svg className="w-8 h-8 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm20.377 17.848c-.07-.539-.315-.99-.741-1.372-.4-.351-.89-.526-1.472-.526-.645 0-1.125.176-1.442.526-.3.351-.433.82-.395 1.396.037.585.225 1.01.562 1.282.35.281.873.42 1.572.42.664 0 1.157-.14 1.481-.42.327-.291.468-.72.435-1.306zm-7.795-3.328c-.024-.515-.174-.93-.456-1.242-.315-.352-.777-.527-1.396-.527-.61 0-1.077.164-1.407.49-.31.328-.46 0-.46.721v1.171h3.719z" fill="none"/>
        <path d="M24 0v24H0V0h24zm-11.424 14.52c0-.721-.15-1.171-.46-1.503-.33-.327-.797-.491-1.407-.491-.619 0-1.081.175-1.396.527-.282.312-.432.727-.456 1.242h-2.146c.036-1.042.417-1.84 1.143-2.396C8.016 11.233 9.07 10.97 10.428 10.97c1.326 0 2.378.27 3.125.809.734.526 1.127 1.272 1.178 2.213v5.696h-2.146V14.52v.001zm9.356 1.956c.324-.286.465-.715.432-1.306v-.078c-.033-.585-.174-1.015-.435-1.306-.324-.28-.817-.42-1.481-.42-.699 0-1.222.139-1.572.42-.337.272-.525.702-.562 1.282v.078c-.038.576.095 1.045.395 1.396.317.35.797.526 1.442.526.582 0 1.072-.175 1.472-.526z"/>
      </svg>
    );
  }
  if (norm.includes("typescript") || norm.includes("ts")) {
    return (
      <svg className="w-8 h-8 text-[#3178C6]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#3178C6"/>
        <path d="M72.3 58.7v18.2H61.1V58.7c0-2.8-.7-4.2-2.2-4.2-1.6 0-2.4 1.3-2.4 3.9v18.5H45.3V29.8h11.2v7.7c1.8-3.1 4.7-4.7 8.7-4.7 3.5 0 6.1.9 7.8 2.8s2.6 4.7 2.6 8.5v14.6z" fill="white"/>
      </svg>
    );
  }
  if (norm.includes("node") || norm.includes("go")) {
    return (
      <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-3-15h2v6H9V9zm4 0h2v6h-2V9z" fill="none"/>
        <path d="M18.896 11.233L12.55.975a.945.945 0 00-1.1 0L5.104 11.233a.965.965 0 00-.327.767v10.6c0 .828.672 1.5 1.5 1.5h11.444c.828 0 1.5-.672 1.5-1.5v-10.6a.965.965 0 00-.329-.767zM12 21.364c-3.136 0-5.672-2.536-5.672-5.672S8.864 10.02 12 10.02s5.672 2.536 5.672 5.672S15.136 21.364 12 21.364zm0-9.61c-2.176 0-3.938 1.762-3.938 3.938S9.824 19.63 12 19.63s3.938-1.762 3.938-3.938-1.762-3.938-3.938-3.938z"/>
      </svg>
    );
  }
  if (norm.includes("postgres") || norm.includes("sql") || norm.includes("db")) {
    return (
      <svg className="w-8 h-8 text-[#4169E1]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.92c-.02.03-.06.08-.09.08H11v-2h2v1.92zm2-4c0 1.1-.9 2-2 2h-2v-2h2v-2h-3v-2h3c1.1 0 2 .9 2 2v2zm-2-6h-2V6h2v1.92z"/>
      </svg>
    );
  }
  if (norm.includes("tailwind")) {
    return (
      <svg className="w-8 h-8 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.59 15.029 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.21 14.973 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.54 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.41 8.973 12 5.999 12z"/>
      </svg>
    );
  }
  if (norm.includes("aws") || norm.includes("docker")) {
    return (
      <svg className="w-8 h-8 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V9.006a.187.187 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118c.102 0 .185-.083.185-.186V3.575a.186.186 0 00-.185-.185h-2.118a.185.185 0 00-.186.185v1.887c0 .102.084.186.186.186m0 5.43h2.118c.102 0 .185-.083.185-.185V9.006a.187.187 0 00-.185-.186h-2.118a.185.185 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.955 0h2.119c.102 0 .185-.083.185-.185V9.006a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m0-2.72h2.119c.102 0 .185-.083.185-.186V5.69a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .103.083.186.185.186m-2.954 2.72h2.119c.102 0 .186-.083.186-.185V9.006a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m0-2.72h2.119c.102 0 .186-.083.186-.186V5.69a.186.186 0 00-.186-.186H5.12a.185.185 0 00-.185.186v1.887c0 .103.083.186.185.186m5.908-5.43h2.119c.102 0 .185-.083.185-.185V.859a.186.186 0 00-.185-.185h-2.119a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185M23.99 12.49c-.219-.517-.742-.79-1.107-.905a5.49 5.49 0 00-.772-.188c-.026 0-.043-.006-.047-.03-.004-.03.003-.05.021-.06.27-.18.99-.72.825-1.56-.059-.3-.217-.552-.47-.748-.024-.017-.024-.043-.005-.058.28-.215.714-.641.528-1.293-.166-.582-.693-.93-1.282-1.07-.024-.005-.034-.027-.02-.047.218-.328.466-.867.098-1.503-.388-.671-1.233-.761-1.88-.772-.03-.001-.044-.02-.038-.048.118-.519.145-1.442-.647-1.921-.497-.3-1.121-.24-1.636-.129-.022.005-.044-.01-.047-.032C17.514 1.08 16.71.218 15.632.046c-.742-.119-1.503.111-1.996.539-.02.018-.046.009-.052-.016C13.438.077 12.75-.027 12.025.002c-1.13.045-2.062.755-2.564 1.56-.017.027-.044.021-.054-.006a3.46 3.46 0 00-1.748-1.69c-.74-.29-1.504-.15-2.078.291-.02.016-.046.004-.049-.02A4.27 4.27 0 004.092.002C2.871.13 1.882.977 1.488 1.95c-.012.03-.04.03-.051.002a3.29 3.29 0 00-1.39-1.236c-.456-.205-.924-.253-1.368-.147-.024.006-.04-.012-.037-.037.162-.977-.282-1.986-1.19-2.457a4.91 4.91 0 00-2.32-.477c-.104.005-.186.088-.186.193v18.686c0 .1.077.182.176.19 1.916.14 3.839.261 5.766.36.03 0 .044-.022.039-.05a5.55 5.55 0 00-.737-1.89c-.588-.934-1.567-1.32-2.435-1.444-.03-.005-.038-.035-.015-.054 1.258-1.042 2.876-1.558 4.475-1.558 1.82 0 3.619.664 4.887 1.874.02.019.014.047-.011.056a6.83 6.83 0 00-2.316.921c-.818.514-1.396 1.29-1.623 2.11-.008.03.012.052.038.046.883-.178 1.834-.14 2.685.2 1.48.59 2.502 1.841 2.894 3.284.008.03.04.03.046 0 .428-1.579 1.545-2.91 3.093-3.488.309-.115.626-.192.951-.237.03-.004.042.02.024.041a6.45 6.45 0 00-1.135 1.96c-.42 1.133-.314 2.378.334 3.393.018.028.053.016.054-.017.027-1.109.529-2.185 1.472-2.885.66-.49 1.464-.731 2.274-.707.03 0 .041.03.02.047a5.53 5.53 0 00-1.533.1.848.848 0 00-.28 1.5c.296.223.708.318 1.077.348.026.002.036-.027.017-.042a3.42 3.42 0 00-.776-.411 1.94 1.94 0 00-.317-.091c-.027-.005-.03-.037-.005-.047 1.085-.436 2.3-.399 3.298.243.6.386 1.026.974 1.22 1.636.008.027.042.022.043-.007a4.91 4.91 0 00-.012-1.748c-.098-.716-.484-1.391-1.111-1.791a.032.032 0 00-.022-.055zm-8.815 6.376s0 .004-.002.004c-.01.006-.021.006-.03-.004l-2.073-2.128c-.01-.01-.005-.025.008-.025h4.162c.013 0 .018.015.008.025l-2.073 2.128z"/>
      </svg>
    );
  }
  if (norm.includes("graphql")) {
    return (
      <svg className="w-8 h-8 text-[#E10098]" viewBox="0 0 400 400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M57.4 300c-3.7-6.5-1.5-15 5-18.7s15-1.5 18.7 5c3.7 6.5 1.5 15-5 18.7-6.5 3.7-15 1.5-18.7-5zm285.2 0c3.7-6.5 1.5-15-5-18.7s-15-1.5-18.7 5c-3.7 6.5-1.5 15 5 18.7 6.5 3.7 15 1.5 18.7-5zm-142.6-246.6c6.5 3.7 15 1.5 18.7-5s1.5-15-5-18.7c-6.5-3.7-15-1.5-18.7 5s-1.5 15 5 18.7z" fill="#E10098"/>
        <path d="M342.6 100c3.7 6.5 1.5 15-5 18.7s-15 1.5-18.7-5c-3.7-6.5-1.5-15 5-18.7 6.5-3.7 15-1.5 18.7 5zm-285.2 0c-3.7 6.5-1.5 15 5 18.7s15 1.5 18.7-5c3.7-6.5 1.5-15-5-18.7-6.5-3.7-15-1.5-18.7 5zm142.6 246.6c-6.5-3.7-15-1.5-18.7 5s-1.5 15 5 18.7c6.5 3.7 15 1.5 18.7-5s1.5-15-5-18.7z" fill="#E10098"/>
        <path d="M200 368.7L57.4 286.3V113.7L200 31.3l142.6 82.4v172.6L200 368.7zM74.8 276.3l125.2 72.3 125.2-72.3V123.7L200 51.4 74.8 123.7v152.6z" fill="#E10098"/>
        <path d="M200 286.3L57.4 203.7V113.7L200 196.3l142.6-82.6v90L200 286.3z" fill="#E10098"/>
        <path d="M200 286.3V196.3L57.4 113.7h285.2L200 196.3z" fill="#E10098"/>
      </svg>
    );
  }
  if (norm.includes("figma")) {
    return (
      <svg className="w-8 h-8" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C25 36.1929 36.1929 25 50 25C63.8071 25 75 36.1929 75 50V75H50C36.1929 75 25 63.8071 25 50Z" fill="#F24E1E"/>
        <path d="M25 100C25 86.1929 36.1929 75 50 75H75V100C75 113.807 63.8071 125 50 125C36.1929 125 25 113.807 25 100Z" fill="#1ABCFE"/>
        <path d="M50 75C50 61.1929 61.1929 50 75 50C88.8071 50 100 61.1929 100 75C100 88.8071 88.8071 100 75 100C61.1929 100 50 88.8071 50 75Z" fill="#0ACF83"/>
        <path d="M75 0C88.8071 0 100 11.1929 100 25C100 38.8071 88.8071 50 75 50H50V25C50 11.1929 61.1929 0 75 0Z" fill="#FF7262"/>
        <path d="M0 75C0 61.1929 11.1929 50 25 50H50V100H25C11.1929 100 0 88.8071 0 75Z" fill="#A259FF"/>
      </svg>
    );
  }

  return null;
}

export function SkillCard({ name, customLogoUrl }: SkillCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // Check if custom logo URL is provided and has not failed
  if (customLogoUrl && !imgFailed) {
    return (
      <MagicCard
        className="aspect-square flex flex-col items-center justify-center p-3 border border-outline-variant/20 rounded-xl hover:border-secondary/50 transition-colors group cursor-default"
        gradientColor="rgba(42, 77, 215, 0.06)"
        gradientSize={120}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-2 select-none">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src={customLogoUrl}
              alt={`${name} logo`}
              className="w-8 h-8 object-contain"
              onError={() => setImgFailed(true)}
              loading="lazy"
            />
          </div>
          <h3 className="text-xs md:text-sm font-semibold text-primary group-hover:text-secondary transition-colors text-center mt-1">
            {name}
          </h3>
        </div>
      </MagicCard>
    );
  }

  // Check if we have a local premium styled SVG first
  const localSvg = TechLogoLarge({ name });
  if (localSvg) {
    return (
      <MagicCard
        className="aspect-square flex flex-col items-center justify-center p-3 border border-outline-variant/20 rounded-xl hover:border-secondary/50 transition-colors group cursor-default"
        gradientColor="rgba(42, 77, 215, 0.06)"
        gradientSize={120}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-2 select-none">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {localSvg}
          </div>
          <h3 className="text-xs md:text-sm font-semibold text-primary group-hover:text-secondary transition-colors text-center mt-1">
            {name}
          </h3>
        </div>
      </MagicCard>
    );
  }

  // Fallback: simple icons CDN query
  const slug = getIconSlug(name);
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <MagicCard
      className="aspect-square flex flex-col items-center justify-center p-3 border border-outline-variant/20 rounded-xl hover:border-secondary/50 transition-colors group cursor-default"
      gradientColor="rgba(42, 77, 215, 0.06)"
      gradientSize={120}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-2 select-none">
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {!imgFailed && slug ? (
            <img
              src={iconUrl}
              alt={`${name} logo`}
              className="w-8 h-8 object-contain"
              onError={() => setImgFailed(true)}
              loading="lazy"
            />
          ) : (
            // Default premium fallback developer code bracket icon
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/70 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
          )}
        </div>
        <h3 className="text-xs md:text-sm font-semibold text-primary group-hover:text-secondary transition-colors text-center mt-1">
          {name}
        </h3>
      </div>
    </MagicCard>
  );
}
