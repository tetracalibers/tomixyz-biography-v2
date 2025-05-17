export const compareDateForSort = <T extends { data: { date: Date } }>(a: T, b: T) => {
  return +b.data.date - +a.data.date
}

export const compareDateForSortAsc = <T extends { data: { date: Date } }>(a: T, b: T) => {
  return +a.data.date - +b.data.date
}

// pinnedを先頭に持ってくる
export const pinnedFirstDateSort = <T extends { data: { date: Date; pinned: boolean } }>(a: T, b: T) => {
  if (a.data.pinned && !b.data.pinned) return -1
  if (!a.data.pinned && b.data.pinned) return 1
  return compareDateForSort(a, b)
}
