import { ACTIVE_THEME, type ThemeId } from "@/lib/types";

const VALID: ThemeId[] = ["template-1"];

export function resolveTheme(themeParam?: string | null): ThemeId {
  if (themeParam && VALID.includes(themeParam as ThemeId)) {
    return themeParam as ThemeId;
  }
  return ACTIVE_THEME;
}

export function withTheme(href: string, theme: ThemeId): string {
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  if (href.startsWith("http")) return href;

  const [path, hash] = href.split("#");
  const url = new URL(path || "/", "http://local");
  url.searchParams.set("theme", theme);
  const search = url.searchParams.toString();
  const base = `${url.pathname}${search ? `?${search}` : ""}`;
  return hash ? `${base}#${hash}` : base;
}

export const themeShellClass: Record<ThemeId, string> = {
  "template-1": "theme-t1 min-h-screen overflow-x-hidden bg-[#faf8f4] text-[#141414]",
};

export function cssVarsStyle(
  variables: Record<string, string>
): Record<string, string> {
  return variables;
}
