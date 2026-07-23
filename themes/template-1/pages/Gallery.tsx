import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

/** Simple template-1 fallback for shared routes */
export default function Gallery({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.galleryPage;
  return (
    <div className="bg-white px-4 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb items={page.breadcrumb} theme={theme} />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c44536]">
          {page.pretitle}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[#141414]/65">{page.desc}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.galleryItems.map((item, i) => (
            <article key={`${item.title}-${i}`}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f3efe8]">
                <MediaImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  themeId={theme}
                />
              </div>
              <h2 className="mt-3 font-semibold text-[#141414]">{item.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
