import Breadcrumb from "@/components/Breadcrumb";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Career({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.careerPage;
  const contact = data.footer.footerContact;
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;
  const applyLabel = page.applyLabel || "Apply now";

  return (
    <div className="bg-white">
      <section className="px-4 pb-4 pt-14 md:px-8 md:pt-16 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb items={page.breadcrumb} theme={theme} />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c44536]">
            {page.pretitle}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#141414] md:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 text-[#141414]/65">{page.desc}</p>
          {page.desc2 && (
            <p className="mt-3 text-sm leading-relaxed text-[#141414]/55">{page.desc2}</p>
          )}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-4">
          {page.jobs.map((job) => (
            <article
              key={job.title}
              className="flex flex-col gap-4 rounded-2xl bg-[#faf8f4] p-5 md:flex-row md:items-center md:justify-between md:p-6"
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-[#141414]">{job.title}</h2>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#141414]/50">
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-[#c44536]" aria-hidden />
                    {job.location}
                  </span>
                  <span>·</span>
                  <span>{job.type}</span>
                </p>
                <p className="mt-2 text-sm text-[#141414]/65">{job.desc}</p>
              </div>
              <a
                href="#reach-us"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
              >
                {job.buttonLabel || applyLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Reach us — Apply now scrolls here */}
      <section id="reach-us" className="scroll-mt-24 px-4 pb-16 pt-4 md:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.25rem] bg-[#141414] px-6 py-10 text-white md:px-10 md:py-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c44536]">
            {data.contactPage.reachPretitle || "Reach us"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            {data.contactPage.reachTitle || "Reach us at"}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
            {data.contactPage.reachDesc || page.desc2}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-3 text-base font-medium text-white transition hover:text-[#c44536]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#c44536]">
                <FaPhoneAlt className="text-sm" aria-hidden />
              </span>
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 text-base font-medium text-white transition hover:text-[#c44536]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#c44536]">
                <FaEnvelope className="text-sm" aria-hidden />
              </span>
              {contact.email}
            </a>
          </div>

          {contact.location && (
            <p className="mt-6 text-sm text-white/45">{contact.location}</p>
          )}
        </div>
      </section>
    </div>
  );
}
