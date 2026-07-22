"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

const DATES = [
  "May 20, 2024",
  "May 18, 2024",
  "May 12, 2024",
  "May 08, 2024",
  "May 02, 2024",
  "Apr 28, 2024",
];

export default function BlogContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.customPage;
  const { gallery } = data;
  const posts = gallery.galleryItems;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.alt.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-14 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {page.pretitle || gallery.pretitle}
            </p>
            <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem] lg:text-[3.75rem]">
              {page.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
              {page.desc || gallery.desc}
            </p>
            {page.desc2 && (
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {page.desc2}
              </p>
            )}
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <label htmlFor="journal-search" className="sr-only">
              Search articles
            </label>
            <input
              id="journal-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full border-b border-[#141414]/20 bg-transparent py-3 text-sm text-[#141414] outline-none placeholder:text-[#141414]/35 focus:border-[#141414]"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="border-b border-[#141414]/10 px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              Featured
            </p>
            <article className="mt-6 grid overflow-hidden rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] md:grid-cols-2 md:rounded-[1.5rem]">
              <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[360px]">
                <MediaImage
                  themeId={theme}
                  src={featured.image}
                  alt={featured.alt || featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 lg:px-12">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-[#141414]/55">
                  <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                  {DATES[0]}
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-snug text-[#141414] md:text-3xl lg:text-[2.15rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {featured.alt}
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                All articles
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                {gallery.title}
              </h2>
            </div>
            <p className="text-sm text-[#141414]/45">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {rest.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <article
                  key={`${post.title}-${i}`}
                  className="group overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_16px_40px_rgba(20,20,20,0.07)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaImage
                      themeId={theme}
                      src={post.image}
                      alt={post.alt || post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-[#141414]/50">
                      <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                      {DATES[(i + 1) % DATES.length]}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-[#141414]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/65">
                      {post.alt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !featured && (
              <p className="mt-10 text-sm text-[#141414]/60">
                No articles match your search. Try another keyword.
              </p>
            )
          )}

          {/* CTA */}
          <div className="mt-16 overflow-hidden rounded-[1.25rem] bg-[#141414] px-6 py-12 md:mt-20 md:rounded-[1.5rem] md:px-12 md:py-14">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  Need advice?
                </p>
                <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Talk to an advisor about your next home.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65">
                  Prefer a guided shortlist over browsing alone? Share your budget and areas —
                  we will prepare clear options.
                </p>
              </div>
              <Link
                href={withTheme("/contact", theme)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-white/90"
              >
                Contact us
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
