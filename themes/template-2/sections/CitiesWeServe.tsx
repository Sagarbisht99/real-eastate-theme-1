"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaLocationDot } from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { CityItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function CityCard({
  city,
  ctaHref,
  duplicate,
}: {
  city: CityItem;
  ctaHref: string;
  duplicate?: boolean;
}) {
  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="w-[78vw] max-w-[300px] shrink-0 sm:w-[280px]"
    >
      <Link
        href={withTheme(city.href || ctaHref, THEME)}
        tabIndex={duplicate ? -1 : undefined}
        className="group relative block aspect-[4/5] overflow-hidden bg-[#eeeae4]"
      >
        <MediaImage
          themeId={THEME}
          src={city.image}
          alt={city.alt}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#141414]">
          <FaLocationDot className="text-[var(--reroom-accent,#ff6b00)]" />
          {city.region || "City"}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {city.listingsLabel && (
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
              {city.listingsLabel}
            </p>
          )}
          <h3 className="mt-1.5 text-xl font-bold tracking-[-0.02em]">
            {city.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/65">{city.desc}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            Explore
            <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** City card slider with filters + next/prev + autoplay */
export default function CitiesWeServe({ data }: { data: ResolvedSiteData }) {
  const section = data.citiesWeServe;
  const cities = section.cities;
  const cta = section.button;
  const ctaHref = cta?.href || "/properties";
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const filters = useMemo(() => {
    if (section.categories?.length) return section.categories;
    const regions = Array.from(
      new Set(cities.map((c) => c.region).filter(Boolean) as string[])
    );
    return ["All", ...regions];
  }, [section.categories, cities]);

  const [activeFilter, setActiveFilter] = useState(filters[0] || "All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return cities;
    return cities.filter((c) => c.region === activeFilter);
  }, [cities, activeFilter]);

  const canLoop = filtered.length > 1;
  const loop = useMemo(
    () => (canLoop ? [...filtered, ...filtered] : filtered),
    [filtered, canLoop]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (track) track.scrollLeft = 0;
  }, [activeFilter]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 300;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 300;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || !canLoop) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    if (track.scrollLeft >= half - 1) track.scrollLeft -= half;
    else if (track.scrollLeft < 1) track.scrollLeft += half;
  }

  function advance(direction: -1 | 1 = 1) {
    const track = trackRef.current;
    if (!track || filtered.length === 0) return;
    const step = getStep() * direction;

    if (!canLoop) {
      track.scrollBy({ left: step, behavior: "smooth" });
      return;
    }

    const half = track.scrollWidth / 2;
    const next = track.scrollLeft + step;

    if (direction > 0 && next >= half) {
      track.scrollLeft = track.scrollLeft - half + step;
    } else if (direction < 0 && next < 0) {
      track.scrollLeft = track.scrollLeft + half + step;
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (!canLoop || paused) return;
    const id = window.setInterval(() => advance(1), 3300);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length, paused, activeFilter, canLoop]);

  if (cities.length === 0) return null;

  return (
    <section className="bg-[#faf9f7] py-12 text-[#141414] md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
              {section.pretitle}
            </p>
            <h2 className="mt-2 text-[1.85rem] font-bold tracking-[-0.03em] md:text-[2.35rem]">
              {section.title}
            </h2>
            {section.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                {section.desc}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {filters.length > 1 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`relative pb-1 text-sm font-medium transition ${
                      activeFilter === filter
                        ? "text-[var(--reroom-accent,#ff6b00)]"
                        : "text-[#141414]/45 hover:text-[#141414]"
                    }`}
                  >
                    {filter}
                    {activeFilter === filter && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[var(--reroom-accent,#ff6b00)]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous cities"
                onClick={() => advance(-1)}
                disabled={filtered.length < 2}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 bg-white transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaArrowLeft className="text-xs" />
              </button>
              <button
                type="button"
                aria-label="Next cities"
                onClick={() => advance(1)}
                disabled={filtered.length < 2}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 bg-white transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            {cta && (
              <Link
                href={withTheme(cta.href, THEME)}
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
              >
                {cta.label}
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>
        </RevealBlur>
      </div>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#faf9f7] to-transparent md:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#faf9f7] to-transparent md:w-14" />
        <div
          ref={trackRef}
          onScroll={wrapIfNeeded}
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:px-8 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((city, i) => (
            <CityCard
              key={`${city.name}-${activeFilter}-${i}`}
              city={city}
              ctaHref={ctaHref}
              duplicate={canLoop && i >= filtered.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
