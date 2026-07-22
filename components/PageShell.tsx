import type { ComponentType, ReactNode } from "react";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { themeShellClass } from "@/lib/theme";
import PageBanner from "@/components/pages/PageBanner";
import Header1 from "@/themes/template-1/Header";
import Footer1 from "@/themes/template-1/Footer";

type HeaderProps = { data: ResolvedSiteData; variant?: "overlay" | "solid" };
type FooterProps = { data: ResolvedSiteData };

const chrome: Record<
  ThemeId,
  {
    Header: ComponentType<HeaderProps>;
    Footer: ComponentType<FooterProps>;
  }
> = {
  "template-1": { Header: Header1, Footer: Footer1 },
};

type Props = {
  theme: ThemeId;
  data: ResolvedSiteData;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  showBanner?: boolean;
};

export default function PageShell({
  theme,
  data,
  title,
  eyebrow,
  children,
  showBanner = true,
}: Props) {
  const { Header, Footer } = chrome[theme];

  return (
    <div id="top" className={themeShellClass[theme]}>
      <Header data={data} variant="solid" />
      {showBanner && <PageBanner theme={theme} title={title} eyebrow={eyebrow} />}
      <main>{children}</main>
      <Footer data={data} />
    </div>
  );
}
