export type LinkItem = {
  label: string;
  href: string;
  /** Nested links render as a dropdown in header nav */
  children?: LinkItem[];
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
  href?: string;
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
  officeLabel?: string;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonLabel?: string;
  newsletterConsentPrefix?: string;
  newsletterDesc?: string;
  disclaimerTitle?: string;
  disclaimerText?: string;
  legalTitle?: string;
  contactLabel?: string;
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
  storyLabel?: string;
  missionPretitle?: string;
  missionTitle?: string;
  missionDesc?: string;
  missionPoints?: { title: string; desc: string }[];
  /** "Learn more" style button → dedicated /mission page (not in header) */
  missionButton?: ButtonItem;
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  breadcrumb?: LinkItem[];
};

export type CustomPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  searchPlaceholder?: string;
  featuredLabel?: string;
  listLabel?: string;
  emptyMessage?: string;
  readMoreLabel?: string;
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  breadcrumb?: LinkItem[];
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
  breadcrumb?: LinkItem[];
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
  reachPretitle?: string;
  reachTitle?: string;
  reachDesc?: string;
  formPretitle?: string;
  formTitle?: string;
  formDesc?: string;
  successTitle?: string;
  successDesc?: string;
  consentPrefix?: string;
  officeLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
  breadcrumb?: LinkItem[];
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

export type TeamItem = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export type TeamDepartment = {
  name: string;
  desc: string;
};

export type TeamData = {
  pretitle: string;
  title: string;
  desc: string;
  teamItems: TeamItem[];
  departments?: TeamDepartment[];
  breadcrumb?: LinkItem[];
};

export type GalleryPageItem = {
  image: string;
  alt: string;
  title: string;
  category: string;
};

export type GalleryPageData = {
  pretitle: string;
  title: string;
  desc: string;
  categories: string[];
  galleryItems: GalleryPageItem[];
  breadcrumb?: LinkItem[];
};

export type AwardItem = {
  year: string;
  title: string;
  org: string;
  desc: string;
  image: string;
};

export type AwardsPageData = {
  pretitle: string;
  title: string;
  desc: string;
  awardItems: AwardItem[];
  breadcrumb?: LinkItem[];
};

export type MissionPoint = {
  title: string;
  desc: string;
};

export type MissionPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2?: string;
  sideImage: string;
  sideImageTitle: string;
  pillarsPretitle?: string;
  pillarsTitle?: string;
  pillars: MissionPoint[];
  valuesPretitle?: string;
  valuesTitle?: string;
  values: MissionPoint[];
  ctaPretitle?: string;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaButton?: ButtonItem;
  breadcrumb?: LinkItem[];
};

export type CareerBenefit = {
  title: string;
  desc: string;
};

export type CareerJob = {
  title: string;
  location: string;
  type: string;
  desc: string;
  href: string;
  buttonLabel?: string;
};

export type CareerPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  benefits: CareerBenefit[];
  jobs: CareerJob[];
  applyLabel?: string;
  breadcrumb?: LinkItem[];
};

export type CsrStat = {
  stat: string;
  label: string;
};

export type CsrProgram = {
  title: string;
  desc: string;
  image: string;
  amount: string;
};

export type CsrDonateCta = {
  title: string;
  desc: string;
  buttonLabel: string;
  buttonHref: string;
};

export type CsrPageData = {
  pretitle: string;
  title: string;
  desc: string;
  desc2: string;
  sideImage: string;
  sideImageTitle: string;
  impactStats: CsrStat[];
  programs: CsrProgram[];
  donateCta: CsrDonateCta;
  breadcrumb?: LinkItem[];
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
  breadcrumb?: LinkItem[];
};

export type WhyChooseUsSection = {
  pretitle: string;
  title: string;
  desc: string;
  whyChooseUsItems: { title: string; desc: string; stat: string }[];
};

export type GalleryItem = {
  image: string;
  alt: string;
  title: string;
  date?: string;
  href?: string;
};

export type GallerySection = {
  pretitle: string;
  title: string;
  desc: string;
  galleryItems: GalleryItem[];
  buttons?: ButtonItem[];
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
  breadcrumb?: LinkItem[];
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
  Team: TeamData;
  GalleryPage: GalleryPageData;
  AwardsPage: AwardsPageData;
  CareerPage: CareerPageData;
  CsrPage: CsrPageData;
  MissionPage: MissionPageData;
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
  team: TeamData;
  galleryPage: GalleryPageData;
  awardsPage: AwardsPageData;
  careerPage: CareerPageData;
  csrPage: CsrPageData;
  missionPage: MissionPageData;
  aboutPage: AboutPageData;
  customPage: CustomPageData;
  servicePage: ServicePageData;
  contactPage: ContactPageData;
  privacyPage: LegalPageData;
  termsPage: LegalPageData;
};

export type ThemeId = "template-1" | "template-2";

export const THEMES: { id: ThemeId; name: string; description: string }[] = [
  {
    id: "template-1",
    name: "HAUS Group",
    description: "Syne · warm geometric real estate with blog",
  },
  {
    id: "template-2",
    name: "re/room",
    description: "Orange accent · Poppins · renovation layout",
  },
];

export const CATEGORIES: CategoryId[] = ["Realestate", "Business", "School"];

/** Change this to switch the default homepage theme */
export const ACTIVE_THEME: ThemeId = "template-2";

/** Change this to switch the default content category */
export const ACTIVE_CATEGORY: CategoryId = "Realestate";