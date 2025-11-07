import { COMING_SOON_KEY } from "$/config"
import type { ReplaceKeys } from "$/types"
import { type CollectionEntry, type CollectionKey } from "astro:content"

export const makeEntryMap = <T extends CollectionKey>(collection: CollectionEntry<T>[]) => {
  return collection.reduce((acc, entry) => {
    acc.set(entry.id, entry)
    return acc
  }, new Map<string, CollectionEntry<T>>())
}

export type TechNotComingSoon = {
  data: ReplaceKeys<CollectionEntry<"tech">["data"], "date", { date: Date }>
} & Omit<CollectionEntry<"tech">, "data">
export const isNotComingSoon = (entry: CollectionEntry<"tech">): entry is TechNotComingSoon => {
  return entry.data.date !== COMING_SOON_KEY
}
export const isComingSoon = (entry: CollectionEntry<"tech">) => {
  return entry.data.date === COMING_SOON_KEY
}

export const isNotDraft = (entry: CollectionEntry<"tech">) => {
  return !entry.data.draft
}
export const isDraftNotComingSoon = (entry: CollectionEntry<"tech">): entry is TechNotComingSoon => {
  return !!entry.data.draft && entry.data.date instanceof Date
}
