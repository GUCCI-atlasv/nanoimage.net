export type CategoryHubScenario = {
  question: string
  toolSlug: string
}

export type CategoryHubFaq = { q: string; a: string }

export type CategoryHubPageContent = {
  seo: {
    title: string
    description: string
    h1: string
    hero: string
  }
  introMarkdown: string
  scenarios: CategoryHubScenario[]
  faqs: CategoryHubFaq[]
  howItWorks: [string, string, string]
}

/** English is the source of truth and must define every field. */
export type CategoryHubPages = Record<string, CategoryHubPageContent>

/**
 * Non-English locales may translate a category partially — in practice `seo`
 * first, since that is what search engines read, with long-form body copy
 * following later. `getCategoryHubPageContent` merges these over the English
 * entry field by field, so a locale that ships only `seo` still gets a unique
 * title and meta description instead of inheriting the English page wholesale.
 */
export type PartialCategoryHubPageContent = Partial<Omit<CategoryHubPageContent, 'seo'>> & {
  seo?: Partial<CategoryHubPageContent['seo']>
}

export type CategoryHubPagesPartial = Record<string, PartialCategoryHubPageContent>

export type CategoryHubCategoryId =
  | 'optimize-images'
  | 'edit-images'
  | 'convert-formats'
  | 'create-more'
  | 'privacy-protection'
  | 'ai-tools'
  | 'video-tools'
