import type { ComponentType } from "react";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { themeShellClass } from "@/lib/theme";
import Home from "@/themes/template-2";
import Header from "@/themes/template-2/Header";
import Footer from "@/themes/template-2/Footer";
import PageBanner from "@/themes/template-2/pages/PageBanner";
import About from "@/themes/template-2/pages/About";
import Contact from "@/themes/template-2/pages/Contact";
import Properties from "@/themes/template-2/pages/Properties";
import Blog from "@/themes/template-2/pages/Blog";
import Services from "@/themes/template-2/pages/Services";
import Privacy from "@/themes/template-2/pages/Privacy";
import Terms from "@/themes/template-2/pages/Terms";
import ErrorPage from "@/themes/template-2/pages/Error";
import Gallery from "@/themes/template-2/pages/Gallery";
import Team from "@/themes/template-2/pages/Team";
import Awards from "@/themes/template-2/pages/Awards";
import Career from "@/themes/template-2/pages/Career";
import Csr from "@/themes/template-2/pages/Csr";
import type { ThemePack } from "@/themes/template-1/registry";

type HeaderProps = { data: ResolvedSiteData; variant?: "overlay" | "solid" };
type FooterProps = { data: ResolvedSiteData };
type PageProps = { data: ResolvedSiteData; theme: ThemeId };
type ErrorProps = {
  theme: ThemeId;
  info: { code: string; title: string; description: string; cta: string };
  onRetry?: () => void;
};

export const template2Pack: ThemePack = {
  id: "template-2",
  shellClass: themeShellClass["template-2"],
  Home,
  Header: Header as ComponentType<HeaderProps>,
  Footer: Footer as ComponentType<FooterProps>,
  PageBanner,
  pages: {
    About: About as ComponentType<PageProps>,
    Contact: Contact as ComponentType<PageProps>,
    Properties: Properties as ComponentType<PageProps>,
    Blog: Blog as ComponentType<PageProps>,
    Services: Services as ComponentType<PageProps>,
    Privacy: Privacy as ComponentType<PageProps>,
    Terms: Terms as ComponentType<PageProps>,
    Error: ErrorPage as ComponentType<ErrorProps>,
    Gallery: Gallery as ComponentType<PageProps>,
    Team: Team as ComponentType<PageProps>,
    Awards: Awards as ComponentType<PageProps>,
    Career: Career as ComponentType<PageProps>,
    Csr: Csr as ComponentType<PageProps>,
  },
};
