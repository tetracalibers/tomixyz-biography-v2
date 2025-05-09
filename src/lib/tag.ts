import type { ReferenceDataEntry } from "astro:content"
import { getCollection } from "astro:content"
import { filterPublic } from "./filter"

type RefTagEntry = { data: { tags: ReferenceDataEntry<"tag">[]; date: Date } }

export const getRefTagCollection = async () => {
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

export const collectTagIdsWithCount = (targets: RefTagEntry[]) => {
  const tagIdCountMap = targets.reduce((acc, entry) => {
    const tags = entry.data.tags ?? []
    tags.forEach((tag) => {
      if (acc.has(tag.id)) {
        acc.set(tag.id, acc.get(tag.id)! + 1)
      } else {
        acc.set(tag.id, 1)
      }
    })
    return acc
  }, new Map<string, number>())

  return [...tagIdCountMap.entries()].map(([id, count]) => ({ id, count }))
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
