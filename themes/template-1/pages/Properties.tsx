"use client";

import { useMemo, useState } from "react";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { FormField, ProductSlide, ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";

type FilterId = "all" | "For Sale" | "For Rent";

function SectionRow({
  title,
  eyebrow,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-7 md:py-8 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-12 lg:px-10">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {eyebrow}
            </p>
          )}
          <h2
            className={`text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] md:text-[3.25rem] lg:text-[3.75rem] ${
              eyebrow ? "mt-3" : ""
            }`}
          >
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function UnderlineField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = field.label.toLowerCase().replace(/\s+/g, "-");

  if (field.type === "textarea") {
    return (
      <div className="border-b border-[#141414]/20 py-4">
        <label htmlFor={id} className="block text-sm font-medium text-[#141414]">
          {field.label}
        </label>
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 min-h-[72px] w-full resize-none bg-transparent text-sm text-[#141414] outline-none placeholder:text-[#141414]/35"
        />
      </div>
    );
  }

  return (
    <div className="border-b border-[#141414]/20 py-4">
      <label htmlFor={id} className="block text-sm font-medium text-[#141414]">
        {field.label}
      </label>
      <input
        id={id}
        name={id}
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-2 w-full bg-transparent text-sm text-[#141414] outline-none placeholder:text-[#141414]/35"
      />
    </div>
  );
}

function PropertyCard({
  property,
  theme,
}: {
  property: ProductSlide;
  theme: ThemeId;
}) {
  const badge = property.category ?? "Listing";
  const cta = property.button;
  const ctaHref =
    cta?.href === "/contact" || cta?.href === "#"
      ? "#book-a-visit"
      : cta?.href || "#book-a-visit";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          themeId={theme}
          src={property.image}
          alt={property.alt || property.productTitle}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#141414]">
          {badge}
        </span>
        {property.productShippingText && (
          <span className="absolute bottom-4 left-4 rounded-full bg-[#141414]/85 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {property.productShippingText}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#c44536]">
          {property.productSubtitle}
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-[#141414] md:text-[1.35rem]">
          {property.productTitle}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#141414]/80">{property.productInfoTitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#141414]/65">
          {property.productInfoDesc}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[#141414]/8 pt-5">
          {property.productFeatures.map((feature) => (
            <div key={feature.label}>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#141414]/45">
                {feature.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#141414]">{feature.price}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#141414]/8 pt-5">
          <p className="text-lg font-semibold text-[#141414] md:text-xl">
            {property.productTotalPrice}
          </p>
          {cta && (
            <a
              href={ctaHref.startsWith("#") ? ctaHref : withTheme(ctaHref, theme)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              {cta.label}
              <FaArrowRight className="text-[10px]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PropertiesContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const product = data.product;
  const formDetail = data.formDetail;
  const { faq, whyChooseUs } = data;

  const listings = product.productSlides ?? [];
  const categories = product.productItems.map((item) => item.category).filter(Boolean);

  const filters = useMemo(() => {
    const unique = Array.from(new Set(categories));
    return ["all", ...unique] as FilterId[];
  }, [categories]);

  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [openFaq, setOpenFaq] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const filteredListings =
    activeFilter === "all"
      ? listings
      : listings.filter((item) => item.category === activeFilter);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="px-4 pb-4 pt-5 md:px-8 md:pb-5 md:pt-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Breadcrumb items={product.breadcrumb} theme={theme} />
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {product.productSubtitle}
            </p>
            <h1 className="mt-1.5 text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141414] md:text-[3rem] lg:text-[3.35rem]">
              {product.productSectionTitle}
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#141414]/65 md:text-base">
              {product.productInfoDesc}
            </p>
            {product.buttons[0] && (
              <a
                href="#book-a-visit"
                className="mt-4 inline-flex rounded-full bg-[#141414] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-black"
              >
                {product.buttons[0].label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section
        id="listings"
        className="scroll-mt-24 px-4 pb-7 pt-4 md:px-8 md:pb-8 md:pt-5 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                Listings
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#141414] md:text-3xl">
                {product.productInfoTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-[#141414] text-white"
                      : "border border-[#141414]/15 text-[#141414] hover:border-[#141414]/30"
                  }`}
                >
                  {filter === "all" ? "All properties" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((property) => (
              <PropertyCard key={property.productTitle} property={property} theme={theme} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <p className="mt-8 text-sm text-[#141414]/60">
              No properties match this filter right now. Try another category or contact our team.
            </p>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[#faf8f4] px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
            {whyChooseUs.pretitle}
          </p>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-[#141414] md:text-3xl">
            {whyChooseUs.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#141414]/65">
            {whyChooseUs.desc}
          </p>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#141414]/8 bg-[#141414]/8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.whyChooseUsItems.map((item) => (
              <div key={item.stat} className="bg-[#faf8f4] p-5 md:p-6">
                <span className="text-xs font-semibold text-[#c44536]">{item.stat}</span>
                <h3 className="mt-3 text-base font-semibold text-[#141414] md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a visit */}
      <div id="book-a-visit" className="scroll-mt-24">
        <SectionRow title={formDetail.title} eyebrow={formDetail.pretitle}>
          {submitted ? (
            <p className="text-sm text-[#141414]/70">
              Thank you — we received your request. An advisor will reach out shortly.
            </p>
          ) : (
            <div>
              <p className="mb-5 text-sm leading-relaxed text-[#141414]/65">
                {formDetail.desc}
              </p>
              <form onSubmit={handleSubmit}>
                {formDetail.formFields.map((field) => (
                  <UnderlineField
                    key={field.label}
                    field={field}
                    value={values[field.label] ?? ""}
                    onChange={(v) => setValues((prev) => ({ ...prev, [field.label]: v }))}
                  />
                ))}
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-[#141414] px-8 py-3 text-sm font-medium text-white transition hover:bg-black"
                  >
                    {formDetail.formSubmitLabel}
                  </button>
                </div>
              </form>
            </div>
          )}
        </SectionRow>
      </div>

      {/* FAQ */}
      <SectionRow title={faq.title} eyebrow={faq.pretitle} className="pb-7 md:pb-8">
        <div className="divide-y divide-[#141414]/10">
          {faq.faqItems.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-normal text-[#141414] md:text-base">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#141414]/60">
                    {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-4 text-sm leading-relaxed text-[#141414]/65">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </SectionRow>
    </div>
  );
}
