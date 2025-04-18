import type { ReferenceDataEntry } from "astro:content"
import { getCollection, type CollectionEntry } from "astro:content"

type RefTagEntry = { data: { tags: ReferenceDataEntry<"tag">[]; date: string } }

export const getRefTagCollection = async () => {
  const filterPublic = (entry: CollectionEntry<"recipe">) => {
    if (import.meta.env.DEV) return true
    return !entry.data.draft
  }

  const projects = await getCollection("project")
  const events = await getCollection("event")
  const recipes = await getCollection("recipe", filterPublic)
  const writings = (await getCollection("writing")).flatMap((file) =>
    file.data.map((data) => ({ data: { ...data }, collection: "writing" }))
  )
  return [...projects, ...events, ...recipes, ...writings].flat()
}

export const collectTagIds = (targets: RefTagEntry[]) => {
  const uniquedTagIds = targets.reduce((acc, entry) => {
    const tags = entry.data.tags ?? []
    tags.forEach((tag) => {
      acc.add(tag.id)
    })
    return acc
  }, new Set<string>())

  return [...uniquedTagIds]
}

export const includeTag = (tagId: string) => {
  return (entry: { data: { tags: ReferenceDataEntry<"tag">[] } }) => {
    const tags = entry.data.tags ?? []
    return tags.some((tag) => tag.id === tagId)
  }
}

export const filterByTag = (tagId: string, targets: RefTagEntry[]) => {
  return targets.filter(includeTag(tagId))
}
