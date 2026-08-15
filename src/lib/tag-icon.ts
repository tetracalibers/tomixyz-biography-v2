/**
 * タグIDと技術ロゴアイコン（@iconify-json/logos, @iconify-json/devicon）の対応表
 * ここに載っていないタグにはアイコンを表示しない
 */
const TAG_ICON_MAP: Record<string, string> = {
  applescript: "logos:apple",
  astro: "logos:astro-icon",
  bash: "logos:bash-icon",
  "cf-pages": "logos:cloudflare-icon",
  "claude-code": "logos:claude-icon",
  "claude-design": "logos:claude-icon",
  css: "logos:css-3",
  d3: "logos:d3",
  devtools: "logos:chrome",
  drizzle: "logos:drizzle-icon",
  git: "logos:git-icon",
  github: "logos:github-icon",
  graphql: "logos:graphql",
  html: "logos:html-5",
  javascript: "logos:javascript",
  jquery: "devicon:jquery",
  laravel: "logos:laravel",
  latex: "devicon:latex",
  mantine: "logos:mantine-icon",
  mdx: "logos:mdx",
  mysql: "logos:mysql-icon",
  playwright: "logos:playwright",
  postgresql: "logos:postgresql",
  python: "logos:python",
  react: "logos:react",
  "react-router": "logos:react-router",
  ruby: "logos:ruby",
  rust: "logos:rust",
  slidev: "logos:slidev",
  storybook: "logos:storybook-icon",
  svelte: "logos:svelte-icon",
  sveltekit: "logos:svelte-icon",
  svg: "logos:svg",
  "tailwind-css": "logos:tailwindcss-icon",
  "tanstack-query": "logos:react-query-icon",
  threejs: "logos:threejs",
  typescript: "logos:typescript-icon",
  vba: "devicon:visualbasic",
  vitest: "logos:vitest",
  vscode: "logos:visual-studio-code",
  vuejs: "logos:vue",
  webgpu: "devicon:webgpu",
  wordpress: "logos:wordpress-icon",
  zod: "logos:zod"
}

/**
 * astro-iconは動的な`name`を検出できないため、使用するアイコンを`astro.config.mjs`の`include`に渡す必要がある
 */
export const tagIconInclude = Object.values(TAG_ICON_MAP).reduce<Record<string, string[]>>((acc, icon) => {
  const [collection, name] = icon.split(":")
  const names = (acc[collection] ??= [])
  if (!names.includes(name)) names.push(name)
  return acc
}, {})

export const getTagIcon = (tagId: string): string | undefined => TAG_ICON_MAP[tagId]
