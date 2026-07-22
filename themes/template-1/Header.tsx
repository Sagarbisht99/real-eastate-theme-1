"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

export default function Header({
  data,
  variant = "solid",
}: {
  data: ResolvedSiteData;
  variant?: "overlay" | "solid";
}) {
  const { header } = data;
  const [open, setOpen] = useState(false);
  const cta = header.buttons[0];
  const isSolid = variant === "solid";

  return (
    <header
      className={`z-50 ${
        isSolid ? "bg-white" : "absolute inset-x-0 top-0 bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-5 md:px-6 md:py-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href={withTheme("/", THEME)}
          className={`text-base font-bold tracking-[0.14em] text-[#141414] md:text-[1.05rem] ${
            isSolid ? "" : "text-white"
          }`}
        >
          {header.logo.toUpperCase()}
        </Link>

        <nav
          className={`hidden items-center justify-center gap-7 text-[0.92rem] font-medium lg:flex ${
            isSolid ? "text-[#141414]" : "text-white/90"
          }`}
        >
          {header.menu.map((item, i) => (
            <Link
              key={`${item.label}-${i}`}
              href={withTheme(item.href, THEME)}
              className="transition hover:opacity-65"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          {cta && (
            <Link
              href={withTheme(cta.href || "/contact", THEME)}
              className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition lg:inline-flex ${
                isSolid
                  ? "bg-[#141414] text-white hover:bg-black"
                  : "bg-white text-[#141414] hover:bg-white/90"
              }`}
            >
              {cta.label}
            </Link>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            className={`rounded-md p-2 lg:hidden ${isSolid ? "text-[#141414]" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#141414]">
            {header.menu.map((item, i) => (
              <Link
                key={`${item.label}-m-${i}`}
                href={withTheme(item.href, THEME)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {cta && (
              <Link
                href={withTheme(cta.href || "/contact", THEME)}
                className="mt-2 inline-flex rounded-full bg-[#141414] px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
