"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import {
  FaBath,
  FaBuilding,
  FaHouse,
  FaKitchenSet,
  FaTreeCity,
} from "react-icons/fa6";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const categoryIcons = [FaKitchenSet, FaBath, FaTreeCity, FaBuilding, FaHouse];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header({
  data,
}: {
  data: ResolvedSiteData;
  variant?: "overlay" | "solid";
}) {
  const { header, topbar, product } = data;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const phone = topbar.phone || data.footer.footerContact.phone;
  const logoText = (header.logo || "re/room").toLowerCase();

  /** Bottom bar — from Product JSON (productSlides / productItems) */
  const categories = useMemo(() => {
    const slides = product.productSlides ?? [];
    if (slides.length > 0) {
      return slides.slice(0, 5).map((slide, i) => ({
        label: slide.productTitle,
        href: "/properties",
        Icon: categoryIcons[i % categoryIcons.length],
      }));
    }
    const items = product.productItems ?? [];
    return items.slice(0, 5).map((item, i) => ({
      label: item.title,
      href: "/properties",
      Icon: categoryIcons[i % categoryIcons.length],
    }));
  }, [product.productSlides, product.productItems]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top tier — logo / nav / phone */}
      <div className="border-b border-[#141414]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-5 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-6">
          <Link
            href={withTheme("/", THEME)}
            className="inline-flex w-fit items-center border-[1.5px] border-[#141414] px-3 py-1.5 text-[0.95rem] font-semibold lowercase leading-none tracking-tight text-[#141414] md:text-[1.05rem]"
          >
            {logoText}
            <span>.</span>
          </Link>

          <nav className="hidden items-center justify-center gap-9 text-[0.95rem] font-medium text-[#141414] lg:flex">
            {header.menu.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={`${item.label}-${i}`}
                  href={withTheme(item.href, THEME)}
                  className={`transition ${
                    active ? "text-[#ff9a14]" : "hover:text-[#ff9a14]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2.5 text-[0.95rem] font-medium text-[#ff9a14] transition hover:opacity-80 md:inline-flex"
            >
              <FaPhoneAlt className="text-sm" />
              <span>{phone}</span>
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              className="rounded-md p-2 text-[#141414] lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom tier — from productSlides in JSON */}
      {categories.length > 0 && (
        <div className="hidden bg-[#141414] lg:block">
          <nav className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 py-3.5 md:gap-8 md:px-8 lg:gap-10 lg:px-10">
            {categories.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={withTheme(href, THEME)}
                className="inline-flex shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition hover:text-[#ff9a14] md:text-[11px]"
                title={label}
              >
                <Icon className="text-[14px] text-white" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {open && (
        <div className="border-b border-[#141414]/10 bg-white px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-3.5">
            {header.menu.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={`m-${item.label}-${i}`}
                  href={withTheme(item.href, THEME)}
                  className={`text-[0.95rem] font-medium ${
                    active ? "text-[#ff9a14]" : "text-[#141414]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center gap-2 text-[0.95rem] font-medium text-[#ff9a14]"
            >
              <FaPhoneAlt className="text-sm" />
              {phone}
            </a>
          </nav>
          {categories.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#141414]/10 pt-4">
              {categories.map(({ label, href, Icon }) => (
                <Link
                  key={`c-${label}`}
                  href={withTheme(href, THEME)}
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#141414]"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="text-sm text-[#ff9a14]" aria-hidden />
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
