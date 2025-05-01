import React from "react"

interface Props {
  text: string
  fontSize: string
}

export const CategoryName = ({ fontSize, text }: Props) => (
  <div
    style={{
      display: "flex",
      background: "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
      backgroundClip: "text",
      color: "transparent",
      filter: "saturate(2)",
      fontSize
    }}
  >
    {text}
  </div>
)
