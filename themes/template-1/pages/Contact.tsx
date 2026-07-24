"use client";

import { useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import Breadcrumb from "@/components/Breadcrumb";
import { withTheme } from "@/lib/theme";
import type { FormField, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMinus,
  FaPhoneAlt,
  FaPlus,
} from "react-icons/fa";

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = field.label.toLowerCase().replace(/\s+/g, "-");
  const isTextarea = field.type === "textarea";

  return (
    <div className={isTextarea ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/45"
      >
        {field.label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full resize-none border-b border-[#141414]/15 bg-transparent py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536]"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full border-b border-[#141414]/15 bg-transparent py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#c44536]"
        />
      )}
    </div>
  );
}

export default function ContactContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.contactPage;
  const contact = page.footerContact;
  const { faq, footer } = data;
  const privacyLink = footer.footerLegalLinks.find((l) =>
    l.label.toLowerCase().includes("privacy")
  );

  const [openFaq, setOpenFaq] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  }

  const infoCards = [
    {
      icon: FaMapMarkerAlt,
      label: page.officeLabel,
      value: contact.location,
      href: undefined as string | undefined,
    },
    {
      icon: FaPhoneAlt,
      label: page.phoneLabel,
      value: contact.phone,
      href: phoneHref,
    },
    {
      icon: FaEnvelope,
      label: page.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ].filter((item) => item.label && item.value);

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-[#141414]/10">
        <div className="absolute inset-0 bg-[#faf8f4]" />
        {page.sideImage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-[0.18] lg:block">
            <MediaImage
              themeId={theme}
              src={page.sideImage}
              alt=""
              fill
              className="object-cover"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f4] via-[#faf8f4]/70 to-transparent" />
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-4 pb-7 pt-8 md:px-8 md:pb-8 md:pt-8 lg:px-10">
          <Breadcrumb items={page.breadcrumb} theme={theme} />
          <div className="mt-8 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
              {page.pretitle}
            </p>
            <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem] lg:text-[3.6rem]">
              {page.title}
            </h1>
            <span className="mt-6 block h-[2px] w-10 bg-[#c44536]" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#141414]/65 md:text-lg">
              {page.desc}
            </p>
            <a
              href="#write-us"
              className="mt-8 inline-flex items-center gap-2 bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              {page.formTitle}
              <FaArrowRight className="text-[10px]" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick reach cards */}
      <section className="border-b border-[#141414]/10 px-4 py-7 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {page.reachPretitle}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#141414] md:text-3xl">
                {page.reachTitle}
              </h2>
            </div>
            {page.reachDesc && (
              <p className="max-w-md text-sm leading-relaxed text-[#141414]/55">
                {page.reachDesc}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {infoCards.map((item) => {
              const Icon = item.icon;
              const className =
                "group flex h-full flex-col border border-[#141414]/10 bg-[#faf8f4] p-6 transition hover:border-[#c44536]/40 hover:bg-white";
              const body = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center border border-[#141414]/10 bg-white text-[#c44536] transition group-hover:border-[#c44536] group-hover:bg-[#c44536] group-hover:text-white">
                    <Icon className="text-sm" aria-hidden />
                  </span>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#141414]/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base font-semibold leading-snug text-[#141414]">
                    {item.value}
                  </p>
                </>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className={className}>
                  {body}
                </a>
              ) : (
                <div key={item.label} className={className}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="write-us"
        className="scroll-mt-24 border-b border-[#141414]/10 bg-[#faf8f4] px-4 py-7 md:px-8 md:py-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {page.formPretitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#141414] md:text-4xl">
              {page.formTitle}
            </h2>
            {page.formDesc && (
              <p className="mt-4 text-sm leading-relaxed text-[#141414]/60 md:text-base">
                {page.formDesc}
              </p>
            )}
            {page.sideImage && (
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden bg-[#efeae2] lg:block">
                <MediaImage
                  themeId={theme}
                  src={page.sideImage}
                  alt={page.sideImageTitle || page.title}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            )}
          </div>

          <div className="border border-[#141414]/8 bg-white p-6 md:p-8 lg:p-10">
            {submitted ? (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center bg-[#c44536] text-white">
                  <FaArrowRight className="text-sm" aria-hidden />
                </span>
                <p className="mt-5 text-2xl font-semibold text-[#141414]">
                  {page.successTitle}
                </p>
                {page.successDesc && (
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#141414]/60">
                    {page.successDesc}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {page.formFields.map((field) => (
                    <Field
                      key={field.label}
                      field={field}
                      value={values[field.label] ?? ""}
                      onChange={(v) =>
                        setValues((prev) => ({ ...prev, [field.label]: v }))
                      }
                    />
                  ))}
                </div>

                <label className="mt-8 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#141414]/55">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 border-[#141414]/25 accent-[#c44536]"
                  />
                  <span>
                    {page.consentPrefix}{" "}
                    <Link
                      href={withTheme(privacyLink?.href || "/privacy", theme)}
                      className="underline underline-offset-2 transition hover:text-[#141414]"
                    >
                      {privacyLink?.label || data.privacyPage.title}
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-[#141414] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {page.formSubmitLabel}
                  <FaArrowRight className="text-[10px]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.faqItems.length > 0 && (
        <section className="border-b border-[#141414]/10 px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {faq.pretitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                {faq.title}
              </h2>
            </div>

            <div className="divide-y divide-[#141414]/10 border-y border-[#141414]/10">
              {faq.faqItems.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:opacity-80"
                    >
                      <span className="text-sm font-semibold text-[#141414] md:text-base">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border text-[10px] transition ${
                          isOpen
                            ? "border-[#c44536] bg-[#c44536] text-white"
                            : "border-[#141414]/15 text-[#141414]/60"
                        }`}
                      >
                        {isOpen ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="pb-5 pr-12 text-sm leading-relaxed text-[#141414]/60">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {(footer.newsletterTitle || footer.newsletterButtonLabel) && (
        <section className="px-4 py-7 md:px-8 md:py-8 lg:px-10">
          <div className="mx-auto max-w-7xl bg-[#141414] px-6 py-12 md:px-12 md:py-14">
            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                {footer.newsletterTitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                    {footer.newsletterTitle}
                  </p>
                )}
                <h3 className="mt-4 max-w-lg text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {footer.newsletterDesc || footer.desc}
                </h3>
              </div>

              {newsletterDone ? (
                <p className="text-sm text-white/80">{page.successTitle}</p>
              ) : (
                <form
                  className="w-full max-w-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newsletterEmail.trim()) return;
                    setNewsletterDone(true);
                    setNewsletterEmail("");
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={footer.newsletterPlaceholder}
                      className="min-w-0 flex-1 border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c44536]"
                    />
                    {footer.newsletterButtonLabel && (
                      <button
                        type="submit"
                        className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#c44536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a8382c]"
                      >
                        {footer.newsletterButtonLabel}
                        <FaArrowRight className="text-[10px]" />
                      </button>
                    )}
                  </div>
                  {(footer.newsletterConsentPrefix || privacyLink) && (
                    <p className="mt-3 text-[11px] leading-relaxed text-white/40">
                      {footer.newsletterConsentPrefix}{" "}
                      {privacyLink ? privacyLink.label.toLowerCase() : null}.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
