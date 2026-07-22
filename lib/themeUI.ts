import type { ThemeId } from "@/lib/types";

/** Shared UI tokens so inner pages match each homepage theme */
export type ThemeUI = {
  isDark: boolean;
  accent: string;
  accentSoft: string;
  iconBg: string;
  card: string;
  title: string;
  muted: string;
  subtle: string;
  btn: string;
  btnSecondary: string;
  input: string;
  badge: string;
  badgeDark: string;
  border: string;
  /** Absolute header on home — inner pages need sticky instead */
  overlayHeader: boolean;
  page: string;
  intro: string;
  section: string;
  grid: string;
  cardPad: string;
  banner: string;
};

export const themeUI: Record<ThemeId, ThemeUI> = {
  "template-1": {
    isDark: false,
    accent: "text-[#c44536]",
    accentSoft: "bg-[#c44536]/10 text-[#c44536]",
    iconBg: "bg-[#c44536]/10 text-[#c44536]",
    card: "bg-white shadow-sm rounded-2xl",
    title: "text-[#141414]",
    muted: "text-[#141414]/65",
    subtle: "text-[#141414]/45",
    btn: "bg-[#141414] hover:bg-black text-white rounded-full",
    btnSecondary: "border border-[#141414]/15 text-[#141414] hover:bg-[#141414]/5 rounded-full",
    input: "border-[#141414]/15 bg-white text-[#141414] placeholder:text-[#141414]/40",
    badge: "bg-[#c44536] text-white",
    badgeDark: "bg-[#141414] text-white",
    border: "border-[#141414]/10",
    overlayHeader: false,
    page: "mx-auto max-w-7xl px-4 py-12 md:py-16",
    intro: "mb-8 max-w-2xl",
    section: "mt-12",
    grid: "gap-6",
    cardPad: "p-6",
    banner: "bg-[#141414] py-12 md:py-16",
  },
};

export function getThemeUI(theme: ThemeId): ThemeUI {
  return themeUI[theme];
}
