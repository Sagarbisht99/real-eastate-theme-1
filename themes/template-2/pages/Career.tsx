import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Career({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.careerPage;

  return (
    <div className="bg-white">
      <section className="px-4 pt-12 md:px-8 md:pt-14 lg:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
              {page.pretitle}
            </p>
            <h1 className="mt-3 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
              {page.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/45">
                {page.desc2}
              </p>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f3f1ed]">
            <MediaImage
              src={page.sideImage}
              alt={page.sideImageTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              themeId={theme}
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-[#141414]">
            Why join us
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 bg-[#ff9a14]" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-[#faf9f7] p-5">
                <h3 className="text-base font-bold text-[#141414]">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f7] px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-[#141414]">Open roles</h2>
          <p className="mt-2 text-sm text-[#141414]/50">
            Apply by sending a short note through our contact form.
          </p>
          <div className="mt-8 space-y-4">
            {page.jobs.map((job) => (
              <article
                key={job.title}
                className="flex flex-col gap-4 rounded-2xl bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-[#141414]">{job.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#141414]/50">
                    <span className="inline-flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-[#ff9a14]" />
                      {job.location}
                    </span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                    {job.desc}
                  </p>
                </div>
                <Link
                  href={withTheme(job.href || "/contact", theme)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff9a14] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#f08a00]"
                >
                  Apply
                  <FaArrowRight className="text-xs" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
