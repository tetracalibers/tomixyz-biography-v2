export const and = <T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T) => filters.every((filter) => filter(entry))
}
export const or = <T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T) => filters.some((filter) => filter(entry))
}
