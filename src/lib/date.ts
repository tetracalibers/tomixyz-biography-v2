const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const getMonthName = (date: string | Date) => MONTHS[new Date(date).getMonth()]

export const formatDate = (date: Date, separator: string) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}${separator}${month}${separator}${day}`
}
