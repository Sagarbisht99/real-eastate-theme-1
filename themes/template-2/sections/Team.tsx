"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, TeamItem } from "@/lib/types";

const THEME = "template-2" as const;

function TeamCard({
  person,
  duplicate,
}: {
  person: TeamItem;
  duplicate?: boolean;
}) {
  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="group w-[72vw] max-w-[260px] shrink-0 sm:w-[240px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#e8e6e1]">
        <MediaImage
          themeId={THEME}
          src={person.image}
          alt={person.name}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          sizes="260px"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold leading-snug">{person.name}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--reroom-accent,#ff6b00)]">
          {person.role}
        </p>
        {person.bio && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/55">
            {person.bio}
          </p>
        )}
      </div>
    </article>
  );
}

/** Auto slider only — no next/prev controls */
export default function Team({ data }: { data: ResolvedSiteData }) {
  const { team } = data;
  const people = team.teamItems;
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = useMemo(() => [...people, ...people], [people]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 260;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 260;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || people.length === 0) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    if (track.scrollLeft >= half - 1) {
      track.scrollLeft -= half;
    } else if (track.scrollLeft < 1) {
      track.scrollLeft += half;
    }
  }

  function advance() {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const half = track.scrollWidth / 2;
    const next = track.scrollLeft + step;

    if (next >= half) {
      track.scrollLeft = track.scrollLeft - half + step;
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (people.length < 2 || paused) return;
    const id = window.setInterval(advance, 3200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- advance reads latest DOM via refs
  }, [people.length, paused]);

  if (people.length === 0) return null;

  return (
    <section className="bg-[#faf9f7] py-12 text-[#141414] md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {team.pretitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {team.pretitle}
              </p>
            )}
            <h2 className="mt-2 text-[1.75rem] font-bold tracking-[-0.02em] md:text-[2rem]">
              {team.title}
            </h2>
            <span className="mt-3 block h-[3px] w-8 bg-[var(--reroom-accent,#ff6b00)]" />
            {team.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">
                {team.desc}
              </p>
            )}
          </div>
          <Link
            href={withTheme("/team", THEME)}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
          >
            Meet the team
            <FaArrowRight className="text-xs" />
          </Link>
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
          {loop.map((person, i) => (
            <TeamCard
              key={`${person.name}-${i}`}
              person={person}
              duplicate={i >= people.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
