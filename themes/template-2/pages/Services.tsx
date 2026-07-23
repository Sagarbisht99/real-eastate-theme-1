import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

export default function Services({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.servicePage;
  const slides = page.productSlides?.length
    ? page.productSlides
    : (data.product.productSlides ?? []);

  return (
    <div className="bg-white">
      <section className="px-4 pb-10 pt-10 md:px-8 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff9a14]">
            {page.pretitle}
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.4rem]">
            {page.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-[#141414]/65">{page.desc}</p>
        </div>
      </section>

      <section className="bg-[#f7f5f1] px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide, i) => (
            <article
              key={`${slide.productTitle}-${i}`}
              className="rounded-[1.25rem] bg-white p-5"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[#f3f1ed]">
                <MediaImage
                  src={slide.image}
                  alt={slide.alt || slide.productTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  themeId={theme}
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#141414]">
                {slide.productTitle}
              </h2>
              <p className="mt-2 text-sm text-[#141414]/55">
                {slide.productInfoDesc}
              </p>
              <Link
                href={withTheme("/contact", theme)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff9a14]"
              >
                Learn more
                <FaArrowRight className="text-xs" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
