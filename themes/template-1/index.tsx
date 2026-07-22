import type { CSSProperties } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import Hero from "@/themes/template-1/sections/Hero";
import IntroCategories from "@/themes/template-1/sections/IntroCategories";
import WhyChooseUs from "@/themes/template-1/sections/WhyChooseUs";
import Solutions from "@/themes/template-1/sections/Solutions";
import Journal from "@/themes/template-1/sections/Journal";

export default function Template1({ data }: { data: ResolvedSiteData }) {
  return (
    <div
      className="theme-t1 min-h-screen overflow-x-hidden bg-white text-[#141414]"
      style={data.variables as CSSProperties}
    >
      <Header data={data} variant="solid" />
      <main>
        <Hero data={data} />
        <IntroCategories data={data} />
        <WhyChooseUs data={data} />
        <Solutions data={data} />
        <Journal data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
