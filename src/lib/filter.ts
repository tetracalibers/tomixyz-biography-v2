export const and = <T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T) => filters.every((filter) => filter(entry))
}

export const filterPublic = (entry: { data: { draft: boolean } }) => {
  if (import.meta.env.DEV) return true
  return !entry.data.draft
}
