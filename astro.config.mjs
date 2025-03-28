// @ts-check
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"

import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), mdx()],
  vite: {
    resolve: {
      alias: {
        $: path.resolve(__dirname, "./src")
      }
    }
  }
})
