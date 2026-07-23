import type { CSSProperties } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import Header from "@/themes/template-2/Header";
import Footer from "@/themes/template-2/Footer";
import Hero from "@/themes/template-2/sections/Hero";
import About from "@/themes/template-2/sections/About";
import Services from "@/themes/template-2/sections/Services";
import HowItWorks from "@/themes/template-2/sections/HowItWorks";
import Projects from "@/themes/template-2/sections/Projects";
import Testimonials from "@/themes/template-2/sections/Testimonials";
import ContactSection from "@/themes/template-2/sections/Contact";

export default function Template2({ data }: { data: ResolvedSiteData }) {
  return (
    <div
      className="theme-t2 min-h-screen overflow-x-clip bg-white text-[#141414]"
      style={data.variables as CSSProperties}
    >
      <Header data={data} variant="solid" />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Services data={data} />
        <HowItWorks data={data} />
        <Projects data={data} />
        <Testimonials data={data} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
