import type { APIContext } from "astro"
import { ImageResponse } from "@vercel/og"
import fs from "node:fs/promises"
import { createOgImage } from "$/lib/og/pages/CategoryTop"
import { CATEGORY_META } from "$/config"

interface Props {
  title: string
  subtitle: string
}

export async function getStaticPaths() {
  return Object.entries(CATEGORY_META).map(([category, props]) => ({ params: { category }, props }))
}

export async function GET({ props }: APIContext<Props>) {
  const jaFontData = await fs.readFile(
    new URL("../../../public/fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf", import.meta.url)
  )
  const enFontData = await fs.readFile(new URL("../../../public/fonts/YsabeauOffice-Light.otf", import.meta.url))

  const OgImage = createOgImage(props.title, props.subtitle)

  return new ImageResponse(OgImage, {
    width: 1200,
    height: 630,
    fonts: [
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
  })
}
