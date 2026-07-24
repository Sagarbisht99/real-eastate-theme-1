"use client";

import { useRef } from "react";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Team({ data }: { data: ResolvedSiteData }) {
  const { team } = data;
  const people = team.teamItems;
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.7;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (people.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {team.pretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
                {team.pretitle}
              </p>
            )}
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {team.title}
            </h2>
            {team.desc && (
              <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {team.desc}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous team members"
              onClick={() => scrollBySlide(-1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next team members"
              onClick={() => scrollBySlide(1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {people.map((person) => (
            <article
              key={person.name}
              data-slide
              className="w-[70%] max-w-[280px] shrink-0 snap-start text-center sm:w-[45%] md:w-[32%] lg:w-[28%]"
            >
              <div className="relative mx-auto aspect-square overflow-hidden bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#141414]">{person.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#c44536]">{person.role}</p>
              {person.bio && (
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#141414]/60">
                  {person.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
