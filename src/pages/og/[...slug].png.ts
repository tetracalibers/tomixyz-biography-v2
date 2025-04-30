import type { APIContext } from "astro"
import { ImageResponse } from "@vercel/og"
import { createDefaultOgImage } from "$/lib/og/default"
import { createCategoryTopOgImage } from "$/lib/og/category-top"
import { CATEGORY_META } from "$/config"
import fs from "node:fs/promises"

interface DefaultOgMeta {
  type: "default"
}
interface CategoryTopOgMeta {
  type: "category-top"
  title: string
  subtitle: string
}

type OgMeta = DefaultOgMeta | CategoryTopOgMeta

type Props = OgMeta & {
  logoDataUrl: string
  fonts: {
    name: string
    data: ArrayBuffer | Buffer<ArrayBufferLike>
    style: "normal"
  }[]
}

export async function getStaticPaths() {
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

  return [defaultOgPath, ...categoryTopOgPaths]
}

export async function GET({ props }: APIContext<Props>) {
  const OgImage = (() => {
    switch (props.type) {
      case "default":
        return createDefaultOgImage(props.logoDataUrl)
      case "category-top":
        return createCategoryTopOgImage(props.logoDataUrl, props.title, props.subtitle)
    }
  })()

  return new ImageResponse(OgImage, {
    width: 1200,
    height: 630,
    fonts: props.fonts
  })
}
