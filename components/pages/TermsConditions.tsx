import LegalPageContent from "@/components/pages/LegalPageContent";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function TermsConditions({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  return <LegalPageContent data={data} theme={theme} page={data.termsPage} />;
}
