"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaBuilding,
  FaHandshake,
  FaHouse,
  FaKey,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur, Stagger, StaggerItem } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;
const icons = [FaHouse, FaHandshake, FaKey, FaBuilding];

export default function Services({ data }: { data: ResolvedSiteData }) {
  const { about, whyChooseUs, product } = data;
  const items = whyChooseUs.whyChooseUsItems.slice(0, 4);
  const bg = about.backgroundImage || product.productSlides?.[0]?.image || "";
  const cta = about.buttons?.[0] || product.buttons?.[0];

  return (
    <section className="relative overflow-hidden">
      <div className="relative bg-[var(--snifty-navy,#0b1f33)] px-4 pb-28 pt-16 md:px-8 md:pb-32 md:pt-20 lg:px-10">
        {bg && (
          <div className="absolute inset-0 opacity-30">
            <MediaImage
              src={bg}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              themeId={THEME}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[var(--snifty-navy,#0b1f33)]/75" />

        <RevealBlur className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {whyChooseUs.pretitle}
          </p>
          <h2 className="t3-serif mt-3 text-2xl font-bold text-white md:text-3xl lg:text-[2.25rem]">
            {about.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {about.desc}
          </p>
        </RevealBlur>
      </div>

      <div className="relative z-10 -mt-20 px-4 md:px-8 lg:px-10">
        <Stagger className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={item.title}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-[#eef0f3] bg-white p-6 shadow-[0_12px_40px_rgba(11,31,51,0.08)] transition-shadow duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(225,29,46,0.35)]">
                  {/* Red fill rises from bottom */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-[var(--snifty-red,#e11d2e)] transition-transform duration-500 ease-out group-hover:scale-y-100"
                  />

                  <div className="relative z-10">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[var(--snifty-red,#e11d2e)] text-[var(--snifty-red,#e11d2e)] transition-all duration-500 group-hover:border-white group-hover:text-white">
                      <Icon className="text-lg transition duration-500" />
                    </span>
                    <h3 className="t3-serif mt-4 text-lg font-bold text-[#0b1f33] transition-colors duration-500 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5b6572] line-clamp-3 transition-colors duration-500 group-hover:text-white/85">
                      {item.desc}
                    </p>
                    <Link
                      href={withTheme(cta?.href || "/services", THEME)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--snifty-red,#e11d2e)] transition-all duration-500 group-hover:gap-3 group-hover:text-white"
                    >
                      Read More
                      <FaArrowRight className="text-[11px]" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
