"use client";

import MediaImage from "@/components/MediaImage";
import { FaArrowRight } from "react-icons/fa";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

const MINT = "#a8d5ba";

export default function About({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.aboutPage;
  const about = data.about;
  const phone =
    data.footer.footerContact.phone || data.topbar.phone || "555-555-5555";

  const heroImage =
    about.backgroundImage ||
    page.sideImage ||
    data.product.productSlides?.[0]?.image ||
    "";
  const statsImage =
    about.sideImage ||
    page.sideImage ||
    data.product.productSlides?.[1]?.image ||
    heroImage;

  const stats = data.whyChooseUs.whyChooseUsItems.slice(0, 4).map((item) => ({
    value: item.stat,
    label: item.title,
  }));

  const quotes = data.testimonial.testimonialItems.slice(0, 3);
  const team = data.team;
  const people = team.teamItems;
  const gallery = data.gallery.galleryItems;

  return (
    <div className="bg-white">
      {/* ——— Who we are ——— */}
      <section className="bg-[#1a1a1a] px-4 pt-14 text-white md:px-8 md:pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[2.35rem] font-bold tracking-[-0.02em] md:text-[2.85rem]">
            Who we are
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-[1.8] text-white/65 md:text-base">
            {page.desc || about.desc}
          </p>
        </div>
        <div className="relative mx-auto mt-12 aspect-[21/9] max-w-6xl overflow-hidden bg-[#2a2a2a] md:mt-14 md:aspect-[2.4/1]">
          <MediaImage
            src={heroImage}
            alt={about.backgroundImageTitle || page.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1152px"
            themeId={theme}
            priority
          />
        </div>
      </section>

      {/* ——— Our people ——— */}
      <section className="bg-white px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            {team.title}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:mt-12 md:grid-cols-4 md:gap-8">
            {people.map((person) => (
              <article key={person.name} className="text-center">
                <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden bg-[#f3f1ed]">
                  <MediaImage
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 45vw, 220px"
                    themeId={theme}
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-[#141414] md:text-base">
                  {person.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Stats + image ——— */}
      <section className="bg-[#1a1a1a] px-4 py-14 text-white md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-14">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-[2.5rem] font-bold leading-none tracking-tight md:text-[3rem]">
                  {item.value}
                </p>
                <span
                  className="mx-auto mt-3 block h-[2px] w-10"
                  style={{ backgroundColor: MINT }}
                />
                <p className="mt-3 text-sm text-white/80 md:text-[0.95rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            {/* Orange diagonal hash — top right */}
            <div
              className="pointer-events-none absolute -right-3 -top-3 z-0 h-24 w-28 md:-right-5 md:-top-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 5px, #ff9a14 5px, #ff9a14 6px)",
              }}
              aria-hidden
            />
            <div className="relative z-10 aspect-[3/4] overflow-hidden bg-[#2a2a2a]">
              <MediaImage
                src={statsImage}
                alt={about.sideImageTitle || "Our work"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
                themeId={theme}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section className="bg-white px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-[2rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.35rem]">
            Testimonials
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {quotes.map((item, i) => {
              const image =
                gallery[i]?.image ||
                data.product.productSlides?.[i]?.image ||
                item.image;
              return (
                <article key={item.name} className="flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-[#f3f1ed]">
                    <MediaImage
                      src={image}
                      alt={gallery[i]?.alt || item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      themeId={theme}
                    />
                  </div>
                  <p
                    className="mt-5 text-4xl leading-none"
                    style={{ color: MINT }}
                    aria-hidden
                  >
                    &ldquo;
                  </p>
                  <p className="mt-3 text-sm leading-[1.75] text-[#141414]/70">
                    {item.quote}
                  </p>
                  <p className="mt-5 text-sm font-medium text-[#141414] underline underline-offset-4">
                    {item.name}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Contact form ——— */}
      <section className="relative overflow-hidden bg-[#1a1a1a] px-4 py-12 text-white md:px-8 md:py-14 lg:px-10 lg:py-16">
        <div
          className="pointer-events-none absolute right-0 top-0 h-28 w-40 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,255,255,0.2) 6px, rgba(255,255,255,0.2) 7px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-0">
          <div
            className="pointer-events-none absolute left-1/2 top-[12%] hidden h-[76%] w-px -translate-x-1/2 bg-white/70 lg:block"
            style={{ transform: "translateX(-50%) rotate(18deg)" }}
            aria-hidden
          />

          <div className="lg:pr-16">
            <h2 className="max-w-md text-[1.85rem] font-bold leading-[1.15] tracking-[-0.02em] md:text-[2.2rem]">
              Let&apos;s talk about your project
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Fill out the form, or call us to set up a meeting at{" "}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="underline decoration-white/50 underline-offset-4 transition hover:text-[#ff9a14] hover:decoration-[#ff9a14]"
              >
                {phone}
              </a>
            </p>
          </div>

          <div className="lg:pl-16">
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <UnderlineField id="about-name" label="Full name" />
              <UnderlineField id="about-phone" label="Phone number" type="tel" />
              <UnderlineField id="about-email" label="Email" type="email" />
              <UnderlineField id="about-message" label="Message" textarea />

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  aria-label="Send message"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff9a14] text-[#141414] transition hover:bg-[#f08a00]"
                >
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function UnderlineField({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const line =
    "w-full border-0 border-b border-white/35 bg-transparent px-0 pb-2 pt-1 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#ff9a14]";

  return (
    <div>
      <label htmlFor={id} className="text-sm text-white/85">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={label}
          rows={2}
          className={`${line} mt-2 resize-y`}
        />
      ) : (
        <input id={id} name={label} type={type} className={`${line} mt-2`} />
      )}
    </div>
  );
}
