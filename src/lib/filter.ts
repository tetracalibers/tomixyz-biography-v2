export const and = <T>(...filters: ((entry: T) => boolean)[]) => {
  return (entry: T) => filters.every((filter) => filter(entry))
}
