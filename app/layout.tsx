import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-bg font-sans text-frost">
        {/* 1px sentinel: scrolled state for FloatingDock / MobileMenu */}
        <div id="nav-sentinel" aria-hidden="true" className="h-px w-full" />
        <CommandPaletteProvider>
          <FloatingDock />
          <MobileMenu />
          <CommandPalette />
          {children}
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
