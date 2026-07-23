import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

export default function Hero({ data }: { data: ResolvedSiteData }) {
  const { banner, about } = data;
  const primary = banner.buttons?.[0];
  const secondary = banner.buttons?.[1];
  const pretitle = banner.pretitle || about.pretitle || "Building spaces. Creating lives.";
  const heroImage =
    data.template.image ||
    banner.backgroundImage ||
    banner.bannerSlides?.[0]?.image ||
    about.sideImage;

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Right-side hero photo — full height, edge-to-edge */}
      <div className="absolute inset-y-0 right-0 z-0 w-full md:w-[58%] lg:w-[56%]">
        <MediaImage
          src={heroImage}
          alt={banner.backgroundImageTitle || banner.title}
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="(max-width: 768px) 100vw, 58vw"
          themeId={THEME}
        />
        {/* Soft fade into white content on the left */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent md:w-36 lg:w-44" />
        {/* Mobile readability scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/40 md:hidden" />

        {/* Orange overlapping frames — bottom right */}
        <div
          className="pointer-events-none absolute bottom-8 right-6 hidden h-28 w-40 border-2 border-[#ff9a14] md:block lg:bottom-12 lg:right-10 lg:h-32 lg:w-48"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-4 right-2 hidden h-28 w-40 border-2 border-[#ff9a14] md:block lg:bottom-6 lg:right-4 lg:h-32 lg:w-48"
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-7xl items-center px-4 py-10 md:min-h-[420px] md:px-8 md:py-12 lg:min-h-[460px] lg:px-10 lg:py-14">
        <div className="w-full max-w-xl md:max-w-[42%] lg:max-w-[440px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff9a14] md:text-xs">
            {pretitle}
          </p>

          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#141414] md:text-[2.85rem] lg:text-[3.35rem]">
            {banner.title}
          </h1>

          <p className="mt-5 max-w-md text-[0.95rem] leading-[1.7] text-[#141414]/70 md:text-base">
            {banner.desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 md:gap-6">
            {primary && (
              <Link
                href={withTheme(primary.href || "/services", THEME)}
                className="inline-flex items-center gap-2.5 rounded-md bg-[#ff9a14] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,154,20,0.28)] transition hover:bg-[#f08a00]"
              >
                {primary.label}
                <FaArrowRight className="text-xs" />
              </Link>
            )}

            {secondary && (
              <Link
                href={withTheme(secondary.href || "/properties", THEME)}
                className="inline-flex items-center gap-3 text-sm font-semibold text-[#141414] transition hover:opacity-70"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#141414]">
                  <FaPlay className="ml-0.5 text-[11px]" />
                </span>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dot grid — bottom left */}
      <div
        className="pointer-events-none absolute bottom-6 left-4 z-10 hidden grid-cols-6 gap-2 sm:grid md:bottom-8 md:left-8 lg:left-10"
        aria-hidden
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#141414]/25"
          />
        ))}
      </div>
    </section>
  );
}
