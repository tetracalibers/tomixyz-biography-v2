import { type CollectionEntry, type CollectionKey } from "astro:content"

export const makeEntryMap = <T extends CollectionKey>(collection: CollectionEntry<T>[]) => {
  return collection.reduce((acc, entry) => {
    acc.set(entry.id, entry)
    return acc
  }, new Map<string, CollectionEntry<T>>())
}
