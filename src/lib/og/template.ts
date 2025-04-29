import type TextToSVG from "text-to-svg"
import { layoutForCategoryTopPage, layoutForRootPage } from "./components/layout"
import { SITE } from "$/config"

interface TemplateNeedAssets {
  font: {
    en: TextToSVG
    ja: TextToSVG
  }
  image: {
    logo: string
  }
}

interface TemplateContent {
  category?: string
}

const escapeForJaFont = (str: string) => str.replaceAll(" ", "\u00A0").replaceAll("-", "\u2011")

export const useOgSvgTemplate = ({ font, image }: TemplateNeedAssets) => {
  const { logo } = image

  return ({ category }: TemplateContent) => {
    if (!category) {
      return layoutForRootPage({ title: { text: SITE.name, font: font.en }, logo })
    }

    return layoutForCategoryTopPage({
      title: { text: category, font: font.en },
      subtitle: { text: SITE.name, font: font.en },
      logo
    })
  }
}
