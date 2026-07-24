"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

export default function CitiesWeServe({ data }: { data: ResolvedSiteData }) {
  const section = data.citiesWeServe;
  const cities = section.cities;
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaHref = withTheme("/properties", THEME);
  /** Clearer than “Browse properties” — matches homes-focused positioning */
  const ctaLabel = "Explore homes";
  const [active, setActive] = useState(0);

  const filters = useMemo(() => {
    if (section.categories && section.categories.length > 0) {
      return section.categories;
    }
    const regions = Array.from(
      new Set(cities.map((c) => c.region).filter(Boolean) as string[])
    );
    return ["All", ...regions];
  }, [section.categories, cities]);

  const [activeFilter, setActiveFilter] = useState(filters[0] || "All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return cities;
    return cities.filter((city) => city.region === activeFilter);
  }, [cities, activeFilter]);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>("[data-slide]");
    const slide = slides[index];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(index);
  }

  function scrollBySlide(direction: -1 | 1) {
    if (filtered.length === 0) return;
    const next = (active + direction + filtered.length) % filtered.length;
    scrollToIndex(next);
  }

  const onScroll = useEffectEvent(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    if (slides.length === 0) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const mid = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll, filtered.length]);

  function selectFilter(filter: string) {
    setActiveFilter(filter);
    setActive(0);
    requestAnimationFrame(() => {
      trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    });
  }

  if (cities.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {section.pretitle}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {section.title}
            </h2>
            {section.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {section.desc}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous cities"
              onClick={() => scrollBySlide(-1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next cities"
              onClick={() => scrollBySlide(1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowRight className="text-xs" />
            </button>
            <Link
              href={ctaHref}
              className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              {ctaLabel}
              <FaArrowRight className="text-[10px]" aria-hidden />
            </Link>
          </div>
        </div>

        {filters.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => selectFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-[#141414] text-white"
                    : "border border-[#141414]/15 text-[#141414] hover:border-[#141414]/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        {filtered.length === 0 ? (
          <p className="text-sm text-[#141414]/60">
            No cities in this region right now. Try another filter.
          </p>
        ) : (
          <>
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
            >
              {filtered.map((city) => (
                <Link
                  key={city.name}
                  href={withTheme(city.href || "/properties", THEME)}
                  data-slide
                  className="group relative w-[85%] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[60%] md:w-[45%] lg:w-[32%]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe8]">
                    <MediaImage
                      themeId={data.themeId}
                      src={city.image}
                      alt={city.alt}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 85vw, 32vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                      {city.listingsLabel && (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                          {city.listingsLabel}
                        </p>
                      )}
                      <h3 className="mt-2 text-xl font-semibold">{city.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{city.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {filtered.map((city, i) => (
                  <button
                    key={city.name}
                    type="button"
                    aria-label={`Go to ${city.name}`}
                    aria-current={active === i}
                    onClick={() => scrollToIndex(i)}
                    className={`h-2 rounded-full transition ${
                      active === i ? "w-6 bg-[#c44536]" : "w-2 bg-[#141414]/20 hover:bg-[#141414]/35"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
