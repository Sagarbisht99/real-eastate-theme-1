import type { Metadata } from "next";
import { Poppins, Syne } from "next/font/google";
import { siteData } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import { Suspense } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";

/** template-1 — Syne */
const fontT1 = Syne({
  variable: "--font-t1",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** template-2 — Poppins */
const fontT2 = Poppins({
  variable: "--font-t2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${siteData.templates[0].title} | Real Estate Themes`,
  description: siteData.common.Footer.desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontT1.variable} ${fontT2.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans" suppressHydrationWarning>
        <Suspense fallback={null}>
          <SmoothScroll>{children}</SmoothScroll>
        </Suspense>
      </body>
    </html>
  );
}
