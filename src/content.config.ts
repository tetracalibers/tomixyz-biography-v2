import { defineCollection, reference, z } from "astro:content"
import { file, glob } from "astro/loaders"
import { COMING_SOON_KEY, SKILL_CATEGORY_KEYS } from "./config"

const passion = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/passion" }),
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
      editing: z.boolean().default(false),
      pinned: z.boolean().default(false)
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
      editing: z.boolean().default(false),
      pinned: z.boolean().default(false)
    })
})

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      meta: z
        .object({
          description: z.string()
        })
        .optional(),
      date: z.coerce.date(),
      pinned: z.boolean().default(false)
    })
})

const _techBase = z.object({
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
    .optional(),
  pinned: z.boolean().default(false)
})
const _techPublic = _techBase.extend({
  date: z.coerce.date(),
  draft: z.literal(false).optional()
})
const _techDraft = _techBase.extend({
  date: z.coerce.date().or(z.literal(COMING_SOON_KEY)),
  draft: z.literal(true)
})

const tech = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/tech" }),
  schema: () => z.discriminatedUnion("draft", [_techPublic, _techDraft])
})

const series = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/series" }),
  schema: () =>
    z.object({
      title: z.string(),
      articles: z.array(reference("tech"))
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
      description: z.string(),
      url: z.string().url(),
      skill: z.boolean().default(true),
      category: z.enum(SKILL_CATEGORY_KEYS)
    })
})

export const collections = { passion, project, event, blog, tech, series, writing, tag }
