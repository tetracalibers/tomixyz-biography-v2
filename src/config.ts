import type { NavItems } from "./types"

export const CATEGORY_META = {
  writing: {
    title: "Writing",
    subtitle: "書いたもの"
  },
  passion: {
    title: "Passion",
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
    subtitle: "個人的に作っているもの"
  },
  techs: {
    title: "Tech",
    subtitle: "技術の学びやアイデアの記録"
  }
}

/* トップページのSkill Tagをまとめる単位。
   「その技術を何に使うか」で寄せているため、glsl/wgslは言語ではなくgraphics、sqlはdataに属する */
export const SKILL_CATEGORY_META = {
  language: { label: "Languages" },
  "web-platform": { label: "Web Platform" },
  "ui-framework": { label: "UI Frameworks" },
  graphics: { label: "Graphics & Visuals" },
  data: { label: "Data" },
  authoring: { label: "Content Authoring" },
  tooling: { label: "Tooling" }
}

export const SKILL_CATEGORY_KEYS = Object.keys(SKILL_CATEGORY_META) as [SkillCategory, ...SkillCategory[]]

export type SkillCategory = keyof typeof SKILL_CATEGORY_META

export const NAV_ITEMS: NavItems = {
  about: {
    path: "/",
    title: "about"
  },
  passion: {
    path: "/passion/",
    title: "passion"
  },
  projects: {
    path: "/projects/1",
    title: "projects"
  },
  events: {
    path: "/events/1",
    title: "events"
  },
  techs: {
    path: "/tech/1",
    title: "tech"
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
