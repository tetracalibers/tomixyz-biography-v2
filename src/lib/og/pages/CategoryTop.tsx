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

export const createOgImage = (title: string, subtitle: string) => (
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
        alignItems: "center",
        color: TXT_COLOR
      }}
    >
      <div
        style={{
          display: "flex",
          filter: "contrast(1.1)"
        }}
      >
        <img src={logoDataUrl} width={180} />
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
        <div style={{ display: "flex", fontSize: "4rem" }}>{title}</div>
        <div style={{ display: "flex", fontSize: "1.5rem" }}>{subtitle}</div>
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
      </div>
    </div>
  </div>
)
