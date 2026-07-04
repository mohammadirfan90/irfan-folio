import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Agentation } from "agentation";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  title: {
    default: "Mohammad Irfan | Full Stack Developer",
    template: "%s | Mohammad Irfan",
  },
  description: "Building software people actually use. Junior full-stack developer working with React, Next.js, TypeScript, Node.js, and Postgres.",
  openGraph: {
    title: "Mohammad Irfan | Full Stack Developer",
    description: "Building software people actually use. Junior full-stack developer working with React, Next.js, TypeScript, Node.js, and Postgres.",
    url: "/",
    siteName: "Mohammad Irfan | Full Stack Developer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mohammad Irfan — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Irfan | Full Stack Developer",
    description: "Building software people actually use. Junior full-stack developer working with React, Next.js, TypeScript, Node.js, and Postgres.",
    images: ["/opengraph-image"],
    creator: "@mohammadirfan90",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("scroll-smooth", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            -moz-osx-font-smoothing: grayscale;
            font-feature-settings: 'liga';
            vertical-align: middle;
          }
        `}</style>
      </head>
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-secondary/20 min-h-screen flex flex-col">
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
