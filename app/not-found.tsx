import { resolveSiteData } from "@/lib/data";
import { themeShellClass } from "@/lib/theme";
import ErrorContent from "@/components/pages/ErrorContent";
import Header1 from "@/themes/template-1/Header";
import Footer1 from "@/themes/template-1/Footer";

const NOT_FOUND_INFO = {
  code: "404",
  title: "Not Found",
  description: "Page not found",
  cta: "Go Home",
};

export default function NotFound() {
  const data = resolveSiteData();
  const theme = data.themeId;

  return (
    <div id="top" className={themeShellClass[theme]}>
      <Header1 data={data} />
      <ErrorContent theme={theme} info={NOT_FOUND_INFO} />
      <Footer1 data={data} />
    </div>
  );
}
