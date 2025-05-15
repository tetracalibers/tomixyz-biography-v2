import { defineCollection, reference, z } from "astro:content"
import { file, glob } from "astro/loaders"
import { COMING_SOON_KEY } from "./config"

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
      date: z.coerce.date(),
      image: image(),
      url: z.string().url().optional(),
      github: z.string().url().optional(),
      npm: z.string().url().optional(),
      pdf: z
        .object({
          file: z.string().endsWith(".pdf"),
          label: z.string()
        })
        .optional(),
      editing: z.boolean().default(false)
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
      date: z.coerce.date(),
      image: image(),
      url: z.string().url().optional(),
      slide: z.string().optional(),
      archive: z.string().url().optional(),
      youtube: z.string().url().optional(),
      github: z.string().url().optional(),
      tags: z.array(reference("tag")).default([]),
      editing: z.boolean().default(false)
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
      date: z.coerce.date()
    })
})

const _recipeBase = z.object({
  title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
  description: z.string(),
  meta: z
    .object({
      description: z.string()
    })
    .optional(),
  tags: z.array(reference("tag")).default([]),
  updated: z.coerce.date().optional(),
  series: reference("series").optional(),
  references: z
    .object({
      title: z.string(),
      url: z.string().url(),
      summary: z.string().optional()
    })
    .array()
    .optional()
})
const _recipePublic = _recipeBase.extend({
  date: z.coerce.date(),
  draft: z.literal(false).optional()
})
const _recipeDraft = _recipeBase.extend({
  date: z.coerce.date().or(z.literal(COMING_SOON_KEY)),
  draft: z.literal(true)
})

const recipe = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/recipe" }),
  schema: () => z.discriminatedUnion("draft", [_recipePublic, _recipeDraft])
})

const series = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/series" }),
  schema: () =>
    z.object({
      title: z.string(),
      articles: z.array(reference("recipe"))
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
        date: z.coerce.date(),
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

export const collections = { like, project, event, blog, recipe, series, writing, tag }
