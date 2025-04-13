import type { AstroComponentFactory } from "astro/runtime/server/index.js"
import { getEntries, getEntry, render, type CollectionEntry } from "astro:content"

type SeriesArticle = CollectionEntry<"recipe">
export type SeriesArticleSlug = SeriesArticle["id"]

export interface SeriesArticles {
  id: string
  data: CollectionEntry<"series">["data"]
  slugs: SeriesArticleSlug[]
  articles: SeriesArticle[]
  isFirstArticle: (slug: SeriesArticleSlug) => boolean
  getNextArticles: (slug: SeriesArticleSlug) => SeriesArticle[]
  Summary: AstroComponentFactory
}

export const collectSeriesArticles = async (seriesId: string): Promise<SeriesArticles> => {
  const series = await getEntry("series", seriesId)

  if (!series) {
    throw new Error(`series ${seriesId} not found`)
  }

  const { Content } = await render(series)

  const filterPublic = (entry: CollectionEntry<"recipe">) => {
    if (import.meta.env.DEV) return true
    return !entry.data.draft && !entry.data.private
  }

  const seriesArticles = series.data.articles.map((article) => ({ collection: article.collection, id: article.id }))
  const articleEntries = (await getEntries(seriesArticles)).filter(filterPublic)

  const slugs = seriesArticles.map((article) => article.id)

  const findIndex = (slug: SeriesArticleSlug) => slugs.indexOf(slug)
  const isFirstArticle = (slug: SeriesArticleSlug) => findIndex(slug) === 0
  const getNextArticles = (slug: SeriesArticleSlug) => articleEntries.slice(findIndex(slug) + 1)

  return {
    id: seriesId,
    data: series.data,
    slugs,
    articles: articleEntries,
    isFirstArticle,
    getNextArticles,
    Summary: Content
  }
}

export const getPrev = async (seriesId: string, current: string) => {
  const series = await getEntry("series", seriesId)
  if (!series) return null

  const seriesIds = series.data.articles.map((article) => article.id)
  const currentIndex = seriesIds.indexOf(`${seriesId}/${current}`)
  if (currentIndex === -1) return null

  const previousIndex = currentIndex - 1
  if (previousIndex < 0) return null

  const previousId = seriesIds[previousIndex]
  const previousEntry = await getEntry("recipe", previousId)
  if (!previousEntry) return null

  return {
    id: previousEntry.id,
    title: previousEntry.data.title
  }
}
