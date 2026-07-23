import Blog from "@/themes/template-1/sections/Blog";
import Solutions from "@/themes/template-1/sections/Solutions";
import WhyChooseUs from "@/themes/template-1/sections/WhyChooseUs";
import IntroCategories from "@/themes/template-1/sections/IntroCategories";
import Hero from "@/themes/template-1/sections/Hero";
import Team from "@/themes/template-1/sections/Team";
import Testimonials from "@/themes/template-1/sections/Testimonials";
import Footer from "@/themes/template-1/Footer";
import Header from "@/themes/template-1/Header";
import type { ResolvedSiteData } from "@/lib/types";
import type { CSSProperties } from "react";

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
        <Team data={data} />
        <Solutions data={data} />
        <Testimonials data={data} />
        <Blog data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
