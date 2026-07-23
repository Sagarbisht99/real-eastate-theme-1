"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { withTheme } from "@/lib/theme";
import type { LinkItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

function NavDropdown({
  item,
  isSolid,
}: {
  item: LinkItem;
  isSolid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const children = item.children ?? [];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 transition hover:opacity-65 ${
          isSolid ? "text-[#141414]" : "text-white/90"
        }`}
      >
        {item.label}
        <FaChevronDown
          className={`text-[0.55rem] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 pt-3">
          <div className="border border-[#141414]/10 bg-white py-2 shadow-[0_16px_40px_rgba(20,20,20,0.1)]">
            {children.map((child) => (
              <Link
                key={`${child.label}-${child.href}`}
                href={withTheme(child.href, THEME)}
                className="block px-4 py-2.5 text-sm text-[#141414] transition hover:bg-[#faf8f4]"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({
  data,
  variant = "solid",
}: {
  data: ResolvedSiteData;
  variant?: "overlay" | "solid";
}) {
  const { header } = data;
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
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
          className={`hidden items-center justify-center gap-6 text-[0.92rem] font-medium xl:gap-7 lg:flex ${
            isSolid ? "text-[#141414]" : "text-white/90"
          }`}
        >
          {header.menu.map((item, i) =>
            item.children && item.children.length > 0 ? (
              <NavDropdown key={`${item.label}-${i}`} item={item} isSolid={isSolid} />
            ) : (
              <Link
                key={`${item.label}-${i}`}
                href={withTheme(item.href, THEME)}
                className="transition hover:opacity-65"
              >
                {item.label}
              </Link>
            )
          )}
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
          <nav className="flex flex-col gap-1 text-sm font-medium text-[#141414]">
            {header.menu.map((item, i) => {
              const hasChildren = Boolean(item.children?.length);
              const groupKey = `${item.label}-${i}`;
              const expanded = mobileGroup === groupKey;

              if (!hasChildren) {
                return (
                  <Link
                    key={groupKey}
                    href={withTheme(item.href, THEME)}
                    className="py-2.5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={groupKey} className="border-b border-[#141414]/6 last:border-b-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2.5 text-left"
                    aria-expanded={expanded}
                    onClick={() => setMobileGroup(expanded ? null : groupKey)}
                  >
                    {item.label}
                    <FaChevronDown
                      className={`text-[0.6rem] transition ${expanded ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {expanded && (
                    <div className="flex flex-col gap-1 pb-3 pl-3">
                      {item.children!.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={withTheme(child.href, THEME)}
                          className="py-2 text-[#141414]/70"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {cta && (
              <Link
                href={withTheme(cta.href || "/contact", THEME)}
                className="mt-3 inline-flex rounded-full bg-[#141414] px-5 py-2.5 text-center text-sm font-semibold text-white"
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
