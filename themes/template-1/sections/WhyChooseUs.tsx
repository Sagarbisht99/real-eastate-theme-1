import type { ResolvedSiteData } from "@/lib/types";
import { LuCircleUser, LuHeart, LuShieldCheck, LuStar } from "react-icons/lu";

const ICONS = [LuStar, LuHeart, LuCircleUser, LuShieldCheck];

export default function WhyChooseUs({ data }: { data: ResolvedSiteData }) {
  const { whyChooseUs, about } = data;
  const items = [
    ...whyChooseUs.whyChooseUsItems,
    ...(whyChooseUs.whyChooseUsItems.length < 4
      ? [
          {
            title: about.philosophyTitle || "Personal dedication",
            desc:
              about.philosophyDesc ||
              "Our realtors were chosen according to their skills and experience. They are the best in the market, so you can rest assured you are in good hands.",
            stat: "04",
          },
        ]
      : []),
  ].slice(0, 4);

  return (
    <section className="bg-white px-4 py-16 md:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
          {whyChooseUs.pretitle}
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem] lg:text-[2.75rem]">
          {whyChooseUs.title}
        </h2>
        <span className="mx-auto mt-5 block h-[2px] w-10 bg-[#c44536] md:mt-6" />
      </div>

      <div className="mx-auto mt-10 max-w-7xl rounded-[1.25rem] bg-[#f3efe8] md:mt-14 md:rounded-[1.5rem]">
        <div className="grid divide-y divide-[#141414]/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];

            return (
              <div
                key={`${item.title}-${i}`}
                className="px-6 py-9 text-left md:px-7 md:py-11 lg:px-8 lg:py-12"
              >
                <div className="flex h-10 w-10 items-center justify-center text-[#c44536]">
                  <Icon className="h-9 w-9 stroke-[1.5]" aria-hidden />
                </div>
                <h3 className="mt-6 text-[1.05rem] font-medium leading-snug text-[#141414] md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.7] text-[#141414]/72 md:text-[0.94rem]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
