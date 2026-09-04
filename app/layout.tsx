import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { BootOverlay } from "@/components/boot-overlay";
import { CommandPalette } from "@/components/command-palette";
import { CommandPaletteProvider } from "@/lib/command-palette-context";
import { FloatingDock } from "@/components/floating-dock";
import { MobileMenu } from "@/components/mobile-menu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Fadly Muktafi - Fullstack Developer",
  description:
    "Portfolio of Ahmad Fadly Muktafi, a fullstack developer building practical digital systems across interface, backend, data, and team workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg font-sans text-frost">
        {/* JS-enabled flag for motion gating (Phase 2K) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-js','');",
          }}
        />
        {/* No-JS: boot overlay is decorative; never block content */}
        <noscript>
          <style>{`#boot-overlay{display:none}`}</style>
        </noscript>
        {/* 1px sentinel: scrolled state for FloatingDock / MobileMenu */}
        <div id="nav-sentinel" aria-hidden="true" className="h-px w-full" />
        <CommandPaletteProvider>
          <BootOverlay />
          <FloatingDock />
          <MobileMenu />
          <CommandPalette />
          {children}
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
