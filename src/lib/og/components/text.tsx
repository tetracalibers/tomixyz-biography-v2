import React from "react"

const getFirstJapaneseIndex = (input: string) => {
  const japaneseRegex = /[\u3040-\u30FF\u4E00-\u9FFFー々]/

  for (let i = 0; i < input.length; i++) {
    if (japaneseRegex.test(input[i])) {
      return i
    }
  }

  return null
}

const startsWithAlphaNum = (input: string) => {
  return /^[a-zA-Z0-9]/.test(input)
}

// 「ABCあいうえお」のような、英語始まりで日本語が混在しているテキストは、
// 全体に英語フォントが適用されてしまい、文字によっては「NoGlyph」と表示されてしまう
// 英語部分と日本語部分の間に空白を入れると、この問題を回避できる
export const adjustMixedLangText = (input: string) => {
  if (!startsWithAlphaNum(input)) {
    return <>{input}</>
  }
  const firstJapaneseIndex = getFirstJapaneseIndex(input)
  if (firstJapaneseIndex !== null) {
    const enPart = input.slice(0, firstJapaneseIndex)
    const jaPart = input.slice(firstJapaneseIndex)
    return (
      <>
        {enPart} {jaPart}
      </>
    )
  }
}
