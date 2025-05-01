import React from "react"
import { Background } from "./background"

interface Props {
  children: React.ReactNode
}

export const LayoutRoot = ({ children }: Props) => (
  <div
    lang="ja-JP"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      fontFamily: '"Ysabeau Office","TsukuBRdGothic"',
      color: "#64748b"
    }}
  >
    <div style={{ display: "flex", position: "absolute", inset: 0 }}>
      <Background />
    </div>

    {children}
  </div>
)
