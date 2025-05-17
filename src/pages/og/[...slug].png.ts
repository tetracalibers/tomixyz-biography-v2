import type { APIContext } from "astro"
import { ImageResponse } from "@vercel/og"
import { createDefaultOgImage } from "$/lib/og/default"
import { createCategoryTopOgImage } from "$/lib/og/category-top"
import { CATEGORY_META } from "$/config"
import fs from "node:fs/promises"
import { getCollection, getEntry } from "astro:content"
import { createCategoryChildOgImage } from "$/lib/og/category-child"
import { createCategoryGroupedChildOgImage } from "$/lib/og/category-grouped-child"
import { isNotComingSoon } from "$/lib/collection"
import { isPreviewBranch } from "$/lib/environment"

interface DefaultOgMeta {
  type: "default"
}
interface CategoryTopOgMeta {
  type: "category-top"
  title: string
  subtitle: string
}
interface CategoryChildOgMeta {
  type: "category-child"
  title: string
  category: string
}
interface CategoryGroupedChildOgMeta {
  type: "category-grouped-child"
  title: string
  category: string
  subcategory: string
}

type OgMeta = DefaultOgMeta | CategoryTopOgMeta | CategoryChildOgMeta | CategoryGroupedChildOgMeta

type Props = OgMeta & {
  logoDataUrl: string
  fonts: {
    name: string
    data: ArrayBuffer | Buffer<ArrayBufferLike>
    style: "normal"
  }[]
}

export async function getStaticPaths() {
  // プレビューブランチへのデプロイ時はOGP画像生成をスキップ
  if (isPreviewBranch()) {
    return []
  }

  const logoPath = "../../../src/assets/profiles/pastel-tomixy_op.png"
  const logo = await fs.readFile(new URL(logoPath, import.meta.url), { encoding: "base64" })
  const logoDataUrl = `data:image/png;base64,${logo}`

  const jaFontPath = "../../../public/fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf"
  const enFontPath = "../../../public/fonts/YsabeauOffice-Light.otf"
  const jaFontData = await fs.readFile(new URL(jaFontPath, import.meta.url))
  const enFontData = await fs.readFile(new URL(enFontPath, import.meta.url))
  const fonts = [
    {
      name: "Ysabeau Office",
      data: enFontData,
      style: "normal"
    },
    {
      name: "TsukuBRdGothic",
      data: jaFontData,
      style: "normal"
    }
  ]

  const commonProps = { logoDataUrl, fonts }

  const defaultOgPath = {
    params: { slug: "default" },
    props: {
      type: "default",
      ...commonProps
    }
  }

  const categoryTopOgPaths = Object.entries(CATEGORY_META).map(([category, props]) => ({
    params: { slug: category },
    props: {
      type: "category-top",
      title: props.title,
      subtitle: props.subtitle,
      ...commonProps
    }
  }))

  const blogOgPaths = (await getCollection("blog")).map((entry) => {
    return {
      params: { slug: "blog/" + entry.id },
      props: {
        type: "category-child",
        title: entry.data.title,
        category: CATEGORY_META.blog.title,
        ...commonProps
      }
    }
  })
  const projectsOgPaths = (await getCollection("project")).map((entry) => {
    return {
      params: { slug: "projects/" + entry.id },
      props: {
        type: "category-child",
        title: entry.data.title,
        category: CATEGORY_META.projects.title,
        ...commonProps
      }
    }
  })
  const eventsOgPaths = (await getCollection("event")).map((entry) => {
    return {
      params: { slug: "events/" + entry.id },
      props: {
        type: "category-child",
        title: entry.data.title,
        category: CATEGORY_META.events.title,
        ...commonProps
      }
    }
  })

  const recipesOgPaths = await Promise.all(
    (await getCollection("recipe", (entry) => !entry.data.draft)).filter(isNotComingSoon).map(async (entry) => {
      if (!entry.data.series) {
        return {
          params: { slug: "recipes/" + entry.id },
          props: {
            type: "category-child",
            title: entry.data.title,
            category: CATEGORY_META.recipes.title,
            ...commonProps
          }
        }
      }
      const series = await getEntry("series", entry.data.series.id)!
      return {
        params: { slug: "recipes/" + entry.id },
        props: {
          type: "category-grouped-child",
          title: entry.data.title,
          category: CATEGORY_META.recipes.title,
          subcategory: series.data.title,
          ...commonProps
        }
      }
    })
  )
  const seriesOgPaths = (await getCollection("series")).map((entry) => {
    return {
      params: { slug: "recipes/" + entry.id },
      props: {
        type: "category-grouped-child",
        title: entry.data.title,
        category: CATEGORY_META.recipes.title,
        subcategory: "シリーズ記事一覧",
        ...commonProps
      }
    }
  })

  return [
    defaultOgPath,
    ...categoryTopOgPaths,
    ...blogOgPaths,
    ...projectsOgPaths,
    ...eventsOgPaths,
    ...recipesOgPaths,
    ...seriesOgPaths
  ]
}

export async function GET({ props }: APIContext<Props>) {
  const OgImage = (() => {
    switch (props.type) {
      case "default":
        return createDefaultOgImage(props.logoDataUrl)
      case "category-top":
        return createCategoryTopOgImage(props.logoDataUrl, props.title, props.subtitle)
      case "category-child":
        return createCategoryChildOgImage(props.logoDataUrl, props.title, props.category)
      case "category-grouped-child":
        return createCategoryGroupedChildOgImage(props.logoDataUrl, props.title, props.category, props.subcategory)
    }
  })()

  return new ImageResponse(OgImage, {
    width: 1200,
    height: 630,
    fonts: props.fonts
  })
}
