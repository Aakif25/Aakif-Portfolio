import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const sans = localFont({
  src: "../fonts/inter-tight.woff2",
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif.woff2", weight: "400", style: "normal" },
    {
      path: "../fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aakif-ahamed-portfolio.citrus-crumb-6132.chatgpt.site",
  ),
  title: `${PROFILE.name} · Student Developer`,
  description: PROFILE.resumeSummary,
  openGraph: {
    title: `${PROFILE.name} · Student Developer`,
    description: PROFILE.resumeSummary,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#f4f2ee" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head><link rel="preload" href="/hero/poster.webp" as="image" fetchPriority="high" /></head>
      <body>{children}<Analytics /></body>
    </html>
  );
}
