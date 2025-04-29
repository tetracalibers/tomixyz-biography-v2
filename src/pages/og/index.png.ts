import { OgImage } from "$/lib/og/pages"
import { ImageResponse } from "@vercel/og"
import fs from "node:fs/promises"

export async function GET() {
  const jaFontData = await fs.readFile(
    new URL("../../../public/fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf", import.meta.url)
  )
  const enFontData = await fs.readFile(new URL("../../../public/fonts/YsabeauOffice-Light.otf", import.meta.url))

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
