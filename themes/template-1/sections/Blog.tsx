"use client";

import { useRef } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

const THEME = "template-1" as const;

export default function Blog({ data }: { data: ResolvedSiteData }) {
  const { gallery, customPage } = data;
  const posts = gallery.galleryItems;
  const trackRef = useRef<HTMLDivElement>(null);
  const viewAll = gallery.buttons?.[0];
  const readMore = gallery.buttons?.[1] || customPage.readMoreLabel;

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {gallery.pretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {gallery.pretitle}
              </p>
            )}
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-[#141414] md:text-[2.9rem]">
              {gallery.title}
            </h2>
            {gallery.desc && (
              <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {gallery.desc}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous articles"
              onClick={() => scrollBySlide(-1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next articles"
              onClick={() => scrollBySlide(1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowRight className="text-xs" />
            </button>
            {viewAll && (
              <Link
                href={withTheme(viewAll.href, THEME)}
                className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
              >
                {viewAll.label}
                <FaArrowRight className="text-[10px]" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => {
            const href = post.href || viewAll?.href || "/blog";
            const readLabel =
              typeof readMore === "string" ? readMore : readMore?.label;

            return (
              <article
                key={`${post.title}-${i}`}
                data-slide
                className="w-[85%] max-w-[420px] shrink-0 snap-start sm:w-[70%] md:w-[48%] lg:w-[38%]"
              >
                <Link href={withTheme(href, THEME)} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <MediaImage
                      themeId={data.themeId}
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 85vw, 40vw"
                    />
                  </div>

                  {post.date && (
                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[#141414]/50">
                      <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                      {post.date}
                    </div>
                  )}
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536] md:text-[1.35rem]">
                    {post.title}
                  </h3>
                  {post.alt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/65">
                      {post.alt}
                    </p>
                  )}
                  {readLabel && (
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#141414]">
                      {readLabel}
                      <FaArrowRight
                        className="text-[10px] transition duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
