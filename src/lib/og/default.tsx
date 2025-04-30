import React from "react"
import { Background } from "./components/background"
import { SITE } from "$/config"

const TXT_COLOR = "#64748b"

export const createDefaultOgImage = (logoDataUrl: string) => (
  <div
    lang="ja-JP"
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      fontFamily: '"Ysabeau Office","TsukuBRdGothic"'
    }}
  >
    <div style={{ display: "flex", position: "absolute", inset: 0 }}>
      <Background />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%",
        color: TXT_COLOR
      }}
    >
      <div style={{ display: "flex", filter: "contrast(1.1)" }}>
        <img src={logoDataUrl} width={200} />
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "3rem"
        }}
      >
        {SITE.name}
      </div>
    </div>
  </div>
)
