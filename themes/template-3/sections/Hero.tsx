"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaArrowUp,
  FaChevronDown,
  FaLocationDot,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import MediaImage from "@/components/MediaImage";
import { RevealBlur } from "@/lib/motion";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-3" as const;

const TABS = [
  { label: "All", value: "All" },
  { label: "For Buy", value: "For Sale" },
  { label: "For Sell", value: "For Sale" },
  { label: "For Rent", value: "For Rent" },
] as const;

export default function Hero({ data }: { data: ResolvedSiteData }) {
  const router = useRouter();
  const { banner, about, whyChooseUs, product, citiesWeServe } = data;

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["label"]>("For Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [category, setCategory] = useState("");

  const heroImage =
    data.template.image ||
    banner.bannerSlides?.[0]?.image ||
    banner.backgroundImage ||
    about.sideImage;

  const badge = (
    about.pretitle ||
    whyChooseUs.pretitle ||
    data.topbar.text?.[0] ||
    "Find a modern home"
  ).toUpperCase();

  const title =
    banner.bannerSlides?.[0]?.title ||
    banner.title ||
    about.title;

  const whyLabel =
    whyChooseUs.pretitle?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Why Choose Us";

  const cityOptions = useMemo(() => {
    const names = citiesWeServe.cities.map((c) => c.name);
    const regions = citiesWeServe.cities
      .map((c) => c.region)
      .filter(Boolean) as string[];
    return Array.from(new Set([...names, ...regions]));
  }, [citiesWeServe.cities]);

  const typeOptions = useMemo(() => {
    const fromSlides =
      product.productSlides?.map((s) => s.productSubtitle).filter(Boolean) ?? [];
    const fromItems = product.productItems?.map((i) => i.title).filter(Boolean) ?? [];
    return Array.from(new Set([...fromSlides, ...fromItems]));
  }, [product.productItems, product.productSlides]);

  const categoryOptions = useMemo(() => {
    const fromSlides =
      product.productSlides?.map((s) => s.category).filter(Boolean) ?? [];
    const fromItems = product.productItems?.map((i) => i.category).filter(Boolean) ?? [];
    return Array.from(new Set([...fromSlides, ...fromItems])) as string[];
  }, [product.productItems, product.productSlides]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const tab = TABS.find((t) => t.label === activeTab);
    const params = new URLSearchParams();
    params.set("theme", THEME);
    if (tab && tab.value !== "All") params.set("category", tab.value);
    if (location.trim()) params.set("q", location.trim());
    if (propertyType) params.set("type", propertyType);
    if (category) params.set("filter", category);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative isolate pb-8 md:pb-10 lg:pb-12">
      <div className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[680px]">
        <div className="absolute inset-0">
          <MediaImage
            src={heroImage}
            alt={banner.backgroundImageTitle || banner.title}
            fill
            priority
            className="object-cover object-[center_35%] t3-ken"
            sizes="100vw"
            themeId={THEME}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/92 via-[#1a2332]/50 to-transparent md:via-[#1a2332]/35" />
          <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#15202b]/65 to-transparent max-md:w-full max-md:from-[#15202b]/70" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 pb-40 pt-14 md:min-h-[600px] md:px-8 md:pb-44 md:pt-16 lg:min-h-[680px] lg:px-10 lg:pb-48">
          <RevealBlur className="max-w-[34rem]">
            <p className="inline-block bg-[var(--snifty-red,#e11d2e)] px-3 py-[7px] text-[10px] font-bold uppercase tracking-[0.12em] text-white md:text-[11px]">
              {badge}
            </p>

            <h1 className="t3-serif mt-5 max-w-[14ch] text-[2.55rem] font-bold leading-[1.12] tracking-[-0.01em] text-white md:mt-6 md:text-[3.25rem] lg:text-[3.75rem]">
              {title}
            </h1>

            <Link
              href={withTheme("/about", THEME)}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-white transition hover:opacity-80"
            >
              {whyLabel}
              <FaArrowRight className="text-[11px]" aria-hidden />
            </Link>
          </RevealBlur>
        </div>
      </div>

      {/* Search panel overlapping bottom */}
      <div className="relative z-20 -mt-[7.5rem] px-4 md:-mt-32 md:px-8 lg:-mt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-t-[14px] rounded-b-[10px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
            <div className="flex gap-0 overflow-x-auto border-b border-[#eef0f3] px-2 sm:px-4">
              {TABS.map((tab) => {
                const active = tab.label === activeTab;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(tab.label)}
                    className={`relative shrink-0 px-4 py-3.5 text-[13px] font-bold tracking-wide transition sm:px-5 md:px-6 md:py-4 md:text-sm ${
                      active ? "text-[#1f2937]" : "text-[#6b7280] hover:text-[#1f2937]"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-4 bottom-0 h-[2.5px] bg-[var(--snifty-red,#e11d2e)] transition md:inset-x-5 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={onSearch}
              className="grid grid-cols-1 gap-3 p-3 sm:p-4 md:grid-cols-[1.35fr_1fr_1fr_auto] md:items-center md:gap-3 md:p-5"
            >
              <label className="relative flex min-h-[52px] items-center gap-2.5 rounded-md border border-[#e5e7eb] px-3.5 focus-within:border-[var(--snifty-red,#e11d2e)]">
                <FaLocationDot
                  className="shrink-0 text-[var(--snifty-red,#e11d2e)]"
                  aria-hidden
                />
                <input
                  type="text"
                  list="t3-hero-cities"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Type City Or Area"
                  className="w-full bg-transparent py-3 text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af]"
                />
                <datalist id="t3-hero-cities">
                  {cityOptions.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </label>

              <label className="relative flex min-h-[52px] items-center rounded-md border border-[#e5e7eb] focus-within:border-[var(--snifty-red,#e11d2e)]">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-3.5 pr-9 text-sm text-[#1f2937] outline-none"
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="pointer-events-none absolute right-3.5 text-[10px] text-[#6b7280]"
                  aria-hidden
                />
              </label>

              <label className="relative flex min-h-[52px] items-center rounded-md border border-[#e5e7eb] focus-within:border-[var(--snifty-red,#e11d2e)]">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent py-3 pl-3.5 pr-9 text-sm text-[#1f2937] outline-none"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="pointer-events-none absolute right-3.5 text-[10px] text-[#6b7280]"
                  aria-hidden
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-md bg-[var(--snifty-red,#e11d2e)] px-7 text-sm font-bold text-white transition hover:brightness-110 md:min-w-[140px]"
              >
                <FaMagnifyingGlass className="text-[13px]" aria-hidden />
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--snifty-red,#e11d2e)] text-white shadow-[0_10px_24px_rgba(225,29,46,0.35)] transition hover:brightness-110 md:bottom-8 md:right-8"
      >
        <FaArrowUp className="text-sm" />
      </button>
    </section>
  );
}
