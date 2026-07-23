import Template1 from "@/themes/template-1";
import Template2 from "@/themes/template-2";
import type { ThemeId, ResolvedSiteData } from "@/lib/types";
import type { ComponentType } from "react";

/** Homepage-only map (kept for simple home rendering) */
export const themeMap: Record<ThemeId, ComponentType<{ data: ResolvedSiteData }>> = {
  "template-1": Template1,
  "template-2": Template2,
};
