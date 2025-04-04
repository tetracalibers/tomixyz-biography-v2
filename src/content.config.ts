import { defineCollection, reference, z } from "astro:content"
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

const event = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/event" }),
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
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      slide: z.string().url().optional(),
      archive: z.string().url().optional(),
      youtube: z.string().url().optional(),
      github: z.string().url().optional(),
      tags: z.array(z.string()).default([])
    })
})

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      meta: z
        .object({
          title: z.string().optional(),
          description: z.string().optional()
        })
        .optional(),
      date: z.string(),
      category: z.enum(["essay", "tech"])
    })
})

const recipe = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/recipe" }),
  schema: () =>
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
      series: reference("series").optional(),
      draft: z.boolean().default(false),
      private: z.boolean().default(false)
    })
})

const writing = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./src/content/writing",
    generateId: ({ entry }) => entry.replace(/\.yaml$/, "")
  }),
  schema: () =>
    z
      .object({
        title: z.string(),
        sublabel: z.string().optional(),
        url: z.string().url(),
        date: z.string(),
        tags: z.array(z.string()).default([])
      })
      .array()
})

export const collections = { page, project, event, blog, recipe, writing }
