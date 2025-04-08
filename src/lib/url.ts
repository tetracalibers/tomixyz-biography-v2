export const judgeIsTopPage = (pathname: string) => {
  return pathname.split("/").filter(Boolean).length === 0
}
