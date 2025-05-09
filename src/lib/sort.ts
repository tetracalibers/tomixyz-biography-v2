export const compareDateForSort = <T extends { data: { date: Date } }>(a: T, b: T) => {
  return +b.data.date - +a.data.date
}

export const compareDateForSortAsc = <T extends { data: { date: Date } }>(a: T, b: T) => {
  return +a.data.date - +b.data.date
}
