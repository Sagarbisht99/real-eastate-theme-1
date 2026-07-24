import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

const THEME = "template-1" as const;

/** Awards & achievements — from AwardsPage JSON */
export default function Awards({ data }: { data: ResolvedSiteData }) {
  const page = data.awardsPage;
  const awards = page.awardItems.slice(0, 4);

  if (awards.length === 0) return null;

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {page.pretitle}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {page.title}
            </h2>
            {page.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {page.desc}
              </p>
            )}
          </div>
          <Link
            href={withTheme("/awards", THEME)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
          >
            All awards
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
          {awards.map((award) => (
            <article
              key={`${award.year}-${award.title}`}
              className="overflow-hidden border border-[#141414]/8 bg-[#faf8f4]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[#c44536]">
                  <FaTrophy className="text-xs" aria-hidden />
                  <span className="text-[11px] font-semibold tracking-[0.14em]">{award.year}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-[#141414]">{award.title}</h3>
                <p className="mt-1 text-xs font-medium text-[#141414]/55">{award.org}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#141414]/65">
                  {award.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
