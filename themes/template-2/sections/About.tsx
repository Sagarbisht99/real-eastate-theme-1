import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  FaBriefcase,
  FaLocationDot,
  FaBagShopping,
  FaStar,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;
const icons = [FaStar, FaBagShopping, FaBriefcase, FaLocationDot];

export default function About({ data }: { data: ResolvedSiteData }) {
  const { about, whyChooseUs, aboutPage } = data;
  const cta = about.buttons?.[0];
  const stats = whyChooseUs.whyChooseUsItems.slice(0, 4);
  const heading = aboutPage.pretitle || "About us";

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] px-4 py-16 md:px-8 md:py-20 lg:px-10 lg:py-24">
      {/* Orange corner frame — top right */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-24 w-28 border-b-2 border-l-2 border-[#ff9a14] md:block lg:h-28 lg:w-32"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_auto_1.15fr_0.9fr] lg:gap-0">
        {/* Left — copy + CTA */}
        <div className="lg:pr-10">
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            {heading}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-[1.75] text-[#141414]/55 md:text-[0.95rem]">
            {about.desc}
          </p>
          {cta && (
            <Link
              href={withTheme(cta.href || "/about", THEME)}
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#141414] transition hover:text-[#ff9a14]"
            >
              {cta.label}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff9a14] text-white shadow-[0_6px_16px_rgba(255,154,20,0.35)] transition group-hover:bg-[#f08a00]">
                <FaArrowRight className="text-[11px]" />
              </span>
            </Link>
          )}
        </div>

        {/* Vertical divider */}
        <div
          className="mx-auto hidden h-full min-h-[220px] w-px bg-[#141414]/12 lg:block"
          aria-hidden
        />

        {/* Center — 2×2 stats */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:px-10 xl:gap-x-12 xl:px-14">
          {stats.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-[1.35rem] text-[#ff9a14]">
                  <Icon />
                </span>
                <div>
                  <p className="text-[1.75rem] font-bold leading-none tracking-tight text-[#141414] md:text-[2rem]">
                    {item.stat}
                  </p>
                  <p className="mt-2 max-w-[9rem] text-xs leading-snug text-[#141414]/50 md:text-[0.8rem]">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — image + accents */}
        <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none lg:pl-4">
          {/* Orange hash marks — above image */}
          <div
            className="mb-3 flex items-end justify-end gap-1.5 pr-2"
            aria-hidden
          >
            <span className="h-3 w-[2px] bg-[#ff9a14]" />
            <span className="h-5 w-[2px] bg-[#ff9a14]" />
            <span className="h-4 w-[2px] bg-[#ff9a14]" />
            <span className="h-6 w-[2px] bg-[#ff9a14]" />
          </div>

          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#eeeae4]">
              <MediaImage
                src={about.sideImage}
                alt={about.sideImageTitle || about.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 26vw"
                themeId={THEME}
              />
            </div>

            {/* Vertical dots — right of image */}
            <div
              className="absolute -right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
              aria-hidden
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#141414]/25"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
