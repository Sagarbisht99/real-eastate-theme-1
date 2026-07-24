"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

export default function Awards({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.awardsPage;
  const awards = page.awardItems;
  const years = useMemo(
    () => Array.from(new Set(awards.map((a) => a.year))).sort((a, b) => Number(b) - Number(a)),
    [awards]
  );
  const [activeYear, setActiveYear] = useState("All");

  const filtered = useMemo(() => {
    if (activeYear === "All") return awards;
    return awards.filter((a) => a.year === activeYear);
  }, [awards, activeYear]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const cta = data.aboutPage.ctaButton;
  const yearSpan =
    years.length > 1 ? `${years[years.length - 1]}–${years[0]}` : years[0] || "";

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-7 pt-8 md:px-8 md:pb-8 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={page.breadcrumb} theme={theme} />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {page.pretitle}
            </p>
            <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem]">
              {page.title}
            </h1>
            <span className="mx-auto mt-6 block h-[2px] w-10 bg-[#c44536]" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
              {page.desc}
            </p>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="border border-[#141414]/8 bg-[#faf8f4] px-5 py-4 text-center">
              <p className="text-2xl font-semibold text-[#141414]">{awards.length}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/45">
                Awards
              </p>
            </div>
            <div className="border border-[#141414]/8 bg-[#faf8f4] px-5 py-4 text-center">
              <p className="text-2xl font-semibold text-[#141414]">{years.length}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/45">
                Years honored
              </p>
            </div>
            <div className="border border-[#141414]/8 bg-[#faf8f4] px-5 py-4 text-center">
              <p className="text-2xl font-semibold text-[#141414]">{yearSpan || "—"}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/45">
                Timeline
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + list */}
      <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141414]/45">
              Filter by year
            </p>
            <div className="flex flex-wrap gap-2">
              {["All", ...years].map((year) => {
                const active = activeYear === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-[#141414] text-white"
                        : "border border-[#141414]/12 text-[#141414] hover:border-[#141414]/30"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-12 text-sm text-[#141414]/55">No awards for this year.</p>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <article className="mt-10 grid overflow-hidden border border-[#141414]/8 bg-[#faf8f4] lg:grid-cols-2">
                  <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[380px]">
                    <MediaImage
                      themeId={theme}
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                    <div className="inline-flex w-fit items-center gap-2 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                      <FaTrophy aria-hidden />
                      {featured.year}
                    </div>
                    <p className="mt-5 text-sm font-medium text-[#141414]/55">{featured.org}</p>
                    <h2 className="mt-2 text-2xl font-semibold leading-snug text-[#141414] md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                      {featured.desc}
                    </p>
                  </div>
                </article>
              )}

              {/* Remaining — timeline style */}
              {rest.length > 0 && (
                <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
                  {rest.map((award, i) => (
                    <article
                      key={`${award.title}-${award.year}`}
                      className={`grid items-center gap-6 border border-[#141414]/8 bg-white md:grid-cols-2 md:gap-0 ${
                        i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[16/11] overflow-hidden bg-[#f3efe8] md:aspect-[16/10]">
                        <MediaImage
                          themeId={theme}
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="px-6 py-7 md:px-10 md:py-10">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
                          {award.year} · {award.org}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-[#141414] md:text-2xl">
                          {award.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-[0.95rem]">
                          {award.desc}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* CTA */}
          {cta && (
            <div className="mt-14 bg-[#141414] px-6 py-10 md:mt-16 md:px-12 md:py-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  {data.aboutPage.ctaPretitle && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c44536]">
                      {data.aboutPage.ctaPretitle}
                    </p>
                  )}
                  <h3 className="mt-3 max-w-xl text-2xl font-semibold text-white md:text-3xl">
                    {data.aboutPage.ctaTitle}
                  </h3>
                  {data.aboutPage.ctaDesc && (
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
                      {data.aboutPage.ctaDesc}
                    </p>
                  )}
                </div>
                <Link
                  href={withTheme(cta.href, theme)}
                  className="inline-flex w-fit items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-white/90"
                >
                  {cta.label}
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
