"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

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
  const readMore = page.readMoreLabel || gallery.buttons?.[1]?.label;
  const cta = page.ctaButton;

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
      <section className="border-b border-[#141414]/10 px-4 pb-14 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
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

          {page.searchPlaceholder && (
            <div className="mx-auto mt-10 max-w-md">
              <label htmlFor="blog-search" className="sr-only">
                {page.searchPlaceholder}
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={page.searchPlaceholder}
                className="w-full border-b border-[#141414]/20 bg-transparent py-3 text-sm text-[#141414] outline-none placeholder:text-[#141414]/35 focus:border-[#141414]"
              />
            </div>
          )}
        </div>
      </section>

      {featured && (
        <section className="border-b border-[#141414]/10 px-4 py-12 md:px-8 md:py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {page.featuredLabel && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.featuredLabel}
              </p>
            )}
            <article className="group mt-6 grid gap-0 md:grid-cols-2 md:gap-10 lg:gap-14">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#faf8f4] md:aspect-auto md:min-h-[360px]">
                <MediaImage
                  themeId={theme}
                  src={featured.image}
                  alt={featured.alt || featured.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center pt-5 md:pt-0">
                {featured.date && (
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#141414]/50">
                    <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                    {featured.date}
                  </div>
                )}
                <h2 className="mt-3 text-2xl font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536] md:text-3xl lg:text-[2.15rem]">
                  {featured.title}
                </h2>
                {featured.alt && (
                  <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                    {featured.alt}
                  </p>
                )}
                {readMore && (
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#141414]">
                    {readMore}
                    <FaArrowRight
                      className="text-[10px] transition duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                )}
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              {page.listLabel && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  {page.listLabel}
                </p>
              )}
              <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                {gallery.title}
              </h2>
            </div>
            <p className="text-sm text-[#141414]/45">{filtered.length}</p>
          </div>

          {rest.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {rest.map((post, i) => (
                <article key={`${post.title}-${i}`} className="group">
                  <Link href={withTheme(post.href || "/blog", theme)} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <MediaImage
                        themeId={theme}
                        src={post.image}
                        alt={post.alt || post.title}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                    {readMore && (
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#141414]">
                        {readMore}
                        <FaArrowRight
                          className="text-[10px] transition duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            !featured &&
            page.emptyMessage && (
              <p className="mt-10 text-sm text-[#141414]/60">{page.emptyMessage}</p>
            )
          )}

          {(page.ctaPretitle || page.ctaTitle || cta) && (
            <div className="mt-16 bg-[#141414] px-6 py-12 md:mt-20 md:px-12 md:py-14">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  {page.ctaPretitle && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                      {page.ctaPretitle}
                    </p>
                  )}
                  {page.ctaTitle && (
                    <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                      {page.ctaTitle}
                    </h3>
                  )}
                  {page.ctaDesc && (
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65">
                      {page.ctaDesc}
                    </p>
                  )}
                </div>
                {cta && (
                  <Link
                    href={withTheme(cta.href, theme)}
                    className="inline-flex w-fit items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-white/90"
                  >
                    {cta.label}
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
