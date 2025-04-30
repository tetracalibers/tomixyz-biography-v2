import React from "react"
import { Background } from "../components/background"
import { SITE } from "$/config"
import fs from "node:fs/promises"

const logoPath = import.meta.env.DEV
  ? "../../../assets/profiles/pastel-tomixy_op.png"
  : "../../../src/assets/profiles/pastel-tomixy_op.png"
const logo = await fs.readFile(new URL(logoPath, import.meta.url), { encoding: "base64" })
const logoDataUrl = `data:image/png;base64,${logo}`

const TXT_COLOR = "#64748b"

export const OgImage = (
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
