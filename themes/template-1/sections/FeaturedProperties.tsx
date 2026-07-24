"use client";

import { useRef } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ProductSlide, ResolvedSiteData } from "@/lib/types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

function FeaturedCard({
  property,
  themeId,
}: {
  property: ProductSlide;
  themeId: ResolvedSiteData["themeId"];
}) {
  const badge = property.category ?? "Listing";
  const cta = property.button;
  const href = cta?.href === "#" ? "/properties" : cta?.href || "/properties";

  return (
    <article
      data-slide
      className="group flex w-[85%] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] sm:w-[70%] md:w-[48%] lg:w-[38%]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          themeId={themeId}
          src={property.image}
          alt={property.alt || property.productTitle}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 85vw, 40vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
          {badge}
        </span>
        {property.productShippingText && (
          <span className="absolute bottom-4 left-4 rounded-full bg-[#141414]/85 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {property.productShippingText}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#c44536]">
          {property.productSubtitle}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-[#141414]">
          {property.productTitle}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#141414]/65 line-clamp-2">
          {property.productInfoDesc}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#141414]/8 pt-5">
          <p className="text-lg font-semibold text-[#141414]">{property.productTotalPrice}</p>
          {cta && (
            <Link
              href={withTheme(href, THEME)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              {cta.label}
              <FaArrowRight className="text-[10px]" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProperties({ data }: { data: ResolvedSiteData }) {
  const { product } = data;
  const listings = product.productSlides ?? [];
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (listings.length === 0) return null;

  return (
    <section className="bg-white py-7 md:py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {product.productSubtitle}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {product.productSectionTitle}
            </h2>
            {product.productInfoDesc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {product.productInfoDesc}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous properties"
              onClick={() => scrollBySlide(-1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              aria-label="Next properties"
              onClick={() => scrollBySlide(1)}
              className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
            >
              <FaArrowRight className="text-xs" />
            </button>
            <Link
              href={withTheme("/properties", THEME)}
              className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              See all properties
              <FaArrowRight className="text-[10px]" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {listings.map((property) => (
            <FeaturedCard
              key={property.productTitle}
              property={property}
              themeId={data.themeId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
