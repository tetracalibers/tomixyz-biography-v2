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

const project = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/project" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      meta: z
        .object({
          title: z.string().optional(),
          description: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]),
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      github: z.string().url().optional()
    })
})

export const collections = { page, project }
