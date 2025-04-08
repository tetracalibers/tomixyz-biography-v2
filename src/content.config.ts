import { defineCollection, reference, z } from "astro:content"
import { file, glob } from "astro/loaders"

const page = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: z
      .object({
        description: z.string()
      })
      .optional()
  })
})

const like = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/like" }),
  schema: () =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      order: z.number()
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
          description: z.string()
        })
        .optional(),
      tags: z.array(reference("tag")).default([]),
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      github: z.string().url().optional(),
      pdf: z
        .object({
          file: z.string().endsWith(".pdf"),
          label: z.string()
        })
        .optional()
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
          description: z.string()
        })
        .optional(),
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      slide: z.string().optional(),
      archive: z.string().url().optional(),
      youtube: z.string().url().optional(),
      github: z.string().url().optional(),
      tags: z.array(reference("tag")).default([])
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
          description: z.string()
        })
        .optional(),
      date: z.string()
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
          description: z.string()
        })
        .optional(),
      tags: z.array(reference("tag")).default([]),
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
        url: z.string(),
        date: z.string(),
        tags: z.array(reference("tag")).default([])
      })
      .array()
})

const tag = defineCollection({
  loader: file("./src/content/tag.yaml"),
  schema: () =>
    z.object({
      name: z.string(),
      url: z.string().url()
    })
})

export const collections = { page, like, project, event, blog, recipe, writing, tag }
