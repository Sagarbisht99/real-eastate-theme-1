import { resolveSiteData, resolveCategory } from "@/lib/data";
import { resolveTheme } from "@/lib/theme";
import PageShell from "@/components/PageShell";
import ServicesContent from "@/components/pages/ServicesContent";

type Props = {
  searchParams: Promise<{ theme?: string; category?: string }>;
};

export default async function ServicesPage({ searchParams }: Props) {
  const params = await searchParams;
  const theme = resolveTheme(params.theme);
  const category = resolveCategory(params.category);
  const data = resolveSiteData(theme, category);

  return (
    <PageShell
      theme={theme}
      data={data}
      title={data.servicePage.title}
      eyebrow={data.servicePage.pretitle}
    >
      <ServicesContent data={data} theme={theme} />
    </PageShell>
  );
}
