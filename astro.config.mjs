// @ts-check
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"

import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import rehypePrettyCode from "rehype-pretty-code"
import { addColorPreview } from "./plugins/pretty-code/add-color-preview"
import { transformerNotationErrorLevel } from "@shikijs/transformers"

import remarkBreaks from "remark-breaks"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

/** @type {import("rehype-pretty-code").Options} */
const prettyCodeOptions = {
  theme: {
    dark: "synthwave-84",
    light: "snazzy-light"
  },
  defaultLang: "plaintext",
  transformers: [transformerNotationErrorLevel()],
  onVisitLine(element) {
    addColorPreview(element)
  }
}

// https://astro.build/config
export default defineConfig({
  site: "https://tomixyz-biography.com",
  base: "",
  trailingSlash: "ignore",
  scopedStyleStrategy: "where",
  devToolbar: {
    enabled: false
  },
  server: {
    port: 3000
  },
  markdown: {
    syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
    rehypePlugins: [
      [rehypeKatex, {}],
      [rehypePrettyCode, prettyCodeOptions]
    ],
    remarkPlugins: [remarkMath, remarkBreaks]
  },
  integrations: [icon(), svelte(), mdx()],
  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src")
      }
    }
  }
})
