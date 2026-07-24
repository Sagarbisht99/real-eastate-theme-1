import type { ResolvedSiteData } from "@/lib/types";
import { LuCircleUser, LuHeart, LuShieldCheck, LuStar } from "react-icons/lu";

const ICONS = [LuStar, LuHeart, LuCircleUser, LuShieldCheck];

export default function WhyChooseUs({ data }: { data: ResolvedSiteData }) {
  const { whyChooseUs } = data;
  const items = whyChooseUs.whyChooseUsItems;

  if (!whyChooseUs.title && items.length === 0) return null;

  return (
    <section className="bg-white px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl text-center">
        {whyChooseUs.pretitle && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
            {whyChooseUs.pretitle}
          </p>
        )}
        <h2 className="mx-auto mt-4 max-w-3xl text-[2rem] font-semibold leading-tight text-[#141414] md:text-[2.5rem] lg:text-[2.75rem]">
          {whyChooseUs.title}
        </h2>
        {whyChooseUs.desc && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
            {whyChooseUs.desc}
          </p>
        )}
      </div>

      {items.length > 0 && (
        <div className="mx-auto mt-8 max-w-7xl rounded-[1.25rem] bg-[#f3efe8] md:mt-10 md:rounded-[1.5rem]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={`${item.stat}-${item.title}`}
                  className="px-6 py-7 text-left md:px-7 md:py-8 lg:px-8 lg:py-9"
                >
                  <Icon
                    className="h-9 w-9 text-[#c44536] md:h-10 md:w-10"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-[#c44536]">
                    {item.stat}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#141414]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
