// @ts-check
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import path from "node:path"

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
