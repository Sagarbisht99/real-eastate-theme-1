import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

export default function Investment({ data }: { data: ResolvedSiteData }) {
  const section = data.investmentOpportunities;
  const items = section.items;
  const cta = section.button;

  if (items.length === 0) return null;

  return (
    <section className="bg-[#faf8f4] px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {section.pretitle}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {section.title}
            </h2>
            {section.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {section.desc}
              </p>
            )}
          </div>
          {cta && (
            <Link
              href={withTheme(cta.href, THEME)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              {cta.label}
              <FaArrowRight className="text-[10px]" />
            </Link>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
          {items.map((item) => (
            <Link
              key={item.title}
              href={withTheme(item.href || cta?.href || "/properties", THEME)}
              className="group flex flex-col overflow-hidden border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {item.yieldLabel && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#141414]">
                    {item.yieldLabel}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                {item.location && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                    {item.location}
                  </p>
                )}
                <h3 className="mt-2 text-lg font-semibold text-[#141414]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#141414]/65">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#141414]">
                  View opportunity
                  <FaArrowRight className="text-[10px] transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
