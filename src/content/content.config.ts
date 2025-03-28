import { defineCollection, z } from "astro:content"

const page = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: z.object({
      title: z.string(),
      description: z.string()
    })
  })
})

export const collections = { page }
