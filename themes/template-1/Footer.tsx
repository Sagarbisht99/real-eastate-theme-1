"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { flattenMenuLinks } from "@/lib/nav";
import { withTheme } from "@/lib/theme";
import type { ResolvedSiteData } from "@/lib/types";

const THEME = "template-1" as const;

const socialIcon: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
  youtube: <FaYoutube />,
};

function getSocialIcon(label: string) {
  return socialIcon[label.toLowerCase()] ?? label.charAt(0).toUpperCase();
}

export default function Footer({ data }: { data: ResolvedSiteData }) {
  const { footer, topbar, header } = data;
  const contact = footer.footerContact;
  const socialLinks = footer.socialLinks?.length
    ? footer.socialLinks
    : topbar.socialLinks;
  const columns =
    footer.footerColumns.length > 0
      ? footer.footerColumns
      : [
          {
            title: "Pages",
            links: flattenMenuLinks(header.menu),
          },
        ];
  const privacyLink = footer.footerLegalLinks.find((l) =>
    l.label.toLowerCase().includes("privacy")
  );
  const legalColumn = columns.find((c) =>
    c.title.toLowerCase().includes("legal")
  );
  const navColumns = columns.filter((c) => c !== legalColumn);
  const legalLinks =
    legalColumn && legalColumn.links.length > 0
      ? legalColumn.links
      : footer.footerLegalLinks;

  return (
    <footer className="bg-[#141414] text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 pt-14 md:px-8 md:pt-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-10">
          {/* Brand + contact */}
          <div>
            <Link
              href={withTheme("/", THEME)}
              className="inline-block text-lg font-bold tracking-[0.16em] text-white"
            >
              {header.logo.toUpperCase()}
            </Link>
            {footer.desc && (
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                {footer.desc}
              </p>
            )}

            <div className="mt-7 space-y-3">
              {footer.officeLabel && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
                  {footer.officeLabel}
                </p>
              )}
              <p className="flex items-start gap-3 text-sm text-white/70">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#c44536]" aria-hidden />
                <span>{contact.location}</span>
              </p>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
              >
                <FaPhoneAlt className="shrink-0 text-[#c44536]" aria-hidden />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm text-white/70 transition hover:text-white"
              >
                <FaEnvelope className="shrink-0 text-[#c44536]" aria-hidden />
                {contact.email}
              </a>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-7 flex gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={`${s.label}-${s.href}`}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-sm text-white/80 transition hover:border-[#c44536] hover:bg-[#c44536] hover:text-white"
                  >
                    {getSocialIcon(s.label)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          {navColumns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {column.title}
              </p>
              <nav className="mt-5 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={withTheme(link.href, THEME)}
                    className="w-fit text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            {footer.newsletterTitle && (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {footer.newsletterTitle}
                </p>
                {footer.newsletterDesc && (
                  <p className="mt-5 text-sm leading-relaxed text-white/55">
                    {footer.newsletterDesc}
                  </p>
                )}
                <form
                  className="mt-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <input
                      type="email"
                      required
                      placeholder={footer.newsletterPlaceholder}
                      className="min-w-0 flex-1 border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-[#c44536]"
                    />
                    {footer.newsletterButtonLabel && (
                      <button
                        type="submit"
                        className="shrink-0 bg-[#c44536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a8382c]"
                      >
                        {footer.newsletterButtonLabel}
                      </button>
                    )}
                  </div>
                  {(footer.newsletterConsentPrefix || privacyLink) && (
                    <p className="mt-3 text-[11px] leading-relaxed text-white/40">
                      {footer.newsletterConsentPrefix}{" "}
                      {privacyLink ? (
                        <Link
                          href={withTheme(privacyLink.href, THEME)}
                          className="underline underline-offset-2 transition hover:text-white"
                        >
                          {privacyLink.label.toLowerCase()}
                        </Link>
                      ) : null}
                      .
                    </p>
                  )}
                </form>
              </>
            )}

            {/* Legal links under newsletter on smaller column sets */}
            {legalLinks.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-7 lg:mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {legalColumn?.title || footer.legalTitle}
                </p>
                <nav className="mt-4 flex flex-col gap-2.5">
                  {legalLinks.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={withTheme(link.href, THEME)}
                      className="w-fit text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        {footer.disclaimerText && (
          <div className="mt-12 border border-white/10 bg-white/[0.03] px-5 py-5 md:px-6 md:py-6">
            {footer.disclaimerTitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c44536]">
                {footer.disclaimerTitle}
              </p>
            )}
            <p className="mt-3 max-w-5xl text-xs leading-relaxed text-white/45 md:text-[0.8125rem]">
              {footer.disclaimerText}
            </p>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <p>{footer.copyrightText}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={withTheme(link.href, THEME)}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="transition hover:text-white"
              >
                {contact.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
