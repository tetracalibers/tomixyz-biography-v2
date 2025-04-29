import { loadEmbedAssets } from "./loader"
import { useOgSvgTemplate } from "./template"
import sharp from "sharp"

const initEmbeddedTemplates = async () => {
  const assets = await loadEmbedAssets({
    font: {
      en: "public/fonts/YsabeauOffice-Light.otf",
      ja: "public/fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf"
    },
    image: {
      logo: "src/assets/profiles/pastel-tomixy_op.png"
    }
  })

  return useOgSvgTemplate(assets)
}

const ogSVG = await initEmbeddedTemplates()

const toPNGBuffer = (svgString: string) => {
  return sharp(Buffer.from(svgString)).png().toBuffer()
}

const createCustomOgImage = (category?: string) => {
  const svg = ogSVG({ category })
  return toPNGBuffer(svg)
}

export const defaultOGP = await createCustomOgImage()

export const createOgImageCategoryTop = (category: string) => {
  return createCustomOgImage(category)
}

export const OG_RESPONSE_HEADERS: HeadersInit = {
  "Content-Type": "image/png",
  "Cache-Control": "public, max-age=31536000, immutable"
}
