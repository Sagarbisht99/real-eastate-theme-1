"use client";

import { useState } from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import { withTheme } from "@/lib/theme";
import type { FormField, ResolvedSiteData, ThemeId } from "@/lib/types";
import {
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMinus,
  FaPhoneAlt,
  FaPlus,
  FaRegCalendarAlt,
} from "react-icons/fa";

const DATES = ["May 20, 2024", "May 18, 2024"];

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
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#141414]/50">
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
          className="mt-2 w-full resize-none rounded-xl border border-[#141414]/12 bg-white px-4 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#141414]/35"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 w-full rounded-xl border border-[#141414]/12 bg-white px-4 py-3 text-sm text-[#141414] outline-none transition placeholder:text-[#141414]/35 focus:border-[#141414]/35"
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
  const { faq, gallery } = data;
  const posts = gallery.galleryItems.slice(0, 2);

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
      label: "Office",
      value: contact.location,
      href: undefined as string | undefined,
    },
    {
      icon: FaPhoneAlt,
      label: "Phone",
      value: contact.phone,
      href: phoneHref,
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <div className="bg-white">
      {/* Intro */}
      <section className="border-b border-[#141414]/10 px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536] md:text-xs">
            {page.pretitle}
          </p>
          <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#141414] md:text-[3.35rem] lg:text-[3.75rem]">
            {page.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#141414]/70 md:text-lg">
            {page.desc}
          </p>
        </div>
      </section>

      {/* Info + Form */}
      <section className="border-b border-[#141414]/10 px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Contact details — sticky while the longer form scrolls */}
          <aside className="z-10 w-full self-start lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              Reach us
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
              Office & channels
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#141414]/65">
              Prefer a call or email? Use the details below — or send a message and we will reply
              shortly.
            </p>

            <div className="mt-8 space-y-4">
              {infoCards.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#141414]/10 text-[#c44536]">
                      <Icon className="text-sm" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#141414]/45">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-[#141414] md:text-[0.95rem]">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 rounded-2xl border border-[#141414]/8 bg-[#faf8f4] p-5 transition hover:border-[#141414]/15 hover:shadow-[0_12px_30px_rgba(20,20,20,0.06)]"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-[#141414]/8 bg-[#faf8f4] p-5"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Form */}
          <div
            id="write-us"
            className="rounded-[1.25rem] border border-[#141414]/8 bg-[#faf8f4] p-6 md:rounded-[1.5rem] md:p-8 lg:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              Write us
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#141414] md:text-3xl">
              Send a message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/65">
              Share your name, contact details, and what you are looking for.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#141414]/10 bg-white p-6">
                <p className="text-lg font-semibold text-[#141414]">Message sent</p>
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/65">
                  Thank you — your message has been sent. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {page.formFields.map((field) => (
                    <Field
                      key={field.label}
                      field={field}
                      value={values[field.label] ?? ""}
                      onChange={(v) => setValues((prev) => ({ ...prev, [field.label]: v }))}
                    />
                  ))}
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#141414]/55">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#141414]/25"
                  />
                  <span>
                    By checking this box, you agree to our{" "}
                    <Link href={withTheme("/privacy", theme)} className="underline underline-offset-2">
                      Privacy Policy
                    </Link>{" "}
                    and consent to the use of your information. *
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#141414] px-7 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
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
      <section className="border-b border-[#141414]/10 bg-[#faf8f4] px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
              {faq.pretitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">{faq.title}</h2>
          </div>

          <div className="mt-10 divide-y divide-[#141414]/10 overflow-hidden rounded-2xl border border-[#141414]/8 bg-white">
            {faq.faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#faf8f4]/80 md:px-7"
                  >
                    <span className="text-sm font-medium text-[#141414] md:text-base">
                      {item.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#141414]/12 text-[#141414]/60">
                      {isOpen ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#141414]/65 md:px-7">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-b border-[#141414]/10 px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.25rem] bg-[#141414] px-6 py-12 md:rounded-[1.5rem] md:px-12 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                Newsletter
              </p>
              <h3 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white md:text-4xl">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">
                Market notes, viewing tips, and new listings — straight to your inbox.
              </p>
            </div>

            {newsletterDone ? (
              <p className="text-sm text-white/80">Thanks — you&apos;re subscribed.</p>
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
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border-b border-white/30 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white"
                />
                <p className="mt-3 text-[11px] leading-relaxed text-white/45">
                  By subscribing you agree to our privacy policy.
                </p>
                <button
                  type="submit"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#141414] transition hover:bg-white/90"
                >
                  Subscribe
                  <FaArrowRight className="text-[10px]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="px-4 py-14 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {gallery.pretitle}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
                From the blog
              </h2>
            </div>
            <Link
              href={withTheme("/blog", theme)}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141414] underline underline-offset-4 transition hover:opacity-70"
            >
              View all articles
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Link
                key={post.title}
                href={withTheme("/blog", theme)}
                className="group overflow-hidden rounded-2xl border border-[#141414]/8 bg-white transition hover:border-[#141414]/15 hover:shadow-[0_16px_40px_rgba(20,20,20,0.07)]"
              >
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <MediaImage
                      themeId={theme}
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-[#141414]/50">
                      <FaRegCalendarAlt className="text-[#c44536]" aria-hidden />
                      {DATES[i] ?? DATES[0]}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#141414] transition group-hover:text-[#c44536]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#141414]/65">
                      {post.alt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
