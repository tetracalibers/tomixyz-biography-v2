import React from "react"
import { Background } from "./components/background"
import { SITE } from "$/config"
import { adjustMixedLangText } from "./components/text"

const TXT_COLOR = "#64748b"

export const createCategoryChildOgImage = (logoDataUrl: string, title: string, category: string) => (
  <div
    lang="ja-JP"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
        gap: "2rem",
        color: TXT_COLOR
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <div style={{ display: "flex", fontSize: "2.5rem" }}>{category}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            fontSize: "2.25rem",
            maxWidth: "550px",
            textAlign: "center"
          }}
        >
          {adjustMixedLangText(title)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "2rem",
            background: "linear-gradient(50deg, #6BBBFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
            backgroundClip: "text",
            color: "rgba(253, 183, 234, 0.6)",
            filter: "saturate(2)"
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            filter: "contrast(1.1)"
          }}
        >
          <img src={logoDataUrl} width={150} />
        </div>
      </div>
    </div>
  </div>
)
