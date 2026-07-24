"use client";

import { useRef } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

/** Latest projects — from LatestProjects JSON */
export default function LatestProjects({ data }: { data: ResolvedSiteData }) {
  const section = data.latestProjects;
  const items = section.projectItems;
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaHref = withTheme("/properties", THEME);
  const ctaLabel = "View Project";

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-12 md:py-14">
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
              aria-label="Previous projects"
              onClick={() => scrollBySlide(-1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
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
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <Link
              key={`${item.title}-${i}`}
              href={withTheme("/properties", THEME)}
              data-slide
              className="group w-[85%] max-w-[400px] shrink-0 snap-start sm:w-[70%] md:w-[48%] lg:w-[38%]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 85vw, 40vw"
                />
                {item.status && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
                    {item.status}
                  </span>
                )}
              </div>
              {item.location && (
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                  {item.location}
                </p>
              )}
              <h3 className="mt-1 text-lg font-semibold text-[#141414] transition group-hover:text-[#c44536]">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/65">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
