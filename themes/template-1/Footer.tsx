"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
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
  const pageLinks =
    footer.footerColumns[0]?.links?.length > 0
      ? footer.footerColumns[0].links
      : header.menu;
  const privacyLink = footer.footerLegalLinks.find((l) =>
    l.label.toLowerCase().includes("privacy")
  );

  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-3 md:px-8 md:py-16 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Office</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{contact.location}</p>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="mt-3 block text-sm text-white/75 transition hover:text-white"
          >
            {contact.phone}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {footer.footerColumns[0]?.title || "Pages"}
          </p>
          <nav className="mt-4 flex flex-col gap-2.5">
            {pageLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={withTheme(link.href, THEME)}
                className="text-sm text-white/75 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Newsletter
          </p>
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border-b border-white/25 bg-transparent py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white"
            />
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              By subscribing you agree to our{" "}
              {privacyLink ? (
                <Link
                  href={withTheme(privacyLink.href, THEME)}
                  className="underline underline-offset-2 transition hover:text-white"
                >
                  {privacyLink.label.toLowerCase()}
                </Link>
              ) : (
                "privacy policy"
              )}
              .
            </p>
            <button
              type="submit"
              className="mt-4 text-sm font-semibold text-white underline underline-offset-4 transition hover:opacity-80"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/45 md:flex-row md:px-8 lg:px-10">
          <p>{footer.copyrightText}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footer.footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={withTheme(link.href, THEME)}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={`${s.label}-${s.href}`}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm text-white transition hover:border-white hover:bg-white hover:text-[#141414]"
                >
                  {getSocialIcon(s.label)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
