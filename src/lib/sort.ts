export const compareDateForSort = <T extends { data: { date: string } }>(a: T, b: T) => {
  return +new Date(b.data.date) - +new Date(a.data.date)
}
