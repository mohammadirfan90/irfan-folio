# Design Extraction

This document outlines the extracted design system tokens, layout rules, reusable components, and motion behaviors from `DESIGN.md` and `index.html`. This serves as the visual specification for porting the static website into a production-grade React/Next.js application.

---

## Typography

The typography system relies on **Inter** for editorial readability and neutrality, and **JetBrains Mono** for technical metadata and code elements.

### Fonts
- **Primary Body & Headlines:** `Inter` (with custom sizing and weights).
- **Secondary Technical/Labels:** `JetBrains Mono` (for status badges, dates, tech badges, and metadata).

### Type Scale (Tailwind Configuration)
| Category | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing | Custom CSS Variable |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **display** | `72px` (`4.5rem`) | `32px` (`2rem`) | `600` (SemiBold) | `1.1` | `-0.04em` | `--font-display` |
| **headline-lg** | `40px` (`2.5rem`) | `32px` (`2rem`) | `600` (SemiBold) | `1.2` | `-0.03em` | `--font-headline-lg` |
| **headline-md** | `24px` (`1.5rem`) | `24px` (`1.5rem`) | `500` (Medium) | `1.4` | `-0.02em` | `--font-headline-md` |
| **body-lg** | `18px` (`1.125rem`) | `18px` (`1.125rem`) | `400` (Regular) | `1.6` | `-0.01em` | `--font-body-lg` |
| **body-md** | `15px` (`0.9375rem`)| `15px` (`0.9375rem`)| `400` (Regular) | `1.6` | `0em` | `--font-body-md` |
| **label-mono** | `12px` (`0.75rem`) | `12px` (`0.75rem`) | `500` (Medium) | `1.0` | `0.05em` | `--font-label-mono` |

---

## Colors

The project follows a **90/10 monochrome-to-accent ratio**: 90% structured monochrome, 10% deep blue.

### Palette Tokens
- **Backgrounds:**
  - Base canvas: `bg-surface` -> `#faf9fe`
  - Inset sections: `bg-surface-container-low` -> `#f4f3f8`
  - Floating element base: `#ffffff` (White)
  - Navigation base: `bg-surface/80` (`#faf9fe` with 80% opacity)
- **Text:**
  - High emphasis headings: `text-primary` or `text-on-surface` -> `#000000` / `#1a1b1f`
  - Medium emphasis text: `text-on-surface-variant` -> `#4c4546`
  - Accent / secondary focus: `text-secondary` -> `#2a4dd7` (Deep Blue)
  - Inverted elements (Primary button text, Contact section text): `text-on-primary` -> `#ffffff`
- **Borders & Dividers:**
  - Structural strokes: `border-outline-variant/20` or `/30` -> `#cfc4c5` (with 20% or 30% opacity)
- **Accent Glows:**
  - Glow background: `bg-secondary-container/5` -> `#4868f1` (with 5% opacity)

---

## Reusable Components

We identify the following distinct reusable components to extract from the HTML structure:

### 1. Navigation (`Navbar`)
- **Structure:**
  - Fixed, full-width glass wrapper (`fixed top-0 w-full z-50 bg-surface/80 glass-nav border-b border-outline-variant/20 shadow-sm`).
  - Container (`max-w-[1200px] px-5 md:px-6 h-16 flex justify-between items-center`).
  - Brand logo on left: `font-headline-md text-headline-md font-bold text-primary`.
  - Links in center (hidden on mobile, visible on `md`): `Projects`, `Experience`, `About`, `Contact` utilizing `font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors`. Active/highlighted link has border bottom `border-b-2 border-secondary pb-1`.
  - Right button CTA: "Resume" button with scale animation on click.

### 2. Button (`Button`)
- **Primary:** `px-8 py-4 bg-primary text-on-primary rounded-lg font-semibold hover:bg-on-surface-variant transition-all`
- **Secondary / Small Action:** `px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-mono text-label-mono transition-transform duration-200 ease-out active:scale-95`
- **Large Inverted CTA:** `group flex items-center gap-4 px-10 py-6 bg-white text-primary rounded-xl font-headline-md text-headline-md hover:bg-secondary-container transition-all`

