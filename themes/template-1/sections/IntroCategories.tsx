import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";
import { FaKey, FaTag } from "react-icons/fa";

const THEME = "template-1" as const;
const ICONS = [FaTag, FaKey];

export default function IntroCategories({ data }: { data: ResolvedSiteData }) {
  const { about, product } = data;
  const intro = about.desc2;
  const cards = product.productItems.slice(0, 2);
  const fallbackHref = product.buttons[0]?.href || "/properties";

  if (!intro && cards.length === 0) return null;

  return (
    <section className="bg-white px-4  md:px-8  lg:px-10">
      <div className="mx-auto max-w-7xl">
        {intro && (
          <p className="max-w-[34rem] text-[1.625rem] font-medium leading-[1.38] tracking-[-0.015em] text-[#141414] md:max-w-[38rem] md:text-[2rem] md:leading-[1.36] lg:max-w-[42rem] lg:text-[2.125rem]">
            {intro}
          </p>
        )}

        <div className="mt-8 grid gap-6 sm:gap-8 md:mt-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          {cards.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const label = item.category || item.title;
            const href = item.href || fallbackHref;
            
            return (
              <Link
                key={item.title}
                href={withTheme(href === "#" ? "/properties" : href, THEME)}
                className="group relative mb-4 block md:mb-5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] md:aspect-[16/10] md:rounded-[1.5rem]">
                  <MediaImage
                    themeId={data.themeId}
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <span className="absolute bottom-0 left-5 z-10 inline-flex translate-y-1/2 items-center gap-3 rounded-xl bg-[#141414] px-6 py-4 text-[15px] font-medium leading-none text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] md:left-7 md:px-7 md:py-[1.125rem] md:text-base lg:left-8">
                  <Icon className="text-sm md:text-[15px]" aria-hidden />
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
