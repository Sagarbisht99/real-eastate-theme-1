"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaCar,
  FaExpand,
  FaRulerCombined,
} from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ProductSlide, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function featureIcon(label: string) {
  const key = label.toLowerCase();
  if (key.includes("bed")) return FaBed;
  if (key.includes("bath")) return FaBath;
  if (key.includes("park")) return FaCar;
  if (key.includes("area") || key.includes("sq")) return FaRulerCombined;
  return FaExpand;
}

function PropertyCard({
  item,
  duplicate,
}: {
  item: ProductSlide;
  duplicate?: boolean;
}) {
  const href =
    item.button?.href === "#"
      ? "/properties"
      : item.button?.href || "/properties";
  const features = item.productFeatures?.slice(0, 3) ?? [];

  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="group w-[78vw] max-w-[300px] shrink-0 sm:w-[280px]"
    >
      <Link
        href={withTheme(href, THEME)}
        tabIndex={duplicate ? -1 : undefined}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ed]">
          <MediaImage
            themeId={THEME}
            src={item.image}
            alt={item.alt || item.productTitle}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="300px"
          />
          <div className="absolute left-0 top-0 flex">
            {item.category && (
              <span className="bg-[var(--reroom-accent,#ff6b00)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {item.category}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
            {item.productSubtitle}
          </p>
          <h3 className="mt-1.5 text-lg font-bold leading-snug">
            {item.productTitle}
          </h3>
          {features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {features.map((f) => {
                const Icon = featureIcon(f.label);
                return (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-1.5 text-xs text-[#141414]/55"
                  >
                    <Icon className="text-[var(--reroom-accent,#ff6b00)]" />
                    {f.price}
                  </span>
                );
              })}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-base font-bold">{item.productTotalPrice}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]">
              {item.button?.label || "View"}
              <FaArrowRight className="text-[10px]" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Auto card slider — works for any listing count */
export default function FeaturedProperties({ data }: { data: ResolvedSiteData }) {
  const listings = data.product.productSlides ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = useMemo(() => [...listings, ...listings], [listings]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 300;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 300;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || listings.length === 0) return;
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
    if (listings.length < 2 || paused) return;
    const id = window.setInterval(advance, 3200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings.length, paused]);

  if (listings.length === 0) return null;

  return (
    <section className="bg-white py-12 text-[#141414] md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {data.product.productSubtitle || "Featured"}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {data.product.productSectionTitle || "Featured Properties"}
            </h2>
          </div>
          <Link
            href={withTheme("/properties", THEME)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
          >
            View all
            <FaArrowRight className="text-[10px]" />
          </Link>
        </RevealBlur>
      </div>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:w-14" />
        <div
          ref={trackRef}
          onScroll={wrapIfNeeded}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((item, i) => (
            <PropertyCard
              key={`${item.productTitle}-${i}`}
              item={item}
              duplicate={i >= listings.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
