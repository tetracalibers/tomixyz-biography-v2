import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const page = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: z
      .object({
        title: z.string().optional(),
        description: z.string().optional()
      })
      .optional()
  })
})

export const collections = { page }
