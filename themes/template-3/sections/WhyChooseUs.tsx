"use client";

import {
  FaArrowRightLong,
  FaBuildingShield,
  FaHandshake,
  FaHouseCircleCheck,
  FaKey,
} from "react-icons/fa6";
import { RevealBlur, RevealUp } from "@/lib/motion";
import type { ResolvedSiteData } from "@/lib/types";

const icons = [FaHouseCircleCheck, FaHandshake, FaKey, FaBuildingShield];

export default function WhyChooseUs({ data }: { data: ResolvedSiteData }) {
  const { whyChooseUs } = data;
  const items = whyChooseUs.whyChooseUsItems.slice(0, 4);

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <RevealBlur className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--snifty-red,#e11d2e)]">
            {whyChooseUs.pretitle}
          </p>
          <h2 className="t3-serif mt-3 text-2xl font-bold text-[#0b1f33] md:text-3xl">
            {whyChooseUs.title}
          </h2>
          {whyChooseUs.desc && (
            <p className="mt-3 text-sm leading-relaxed text-[#5b6572] md:text-base">
              {whyChooseUs.desc}
            </p>
          )}
        </RevealBlur>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            const isLast = i === items.length - 1;

            return (
              <RevealUp
                key={item.title}
                delay={i * 0.08}
                className="relative text-center lg:px-3"
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--snifty-red,#e11d2e)]/10 text-[var(--snifty-red,#e11d2e)]">
                  <Icon className="text-xl" />
                </span>
                <h3 className="t3-serif mt-4 text-base font-bold text-[#0b1f33] md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6572]">
                  {item.desc}
                </p>

                {/* Desktop → between columns */}
                {!isLast && (
                  <span
                    className="pointer-events-none absolute -right-3 top-7 hidden text-[var(--snifty-red,#e11d2e)]/50 lg:block xl:-right-2"
                    aria-hidden
                  >
                    <FaArrowRightLong className="text-xl" />
                  </span>
                )}
              </RevealUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
