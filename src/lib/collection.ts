import { COMING_SOON_KEY } from "$/config"
import type { ReplaceKeys } from "$/types"
import { type CollectionEntry, type CollectionKey } from "astro:content"

export const makeEntryMap = <T extends CollectionKey>(collection: CollectionEntry<T>[]) => {
  return collection.reduce((acc, entry) => {
    acc.set(entry.id, entry)
    return acc
  }, new Map<string, CollectionEntry<T>>())
}

export type RecipeNotComingSoon = {
  data: ReplaceKeys<CollectionEntry<"recipe">["data"], "date", { date: Date }>
} & Omit<CollectionEntry<"recipe">, "data">
export const isNotComingSoon = (entry: CollectionEntry<"recipe">): entry is RecipeNotComingSoon => {
  return entry.data.date !== COMING_SOON_KEY
}
