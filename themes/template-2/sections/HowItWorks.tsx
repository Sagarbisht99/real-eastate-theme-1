"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-2" as const;

export default function HowItWorks({ data }: { data: ResolvedSiteData }) {
  const { faq, about } = data;
  const [open, setOpen] = useState(-1);
  const items = faq.faqItems.slice(0, 5);
  const image = about.backgroundImage || about.sideImage;

  return (
    <section className="bg-[#1a1a1a] px-4 py-16 text-white md:px-8 md:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-lg">
          {/* Striped frame behind image */}
          <div
            className="absolute -right-4 -top-4 h-[88%] w-[88%] border border-white/80 md:-right-6 md:-top-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.18) 5px, rgba(255,255,255,0.18) 6px)",
            }}
            aria-hidden
          />
          <div className="relative aspect-square overflow-hidden bg-[#2a2a2a]">
            <MediaImage
              src={image}
              alt={about.backgroundImageTitle || faq.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
              themeId={THEME}
            />
          </div>
        </div>

        <div>
          <h2 className="text-[2rem] font-bold tracking-[-0.02em] md:text-[2.5rem]">
            How it works
          </h2>

          <div className="mt-8 border-t border-white/15">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.question} className="border-b border-white/15">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-white md:text-lg">
                      {item.question}
                    </span>
                    <span className="shrink-0 text-lg font-light text-[#ff9a14]">
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 pr-10 text-sm leading-relaxed text-white/55">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
