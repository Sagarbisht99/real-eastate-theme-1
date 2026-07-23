"use client";

import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const PER_PAGE = 3;

export default function Testimonials({ data }: { data: ResolvedSiteData }) {
  const { testimonial } = data;
  const all = testimonial.testimonialItems;
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const items = all.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="bg-[#f7f5f1] px-4 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            {testimonial.title}
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 bg-[#ff9a14]" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_8px_30px_rgba(20,20,20,0.04)] md:p-8"
            >
              <FaQuoteLeft className="text-2xl text-[#ff9a14]" />
              <p className="mt-5 flex-1 text-sm leading-[1.75] text-[#141414]/65 md:text-[0.95rem]">
                {item.quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f3f1ed]">
                  <MediaImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                    themeId={THEME}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#141414]">{item.name}</p>
                  <p className="mt-0.5 text-xs text-[#141414]/45">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonials page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  page === i ? "bg-[#ff9a14]" : "bg-[#141414]/20 hover:bg-[#141414]/35"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
