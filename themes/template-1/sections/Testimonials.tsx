"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials({ data }: { data: ResolvedSiteData }) {
  const { testimonial } = data;
  const quotes = testimonial.testimonialItems;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

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
    if (quotes.length === 0) return;
    const next = (active + direction + quotes.length) % quotes.length;
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
  }, [onScroll]);

  useEffect(() => {
    if (quotes.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % quotes.length;
        const track = trackRef.current;
        const slides = track?.querySelectorAll<HTMLElement>("[data-slide]");
        const slide = slides?.[next];
        if (track && slide) {
          track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 5500);
    return () => window.clearInterval(id);
  }, [quotes.length, paused]);

  if (quotes.length === 0) return null;

  return (
    <section
      className="bg-white py-7 md:py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {testimonial.pretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
                {testimonial.pretitle}
              </p>
            )}
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {testimonial.title}
            </h2>
            {testimonial.desc && (
              <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {testimonial.desc}
              </p>
            )}
          </div>

          {quotes.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => scrollBySlide(-1)}
                className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
              >
                <FaArrowLeft className="text-xs" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => scrollBySlide(1)}
                className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {quotes.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              data-slide
              className={`flex w-[88%] max-w-[420px] shrink-0 snap-start flex-col border p-6 transition md:w-[48%] md:p-7 lg:w-[31%] ${
                active === i
                  ? "border-[#c44536]/35 bg-[#faf8f4]"
                  : "border-[#141414]/8 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <FaQuoteLeft className="text-lg text-[#c44536]/70" aria-hidden />
                {item.rating && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c44536]">
                    <FaStar className="text-[10px]" aria-hidden />
                    {item.rating}
                  </span>
                )}
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-[#141414]/75 md:text-[0.95rem]">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#141414]/8 pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#f3efe8]">
                  <MediaImage
                    themeId={data.themeId}
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#141414]">{item.name}</p>
                  <p className="truncate text-xs text-[#141414]/55">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {quotes.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={active === i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition ${
                  active === i ? "w-6 bg-[#c44536]" : "w-2 bg-[#141414]/20 hover:bg-[#141414]/35"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
