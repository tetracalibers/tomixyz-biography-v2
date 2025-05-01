import React from "react"

const splitByLangBoundary = (input: string) => {
  const pattern = /([A-Za-z0-9\-\_\.\s]+|[^\x00-\x7F]+)/g
  const result: { type: "en" | "ja"; text: string }[] = []
  let match

  while ((match = pattern.exec(input)) !== null) {
    const current = match[0]

    // 前後とも日本語：直前に結合
    if (result.length > 0 && /[^\x00-\x7F]/.test(result[result.length - 1].text) && /[^\x00-\x7F]/.test(current)) {
      result[result.length - 1].text += current
      continue
    }

    // 前が日本語で、今が数字：直前に結合
    if (result.length > 0 && /[^\x00-\x7F]/.test(result[result.length - 1].text) && /[0-9]/.test(current)) {
      result[result.length - 1].text += current
      continue
    }

    result.push({
      type: /[^\x00-\x7F]/.test(current) ? "ja" : "en",
      text: current
    })
  }

  return result
}

// 「ABCあいうえお」のような、英数字始まりで日本語が混在しているテキストは、
// 全体に英語フォントが適用されてしまい、文字によっては「NoGlyph」と表示されてしまう
// 英語部分と日本語部分の間に空白を入れることで、この問題を回避する
export const adjustMixedLangText = (input: string) => {
  const splittedList = splitByLangBoundary(input)

  if (splittedList.length < 2) {
    return <>{input}</>
  }

  return (
    <>
      {splittedList.map((part) => {
        return part.type === "en" ? " " + part.text + " " : part.text
      })}
    </>
  )
}
