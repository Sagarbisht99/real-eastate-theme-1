import Image from "next/image";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";
import { getThemeUI } from "@/lib/themeUI";
import { RevealUp, Stagger, StaggerItem } from "@/lib/motion";

export default function ServicesContent({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const page = data.servicePage;
  const ui = getThemeUI(theme);

  return (
    <div className={ui.page}>
      
      <div className={`grid items-start lg:grid-cols-[1fr_1.2fr] ${ui.grid}`}>
        {page.sideImage && (
          <RevealUp className="relative aspect-4/3 overflow-hidden rounded-xl lg:aspect-3/4">
            <Image
              src={page.sideImage}
              alt={page.sideImageTitle || page.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </RevealUp>
        )}

        <div>
          <h3 className={`text-lg font-bold md:text-xl ${ui.title}`}>
            {page.productSectionTitle || page.subtitle}
          </h3>
          <Stagger className={`mt-6 grid sm:grid-cols-2 ${ui.grid}`}>
            {page.productItems.map((item) => (
              <StaggerItem key={item.title} className={`${ui.cardPad} ${ui.card}`}>
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.alt || item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${ui.accent}`}>
                  {item.category}
                </p>
                <h4 className={`mt-1 text-base font-bold ${ui.title}`}>{item.title}</h4>
                <p className={`mt-2 text-sm leading-relaxed ${ui.muted}`}>{item.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  );
}
