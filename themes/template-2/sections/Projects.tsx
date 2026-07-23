"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

export default function Projects({ data }: { data: ResolvedSiteData }) {
  const slides = data.product.productSlides ?? [];
  const categories = useMemo(() => {
    const set = new Set<string>();
    slides.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    data.product.productItems?.forEach((p) => {
      if (p.category) set.add(p.category);
      if (p.title) set.add(p.title);
    });
    const list = Array.from(set);
    return list.length > 0 ? list : ["All"];
  }, [slides, data.product.productItems]);

  const [active, setActive] = useState(categories[0] || "All");
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    if (active === "All") return slides;
    const byCategory = slides.filter((s) => s.category === active);
    if (byCategory.length) return byCategory;
    // If tab is a productItem title, show all slides (visual filter only)
    return slides;
  }, [slides, active]);

  const visible = filtered.slice(index, index + 4);
  const canPrev = index > 0;
  const canNext = index + 4 < filtered.length;
  const cta = data.product.buttons?.[0];

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            {data.product.productSectionTitle || "Our latest projects"}
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 bg-[#ff9a14]" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActive(cat);
                setIndex(0);
              }}
              className={`relative pb-1 text-sm font-medium transition ${
                active === cat
                  ? "text-[#ff9a14]"
                  : "text-[#141414] hover:text-[#ff9a14]"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-[2px] w-full bg-[#ff9a14]" />
              )}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Previous projects"
            disabled={!canPrev}
            onClick={() => setIndex((v) => Math.max(0, v - 1))}
            className="absolute -left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141414]/15 bg-white text-[#141414] transition hover:border-[#ff9a14] hover:text-[#ff9a14] disabled:opacity-30 md:-left-3 lg:-left-5"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            disabled={!canNext}
            onClick={() =>
              setIndex((v) => Math.min(Math.max(0, filtered.length - 4), v + 1))
            }
            className="absolute -right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#141414]/15 bg-white text-[#141414] transition hover:border-[#ff9a14] hover:text-[#ff9a14] disabled:opacity-30 md:-right-3 lg:-right-5"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {(visible.length ? visible : filtered.slice(0, 4)).map((slide, i) => (
              <article key={`${slide.productTitle}-${i}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f3f1ed]">
                  <MediaImage
                    src={slide.image}
                    alt={slide.alt || slide.productTitle}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    themeId={THEME}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {cta && (
          <div className="mt-12 flex justify-center">
            <Link
              href={withTheme(cta.href || "/properties", THEME)}
              className="inline-flex items-center gap-3 rounded-full bg-[#ff9a14] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f08a00]"
            >
              {cta.label}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#ff9a14]">
                <FaArrowRight className="text-[10px]" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
