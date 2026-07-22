"use client";

import { resolveSiteData } from "@/lib/data";
import { themeShellClass } from "@/lib/theme";
import ErrorContent from "@/components/pages/ErrorContent";
import Header1 from "@/themes/template-1/Header";
import Footer1 from "@/themes/template-1/Footer";

const SERVER_ERROR_INFO = {
  code: "500",
  title: "Server Error",
  description: "Something went wrong on our end. Please try again.",
  cta: "Go Home",
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const data = resolveSiteData();
  const theme = data.themeId;

  return (
    <div id="top" className={themeShellClass[theme]}>
      <Header1 data={data} />
      <ErrorContent theme={theme} info={SERVER_ERROR_INFO} onRetry={reset} />
      <Footer1 data={data} />
    </div>
  );
}
