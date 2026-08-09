# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tomixy's biography` — a static personal site (portfolio + tech blog) built with Astro 5, deployed to Cloudflare Pages at https://tomixyz-biography.net. All content is Japanese; commit messages are Japanese (sometimes with `feat:` / `fix:` prefixes).

## Commands

Package manager is **yarn** (`.yarnrc` sets `ignore-engines true`).

```sh
yarn dev                  # dev server on :4321, opens browser
yarn build                # static build to ./dist
yarn preview              # serve ./dist
yarn astro check          # typecheck .astro/.ts (no separate lint/test setup)
yarn format               # prettier over the repo (astro + svelte plugins)
yarn webm2poster          # generate poster PNGs from public/movie/**/*.webm via ffmpeg (needs zx)
```

There is no test suite. `yarn astro check` currently reports **1 pre-existing error** in `src/lib/tag.ts:16` (union-type widening on `getRefTagCollection`) — it is not caused by your changes.

## Architecture

### Content collections (`src/content.config.ts`)

Eight collections: `like`, `project`, `event`, `blog`, `tech`, `series`, `writing`, `tag`. Files live under `src/content/<collection>/`; images under `src/assets/<collection>/`.

- **`tag` is the hub.** It loads from the single `src/content/tag.yaml` file. `project`, `event`, `tech`, and `writing` all use `reference("tag")`, so **a tag must exist in `tag.yaml` before any article can use it** or the build fails. `skill: false` on a tag excludes it from the top-page skill list.
- **`writing`** is unusual: each `src/content/writing/*.yaml` file is an *array* of entries (one file = one publication venue), so downstream code flattens `entry.data` rather than treating an entry as one item (see `src/lib/tag.ts`).
- **`tech`** uses `z.discriminatedUnion("draft", ...)`: a published article needs a real `date`; a `draft: true` article may instead set `date: coming-soon` (`COMING_SOON_KEY` in `src/config.ts`) to appear as a placeholder.
- `src/config.ts` holds `CATEGORY_META`, `NAV_ITEMS`, `SITE`, `PAGE_SIZE`, `COMING_SOON_KEY` — nav paths point at `/<category>/1` because listing pages are paginated.

### Draft / coming-soon visibility

Visibility is environment-gated, not a single flag. Three small modules compose:

- `src/lib/environment.ts` — `isDev()`, `isPreviewBranch()` (`CF_PAGES=1` and branch ≠ `main`), `isProdBranch()`.
- `src/lib/collection.ts` — predicates + type guards (`isNotDraft`, `isComingSoon`, `isDraftNotComingSoon`, `TechNotComingSoon`).
- `src/lib/filter.ts` — `and()` / `or()` combinators that preserve the type guard, so `getCollection("tech", or(and(...), and(...)))` narrows `date` to `Date`.

Effect: production (`main`) ships published articles only; dev and preview branches also render drafts. OG image generation is skipped entirely on preview branches. Note `.env` (gitignored) sets `CF_PAGES=1` / `CF_PAGES_BRANCH="main"`, so a **local `yarn build` behaves like production** while `yarn dev` shows drafts.

### Series

A series is defined by `src/content/series/<id>.md`, whose `articles` frontmatter array is the **source of truth for ordering** (prev/next, index-in-series) — dates are not used. Adding an article to a series is a two-sided edit: append its id to the series' `articles` list *and* set `series: <id>` in the article's frontmatter. `src/lib/series.ts` (`collectSeriesArticles`, `getPrev`) reads from there.

Tech article ids include the series directory (`webgpu-concept/introduction`), which is why routes split them: `src/pages/tech/[series]/[slug].astro` uses `getLastSlug()` from `src/lib/url.ts` for params, `src/pages/tech/[slug].astro` handles standalone articles, and `src/pages/tech/[series]/index.astro` renders the series' table of contents.

### OG images

Generated at build time by `src/pages/og/[...slug].png.ts` using `@vercel/og` + JSX components in `src/lib/og/` (React is a dependency only for this JSX, not for site UI). `getStaticPaths` enumerates every category top page and content entry into four layout variants (`default`, `category-top`, `category-child`, `category-grouped-child`), embedding local fonts and the profile logo as data URLs. Pages just point `meta.ogimage` at the resulting path (e.g. `/og/tech/<series>/<slug>.png`); `BaseHead.astro` prefixes `SITE.url`.

### Markdown/MDX pipeline (`astro.config.mjs`)

Astro's built-in `syntaxHighlight` is **disabled** in favour of `rehype-pretty-code` (dual `synthwave-84` / `snazzy-light` themes). Two local plugins:

- `plugins/pretty-code/add-color-preview.ts` — runs in `onVisitLine` and injects `<span data-color-preview>` swatches next to hex/rgb/named colors in code blocks, including colors split across multiple Shiki tokens (it look-aheads over sibling tokens, so index-out-of-range is a real hazard there). Styling lives in `src/styles/pretty-code.css`.
- `plugins/rehype-wrap-table.ts` — wraps tables for horizontal scroll.

Remark: `remark-math`, `remark-breaks`, `remark-github-blockquote-alert`, `remark-flexible-markers` (`==highlight==`, styled by `src/styles/prose-use-marker.css`). Rehype: `rehype-katex`.

**Custom MDX directives** come from `astro-mdx-directive` and are registered in the `directives` object in `astro.config.mjs` — adding a new one (`::DemoLink[label]{url=...}`, `:SeriesPrevLink[前回]{series=... current=...}`) requires editing that config, not just adding a component. MDX files can also import `.astro`/`.svelte` components directly (e.g. `FigureBox`, `DemoLinkWithResult`).

**Icons** use `astro-icon` with an explicit per-collection allowlist in the `icon({ include: ... })` block of `astro.config.mjs`; a new icon name must be added there or it won't resolve.

### Layouts, styling, interactivity

- `src/layouts/default.astro` is the generic page shell (title/subtitle header + slot); `blog`/`tech`/`project`/`event` layouts add article headers, TOC, series navigation, and references.
- No CSS framework. Design tokens (oklch gray/slate scales) and fonts are in `src/styles/global.css`, imported once via `BaseHead.astro`; other stylesheets are imported by whichever component or route needs them (`prose.css` by `Prose.astro`/`ProseGridFill.astro`, `prose-use-marker.css` per route). `scopedStyleStrategy: "where"` keeps scoped styles at low specificity, and `light-dark()` is used throughout.
- Theme is a `.light` / `.dark` class on `<html>` toggled by `src/components/layout/ThemeSwitch.astro` and persisted in `localStorage.theme`.
- Interactive islands are Svelte 5 (`src/components/image-wrapper/CompareImage.svelte`); everything else is static Astro.

### Paths and deployment

Import aliases: `$` → `src/`, `$components` → `src/components/` (declared in both `tsconfig.json` paths and the Vite alias); both spellings appear in the codebase. `public/_redirects` handles the legacy `/recipes` → `/tech` move for Cloudflare Pages.

## Conventions

- Prettier config is non-default: **no semicolons**, double quotes, `printWidth: 120`, no trailing commas, no Svelte shorthand. Run `yarn format` rather than hand-formatting.
- TypeScript is `astro/tsconfigs/strict`; prefer the existing type-guard style (`entry is TechNotComingSoon`) when narrowing collection entries.
- `README.md` is still the unmodified Astro starter template — don't treat it as project documentation.
