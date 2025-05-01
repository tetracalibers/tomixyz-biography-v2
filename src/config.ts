import type { NavItems } from "./types"

export const CATEGORY_META = {
  writing: {
    title: "Writing",
    subtitle: "書いたもの"
  },
  like: {
    title: "Like",
    subtitle: "好きなことと展望"
  },
  blog: {
    title: "Blog",
    subtitle: "考えていること"
  },
  events: {
    title: "Events",
    subtitle: "携わったイベントや発表"
  },
  projects: {
    title: "Projects",
    subtitle: "個人で開発しているもの"
  },
  recipes: {
    title: "Recipes",
    subtitle: "学びやアイデアの記録"
  }
}

export const NAV_ITEMS: NavItems = {
  about: {
    path: "/",
    title: "about"
  },
  like: {
    path: "/like/",
    title: "like"
  },
  projects: {
    path: "/projects/1",
    title: "projects"
  },
  events: {
    path: "/events/1",
    title: "events"
  },
  writing: {
    path: "/writing/",
    title: "writing"
  },
  blog: {
    path: "/blog/1",
    title: "blog"
  },
  recipes: {
    path: "/recipes/1",
    title: "recipes"
  }
}

export const SITE = {
  name: "tomixy's biography",
  title: "tomixy's biography",
  description: "",
  url: "https://tomixyz-biography.net",
  base: "",
  githubUrl: "https://github.com/tetracalibers",
  author: "tomixy"
}

export const PAGE_SIZE = 10
