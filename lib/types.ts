export type LinkItem = {
  label: string;
  href: string;
};

export type ButtonItem = {
  label: string;
  href: string;
  variant?: string;
};

export type FormField = {
  label: string;
  type: string;
  placeholder: string;
};

export type ProductFeature = {
  label: string;
  price: string;
};

export type ProductSlide = {
  image: string;
  alt: string;
  productTitle: string;
  productSubtitle: string;
  productInfoTitle: string;
  productInfoDesc: string;
  productFeatures: ProductFeature[];
  productTotalPrice: string;
  productShippingText: string;
  category?: string;
  button?: ButtonItem;
};

export type ProductItem = {
  title: string;
  category: string;
  desc: string;
  image: string;
  alt: string;
};

export type BannerSlide = {
  image: string;
  video?: string;
  alt: string;
  title: string;
  desc: string;
  button?: ButtonItem;
};

export type SectionVariants = {
  Topbar: string;
  Header: string;
  Banner: string;
  About: string;
  Product: string;
  WhyChooseUs: string;
  Gallery: string;
  FormDetail: string;
  FAQ: string;
  Testimonial: string;
  Footer: string;
};

export type TemplateConfig = {
  id: ThemeId;
  numericId: number;
  title: string;
  type: string;
  image: string;
  previewimage: string;
  preview_description: string;
  prebuilt_pages: number;
  sectionVariants: SectionVariants;
  variables: Record<string, string>;
};

export type TopbarData = {
  text: string[];
  phone: string;
  email: string;
  location: string;
  socialLinks: LinkItem[];
};

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export type FooterContact = {
  location: string;
  email: string;
  phone: string;
};

export type FooterData = {
  logoImage: string;
  logoImageTitle: string;
  desc: string;
  footerColumns: FooterColumn[];
  footerContact: FooterContact;
  footerLegalLinks: LinkItem[];
  socialLinks: LinkItem[];
  whatsappLink: string;
  callLink: string;
  copyrightText: string;
};

export type AboutPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  subtitle: string;
  sideImage: string;
  sideImageTitle: string;
  philosophyTitle: string;
  philosophyDesc: string;
};

export type CustomPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
};

export type ServicePageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  subtitle: string;
  productSectionTitle: string;
  sideImage: string;
  sideImageTitle: string;
  productSlides: ProductSlide[];
  productItems: ProductItem[];
};

export type ContactPageData = {
  pretitle: string;
  title: string;
  desc: string;
  sideImage: string;
  sideImageTitle: string;
  footerContact: FooterContact;
  formSubmitLabel: string;
  formFields: FormField[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: string;
};

export type TestimonialData = {
  pretitle: string;
  title: string;
  desc: string;
  testimonialItems: TestimonialItem[];
};

export type HeaderSection = {
  logo: string;
  menu: LinkItem[];
  buttons: ButtonItem[];
};

export type BannerSection = {
  backgroundImage: string;
  backgroundImageTitle: string;
  backgroundVideo?: string;
  bannerHeight: number;
  pretitle: string;
  title: string;
  desc: string;
  buttons: ButtonItem[];
  bannerSlides: BannerSlide[];
};

export type AboutSection = {
  pretitle: string;
  title: string;
  subtitle: string;
  desc: string;
  desc2: string;
  backgroundImage: string;
  backgroundImageTitle: string;
  sideImage: string;
  sideImageTitle: string;
  philosophyTitle: string;
  philosophyDesc: string;
  buttons: ButtonItem[];
};

export type ProductSection = {
  productSectionTitle: string;
  productTitle: string;
  productSubtitle: string;
  productInfoTitle: string;
  productInfoDesc: string;
  productFeatures: ProductFeature[];
  productTotalPrice: string;
  productShippingText: string;
  productSlides?: ProductSlide[];
  productItems: ProductItem[];
  buttons: ButtonItem[];
};

export type WhyChooseUsSection = {
  pretitle: string;
  title: string;
  desc: string;
  whyChooseUsItems: { title: string; desc: string; stat: string }[];
};

export type GallerySection = {
  pretitle: string;
  title: string;
  desc: string;
  galleryItems: { image: string; alt: string; title: string }[];
};

export type FormDetailSection = {
  pretitle: string;
  title: string;
  desc: string;
  backgroundImage: string;
  backgroundImageTitle: string;
  formSubmitLabel: string;
  formFields: FormField[];
};

export type FAQSection = {
  pretitle: string;
  title: string;
  faqItems: { question: string; answer: string }[];
};

export type CategorySections = {
  Header: HeaderSection;
  Banner: BannerSection;
  About: AboutSection;
  Product: ProductSection;
  WhyChooseUs: WhyChooseUsSection;
  Gallery: GallerySection;
  FormDetail: FormDetailSection;
  FAQ: FAQSection;
};

export type CategoryId = "Realestate" | "Business" | "School";

export type CategoryConfig = {
  templates: ThemeId[];
  sections: CategorySections;
};

export type LegalSection = {
  title: string;
  desc: string;
};

export type LegalPageData = {
  pretitle: string;
  title: string;
  desc: string;
  updatedAt: string;
  sections: LegalSection[];
};

export type CommonData = {
  Topbar: TopbarData;
  Footer: FooterData;
  AboutPage: AboutPageData;
  CustomPage: CustomPageData;
  ServicePage: ServicePageData;
  ContactPage: ContactPageData;
  PrivacyPage: LegalPageData;
  TermsPage: LegalPageData;
  Testimonial: TestimonialData;
};

export type SiteData = {
  templates: TemplateConfig[];
  common: CommonData;
  categories: Record<CategoryId, CategoryConfig>;
};

/** Resolved view model passed into templates and page components */
export type ResolvedSiteData = {
  themeId: ThemeId;
  categoryId: CategoryId;
  template: TemplateConfig;
  variables: Record<string, string>;
  topbar: TopbarData;
  header: HeaderSection;
  banner: BannerSection;
  about: AboutSection;
  product: ProductSection;
  whyChooseUs: WhyChooseUsSection;
  gallery: GallerySection;
  formDetail: FormDetailSection;
  faq: FAQSection;
  footer: FooterData;
  testimonial: TestimonialData;
  aboutPage: AboutPageData;
  customPage: CustomPageData;
  servicePage: ServicePageData;
  contactPage: ContactPageData;
  privacyPage: LegalPageData;
  termsPage: LegalPageData;
};

export type ThemeId = "template-1";

export const THEMES: { id: ThemeId; name: string; description: string }[] = [
  {
    id: "template-1",
    name: "HAUS Group",
    description: "Syne · warm geometric real estate with journal",
  },
];

export const CATEGORIES: CategoryId[] = ["Realestate", "Business", "School"];

/** Change this to switch the default homepage theme */
export const ACTIVE_THEME: ThemeId = "template-1";

/** Change this to switch the default content category */
export const ACTIVE_CATEGORY: CategoryId = "Realestate";