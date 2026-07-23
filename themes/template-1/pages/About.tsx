"use client";

import { useRef } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

export default function AboutContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.aboutPage;
  const about = data.about;
  const { whyChooseUs, testimonial, gallery } = data;
  const cta = about.buttons[0];
  const galleryPreview = gallery.galleryItems.slice(0, 3);
  const quotes = testimonial.testimonialItems;
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const amount = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="bg-white">
      {/* Hero intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {page.pretitle}
            </p>
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem] lg:text-[3.85rem]">
              {page.title}
            </h1>
            <span className="mx-auto mt-6 block h-[2px] w-10 bg-[#c44536]" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#141414]/55 md:text-base">
                {page.desc2}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {cta && (
                <Link
                  href={withTheme(cta.href === "#" ? "/contact" : cta.href, theme)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                  {cta.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
              <Link
                href={withTheme(
                  data.banner.buttons[1]?.href === "#"
                    ? "/properties"
                    : data.banner.buttons[1]?.href || "/properties",
                  theme
                )}
                className="inline-flex items-center gap-2 rounded-full border border-[#141414]/15 px-6 py-3 text-sm font-medium text-[#141414] transition hover:border-[#141414]/30 hover:bg-[#faf8f4]"
              >
                {data.banner.buttons[1]?.label || data.product.productSectionTitle}
              </Link>
            </div>

            {(about.subtitle || about.philosophyTitle) && (
              <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 text-center sm:mt-10 sm:flex-row sm:justify-center sm:gap-8">
                {about.subtitle && (
                  <p className="text-sm font-medium text-[#141414]/70">{about.subtitle}</p>
                )}
                {about.subtitle && about.philosophyTitle && (
                  <span className="hidden h-1 w-1 rounded-full bg-[#c44536] sm:block" aria-hidden />
                )}
                {about.philosophyTitle && (
                  <p className="text-sm font-medium text-[#c44536]">{about.philosophyTitle}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story + philosophy */}
      <section className="border-b border-[#141414]/10 px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {about.pretitle}
            </p>
            <h2 className="mt-3 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
              {page.storyLabel || page.subtitle}
            </h2>
          </div>

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-between rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] p-7 md:p-9 lg:min-h-[420px]">
              <div>
                <h3 className="text-2xl font-semibold leading-snug text-[#141414] md:text-[1.85rem]">
                  {about.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-[#c44536]">{about.subtitle}</p>
                <p className="mt-6 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {about.desc}
                </p>
                {about.desc2 && (
                  <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                    {about.desc2}
                  </p>
                )}
              </div>
              {cta && (
                <Link
                  href={withTheme(cta.href === "#" ? "/contact" : cta.href, theme)}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
                >
                  {cta.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>

            <div className="flex flex-col overflow-hidden rounded-[1.25rem] border border-[#141414]/8 bg-white lg:min-h-[420px]">
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  {page.subtitle}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug text-[#141414] md:text-[1.85rem]">
                  {page.philosophyTitle || about.philosophyTitle}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {page.philosophyDesc || about.philosophyDesc}
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:aspect-[16/9] lg:min-h-[200px] lg:flex-1 lg:aspect-auto">
                <MediaImage
                  themeId={theme}
                  src={about.backgroundImage}
                  alt={about.backgroundImageTitle || about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission teaser → /mission via Learn more button (not in header) */}
      {(page.missionTitle || page.missionDesc) && (
        <section className="border-b border-[#141414]/10 bg-[#141414] px-4 py-14 text-white md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                {page.missionPretitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
                    {page.missionPretitle}
                  </p>
                )}
                {page.missionTitle && (
                  <h2 className="mt-4 max-w-xl text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
                    {page.missionTitle}
                  </h2>
                )}
                {page.missionDesc && (
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                    {page.missionDesc}
                  </p>
                )}

                {page.missionPoints && page.missionPoints.length > 0 && (
                  <div className="mt-10 grid gap-5 sm:grid-cols-3">
                    {page.missionPoints.map((point, i) => (
                      <div
                        key={point.title}
                        className="border-t border-white/15 pt-5"
                      >
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#c44536]">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 text-base font-semibold text-white">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/55">
                          {point.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {page.missionButton && (
                  <Link
                    href={withTheme(page.missionButton.href, theme)}
                    className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-[#faf8f4]"
                  >
                    {page.missionButton.label}
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                )}
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-[#2a2a2a] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
                <MediaImage
                  themeId={theme}
                  src={page.sideImage || about.sideImage}
                  alt={page.sideImageTitle || page.missionTitle || page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="border-b border-[#141414]/10 bg-[#faf8f4] px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {whyChooseUs.pretitle}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-[#141414] md:text-4xl">
            {whyChooseUs.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
            {whyChooseUs.desc}
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#141414]/8 bg-[#141414]/8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.whyChooseUsItems.map((item) => (
              <div key={item.stat} className="bg-[#faf8f4] p-6 md:p-8">
                <span className="text-xs font-semibold text-[#c44536]">{item.stat}</span>
                <h3 className="mt-4 text-base font-semibold text-[#141414] md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-[#141414]/10 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {testimonial.pretitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                {testimonial.title}
              </h2>
              {testimonial.desc && (
                <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                  {testimonial.desc}
                </p>
              )}
            </div>

            {quotes.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonials"
                  onClick={() => scrollBySlide(-1)}
                  className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
                >
                  <FaArrowLeft className="text-xs" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonials"
                  onClick={() => scrollBySlide(1)}
                  className="flex h-11 w-11 items-center justify-center border border-[#141414]/15 text-[#141414] transition hover:border-[#141414] hover:bg-[#141414] hover:text-white"
                >
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            )}
          </div>
        </div>

        {quotes.length > 0 && (
          <div className="mx-auto mt-8 max-w-7xl px-4 md:mt-10 md:px-8 lg:px-10">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
            >
              {quotes.map((item) => (
                <article
                  key={item.name}
                  data-slide
                  className="flex w-[85%] max-w-[380px] shrink-0 snap-start flex-col border border-[#141414]/8 bg-white p-6 sm:w-[70%] md:w-[48%] md:p-7 lg:w-[38%]"
                >
                  <FaQuoteLeft className="text-lg text-[#c44536]/70" />
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-[#141414]/75 md:text-[0.95rem]">
                    {item.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[#141414]/8 pt-5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <MediaImage
                        themeId={theme}
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#141414]">
                        {item.name}
                      </p>
                      <p className="truncate text-xs text-[#141414]/55">{item.role}</p>
                    </div>
                    {item.rating && (
                      <span className="ml-auto shrink-0 text-xs font-semibold text-[#c44536]">
                        {item.rating}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Gallery strip */}
      {galleryPreview.length > 0 && (
        <section className="border-b border-[#141414]/10 px-4 py-14 md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                  {gallery.pretitle}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                  {gallery.title}
                </h2>
              </div>
              <Link
                href={withTheme(
                  data.product.buttons[0]?.href === "#"
                    ? "/properties"
                    : data.product.buttons[0]?.href || "/properties",
                  theme
                )}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
              >
                {data.product.buttons[0]?.label || data.product.productSectionTitle}
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {galleryPreview.map((item) => (
                <figure key={item.title} className="group overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaImage
                      themeId={theme}
                      src={item.image}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="mt-4 text-sm font-medium text-[#141414]">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {(page.ctaPretitle || page.ctaTitle || page.ctaButton) && (
        <section className="px-4 py-14 md:px-8 md:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.25rem] bg-[#141414] px-6 py-12 md:rounded-[1.5rem] md:px-12 md:py-16 lg:px-16">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                {page.ctaPretitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                    {page.ctaPretitle}
                  </p>
                )}
                {page.ctaTitle && (
                  <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {page.ctaTitle}
                  </h2>
                )}
                {page.ctaDesc && (
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
                    {page.ctaDesc}
                  </p>
                )}
              </div>
              {page.ctaButton && (
                <Link
                  href={withTheme(page.ctaButton.href, theme)}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#141414] transition hover:bg-white/90"
                >
                  {page.ctaButton.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
