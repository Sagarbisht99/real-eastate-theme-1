import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import ContactContent from "@/components/pages/ContactContent";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);

  return (
    <div id="top" className="theme-t1 min-h-screen bg-[#faf8f4] text-[#141414]">
      <Header data={data} variant="solid" />
      <main>
        <ContactContent data={data} theme={theme} />
      </main>
      <Footer data={data} />
    </div>
  );
}
