import Template1 from "@/themes/template-1";
import type { ThemeId, ResolvedSiteData } from "@/lib/types";
import type { ComponentType } from "react";

export const themeMap: Record<ThemeId, ComponentType<{ data: ResolvedSiteData }>> = {
  "template-1": Template1,
};
