"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { GalleryItem, ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

function BlogCard({
  post,
  readLabel,
  duplicate,
}: {
  post: GalleryItem;
  readLabel?: string;
  duplicate?: boolean;
}) {
  return (
    <article
      data-slide
      aria-hidden={duplicate || undefined}
      className="w-[78vw] max-w-[300px] shrink-0 sm:w-[280px]"
    >
      <Link
        href={withTheme(post.href || "/blog", THEME)}
        tabIndex={duplicate ? -1 : undefined}
        className="group block"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-[#f3f1ed]">
          <MediaImage
            themeId={THEME}
            src={post.image}
            alt={post.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="300px"
          />
        </div>
        <div className="mt-4">
          {post.date && (
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--reroom-accent,#ff6b00)]">
              {post.date}
            </p>
          )}
          <h3 className="mt-2 text-lg font-bold leading-snug tracking-[-0.01em] transition group-hover:text-[var(--reroom-accent,#ff6b00)]">
            {post.title}
          </h3>
          {post.alt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
              {post.alt}
            </p>
          )}
          {readLabel && (
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold">
              {readLabel}
              <FaArrowRight className="text-[10px] transition group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}

/** Auto blog slider — any post count */
export default function Blog({ data }: { data: ResolvedSiteData }) {
  const { gallery, customPage } = data;
  const posts = gallery.galleryItems;
  const viewAll = gallery.buttons?.[0];
  const readMore = gallery.buttons?.[1] || customPage.readMoreLabel;
  const readLabel = typeof readMore === "string" ? readMore : readMore?.label;

  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = useMemo(() => [...posts, ...posts], [posts]);

  function getStep() {
    const track = trackRef.current;
    if (!track) return 300;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 20 : 300;
  }

  function wrapIfNeeded() {
    const track = trackRef.current;
    if (!track || posts.length === 0) return;
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
    if (posts.length < 2 || paused) return;
    const id = window.setInterval(advance, 3300);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length, paused]);

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-12 text-[#141414] md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <RevealBlur className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {gallery.pretitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--reroom-accent,#ff6b00)]">
                {gallery.pretitle}
              </p>
            )}
            <h2 className="mt-2 text-[1.85rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.35rem]">
              {gallery.title}
            </h2>
          </div>
          {viewAll && (
            <Link
              href={withTheme(viewAll.href, THEME)}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--reroom-accent,#ff6b00)]"
            >
              {viewAll.label}
              <FaArrowRight className="text-[10px]" />
            </Link>
          )}
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
          {loop.map((post, i) => (
            <BlogCard
              key={`${post.title}-${i}`}
              post={post}
              readLabel={readLabel}
              duplicate={i >= posts.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
