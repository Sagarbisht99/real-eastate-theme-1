import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight } from "react-icons/fa";

const THEME = "template-1" as const;

/** Our services — from ServicePage JSON */
export default function Services({ data }: { data: ResolvedSiteData }) {
  const page = data.servicePage;
  const items = page.productItems.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-14 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {page.pretitle}
            </p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem]">
              {page.productSectionTitle || page.title}
            </h2>
            {page.desc && (
              <p className="mt-3 text-sm leading-relaxed text-[#141414]/65 md:text-base">
                {page.desc}
              </p>
            )}
          </div>
          <Link
            href={withTheme("/services", THEME)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
          >
            All services
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
          {items.map((item) => (
            <article key={item.title} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#f3efe8]">
                <MediaImage
                  themeId={data.themeId}
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c44536]">
                {item.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#141414]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#141414]/65">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
