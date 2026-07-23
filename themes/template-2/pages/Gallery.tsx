"use client";

import { useMemo, useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Gallery({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.galleryPage;
  const [active, setActive] = useState(page.categories[0] || "All");

  const items = useMemo(() => {
    if (active === "All") return page.galleryItems;
    return page.galleryItems.filter((item) => item.category === active);
  }, [page.galleryItems, active]);

  return (
    <div className="bg-white">
      <section className="px-4 pt-12 text-center md:px-8 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
            {page.pretitle}
          </p>
          <h1 className="mt-3 text-[2.25rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
            {page.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
            {page.desc}
          </p>
          <span className="mx-auto mt-5 block h-[3px] w-10 bg-[#ff9a14]" />
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-6">
          {page.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative pb-1 text-sm font-medium transition ${
                active === cat
                  ? "text-[#ff9a14]"
                  : "text-[#141414]/45 hover:text-[#141414]"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#ff9a14]" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => (
            <article key={`${item.title}-${i}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f3f1ed]">
                <MediaImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  themeId={theme}
                />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff9a14]">
                {item.category}
              </p>
              <h2 className="mt-1 text-base font-bold text-[#141414]">
                {item.title}
              </h2>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
