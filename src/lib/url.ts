export const judgeIsTopPage = (pathname: string) => {
  return pathname.split("/").filter(Boolean).length === 0
}

export const getLastSlug = (slug: string) => {
  return slug.split("/").pop()
}
