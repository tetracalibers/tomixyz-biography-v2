import type TextToSVG from "text-to-svg"
import { layoutForLowerPage, layoutForRootPage } from "./components/layout"

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
  title: string
  subtitle?: string
}

const escapeForJaFont = (str: string) => str.replaceAll(" ", "\u00A0").replaceAll("-", "\u2011")

export const useOgSvgTemplate = ({ font, image }: TemplateNeedAssets) => {
  const { logo } = image

  return ({ title, subtitle }: TemplateContent) => {
    return subtitle
      ? layoutForLowerPage({
          title: {
            text: escapeForJaFont(title),
            font: font.ja
          },
          subtitle: {
            text: subtitle,
            font: font.en
          },
          logo
        })
      : layoutForRootPage({
          title: {
            text: title,
            font: font.en
          },
          logo
        })
  }
}
