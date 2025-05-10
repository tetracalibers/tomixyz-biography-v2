export const and = <T, R extends T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T): entry is R => filters.every((filter) => filter(entry))
}
export const or = <T, R extends T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T): entry is R => filters.some((filter) => filter(entry))
}
