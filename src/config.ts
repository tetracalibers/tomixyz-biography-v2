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
    subtitle: "個人的に作ったもの"
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
  recipes: {
    path: "/recipes/1",
    title: "recipes"
  },
  blog: {
    path: "/blog/1",
    title: "blog"
  },
  writing: {
    path: "/writing/",
    title: "writing"
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

export const COMING_SOON_KEY = "coming-soon"
