import type { ThemeId } from "@/lib/types";
import { getThemeUI } from "@/lib/themeUI";

const titleClass: Record<ThemeId, string> = {
  "template-1": "mt-2 text-3xl font-semibold text-white md:text-4xl lg:text-5xl",
  "template-2": "mt-2 text-3xl font-semibold text-white md:text-4xl lg:text-5xl",
};

const eyebrowClass: Record<ThemeId, string> = {
  "template-1": "text-xs font-semibold uppercase tracking-[0.22em] text-[#c44536]",
  "template-2": "text-xs font-semibold uppercase tracking-[0.22em] text-[#ff9a14]",
};

export default function PageBanner({
  theme,
  title,
  eyebrow,
}: {
  theme: ThemeId;
  title: string;
  eyebrow?: string;
}) {
  const ui = getThemeUI(theme);

  return (
    <section className={ui.banner}>
      <div className="mx-auto max-w-7xl px-4">
        {eyebrow && <p className={eyebrowClass[theme]}>{eyebrow}</p>}
        <h1 className={titleClass[theme]}>{title}</h1>
        <p className="mt-2 text-sm text-white/50">Home / {title}</p>
      </div>
    </section>
  );
}
