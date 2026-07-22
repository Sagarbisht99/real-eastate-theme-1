import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme, themeShellClass } from "@/lib/theme";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import BlogContent from "@/components/pages/BlogContent";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);

  return (
    <div id="top" className={themeShellClass[theme]}>
      <Header data={data} variant="solid" />
      <main>
        <BlogContent data={data} theme={theme} />
      </main>
      <Footer data={data} />
    </div>
  );
}
