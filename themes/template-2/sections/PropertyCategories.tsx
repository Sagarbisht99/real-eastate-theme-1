"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ProductItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function CategoryCard({
  item,
  index,
  fallbackHref,
  duplicate,
}: {
  item: ProductItem;
  index: number;
  fallbackHref: string;
  duplicate?: boolean;
}) {
  const href = item.href || fallbackHref;

  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="w-[75vw] max-w-[280px] shrink-0 sm:w-[260px]"
    >
      <Link
        href={withTheme(href === "#" ? "/properties" : href, THEME)}
        tabIndex={duplicate ? -1 : undefined}
        className="group relative block aspect-[3/4] overflow-hidden bg-[#2a2a2a]"
      >
        <MediaImage
          themeId={THEME}
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--reroom-accent,#ff6b00)]">
            {String((index % 100) + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-xl font-bold tracking-[-0.02em]">
            {item.category || item.title}
          </h3>
          {item.desc && (
            <p className="mt-2 line-clamp-2 text-sm text-white/60">{item.desc}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            Explore
            <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Auto category slider — any item count */
export default function PropertyCategories({ data }: { data: ResolvedSiteData }) {
  const { about, product } = data;
  const intro = about.desc2;
  const cards = product.productItems;
  const fallbackHref = product.buttons[0]?.href || "/properties";
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = useMemo(() => [...cards, ...cards], [cards]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 280;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 280;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || cards.length === 0) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    if (track.scrollLeft >= half - 1) track.scrollLeft -= half;
    else if (track.scrollLeft < 1) track.scrollLeft += half;
  }

  function advance() {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const half = track.scrollWidth / 2;
    const next = track.scrollLeft + step;
    if (next >= half) track.scrollLeft = track.scrollLeft - half + step;
    else track.scrollBy({ left: step, behavior: "smooth" });
  }

  useEffect(() => {
    if (cards.length < 2 || paused) return;
    const id = window.setInterval(advance, 3400);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, paused]);

  if (!intro && cards.length === 0) return null;

  return (
    <section className="bg-[#141414] py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              Browse by intent
            </p>
            {intro && (
              <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em] md:text-xl">
                {intro}
              </p>
            )}
          </div>
          <Link
            href={withTheme("/properties", THEME)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
          >
            View all homes
            <FaArrowRight className="text-[10px]" />
          </Link>
        </RevealBlur>
      </div>

      {cards.length > 0 && (
        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#141414] to-transparent md:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#141414] to-transparent md:w-14" />
          <div
            ref={trackRef}
            onScroll={wrapIfNeeded}
            className="flex gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {loop.map((item, i) => (
              <CategoryCard
                key={`${item.title}-${i}`}
                item={item}
                index={i % cards.length}
                fallbackHref={fallbackHref}
                duplicate={i >= cards.length}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
