"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Properties({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const { product } = data;
  const slides = product.productSlides ?? [];
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    slides.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ["All", ...Array.from(set)];
  }, [slides]);

  const filtered = useMemo(() => {
    if (active === "All") return slides;
    return slides.filter((s) => s.category === active);
  }, [slides, active]);

  const cta = product.buttons?.[0];

  return (
    <div className="bg-white">
      <section className="px-4 pt-12 md:px-8 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
            Our work
          </p>
          <h1 className="mt-3 text-[2.25rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
            {product.productSectionTitle || "Projects"}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#141414]/55 md:text-base">
            {product.productInfoDesc}
          </p>
          <span className="mx-auto mt-5 block h-[3px] w-10 bg-[#ff9a14]" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`relative pb-1 text-sm font-medium transition ${
                  active === cat
                    ? "text-[#ff9a14]"
                    : "text-[#141414]/50 hover:text-[#141414]"
                }`}
              >
                {cat}
                {active === cat && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#ff9a14]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#141414]/45">
              No projects in this category.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((slide, i) => (
                <article key={`${slide.productTitle}-${i}`} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f3f1ed]">
                    <MediaImage
                      src={slide.image}
                      alt={slide.alt || slide.productTitle}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      themeId={theme}
                      priority={i < 3}
                    />
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff9a14]">
                    {slide.category || slide.productSubtitle}
                  </p>
                  <h2 className="mt-1.5 text-lg font-bold text-[#141414]">
                    {slide.productTitle}
                  </h2>
                  {slide.productInfoDesc && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
                      {slide.productInfoDesc}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    {slide.productTotalPrice ? (
                      <p className="text-sm font-semibold text-[#141414]">
                        {slide.productTotalPrice}
                      </p>
                    ) : (
                      <span />
                    )}
                    <Link
                      href={withTheme(slide.button?.href || "/contact", theme)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff9a14] transition hover:opacity-75"
                    >
                      {slide.button?.label || "Enquire"}
                      <FaArrowRight className="text-[10px]" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href={withTheme(cta?.href || "/contact", theme)}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff9a14] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f08a00]"
            >
              {cta?.label || "View all projects"}
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
