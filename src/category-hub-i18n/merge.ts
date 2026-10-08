import type { CategoryHubPageContent } from '@/src/category-hub-i18n/types'

export type CategoryHubConfig = CategoryHubPageContent & {
  relatedCategoryIds: string[]
  blogGuideSlugs: string[]
}
