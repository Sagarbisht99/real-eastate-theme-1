import siteDataJson from "@/data/siteData.json";
import type {
  CategoryId,
  ResolvedSiteData,
  SiteData,
  ThemeId,
} from "@/lib/types";
import { ACTIVE_CATEGORY, ACTIVE_THEME, CATEGORIES } from "@/lib/types";

export const siteData = siteDataJson as unknown as SiteData;

export function getActiveTheme(override?: ThemeId): ThemeId {
  return override ?? ACTIVE_THEME;
}

export function resolveCategory(categoryParam?: string | null): CategoryId {
  if (categoryParam && CATEGORIES.includes(categoryParam as CategoryId)) {
    return categoryParam as CategoryId;
  }
  return ACTIVE_CATEGORY;
}

export function getTemplate(themeId: ThemeId) {
  const template = siteData.templates.find((t) => t.id === themeId);
  if (!template) {
    return siteData.templates[0];
  }
  return template;
}

/** Merge template + category + common into one view model for UI components */
export function resolveSiteData(
  themeId: ThemeId = ACTIVE_THEME,
  categoryId: CategoryId = ACTIVE_CATEGORY
): ResolvedSiteData {
  const template = getTemplate(themeId);
  const category = siteData.categories[categoryId] ?? siteData.categories.Realestate;
  const { common } = siteData;
  const { sections } = category;

  return {
    themeId,
    categoryId,
    template,
    variables: template.variables,
    topbar: common.Topbar,
    header: sections.Header,
    banner: sections.Banner,
    about: sections.About,
    product: sections.Product,
    whyChooseUs: sections.WhyChooseUs,
    gallery: sections.Gallery,
    formDetail: sections.FormDetail,
    faq: sections.FAQ,
    footer: common.Footer,
    testimonial: common.Testimonial,
    team: common.Team,
    galleryPage: common.GalleryPage,
    awardsPage: common.AwardsPage,
    careerPage: common.CareerPage,
    csrPage: common.CsrPage,
    missionPage: common.MissionPage,
    aboutPage: common.AboutPage,
    customPage: common.CustomPage,
    servicePage: common.ServicePage,
    contactPage: common.ContactPage,
    privacyPage: common.PrivacyPage,
    termsPage: common.TermsPage,
  };
}
