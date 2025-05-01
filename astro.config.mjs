// @ts-check
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import mdxDirective from "astro-mdx-directive"
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
import remarkFlexibleMarkers from "remark-flexible-markers"
import { remarkAlert } from "remark-github-blockquote-alert"
import rehypeKatex from "rehype-katex"
import rehypeWrapTable from "./plugins/rehype-wrap-table"

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

/** @type {import('astro-mdx-directive').DirectiveComponentList} */
const directives = {
  leaf: [
    {
      name: "DemoLink",
      path: "src/components/demo/DemoLink.astro",
      useAsProps: {
        directiveLabel: "title"
      }
    }
  ],
  text: [
    {
      name: "SeriesPrevLink",
      path: "src/components/directive/SeriesPrevLink.astro",
      useAsProps: {
        directiveLabel: "title"
      }
    }
  ]
}

// https://astro.build/config
export default defineConfig({
  site: "https://tomixyz-biography.net",
  base: "",
  trailingSlash: "ignore",
  scopedStyleStrategy: "where",
  devToolbar: {
    enabled: false
  },
  markdown: {
    syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
    rehypePlugins: [
      [rehypeKatex, {}],
      [rehypePrettyCode, prettyCodeOptions],
      [rehypeWrapTable, {}]
    ],
    remarkPlugins: [remarkMath, remarkBreaks, remarkAlert, remarkFlexibleMarkers]
  },
  integrations: [mdxDirective({ directives }), icon(), svelte(), mdx()],
  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src")
      }
    }
  }
})
