import type { AstroComponentFactory } from "astro/runtime/server/index.js"
import { getEntries, getEntry, render, type CollectionEntry } from "astro:content"

type SeriesArticle = CollectionEntry<"recipe">
type SeriesArticleSlug = SeriesArticle["id"]

export interface SeriesArticles {
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

  const seriesArticles = series.data.articles.map((article) => ({ collection: article.collection, id: article.id }))
  const articleEntries = await getEntries(seriesArticles)

  const slugs = seriesArticles.map((article) => article.id)

  const findIndex = (slug: SeriesArticleSlug) => slugs.indexOf(slug)
  const isFirstArticle = (slug: SeriesArticleSlug) => findIndex(slug) === 0
  const getNextArticles = (slug: SeriesArticleSlug) => articleEntries.slice(findIndex(slug) + 1)

  return {
    data: series.data,
    slugs,
    articles: articleEntries,
    isFirstArticle,
    getNextArticles,
    Summary: Content
  }
}
