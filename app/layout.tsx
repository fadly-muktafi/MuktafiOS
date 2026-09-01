import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
      <body className="bg-bg font-sans text-frost">{children}</body>
    </html>
  );
}
