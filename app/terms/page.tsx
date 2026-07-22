import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme, themeShellClass } from "@/lib/theme";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import LegalPageContent from "@/components/pages/LegalPageContent";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function TermsPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);

  return (
    <div id="top" className={themeShellClass[theme]}>
      <Header data={data} variant="solid" />
      <main>
        <LegalPageContent data={data} theme={theme} page={data.termsPage} />
      </main>
      <Footer data={data} />
    </div>
  );
}
