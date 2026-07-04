---
name: Obsidian & Ether
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#2a4dd7'
  on-secondary: '#ffffff'
  secondary-container: '#4868f1'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#001257'
  on-secondary-fixed-variant: '#0034c0'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  display:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap-desktop: 160px
  section-gap-mobile: 80px
---

## Brand & Style

This design system embodies the "Quiet Confidence" of high-end software engineering. It draws heavy inspiration from the precision of Linear and the editorial elegance of Apple’s marketing materials. The aesthetic is a fusion of **Premium Minimalism** and **Technical Sophistication**, prioritizing clarity and intent over decorative excess.

The target audience consists of design-forward founders, high-growth engineering teams, and luxury technical brands. The UI must evoke a sense of absolute reliability, precision, and architectural balance. Visual interest is generated not through color, but through the masterful use of whitespace, micro-interactions, and the tension between razor-sharp typography and soft, organic UI shapes.

## Colors

The palette is strictly governed by a 90/10 rule: 90% monochrome for structure and content, 10% Deep Blue for focus and interaction.

- **Primary Black (#000000):** Used for primary headings, iconography, and high-emphasis components.
- **Pure White (#FFFFFF):** The canvas. Use ample whitespace to allow components to "breathe."
- **Grays:** 
    - `#F5F5F7` (Off-white/Surface) for subtle container backgrounds.
    - `#E5E5E7` (Silver/Border) for thin, 1px strokes that define structure without adding weight.
    - `#8E8E93` (Zinc/Muted) for secondary text and disabled states.
- **Deep Blue (#4F6EF7):** Reserved for primary actions, success states, and tiny status indicators. Use as a "laser pointer" to guide the eye.

## Typography

The typography system relies on **Inter** for its systematic neutrality and exceptional legibility. To achieve the "premium" feel, tracking (letter-spacing) is tightened on larger headings to create a dense, editorial impact.

For technical metadata, status badges, and code snippets, use **JetBrains Mono**. This provides a subtle "engineer’s touch" that signals the product’s technical core without breaking the minimalist aesthetic. 

Always maintain a high contrast ratio. Headlines should be pure black (#000000) while long-form body text can sit at a slightly softer charcoal to improve reading stamina. Use "Display" sizes sparingly for hero sections only.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop, centered within the viewport. The layout philosophy is "Extravagant Whitespace"—components should never feel crowded. 

- **Grid:** 12 columns with 24px gutters. Use large margins (up to 160px) between major vertical sections to create a sense of pacing and importance.
- **Padding:** Use a strict 8px base unit. Internal component padding should be generous (e.g., buttons with 12px vertical and 24px horizontal padding).
- **Responsive:** On mobile, collapse the grid to 4 columns with 20px side margins. Typography scales down slightly, but the generous vertical spacing remains to preserve the luxury feel.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Shadows** rather than heavy gradients.

1.  **Level 0 (Base):** Pure White (#FFFFFF).
2.  **Level 1 (Subtle Inset):** Surface Gray (#F5F5F7) for section backgrounds or card containers.
3.  **Level 2 (Floating):** White cards with an extremely soft, diffused shadow: `0 8px 32px rgba(0,0,0,0.04)`.
4.  **Level 3 (Interactive):** Elements that lift on hover should use a 1px border (#E5E5E7) combined with a more pronounced but still light shadow: `0 12px 48px rgba(0,0,0,0.08)`.

Use **Backdrop Blurs** (20px blur) for navigation bars and floating modals to maintain a sense of context and "glass-like" transparency.

## Shapes

The shape language is defined by **Large, Soft Radii**. This balances the high-contrast monochrome color palette, making the technical content feel approachable.

- **Standard Elements:** 8px (0.5rem) for small buttons and input fields.
- **Cards & Containers:** 16px (1rem) for most content blocks.
- **Feature Blocks:** 24px (1.5rem) for large image containers or hero callouts.
- **Pills:** Fully rounded (999px) for status badges and tags only.

## Components

- **Buttons:**
    - *Primary:* Solid Black background, White text, 8px radius. Subtle scale-down effect on click.
    - *Secondary:* White background, 1px border (#E5E5E7), Black text. Hover state shifts background to #F5F5F7.
- **Input Fields:** Minimalist design with 1px borders. Focus state uses a 1px Primary Black border with no glow, or a very faint Blue glow (#4F6EF7 at 10% opacity).
- **Status Badges:** Use the "Small Colored Dot" pattern. A 6px circle of Deep Blue (#4F6EF7) next to a label in JetBrains Mono.
- **Cards:** White backgrounds with 16px radius. Use thin #E5E5E7 borders for structure. Images inside cards should always have a subtle 1px inner stroke to ensure they don't bleed into the background.
- **Floating Badges:** Small, high-z-index pills for "Available for Work" or "Version 2.0" indicators, using a glassmorphic background blur and 1px white border.
- **Micro-Gradients:** Use rare, 1px tall gradient lines (Blue to Transparent) at the very top of high-priority cards to add a "technical shimmer."