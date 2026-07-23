"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Blog({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.customPage;
  const items = data.gallery.galleryItems;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.alt?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-[#141414]/08 px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
              {page.pretitle || data.gallery.pretitle || "Blog"}
            </p>
            <h1 className="mt-3 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#141414] md:text-[2.85rem]">
              {page.title || data.gallery.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#141414]/60 md:text-base">
              {page.desc || data.gallery.desc}
            </p>
          </div>

          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search articles</span>
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#141414]/35" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-full border border-[#141414]/12 bg-[#faf9f7] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#ff9a14]"
            />
          </label>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#141414]/50">
              No articles match “{query}”. Try another search.
            </p>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link
                  href={withTheme("/contact", theme)}
                  className="group grid overflow-hidden rounded-2xl bg-[#faf9f7] lg:grid-cols-2"
                >
                  <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[360px]">
                    <MediaImage
                      src={featured.image}
                      alt={featured.alt || featured.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      themeId={theme}
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff9a14]">
                      Featured
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-snug tracking-[-0.02em] text-[#141414] md:text-3xl">
                      {featured.title}
                    </h2>
                    {featured.alt && (
                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#141414]/55 md:text-base">
                        {featured.alt}
                      </p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#141414] transition group-hover:text-[#ff9a14]">
                      Read more
                      <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
                  {rest.map((item, i) => (
                    <article key={`${item.title}-${i}`} className="group">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#f3f1ed]">
                        <MediaImage
                          src={item.image}
                          alt={item.alt || item.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          themeId={theme}
                        />
                      </div>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff9a14]">
                        Article
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-[#141414] transition group-hover:text-[#ff9a14]">
                        {item.title}
                      </h3>
                      {item.alt && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/50">
                          {item.alt}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-2xl bg-[#1a1a1a] px-6 py-10 text-center text-white md:px-10 md:py-12">
            <h3 className="text-2xl font-bold md:text-[1.75rem]">
              {page.desc2 || "Have a project in mind?"}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
              Tell us what you need — we will reply with clear next steps.
            </p>
            <Link
              href={withTheme("/contact", theme)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff9a14] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#f08a00]"
            >
              Contact us
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
