import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function Csr({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.csrPage;
  const cta = page.donateCta;

  return (
    <div className="bg-white">
      <section className="bg-[#1a1a1a] px-4 py-14 text-white md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
              {page.pretitle}
            </p>
            <h1 className="mt-3 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
              {page.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
              {page.desc}
            </p>
            {page.desc2 && (
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                {page.desc2}
              </p>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#2a2a2a]">
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
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {page.impactStats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-bold text-[#141414] md:text-4xl">
                {item.stat}
              </p>
              <span className="mx-auto mt-2 block h-[2px] w-8 bg-[#ff9a14]" />
              <p className="mt-2 text-sm text-[#141414]/50">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#faf9f7] px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-[#141414]">
            Where support goes
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-10 bg-[#ff9a14]" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {page.programs.map((program) => (
              <article key={program.title} className="overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[16/11] bg-[#eeeae4]">
                  <MediaImage
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    themeId={theme}
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff9a14]">
                    {program.amount}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#141414]">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                    {program.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#1a1a1a] px-6 py-10 text-center text-white md:px-10">
          <h2 className="text-2xl font-bold">{cta.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">{cta.desc}</p>
          <Link
            href={withTheme(cta.buttonHref || "/contact", theme)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff9a14] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#f08a00]"
          >
            {cta.buttonLabel}
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}
