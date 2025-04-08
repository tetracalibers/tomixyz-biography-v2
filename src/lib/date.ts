const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getMonthName = (date: string | Date) => MONTHS[new Date(date).getMonth()]

export const compareDateForSort = <T extends { data: { date: string } }>(a: T, b: T) => {
  return +new Date(b.data.date) - +new Date(a.data.date)
}
