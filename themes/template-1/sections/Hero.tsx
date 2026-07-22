import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

export default function Hero({ data }: { data: ResolvedSiteData }) {
  const { banner } = data;
  const [primary, secondary] = banner.buttons;

  return (
    <section className="bg-white px-4 pb-2 pt-1 md:px-6 md:pb-4 lg:px-8">
      <div className="relative mx-auto min-h-[min(78vh,760px)] max-w-[1400px] overflow-hidden rounded-[1.75rem] md:min-h-[min(82vh,820px)] md:rounded-[2.25rem] lg:rounded-[2.5rem]">
        <MediaImage
          themeId={data.themeId}
          src={banner.backgroundImage || data.template.image}
          alt={banner.backgroundImageTitle || banner.title}
          fill
          priority
          className="object-cover object-[62%_center]"
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

        <div className="relative flex min-h-[inherit] items-center px-6 py-16 sm:px-10 md:px-12 md:py-20 lg:px-16">
          <div className="max-w-xl">
            <h1 className="text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.01em] text-white sm:text-5xl md:text-[3.35rem] lg:text-[3.75rem]">
              {banner.title}
            </h1>
            {banner.desc && (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/88 md:mt-5 md:text-[0.98rem]">
                {banner.desc}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
              {primary && (
                <Link
                  href={withTheme(primary.href || "/contact", THEME)}
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#141414] transition hover:bg-white/92"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link
                  href={withTheme(secondary.href || "/properties", THEME)}
                  className="inline-flex rounded-full border border-white/85 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
