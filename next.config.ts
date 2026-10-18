import type { NextConfig } from "next";

// Security headers applied to every route.
//
// CSP is intentionally "practical" rather than "strict": it allows inline
// <script> (used for the two JSON-LD <script> blocks in src/app/(public)/)
// and inline styles (used by next/font and a handful of Tailwind utilities).
// The owner can tighten these by switching to a per-request nonce later —
// that requires plumbing through the server components, see plan.
//
// HSTS is only set in production; sending it over the local HTTP dev server
// would otherwise be a no-op but is unnecessary noise.
const isProd = process.env.NODE_ENV === "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' is required for the inline <script> JSON-LD blocks.
  // If you want to remove it, switch to a nonce strategy in the server
  // components and replace this with "'nonce-{{NONCE}}'".
  "script-src 'self' 'unsafe-inline'",
  // 'unsafe-inline' is required for next/font's emitted <style> blocks and
  // a few Tailwind v4 inline style attributes.
  "style-src 'self' 'unsafe-inline'",
  // Cloudinary (admin-uploaded project screenshots) and gstatic (fallback
  // placeholder in HeroSection). blob: is for any client-side URL.createObjectURL.
  "img-src 'self' data: blob: https://res.cloudinary.com https://www.gstatic.com https://*.supabase.co",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Supabase REST/Storage + Cloudinary for any future direct uploads.
  "connect-src 'self' https://*.supabase.co https://res.cloudinary.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
