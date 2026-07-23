import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  FaBath,
  FaBuilding,
  FaKitchenSet,
  FaLaptop,
  FaTreeCity,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const icons = [FaKitchenSet, FaBath, FaTreeCity, FaBuilding, FaLaptop];

export default function Services({ data }: { data: ResolvedSiteData }) {
  const slides = (data.product.productSlides ?? []).slice(0, 5);
  const rawTitle =
    data.servicePage.pretitle ||
    data.servicePage.subtitle ||
    "Our services";
  const title =
    rawTitle.toLowerCase() === "services" ? "Our services" : rawTitle;

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            {title}
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 bg-[#ff9a14]" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {slides.map((slide, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={`${slide.productTitle}-${i}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#141414]/10 bg-white"
              >
                <div className="flex items-center justify-center gap-2.5 px-3 py-5">
                  <Icon className="text-lg text-[#141414]" aria-hidden />
                  <h3 className="text-sm font-bold text-[#141414]">
                    {slide.productTitle}
                  </h3>
                </div>

                <div className="relative aspect-square overflow-hidden bg-[#f3f1ed]">
                  <MediaImage
                    src={slide.image}
                    alt={slide.alt || slide.productTitle}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 18vw"
                    themeId={THEME}
                  />
                </div>

                <Link
                  href={withTheme(slide.button?.href || "/contact", THEME)}
                  className="absolute bottom-3 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#ff9a14] text-white shadow-[0_6px_16px_rgba(255,154,20,0.4)] transition hover:bg-[#f08a00]"
                  aria-label={`Open ${slide.productTitle}`}
                >
                  <FaArrowRight className="text-xs" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
