import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import { getThemePack } from "@/themes";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);
  const pack = getThemePack(theme);
  const { Header, Footer, PageBanner, pages } = pack;
  const Services = pages.Services;

  return (
    <div id="top" className={pack.shellClass}>
      <Header data={data} variant="solid" />
      <PageBanner
        theme={theme}
        title={data.servicePage.title}
        eyebrow={data.servicePage.pretitle}
      />
      <main>
        <Services data={data} theme={theme} />
      </main>
      <Footer data={data} />
    </div>
  );
}
