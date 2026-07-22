import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";

const THEME = "template-1" as const;
const DATES = ["May 20, 2024", "May 18, 2024", "May 12, 2024", "May 08, 2024"];

export default function Journal({ data }: { data: ResolvedSiteData }) {
  const { gallery } = data;
  const posts = gallery.galleryItems.slice(0, 2);

  return (
    <section className="bg-[#faf8f4] px-4 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {gallery.pretitle || "Journal"}
            </p>
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-tight text-[#141414] md:text-[2.9rem]">
              {gallery.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {gallery.desc}
            </p>
          </div>

          <Link
            href={withTheme("/blog", THEME)}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#141414] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            View all articles
            <FaArrowRight className="text-[10px]" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          {posts.map((post, i) => (
            <Link
              key={post.title}
              href={withTheme("/blog", THEME)}
              className="group overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-[#141414]/8 transition duration-500 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] md:rounded-[1.5rem]"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <MediaImage
                    themeId={data.themeId}
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#141414]">
                    <FaRegCalendarAlt className="text-[12px] text-[#c44536]" aria-hidden />
                    {DATES[i] ?? DATES[0]}
                  </div>
                </div>

                <div className="px-6 py-6 md:px-7 md:py-7">
                  <h3 className="text-xl font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536] md:text-[1.35rem]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#141414]/65">
                    {post.alt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#141414]">
                    Read more
                    <FaArrowRight className="text-[10px] transition duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
