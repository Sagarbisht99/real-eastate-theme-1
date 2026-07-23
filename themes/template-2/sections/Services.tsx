"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import {
  FaBath,
  FaBuilding,
  FaKitchenSet,
  FaLaptop,
  FaTreeCity,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ProductSlide, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const icons = [FaKitchenSet, FaBath, FaTreeCity, FaBuilding, FaLaptop];

function ServiceCard({
  slide,
  index,
  duplicate,
}: {
  slide: ProductSlide;
  index: number;
  duplicate?: boolean;
}) {
  const Icon = icons[index % icons.length];

  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="group relative flex w-[78vw] max-w-[260px] shrink-0 flex-col overflow-hidden rounded-xl border border-[#141414]/10 bg-white sm:w-[240px] lg:w-[220px]"
    >
      <div className="flex items-center justify-center gap-2.5 px-3 py-5">
        <Icon className="text-lg" aria-hidden />
        <h3 className="text-sm font-bold">{slide.productTitle}</h3>
      </div>

      <div className="relative aspect-square overflow-hidden bg-[#f3f1ed]">
        <MediaImage
          src={slide.image}
          alt={slide.alt || slide.productTitle}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="240px"
          themeId={THEME}
        />
      </div>

      <Link
        href={withTheme(slide.button?.href || "/contact", THEME)}
        tabIndex={duplicate ? -1 : undefined}
        className="absolute bottom-3 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--reroom-accent,#ff6b00)] text-white shadow-[0_6px_16px_rgba(255,107,0,0.4)] transition hover:brightness-110"
        aria-label={`Open ${slide.productTitle}`}
      >
        <FaPlus className="text-xs" />
      </Link>
    </article>
  );
}

export default function Services({ data }: { data: ResolvedSiteData }) {
  const slides = data.product.productSlides ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const rawTitle =
    data.servicePage.pretitle ||
    data.servicePage.subtitle ||
    "Our services";
  const title =
    rawTitle.toLowerCase() === "services" ? "Our services" : rawTitle;

  const loop = useMemo(() => [...slides, ...slides], [slides]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 260;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 260;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || slides.length === 0) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    if (track.scrollLeft >= half - 1) {
      track.scrollLeft -= half;
    } else if (track.scrollLeft < 1) {
      track.scrollLeft += half;
    }
  }

  function advance(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep() * direction;
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
    if (slides.length < 2 || paused) return;
    const id = window.setInterval(() => advance(1), 3000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- advance reads latest DOM via refs
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  return (
    <section className="bg-white py-14 text-[#141414] md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <h2 className="text-[2rem] font-bold tracking-[-0.02em] md:text-[2.35rem]">
              {title}
            </h2>
            <span className="mx-auto mt-3 block h-[3px] w-10 bg-[var(--reroom-accent,#ff6b00)] sm:mx-0" />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous services"
              onClick={() => advance(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next services"
              onClick={() => advance(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/15 transition hover:border-[var(--reroom-accent,#ff6b00)] hover:text-[var(--reroom-accent,#ff6b00)]"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
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
          {loop.map((slide, i) => (
            <ServiceCard
              key={`${slide.productTitle}-${i}`}
              slide={slide}
              index={i}
              duplicate={i >= slides.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
