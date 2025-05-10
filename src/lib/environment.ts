export const isDev = () => {
  return import.meta.env.DEV
}
export const isPreviewBranch = () => {
  return import.meta.env.CF_PAGES == 1 && import.meta.env.CF_PAGES_BRANCH !== "main"
}
export const isProdBranch = () => {
  return import.meta.env.CF_PAGES_BRANCH === "main"
}