### 3. Status Badge (`AvailabilityBadge`)
- **Structure:**
  - Capsule wrapper (`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30`).
  - Pulsing indicator dot (`w-1.5 h-1.5 rounded-full bg-secondary`).
  - Text label (`font-label-mono text-label-mono text-on-surface-variant`).

### 4. Section Header (`SectionHeader`)
- **Left-Aligned (e.g. About, Experience):**
  - Section overline badge (`font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4 block`).
  - Title (`font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface`).
- **Centered (e.g. Technical Stack):**
  - Title (`font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface`).
  - Subtitle (`font-body-md text-on-surface-variant mt-4`).
- **Split Case Studies Header:**
  - Left column: Case study label + Featured Work title.
  - Right column: "View All Archives" link with directional arrow.

### 5. Technical Skill Card (`SkillCard`)
- **Structure:**
  - Box container (`p-6 bg-white border border-outline-variant/20 rounded-xl hover:border-secondary/50 transition-colors group`).
  - Header row: dot indicator + proficiency metric (`font-label-mono text-[10px] text-on-surface-variant/50`).
  - Title: `font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors`.

### 6. Project Card (`ProjectCard`)
- **Structure:**
  - Wrapper: `group cursor-pointer`.
  - Image Container: Aspect square `aspect-square`, rounded corners `rounded-2xl`, overflow hidden, border stroke `border-outline-variant/10 shadow-sm`, and hover translation helper `hover-lift`.
  - Image Overlay Category Tag: Positioned top-left (`absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 glass-nav rounded-full font-label-mono text-[10px] text-primary border border-white/20`).
  - Card Text: Title (`font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors`) and description (`font-body-md text-on-surface-variant mt-2`).

### 7. Chronological Timeline Item (`TimelineItem`)
- **Structure:**
  - Flex layout (`flex flex-col md:flex-row gap-4 md:gap-12 pb-12 border-b border-outline-variant/20`).
  - Date side column (`md:w-32 flex-shrink-0 font-label-mono text-label-mono text-on-surface-variant`).
  - Details block: Role Title (`font-headline-md text-headline-md text-primary`), Company/Entity (`font-label-mono text-label-mono text-secondary mt-1`), and Description paragraphs (`text-on-surface-variant mt-4 leading-relaxed`).

---

## Layout & Grid Parameters

- **Base Spacing Unit:** `8px`
- **Margins & Container:**
  - Desktop Max Width: `1200px` (`max-w-container-max`).
  - Horizontal Padding (Desktop): `24px` (`px-gutter`).
  - Horizontal Padding (Mobile): `20px` (`px-margin-mobile`).
- **Section Gaps:**
  - Desktop Gap: `160px` (`py-section-gap-desktop`).
  - Mobile Gap: `80px` (`py-section-gap-mobile`).
- **Responsive Layout:**
  - Multi-column elements reflow to 1-column on `< 768px` (`md` breakpoint).
  - Main hero uses a 12-column grid (`grid grid-cols-1 md:grid-cols-12 gap-12`), where content spans 7 columns (`md:col-span-7`) and the image spans 5 columns (`md:col-span-5`).

---

## Motion & Interactive Effects

All transitions should remain subtle, fast, and feel highly premium (avoiding long sluggish ease-ins or heavy spring physics).

### Micro-Animations
- **Hover Lift Effect (`hover-lift`):**
  - Transition duration: `0.3s`.
  - Timing function: `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like bounce).
  - Properties: `transform: translateY(-8px)` and `box-shadow: 0 12px 48px rgba(0,0,0,0.08)`.
- **Project Image Hover Zoom:**
  - Scaling factor: `1.05` to `1.10`.
  - Properties: `transition-transform duration-700`.
- **Active Button Compression:**
  - Scale transformation: `active:scale-95`.
  - Properties: `transition-transform duration-200 ease-out`.
- **Glass Blur Layering (`glass-nav`):**
  - Backdrop filter: `blur(20px)`.
- **Fade / Stagger Reveals:**
  - Framer Motion variants will stagger section headers, skills, and projects with dynamic but understated entry animations.
