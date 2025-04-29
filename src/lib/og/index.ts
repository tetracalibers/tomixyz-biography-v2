import { SITE } from "$/config"
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

const makeCustomOGP = (title: string, subtitle?: string) => {
  return toPNGBuffer(ogSVG({ title, subtitle }))
}

export const defaultOGP = await makeCustomOGP(SITE.name)

export const makeCategoryIndexPageOGP = (category: string) => {
  return makeCustomOGP(category, SITE.name)
}
export const makeCategoryLowerPageOGP = (category: string, title: string) => {
  return makeCustomOGP(title, `${SITE.name} - ${category}`)
}
